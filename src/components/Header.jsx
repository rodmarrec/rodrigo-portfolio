import { motion } from 'framer-motion'
import { projects } from '../App'

const allTags = new Set(projects.flatMap(p => p.tags))

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="header-eyebrow">Interface Studio</div>

      <h1 className="header-title">
        <span className="name">Rodrigo</span>
        <span className="studio">Interface Studio</span>
      </h1>

      <p className="header-sub">
        No-code interfaces built with Airtable + Claude —
        dashboards, games, trackers, and tools that make data feel alive.
      </p>

      <div className="header-stats">
        <div className="stat">
          <span className="stat-num">{projects.length}</span>
          <span className="stat-label">Interfaces</span>
        </div>
        <div className="stat">
          <span className="stat-num">{allTags.size}</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat">
          <span className="stat-num">493</span>
          <span className="stat-label">Story Paths</span>
        </div>
        <div className="stat">
          <span className="stat-num">∞</span>
          <span className="stat-label">More to come</span>
        </div>
      </div>
    </motion.header>
  )
}
