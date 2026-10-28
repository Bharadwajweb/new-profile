import { useCallback, useLayoutEffect, useRef } from "react"
import { ArrowDownRight } from "lucide-react"
import { gsap } from "gsap"

type IntroSequenceProps = {
  onComplete: () => void
}

const loaderName = "BHARADWAJ M"
const giantName = "BHARADWAJ"

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const counterRef = useRef<HTMLSpanElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const completedRef = useRef(false)

  const finish = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete()
  }, [onComplete])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish()
      return
    }

    const context = gsap.context(() => {
      const progress = { value: 0 }
      const timeline = gsap.timeline()
      timelineRef.current = timeline

      timeline
        .fromTo(
          ".loader-wordmark",
          { autoAlpha: 0, letterSpacing: "1.1em", filter: "blur(12px)" },
          { autoAlpha: 1, letterSpacing: "0.5em", filter: "blur(0px)", duration: 1.6, ease: "power3.out" },
          0,
        )
        .fromTo(
          ".loader-counter",
          { autoAlpha: 0, yPercent: 30 },
          { autoAlpha: 1, yPercent: 0, duration: 0.7, ease: "power3.out" },
          0.1,
        )
        .fromTo(
          ".loader-name__char",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power2.out" },
          0.3,
        )
        .to(
          progress,
          {
            value: 100,
            duration: 2.6,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(progress.value))
              }
            },
          },
          0.2,
        )
        .fromTo(
          ".loader-line__fill",
          { scaleX: 0 },
          { scaleX: 1, duration: 2.6, ease: "power2.inOut" },
          0.2,
        )
        .to(
          ".loader-center",
          { y: -36, autoAlpha: 0, duration: 0.5, ease: "power2.in" },
          "+=0.15",
        )
        .to(".loader-wordmark", { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, "<")
        .fromTo(
          ".loader-giant__char",
          { yPercent: 115 },
          { yPercent: 0, duration: 0.9, stagger: 0.055, ease: "power4.out" },
          "-=0.1",
        )
        .to(root, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "+=0.25")
        .call(finish)
    }, root)

    return () => {
      timelineRef.current?.kill()
      context.revert()
    }
  }, [finish])

  const skipIntro = () => {
    const root = rootRef.current
    timelineRef.current?.kill()

    if (!root) {
      finish()
      return
    }

    gsap.to(root, { autoAlpha: 0, duration: 0.36, ease: "power2.out", onComplete: finish })
  }

  return (
    <div ref={rootRef} className="loader-screen" role="region" aria-label="Loading introduction">
      <h2 className="sr-only">Portfolio of Bharadwaj M</h2>
      <div className="loader-glow" aria-hidden="true" />

      <div className="loader-topline">
        <p className="loader-mark" aria-hidden="true">
          BM<span>.</span>
        </p>
        <p className="loader-wordmark" aria-hidden="true">
          PORTFOLIO
        </p>
        <button className="intro-skip" type="button" onClick={skipIntro}>
          <span>Skip intro</span>
          <ArrowDownRight aria-hidden="true" />
        </button>
      </div>

      <div className="loader-center" aria-hidden="true">
        <span className="loader-counter">
          <span ref={counterRef}>0</span>
        </span>
        <span className="loader-name">
          {Array.from(loaderName).map((letter, index) => (
            <span className="loader-name__char" key={`${letter}-${index}`}>
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
        <span className="loader-line">
          <span className="loader-line__fill" />
        </span>
      </div>

      <div className="loader-giant" aria-hidden="true">
        {Array.from(giantName).map((letter, index) => (
          <span className="loader-giant__mask" key={`${letter}-${index}`}>
            <span className="loader-giant__char">{letter}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
