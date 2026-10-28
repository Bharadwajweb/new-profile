import { ArrowUpRight } from "lucide-react"
import {
  certifications,
  education,
  experiences,
  languages,
  relevantCoursework,
} from "../data/portfolio"
import { SectionLabel } from "./SectionLabel"

export function ExperienceSection() {
  return (
    <section
      className="experience-section page-shell"
      id="experience"
      aria-labelledby="experience-title"
    >
      <SectionLabel index="02" label="EXPERIENCE & EDUCATION" note="2023—2027" />

      <div className="section-intro experience-intro">
        <h2 className="section-title js-scroll-reveal" id="experience-title">
          Learned by
          <br />
          <em>building.</em>
        </h2>
        <p className="section-intro__copy js-scroll-reveal">
          Practical experience across cybersecurity operations and full-stack development, alongside
          a computer science degree focused on cybersecurity.
        </p>
      </div>

      <div className="experience-layout">
        <div className="experience-column">
          <p className="experience-column__label">INTERNSHIP EXPERIENCE</p>
          <div className="experience-list">
            {experiences.map((item) => (
              <article className="experience-item js-scroll-reveal" key={item.organization}>
                <div>
                  <div className="experience-item__heading">
                    <h3>{item.role}</h3>
                    <span>{item.period}</span>
                  </div>
                  <p className="experience-item__organization">
                    {item.organization} <span aria-hidden="true">/</span> {item.location}
                  </p>
                  <p className="experience-item__summary">{item.summary}</p>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>

        <aside className="education-card js-scroll-reveal" aria-label="Education">
          <p className="education-card__label">EDUCATION / CURRENT</p>
          <h3>{education.degree}</h3>
          <p className="education-card__institution">{education.institution}</p>
          <div className="education-card__meta">
            <span>{education.location}</span>
            <span>{education.period}</span>
          </div>
        </aside>
      </div>

      <div className="experience-credentials">
        <div className="credentials-group js-scroll-reveal">
          <p className="credentials-group__label">CERTIFICATIONS</p>
          <div className="credentials-list">
            {certifications.map((certification) => (
              <span key={certification}>{certification}</span>
            ))}
          </div>
        </div>
        <div className="credentials-group js-scroll-reveal">
          <p className="credentials-group__label">RELEVANT COURSEWORK</p>
          <div className="credentials-list">
            {relevantCoursework.map((course) => (
              <span key={course}>{course}</span>
            ))}
          </div>
        </div>
        <div className="credentials-group js-scroll-reveal">
          <p className="credentials-group__label">LANGUAGES</p>
          <div className="credentials-list">
            {languages.map((language) => (
              <span key={language}>{language}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
