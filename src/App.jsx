import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import ProjectCard from './components/ProjectCard'
import ProjectModal from './components/ProjectModal'
import Bio from './components/Bio'
import CursorGlow from './components/CursorGlow'
import './App.css'

export const projects = [
  {
    id: 1,
    title: 'Last Transmission',
    description: 'A solo branching narrative game built entirely in Airtable — 493 unique story paths carved through a single interface using AI-powered fields and logic.',
    tags: ['Gaming'],
    embed: 'https://airtable.com/embed/appA1vgLoApdC9wL1/shrK7dwmjDTJgoX0V',
    tooling: 'Claude.ai + Airtable MCP, Claude Code, AI Fields',
    inProgress: false,
    group: null,
    screenshot: '/assets/last-transmission.png',
  },
  {
    id: 2,
    title: 'Base Hub',
    description: "Mission control for Rodrigo's Airtable universe. 25 nodes registered across 8 classifications — track what's active, what's archived, and what each base was built to do.",
    tags: ['Dashboard'],
    embed: 'https://airtable.com/embed/appS9d0XHoJeUFGMi/shrCVIkigswaHQLJe',
    tooling: 'Claude.ai + Airtable MCP',
    inProgress: false,
    group: null,
    screenshot: '/assets/Base_Hub.png',
  },
  {
    id: 3,
    title: 'Travel Arcade',
    description: 'A personal travel dashboard with an interactive map pinning every city visited — part stats tracker, part adventure log, with more on the way.',
    tags: ['Dashboard', 'Personal'],
    embed: 'https://airtable.com/embed/appUPoynAZFuEkDPo/shr05BxICu5duq4Dl',
    tooling: 'Claude.ai + Airtable MCP, Omni',
    inProgress: true,
    group: null,
    screenshot: '/assets/travel-arcade.png',
  },
  {
    id: 4,
    title: 'Gamified Habit Tracker',
    description: 'A neon-lit dashboard that turns daily habits into a visual game — track streaks, spot patterns, and measure progress across custom habits by day, month, and all time.',
    tags: ['Dashboard', 'Personal'],
    embed: 'https://airtable.com/embed/appVyoQ9indNlFJ8Q/shrcffXwnztIM2fUk',
    tooling: 'Claude.ai + Airtable MCP, Omni',
    inProgress: false,
    group: null,
    screenshot: '/assets/habit-tracker.png',
  },
  {
    id: 5,
    title: 'FPL Engine · Player Stats',
    description: 'A full FPL player stats explorer wrapped in a disco-neon theme — filter by team, position, or player name to dig into the numbers that matter.',
    tags: ['Sports', 'Dashboard'],
    embed: 'https://airtable.com/embed/app2Ut7BDlgn1GR5F/shrXnU2se5YGi16cJ',
    tooling: 'Airtable',
    inProgress: false,
    group: 'FPL Engine',
    groupIndex: 2,
    screenshot: '/assets/fpl-stats.png',
  },
  {
    id: 6,
    title: 'FPL Engine · Player Form',
    description: 'Tracks Fantasy Premier League player form over time — compare current form against season averages, organized by club, to give your transfers an edge.',
    tags: ['Sports', 'Dashboard'],
    embed: 'https://airtable.com/embed/app2Ut7BDlgn1GR5F/shr0tEOzrWBNxgrJz',
    tooling: 'Airtable',
    inProgress: false,
    group: 'FPL Engine',
    groupIndex: 1,
    screenshot: '/assets/fpl-form.png',
  },
  {
    id: 7,
    title: 'Heroscape Card Index · Dark',
    description: "A searchable card explorer for Heroscape — browse all 72 units by species, sort by attack, defense, move, and range, and dig into every card's stats and abilities.",
    tags: ['Gaming', 'Dashboard'],
    embed: 'https://airtable.com/embed/appwlovPBiGH0aj7S/shrSKgxrGhO6KP1db',
    tooling: 'Airtable',
    inProgress: false,
    group: 'Heroscape Card Index',
    groupIndex: 1,
    screenshot: '/assets/heroscape-dark.png',
  },
  {
    id: 8,
    title: 'Heroscape Card Index · Light',
    description: "A searchable card explorer for Heroscape — browse all 72 units by species, sort by attack, defense, move, and range, and dig into every card's stats and abilities.",
    tags: ['Gaming', 'Dashboard'],
    embed: 'https://airtable.com/embed/appwlovPBiGH0aj7S/shriZGFXjY0lmkQZV',
    tooling: 'Airtable',
    inProgress: false,
    group: 'Heroscape Card Index',
    groupIndex: 2,
    screenshot: '/assets/heroscape-light.png',
  },
]

const allTags = ['All', 'Dashboard', 'Gaming', 'Personal', 'Sports']

export default function App() {
  const [activeTag, setActiveTag] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const gridRef = useRef(null)

  const filtered = activeTag === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeTag))

  const counts = useMemo(() => {
    const c = { All: projects.length }
    allTags.slice(1).forEach(tag => {
      c[tag] = projects.filter(p => p.tags.includes(tag)).length
    })
    return c
  }, [])

  const handleTagSelect = (tag) => {
    setActiveTag(tag)
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div className="app">
      <div className="bg-grid" />
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />
      <div className="bg-glow glow-3" />
      <CursorGlow />

      <Header />
      <Bio />

      <main className="main">
        <FilterBar
          tags={allTags}
          activeTag={activeTag}
          onSelect={handleTagSelect}
          counts={counts}
        />

        <div ref={gridRef} style={{ scrollMarginTop: '80px' }}>
          <motion.div className="grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <footer className="footer">
        <span>Rodrigo · Interface Studio</span>
        <span className="footer-dot">·</span>
        <a
          href="https://www.linkedin.com/in/rodrigo-marron/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          LinkedIn
        </a>
        <span className="footer-dot">·</span>
        <span>Built with Airtable + Claude</span>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
