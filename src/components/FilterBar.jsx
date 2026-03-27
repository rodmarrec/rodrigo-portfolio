import { motion } from 'framer-motion'

export default function FilterBar({ tags, activeTag, onSelect, counts }) {
  return (
    <motion.div
      className="filter-bar"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {tags.map(tag => (
        <button
          key={tag}
          className={`filter-btn ${activeTag === tag ? 'active' : ''}`}
          onClick={() => onSelect(tag)}
        >
          {tag}
          {counts[tag] !== undefined && (
            <span className="filter-count">{counts[tag]}</span>
          )}
        </button>
      ))}
    </motion.div>
  )
}
