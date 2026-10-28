import { useId, useState } from "react"
import { Activity, Network, ShieldCheck, Terminal, type LucideIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import type { PortfolioProject } from "../data/portfolio"

const visualIcons: Record<PortfolioProject["visual"], LucideIcon> = {
  signal: Network,
  shield: ShieldCheck,
  automation: Terminal,
  response: Activity,
}

type ProjectCardProps = {
  project: PortfolioProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const generatedId = useId()
  const triggerId = `${generatedId}-trigger`
  const detailsId = `${generatedId}-details`
  const prefersReducedMotion = useReducedMotion()
  const VisualIcon = visualIcons[project.visual]

  return (
    <motion.article
      className={`project-card project-card--${project.visual}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
    >
      <div className="project-card__art" aria-hidden="true">
        <div className="project-art__frame">
          <div className="project-art__topline">
            <span>BH / FIELD SYSTEM</span>
            <span>{project.index.replace("CASE ", "")}</span>
          </div>
          <div className="project-art__graphic">
            <span className="project-art__orbit project-art__orbit--one" />
            <span className="project-art__orbit project-art__orbit--two" />
            <span className="project-art__crosshair project-art__crosshair--one" />
            <span className="project-art__crosshair project-art__crosshair--two" />
            <span className="project-art__icon">
              <VisualIcon strokeWidth={1.15} />
            </span>
            <span className="project-art__core" />
          </div>
          <div className="project-art__readout">
            <span>{project.discipline}</span>
            <span className="project-art__signal-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>
        <span className="project-art__index">{project.index}</span>
      </div>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.index}</span>
          <span>{project.discipline}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <div className="project-card__tags">
          {project.focus.slice(0, 2).map((focus) => (
            <span key={focus}>{focus}</span>
          ))}
        </div>
        <button
          className="project-card__toggle"
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={detailsId}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span>{isOpen ? "CLOSE CASE FILE" : "OPEN CASE FILE"}</span>
          <span className="project-card__toggle-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <motion.div
        className="project-card__details"
        id={detailsId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="project-card__details-inner">
          <p className="project-card__details-label">PROJECT INTENT</p>
          <p className="project-card__brief">{project.brief}</p>
          <div className="project-card__details-focus">
            {project.focus.map((focus) => (
              <span key={focus}>{focus}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}
