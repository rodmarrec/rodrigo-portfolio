import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <motion.button
      className="theme-toggle"
      onClick={onToggle}
      whileTap={{ scale: 0.92 }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
            className="theme-icon"
          >
            🌙
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -30 }}
            transition={{ duration: 0.2 }}
            className="theme-icon"
          >
            ☀️
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
