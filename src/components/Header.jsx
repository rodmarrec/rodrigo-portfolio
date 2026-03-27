import { motion } from 'framer-motion'

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
          <span className="stat-num">8</span>
          <span className="stat-label">Interfaces</span>
        </div>
        <div className="stat">
          <span className="stat-num">6+</span>
          <span className="stat-label">Years of Airtable</span>
        </div>
        <div className="stat">
          <span className="stat-num">4</span>
          <span className="stat-label">Companies</span>
        </div>
        <div className="stat now-playing">
          <span className="now-dot" />
          <span className="stat-label">Never a quiet day in Airtable</span>
        </div>
      </div>
    </motion.header>
  )
}
