import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function ProjectModal({ project, onClose }) {
  const { title, description, tags, embed, tooling, group, groupIndex, inProgress } = project

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-eyebrow">
              {group ? `${group} · ${groupIndex}/2` : 'Interface'}
              {inProgress && <span style={{
                fontSize: 10,
                padding: '2px 8px',
                borderRadius: 100,
                background: 'rgba(255,107,157,0.15)',
                border: '1px solid rgba(255,107,157,0.35)',
                color: '#ff9ec0',
                letterSpacing: '0.1em',
              }}>IN PROGRESS</span>}
            </div>
            <h2 className="modal-title">{title}</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-embed">
          <iframe
            src={embed}
            frameBorder="0"
            title={title}
            allowFullScreen
          />
        </div>

        <div className="modal-meta">
          <div className="modal-tags">
            {tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <div className="modal-tooling">⚙ {tooling}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
