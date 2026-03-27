import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

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

      <div className="header-nav">
        <Link to="/life" className="header-nav-link">
          Life Calendar →
        </Link>
      </div>
    </motion.header>
  )
}
