import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const manifesto =
  "I believe real security is born at the intersection of curiosity and discipline. Every port, every packet, every log line is an opportunity to protect something that matters."

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const context = gsap.context(() => {
      gsap.fromTo(
        ".manifesto__word",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto__text",
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      )
      gsap.fromTo(
        ".manifesto__image",
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        },
      )
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section ref={sectionRef} className="manifesto" id="manifesto" aria-labelledby="manifesto-title">
      <div className="manifesto__media" aria-hidden="true">
        <img className="manifesto__image" src="/manifesto-hands.png" alt="" loading="lazy" />
        <div className="manifesto__shade" />
      </div>
      <div className="manifesto__inner page-shell">
        <p className="manifesto__kicker">
          <span className="hero-cine__dot" aria-hidden="true" />
          MANIFESTO / 00
        </p>
        <h2 className="sr-only" id="manifesto-title">
          Manifesto
        </h2>
        <p className="manifesto__text">
          {manifesto.split(" ").map((word, index) => (
            <span className="manifesto__word" key={`${word}-${index}`}>
              {word}{" "}
            </span>
          ))}
        </p>
        <p className="manifesto__sign">— BHARADWAJ M</p>
      </div>
    </section>
  )
}
