import { useLayoutEffect, useRef, type RefObject } from "react"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useReducedMotion } from "framer-motion"
import { CapabilityGrid } from "./CapabilityGrid"
import { ExperienceSection } from "./ExperienceSection"
import { HeroSection } from "./HeroSection"
import { ManifestoSection } from "./ManifestoSection"
import { ParticlePortrait } from "./ParticlePortrait"
import { ProjectCard } from "./ProjectCard"
import { SectionLabel } from "./SectionLabel"
import {
  additionalProjects,
  contactEmail,
  methodology,
  profile,
  projects,
  socialLinks,
  toolkit,
} from "../data/portfolio"

gsap.registerPlugin(ScrollTrigger)

type PortfolioPageProps = {
  mainRef: RefObject<HTMLElement | null>
  isActive: boolean
}

export function PortfolioPage({ mainRef, isActive }: PortfolioPageProps) {
  const pageRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const context = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".js-scroll-reveal", page)

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(elements, { autoAlpha: 1, y: 0 })
        return
      }

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        )
      })
    }, page)

    return () => context.revert()
  }, [])

  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent("Cybersecurity collaboration")}`

  return (
    <main
      ref={(node) => {
        pageRef.current = node
        if (mainRef) mainRef.current = node
      }}
      className="site-page min-h-screen bg-[#0b0b0c] text-[#eceee8] antialiased selection:bg-[#ff4838] selection:text-[#0b0b0c]"
      id="top"
      tabIndex={-1}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      <div className="site-backdrop" aria-hidden="true" />
      <header className="site-header">
        <div className="site-header__inner page-shell">
          <a className="site-brand" href="#top" aria-label="Bharadwaj M, back to top">
            <span className="site-brand__monogram" aria-hidden="true">
              BM<span>.</span>
            </span>
            <span className="site-brand__descriptor">CYBERSECURITY<br />PORTFOLIO</span>
          </a>

          <nav className="site-nav" aria-label="Main navigation">
            <a href="#about">Profile</a>
            <a href="#experience">Experience</a>
            <a href="#capabilities">Skills</a>
            <a href="#work">Projects</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="site-header__status">
            <span className="status-indicator" aria-hidden="true" />
            <span>{profile.location.toUpperCase()}</span>
          </div>
        </div>
      </header>

      <HeroSection isActive={isActive} />

      <ManifestoSection />

      <section className="about-section page-shell" id="about" aria-labelledby="about-title">
        <SectionLabel index="01" label="POINT OF VIEW" note="THE WHY" />
        <div className="about-layout">
          <div className="about-heading js-scroll-reveal">
            <h2 id="about-title">
              Computer science.
              <br />
              <em>Security in practice.</em>
            </h2>
            <div
              className="about-portrait glass-panel"
              role="img"
              aria-label="A portrait of Bharadwaj M formed by a live particle canvas"
            >
              <ParticlePortrait phase="hold" className="about-portrait__canvas" />
              <span className="about-portrait__label" aria-hidden="true">FIG. 01 / BHARADWAJ M</span>
            </div>
          </div>
          <div className="about-copy js-scroll-reveal">
            <p>{profile.summary}</p>
            <p>{profile.objective}</p>
            <div className="about-signature">
              <span className="about-signature__rule" aria-hidden="true" />
              <span>HINDUSTAN UNIVERSITY / B.TECH 2023—2027</span>
            </div>
          </div>
        </div>
        <div className="about-footnote js-scroll-reveal">
          <span>OPERATING PRINCIPLE</span>
          <p>Assume nothing. Validate everything.</p>
          <span className="about-footnote__mark" aria-hidden="true">01—05</span>
        </div>
      </section>

      <ExperienceSection />

      <section
        className="capabilities-section page-shell"
        id="capabilities"
        aria-labelledby="capabilities-title"
      >
        <SectionLabel index="03" label="TOOLS & SIGNALS" note="THE HOW" />
        <div className="section-intro">
          <h2 className="section-title js-scroll-reveal" id="capabilities-title">
            Get close to
            <br />
            <em>the signal.</em>
          </h2>
          <p className="section-intro__copy js-scroll-reveal">
            A practical toolkit drawn from cybersecurity coursework, internships, and hands-on
            projects.
          </p>
        </div>
        <CapabilityGrid />
        <div className="toolkit-strip" aria-label="Additional security tools">
          <span className="toolkit-strip__label">ALSO WORKING WITH</span>
          <div className="toolkit-strip__items">
            {toolkit.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>
        <p className="capabilities-footnote">
          <span className="capabilities-footnote__dot" aria-hidden="true" />
          TOOLING IS A MEANS. CONTEXT IS THE ADVANTAGE.
        </p>
      </section>

      <section className="work-section page-shell" id="work" aria-labelledby="work-title">
        <SectionLabel index="04" label="SELECTED WORK" note="3 PROJECTS / 1 CONCEPT" />
        <div className="section-intro section-intro--work">
          <h2 className="section-title js-scroll-reveal" id="work-title">
            Built for the
            <br />
            <em>moments that matter.</em>
          </h2>
          <p className="section-intro__copy js-scroll-reveal">
            Résumé-backed work in AI threat detection, security automation, and ransomware response,
              and coordinated incident response.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="project-archive js-scroll-reveal">
          <p className="project-archive__label">ADDITIONAL BUILDS / 02</p>
          <div className="project-archive__grid">
            {additionalProjects.map((project) => (
              <article className="project-archive__item" key={project.slug}>
                <div className="project-archive__meta">
                  <span>{project.discipline}</span>
                  <ArrowUpRight aria-hidden="true" />
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="method-section page-shell" id="approach" aria-labelledby="method-title">
        <SectionLabel index="05" label="METHOD" note="REPEATABLE BY DESIGN" />
        <div className="method-layout">
          <div className="method-intro js-scroll-reveal">
            <h2 className="section-title" id="method-title">
              Clear signals.
              <br />
              <em>Deliberate action.</em>
            </h2>
            <p>
              A steady process turns security work into decisions teams can understand and act on.
            </p>
          </div>
          <div className="method-list">
            {methodology.map((step) => (
              <article className="method-step js-scroll-reveal" key={step.index}>
                <span className="method-step__index">{step.index}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="contact-section page-shell" id="contact" aria-labelledby="contact-title">
        <div className="contact-section__topline">
          <span>OPEN CHANNEL / CONTACT</span>
          <span>{profile.location.toUpperCase()} / BHARADWAJ M</span>
        </div>
        <div className="contact-layout">
          <div className="contact-copy js-scroll-reveal">
            <p className="contact-copy__eyebrow">CHENNAI / SOC ANALYST · SECURITY ANALYST · VAPT</p>
            <h2 id="contact-title">
              Make the next
              <br />
              incident <em>smaller.</em>
            </h2>
          </div>
          <div className="contact-actions js-scroll-reveal">
            <motion.a
              className="contact-action"
              href={mailto}
              whileHover={prefersReducedMotion ? undefined : { x: 5 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <span>{contactEmail}</span>
              <ArrowUpRight aria-hidden="true" />
            </motion.a>
            <nav className="contact-links" aria-label="Professional profiles">
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <span>LINKEDIN</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                <span>GITHUB</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
        <div className="site-footer__bottom">
          <a className="site-footer__brand" href="#top" aria-label="Back to top">
            BM<span>.</span>
          </a>
          <span>B.TECH CSE / CYBERSECURITY</span>
          <a href="#top" className="site-footer__top-link">
            <span>BACK TO TOP</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </footer>
    </main>
  )
}
