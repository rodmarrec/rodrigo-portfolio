import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { events, cities, COLORS, GRID_START, GRID_END, MONTHS } from '../data/lifeData'
import './LifeCalendar.css'

const WEEKS = 4

function toMIdx(year, month) {
  return (year - GRID_START.year) * 12 + (month - GRID_START.month)
}
function totalMonths() {
  return toMIdx(GRID_END.year, GRID_END.month)
}

function cityAtM(mIdx) {
  for (let i = cities.length - 1; i >= 0; i--) {
    const c = cities[i]
    const s = toMIdx(c.start.year, c.start.month)
    const e = c.end ? toMIdx(c.end.year, c.end.month) : 99999
    if (mIdx >= s && mIdx < e) return c
  }
  return null
}

function eraAtM(mIdx) {
  let era = null
  for (const ev of events) {
    if (ev.type !== 'era' && ev.type !== 'overlay') continue
    const s = toMIdx(ev.start.year, ev.start.month)
    const e = ev.end ? toMIdx(ev.end.year, ev.end.month) : 99999
    if (mIdx >= s && mIdx < e) {
      if (ev.type === 'overlay') return ev
      if (!era) era = ev
    }
  }
  return era
}

function milestoneAtM(mIdx) {
  for (const ev of events) {
    if (ev.type !== 'milestone') continue
    const s = toMIdx(ev.start.year, ev.start.month)
    if (s === mIdx) return ev
  }
  return null
}

function sublabelAtM(mIdx) {
  for (const ev of events) {
    if (ev.type !== 'sublabel') continue
    const s = toMIdx(ev.start.year, ev.start.month)
    const e = toMIdx(ev.end.year, ev.end.month)
    if (mIdx >= s && mIdx <= e) return ev
  }
  return null
}

function eraStartAtM(mIdx) {
  for (const ev of events) {
    if (ev.type !== 'era' || !ev.label) continue
    if (toMIdx(ev.start.year, ev.start.month) === mIdx) return ev
  }
  return null
}

// Fill gaps with childhood color
function getFillColor(mIdx, era) {
  if (era) return era.color
  // Is this month within the overall life span?
  const lifeStart = toMIdx(GRID_START.year, GRID_START.month)
  if (mIdx >= lifeStart) return COLORS.childhood
  return 'rgba(255,255,255,0.03)'
}

function getYears() {
  const years = []
  for (let y = GRID_START.year; y <= GRID_END.year; y++) years.push(y)
  return years
}

const legendItems = [
  { label: 'Childhood',    color: COLORS.childhood },
  { label: 'School',       color: COLORS.school },
  { label: 'UH · BARCH',  color: COLORS.uh },
  { label: 'Architecture', color: COLORS.architecture },
  { label: 'WeWork',       color: COLORS.wework },
  { label: 'Netflix',      color: COLORS.netflix },
  { label: 'People Inc.',  color: COLORS.peopleinc },
  { label: 'Apple',        color: COLORS.apple },
  { label: 'Unemployment', color: COLORS.unemployment },
  { label: 'COVID',        color: COLORS.covid },
  { label: 'Milestone',    color: COLORS.milestone },
]

