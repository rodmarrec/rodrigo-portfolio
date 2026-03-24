import { motion } from 'framer-motion'

const ICONS = {
  'Dashboard': '📊',
  'Game': '🎮',
  'Travel': '🗺️',
  'Sports': '⚽',
  'default': '⚡',
}

function getIcon(tags) {
  for (const tag of tags) {
    if (ICONS[tag]) return ICONS[tag]
  }
  return ICONS.default
}

export default function ProjectCard({ project, index, onClick }) {
  const { title, description, tags, screenshot, inProgress, group, groupIndex, tooling } = project

  return (
    <motion.article
      className="card"
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
    >
      <div className="card-thumb">
        {screenshot ? (
          <img src={screenshot} alt={title} />
        ) : (
          <div className="card-thumb-placeholder">
            <div className="thumb-grid" />
            <div className="thumb-icon">{getIcon(tags)}</div>
          </div>
        )}

        <div className="card-overlay">
          <span className="overlay-cta">View Interface</span>
        </div>

        <div className="card-badges">
          {group && (
            <span className="badge-group">{group} {groupIndex}/2</span>
          )}
          {inProgress && (
            <span className="badge-progress">In Progress</span>
          )}
        </div>
      </div>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-desc">{description}</p>
        <div className="card-tags">
          {tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="card-tooling">{tooling}</div>
      </div>
    </motion.article>
  )
}
