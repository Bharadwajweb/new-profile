import { useEffect, useLayoutEffect, useRef, type PointerEvent } from "react"
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react"
import { gsap } from "gsap"

type HeroSectionProps = {
  isActive: boolean
}

const heroName = "BHARADWAJ"
const solidWindow = 3

export function HeroSection({ isActive }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const nameRef = useRef<HTMLSpanElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const context = gsap.context(() => {
      if (!isActive) {
        gsap.set(".hero-name__char", { yPercent: reduced ? 0 : 110 })
        gsap.set(".hero-reveal", { autoAlpha: reduced ? 1 : 0 })
        return
      }
      if (reduced) return

      gsap
        .timeline()
        .to(".hero-name__char", { yPercent: 0, duration: 1, stagger: 0.06, ease: "power4.out" })
        .to(
          ".hero-reveal",
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.6",
        )
    }, section)

    return () => context.revert()
  }, [isActive])

  useEffect(() => {
    const name = nameRef.current
    if (!name || !isActive) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const chars = Array.from(name.querySelectorAll<HTMLElement>(".hero-name__char"))
    let start = chars.length - solidWindow

    const paint = () => {
      chars.forEach((char, index) => {
        const offset = (index - start + chars.length) % chars.length
        char.classList.toggle("is-solid", offset < solidWindow)
      })
    }

    paint()
    const interval = window.setInterval(() => {
      start = (start + 1) % chars.length
      paint()
    }, 520)

    return () => window.clearInterval(interval)
  }, [isActive])

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const section = sectionRef.current
    if (!section || event.pointerType !== "mouse") return
    const bounds = section.getBoundingClientRect()
    section.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`)
    section.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`)
  }

  return (
    <section
      ref={sectionRef}
      className="hero-cine"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
    >
      <div className="hero-cine__smoke" aria-hidden="true" />
      <div className="hero-cine__glow" aria-hidden="true" />
      <div className="hero-cine__grain" aria-hidden="true" />

      <div className="hero-cine__inner page-shell">
        <div className="hero-cine__top">
          <p className="hero-cine__tagline hero-reveal">
            <span className="hero-cine__dot" aria-hidden="true" />
            SECURING IDEAS INTO REALITY.
          </p>
          <a className="hero-cine__dive glass-pill hero-reveal" href="#manifesto">
            Dive In
            <Plus aria-hidden="true" />
          </a>
        </div>

        <div className="hero-cine__center">
          <h1 className="hero-name" id="hero-title">
            <span className="sr-only">Bharadwaj M, cybersecurity portfolio</span>
            <span className="hero-name__row" ref={nameRef} aria-hidden="true">
              {Array.from(heroName).map((letter, index) => (
                <span className="hero-name__mask" key={`${letter}-${index}`}>
                  <span className="hero-name__char">{letter}</span>
                </span>
              ))}
            </span>
          </h1>
          <p className="hero-cine__role hero-reveal" aria-hidden="true">
            SOC ANALYST <span>/</span> SECURITY ANALYST <span>/</span> VAPT
          </p>
        </div>

        <div className="hero-cine__bottom">
          <p className="hero-cine__intro hero-reveal">
            B.Tech CSE (Cybersecurity) student &amp; security analyst building threat detection,
            hardened networks, and incident-ready systems.
          </p>

          <span className="hero-cine__scroll hero-reveal" aria-hidden="true">
            <span>SCROLL</span>
            <span className="hero-cine__scroll-line" />
          </span>

          <div className="hero-cine__actions hero-reveal">
            <a className="hero-btn hero-btn--primary" href="#work">
              <ArrowUpRight aria-hidden="true" />
              Explore Work
            </a>
            <a className="hero-btn hero-btn--ghost glass-pill" href="#contact">
              {"Let's Talk"}
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