export default function LifeCalendar() {
  const [tooltip, setTooltip] = useState(null)
  const years = getYears()

  const rows = useMemo(() => {
    return years.map(year => {
      const isFirstYear = year === GRID_START.year
      const isLastYear = year === GRID_END.year
      const startMonth = isFirstYear ? GRID_START.month : 1
      const endMonth = isLastYear ? GRID_END.month : 12

      const months = []
      for (let m = 1; m <= 12; m++) {
        const mIdx = toMIdx(year, m)
        const inRange = m >= startMonth && m <= endMonth
        const era = inRange ? eraAtM(mIdx) : null
        const bg = inRange ? getFillColor(mIdx, era) : null
        const milestone = inRange ? milestoneAtM(mIdx) : null
        const sublabel = inRange ? sublabelAtM(mIdx) : null
        const eraStart = inRange ? eraStartAtM(mIdx) : null

        months.push({
          m, mIdx, inRange, bg, era, milestone, sublabel, eraStart,
        })
      }

      const mIdx0 = toMIdx(year, startMonth)
      const city = cityAtM(mIdx0)

      return { year, months, city }
    })
  }, [])

  function buildTooltip(cell) {
    const lines = []
    if (cell.milestone) lines.push(`${cell.milestone.emoji} ${cell.milestone.label}`)
    if (cell.sublabel) lines.push(cell.sublabel.label)
    if (cell.era?.label) lines.push(cell.era.label)
    return lines.filter(Boolean)
  }

  const darkBgColors = ['#ef4444','#2dd4bf','#a78bfa','#c084fc','#94a3b8','#4ade80','#f472b6','#facc15','#fb923c']
  function labelColor(bg) {
    if (!bg) return 'rgba(255,255,255,0.9)'
    return darkBgColors.some(c => bg.startsWith(c)) ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.75)'
  }

  return (
    <div className="lc-page">
      <div className="bg-grid" />
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />

      <motion.div className="lc-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link to="/" className="lc-back">← Back to portfolio</Link>
        <div className="lc-eyebrow">Life in Weeks</div>
        <h1 className="lc-title">Rodrigo's Life Calendar</h1>
        <p className="lc-sub">Every week since June 1989 — cities, careers, milestones, and everything in between.</p>
      </motion.div>

      <motion.div className="lc-legend" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.15 }}>
        {legendItems.map(item => (
          <div key={item.label} className="lc-legend-item">
            <span className="lc-legend-dot" style={{ background: item.color }} />
            <span className="lc-legend-label">{item.label}</span>
          </div>
        ))}
        <div className="lc-legend-item">
          <span className="lc-legend-city" />
          <span className="lc-legend-label">City (left bar)</span>
        </div>
      </motion.div>

      <motion.div className="lc-grid-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}>

        {/* Month header row */}
        <div className="lc-header-row">
          <div className="lc-row-left" />
          {MONTHS.map(m => (
            <div key={m} className="lc-month-col">
              <span className="lc-month-label">{m}</span>
              <div className="lc-month-weeks">
                {[0,1,2,3].map(w => <div key={w} className="lc-week-header" />)}
              </div>
            </div>
          ))}
        </div>

        {/* Year rows */}
        {rows.map(row => (
          <div key={row.year} className="lc-row">
            <div className="lc-row-left">
              <div className="lc-city-bar" style={{ background: row.city?.color || 'rgba(255,255,255,0.1)' }} />
              <span className="lc-year-label">{row.year}</span>
            </div>

            {row.months.map(cell => (
              <div key={cell.m} className="lc-month-col">
                <div className="lc-month-weeks">
                  {[0,1,2,3].map(w => {
                    if (!cell.inRange) return <div key={w} className="lc-week lc-week-void" />
                    const isFirst = w === 0
                    const tips = isFirst ? buildTooltip(cell) : []
                    const showMilestone = isFirst && cell.milestone
                    const showLabel = isFirst && !showMilestone && cell.eraStart?.label
                    const showSublabel = isFirst && !showMilestone && !showLabel && cell.sublabel

                    return (
                      <div
                        key={w}
                        className={`lc-week${showMilestone ? ' lc-milestone-cell' : ''}${cell.sublabel ? ' lc-sublabel-cell' : ''}`}
                        style={{ background: cell.bg }}
                        onMouseEnter={e => tips.length > 0 && setTooltip({ x: e.clientX, y: e.clientY, lines: tips })}
                        onMouseMove={e => tips.length > 0 && setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : null)}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        {showMilestone && <span className="lc-emoji">{cell.milestone.emoji}</span>}
                        {showLabel && <span className="lc-era-label" style={{ color: labelColor(cell.bg) }}>{cell.eraStart.label}</span>}
                        {showSublabel && <span className="lc-era-label" style={{ color: 'rgba(255,255,255,0.95)' }}>{cell.sublabel.label}</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>

      {tooltip && (
        <div className="lc-tooltip" style={{ left: tooltip.x + 16, top: tooltip.y - 16 }}>
          {tooltip.lines.map((line, i) => (
            <div key={i} className={`lc-tip-line${i === 0 ? ' lc-tip-primary' : ''}`}>{line}</div>
          ))}
        </div>
      )}
    </div>
  )
}
