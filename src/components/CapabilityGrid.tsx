import { motion, useReducedMotion } from "framer-motion"
import { capabilities } from "../data/portfolio"

export function CapabilityGrid() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="capability-grid">
      {capabilities.map((capability, index) => (
        <motion.article
          className="capability-card"
          key={capability.name}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          whileHover={prefersReducedMotion ? undefined : { y: -4 }}
        >
          <div className="capability-card__topline">
            <span>{capability.index} / 04</span>
            <span className="capability-card__signal" aria-hidden="true" />
          </div>
          <h3>{capability.name}</h3>
          <p>{capability.detail}</p>
          <span className="capability-card__line" aria-hidden="true" />
        </motion.article>
      ))}
    </div>
  )
}
