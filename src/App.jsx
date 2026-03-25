import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import ProjectCard from './components/ProjectCard'
import ProjectModal from './components/ProjectModal'
import './App.css'

export const projects = [
  {
    id: 1,
    title: 'Gamified Habit Tracker',
    description: 'A neon-lit dashboard that turns daily habits into a visual game — track streaks, spot patterns, and measure progress across custom habits by day, month, and all time.',
    tags: ['Dashboard', 'Habits', 'Gamification', 'Data Viz'],
    embed: 'https://airtable.com/embed/appVyoQ9indNlFJ8Q/shrcffXwnztIM2fUk',
    tooling: 'Claude.ai + Airtable MCP, Omni',
    inProgress: false,
    group: null,
    screenshot: null,
  },
  {
    id: 2,
    title: 'Last Transmission',
    description: 'A solo branching narrative game built entirely in Airtable — 493 unique story paths carved through a single interface using AI-powered fields and logic.',
    tags: ['Game', 'Interactive', 'AI', 'Storytelling'],
    embed: 'https://airtable.com/embed/appA1vgLoApdC9wL1/shrK7dwmjDTJgoX0V',
    tooling: 'Claude.ai + Airtable MCP, Claude Code, AI Fields',
    inProgress: false,
    group: null,
    screenshot: null,
  },
  {
    id: 3,
    title: 'Travel Arcade',
    description: 'A personal travel dashboard with an interactive map pinning every city visited — part stats tracker, part adventure log, with more on the way.',
    tags: ['Dashboard', 'Maps', 'Travel', 'Personal'],
    embed: 'https://airtable.com/embed/appUPoynAZFuEkDPo/shr05BxICu5duq4Dl',
    tooling: 'Claude.ai + Airtable MCP, Omni',
    inProgress: true,
    group: null,
    screenshot: null,
  },
  {
    id: 4,
    title: 'FPL Engine · Player Form',
    description: 'Tracks Fantasy Premier League player form over time — compare current form against season averages, organized by club, to give your transfers an edge.',
    tags: ['Sports', 'Fantasy', 'Dashboard', 'Analytics'],
    embed: 'https://airtable.com/embed/app2Ut7BDlgn1GR5F/shr0tEOzrWBNxgrJz',
    tooling: 'Airtable',
    inProgress: false,
    group: 'FPL Engine',
    groupIndex: 1,
    screenshot: null,
  },
  {
    id: 5,
    title: 'FPL Engine · Player Stats',
    description: 'A full FPL player stats explorer wrapped in a disco-neon theme — filter by team, position, or player name to dig into the numbers that matter.',
    tags: ['Sports', 'Fantasy', 'Dashboard', 'Search'],
    embed: 'https://airtable.com/embed/app2Ut7BDlgn1GR5F/shrXnU2se5YGi16cJ',
    tooling: 'Airtable',
    inProgress: false,
    group: 'FPL Engine',
    groupIndex: 2,
    screenshot: null,
  },
]

const allTags = ['All', ...new Set(projects.flatMap(p => p.tags))]

export default function App() {
  const [activeTag, setActiveTag] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeTag === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeTag))

  return (
    <div className="app">
      <div className="bg-grid" />
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />
      <div className="bg-glow glow-3" />

      <Header projectCount={projects.length} tagCount={new Set(projects.flatMap(p => p.tags)).size} />

      <main className="main">
        <FilterBar tags={allTags} activeTag={activeTag} onSelect={setActiveTag} />

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
      </main>

      <footer className="footer">
        <span>Rodrigo · Interface Studio</span>
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
