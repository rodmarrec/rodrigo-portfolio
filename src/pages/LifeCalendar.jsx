import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { events, cities, COLORS, GRID_START, GRID_END, MONTHS } from '../data/lifeData'
import './LifeCalendar.css'

function toIdx(year, month) {
  return (year - GRID_START.year) * 12 + (month - GRID_START.month)
}
function totalMonths() {
  return toIdx(GRID_END.year, GRID_END.month)
}
function getYears() {
  const years = []
  for (let y = GRID_START.year; y <= GRID_END.year; y++) years.push(y)
  return years
}

function cityAt(idx) {
  for (let i = cities.length - 1; i >= 0; i--) {
    const c = cities[i]
    const s = toIdx(c.start.year, c.start.month)
    const e = c.end ? toIdx(c.end.year, c.end.month) : totalMonths() + 1
    if (idx >= s && idx < e) return c
  }
  return null
}

function eraAt(idx) {
  let era = null
  for (const ev of events) {
    if (ev.type !== 'era' && ev.type !== 'overlay') continue
    const s = toIdx(ev.start.year, ev.start.month)
    const e = ev.end ? toIdx(ev.end.year, ev.end.month) : totalMonths() + 1
    if (idx >= s && idx < e) {
      if (ev.type === 'overlay') return ev
      if (!era) era = ev
    }
  }
  return era
}

function milestonesAt(idx) {
  return events.filter(ev => ev.type === 'milestone' && toIdx(ev.start.year, ev.start.month) === idx)
}

function sublabelsAt(idx) {
  return events.filter(ev => {
    if (ev.type !== 'sublabel') return false
    const s = toIdx(ev.start.year, ev.start.month)
    const e = toIdx(ev.end.year, ev.end.month)
    return idx >= s && idx <= e
  })
}

// Era label: show at the start month of each era
function eraLabelAt(idx) {
  return events.find(ev => {
    if (ev.type !== 'era' || !ev.label) return false
    return toIdx(ev.start.year, ev.start.month) === idx
  })
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
  const total = totalMonths()

  const cells = useMemo(() => {
    const result = []
    for (let i = 0; i < total; i++) {
      const absMonth = GRID_START.month - 1 + i
      const year = GRID_START.year + Math.floor(absMonth / 12)
      const month = (absMonth % 12) + 1
      result.push({
        i, year, month,
        city: cityAt(i),
        era: eraAt(i),
        milestones: milestonesAt(i),
        sublabels: sublabelsAt(i),
        eraLabel: eraLabelAt(i),
      })
    }
    return result
  }, [])

  const byYear = useMemo(() => {
    const map = {}
    for (const cell of cells) {
      if (!map[cell.year]) map[cell.year] = []
      map[cell.year].push(cell)
    }
    return map
  }, [cells])

  function buildTooltip(cell) {
    const lines = []
    if (cell.era) lines.push(cell.era.label || '')
    cell.sublabels.forEach(s => lines.push(s.label))
    cell.milestones.forEach(m => lines.push(`${m.emoji} ${m.label}`))
    if (cell.city) lines.push(`📍 ${cell.city.label}`)
    return lines.filter(Boolean)
  }

  return (
    <div className="lc-page">
      <div className="bg-grid" />
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />

      <motion.div className="lc-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link to="/" className="lc-back">← Back to portfolio</Link>
        <div className="lc-eyebrow">Life in Months</div>
        <h1 className="lc-title">Rodrigo's Life Calendar</h1>
        <p className="lc-sub">Every month since June 1989 — cities, careers, milestones, and everything in between.</p>
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
        {/* Month headers */}
        <div className="lc-month-headers">
          <div className="lc-row-prefix" />
          {MONTHS.map(m => (
            <div key={m} className="lc-month-header">{m}</div>
          ))}
        </div>

        {years.map(year => {
          const rowCells = byYear[year]
          if (!rowCells || rowCells.length === 0) return null

          // City bar: gradient if city changes mid-year
          const uniqueCities = [...new Set(rowCells.map(c => c.city?.color).filter(Boolean))]
          const cityBarStyle = uniqueCities.length > 1
            ? { background: `linear-gradient(to bottom, ${uniqueCities[0]}, ${uniqueCities[uniqueCities.length - 1]})` }
            : { background: uniqueCities[0] || 'transparent' }

          const startMonth = rowCells[0].month
          const endMonth = rowCells[rowCells.length - 1].month

          return (
            <div key={year} className="lc-row">
              {/* Year label + city bar */}
              <div className="lc-row-prefix">
                <div className="lc-city-bar" style={cityBarStyle} />
                <div className="lc-year-label">{year}</div>
              </div>

              {/* Pad start */}
              {startMonth > 1 && Array.from({ length: startMonth - 1 }).map((_, pi) => (
                <div key={`ps-${pi}`} className="lc-cell" style={{ background: 'rgba(255,255,255,0.02)' }} />
              ))}

              {rowCells.map(cell => {
                const bg = cell.era ? cell.era.color : 'rgba(255,255,255,0.04)'
                const hasMilestone = cell.milestones.length > 0
                const hasSublabel = cell.sublabels.length > 0
                const showEraLabel = cell.eraLabel && cell.eraLabel.label
                const tips = buildTooltip(cell)
                const isSublabelStart = hasSublabel && toIdx(cell.sublabels[0].start.year, cell.sublabels[0].start.month) === cell.i

                return (
                  <div
                    key={cell.i}
                    className={`lc-cell${hasMilestone ? ' lc-has-milestone' : ''}${hasSublabel ? ' lc-has-sublabel' : ''}`}
                    style={{ background: bg }}
                    onMouseEnter={e => tips.length > 0 && setTooltip({ x: e.clientX, y: e.clientY, lines: tips })}
                    onMouseMove={e => tips.length > 0 && setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : null)}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {hasMilestone && (
                      <span className="lc-emoji">{cell.milestones[0].emoji}</span>
                    )}
                    {!hasMilestone && showEraLabel && (
                      <span className="lc-era-label">{cell.eraLabel.label}</span>
                    )}
                    {!hasMilestone && !showEraLabel && hasSublabel && isSublabelStart && (
                      <span className="lc-sublabel">{cell.sublabels[0].label}</span>
                    )}
                  </div>
                )
              })}

              {/* Pad end */}
              {endMonth < 12 && Array.from({ length: 12 - endMonth }).map((_, pi) => (
                <div key={`pe-${pi}`} className="lc-cell" style={{ background: 'rgba(255,255,255,0.02)' }} />
              ))}
            </div>
          )
        })}
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
