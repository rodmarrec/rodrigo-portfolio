import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { events, cities, COLORS, CITY_COLORS, GRID_START, GRID_END, MONTHS } from '../data/lifeData'
import './LifeCalendar.css'

// ─── Helpers ─────────────────────────────────────────────────────
function toMonthIndex(year, month) {
  return (year - GRID_START.year) * 12 + (month - GRID_START.month)
}

function totalMonths() {
  return toMonthIndex(GRID_END.year, GRID_END.month)
}

function getYears() {
  const years = []
  for (let y = GRID_START.year; y <= GRID_END.year; y++) years.push(y)
  return years
}

function cityAt(monthIdx) {
  const year = GRID_START.year + Math.floor((monthIdx + GRID_START.month - 1) / 12)
  const month = ((monthIdx + GRID_START.month - 1) % 12) + 1
  for (let i = cities.length - 1; i >= 0; i--) {
    const c = cities[i]
    const s = toMonthIndex(c.start.year, c.start.month)
    const e = c.end ? toMonthIndex(c.end.year, c.end.month) : totalMonths() + 1
    if (monthIdx >= s && monthIdx < e) return c
  }
  return null
}

function eraAt(monthIdx) {
  // priority: overlay > era > null
  let found = null
  for (const ev of events) {
    if (ev.type !== 'era' && ev.type !== 'overlay') continue
    const s = toMonthIndex(ev.start.year, ev.start.month)
    const e = ev.end ? toMonthIndex(ev.end.year, ev.end.month) : totalMonths() + 1
    if (monthIdx >= s && monthIdx < e) {
      if (ev.type === 'overlay') return ev
      if (!found) found = ev
    }
  }
  return found
}

function milestonesAt(monthIdx) {
  return events.filter(ev => {
    if (ev.type !== 'milestone') return false
    const s = toMonthIndex(ev.start.year, ev.start.month)
    return monthIdx === s
  })
}

function sublabelsAt(monthIdx) {
  return events.filter(ev => {
    if (ev.type !== 'sublabel') return false
    const s = toMonthIndex(ev.start.year, ev.start.month)
    const e = toMonthIndex(ev.end.year, ev.end.month)
    return monthIdx >= s && monthIdx <= e
  })
}

function isSubLabelStart(ev, monthIdx) {
  return toMonthIndex(ev.start.year, ev.start.month) === monthIdx
}

function isSubLabelEnd(ev, monthIdx) {
  return toMonthIndex(ev.end.year, ev.end.month) === monthIdx
}

// ─── Legend ──────────────────────────────────────────────────────
const legendItems = [
  { label: 'Childhood',       color: COLORS.childhood },
  { label: 'School',          color: COLORS.school },
  { label: 'UH · BARCH',     color: COLORS.uh },
  { label: 'Architecture',    color: COLORS.architecture },
  { label: 'WeWork',          color: COLORS.wework },
  { label: 'Netflix',         color: COLORS.netflix },
  { label: 'People Inc.',     color: COLORS.peopleinc },
  { label: 'Apple',           color: COLORS.apple },
  { label: 'Unemployment',    color: COLORS.unemployment },
  { label: 'COVID',           color: COLORS.covid },
  { label: 'Milestone',       color: COLORS.milestone },
]

// ─── Component ───────────────────────────────────────────────────
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
      const city = cityAt(i)
      const era = eraAt(i)
      const milestones = milestonesAt(i)
      const sublabels = sublabelsAt(i)
      result.push({ i, year, month, city, era, milestones, sublabels })
    }
    return result
  }, [])

  // Group cells by year
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
    if (cell.era) lines.push(cell.era.label)
    cell.sublabels.forEach(s => lines.push(s.label))
    cell.milestones.forEach(m => lines.push(`${m.emoji} ${m.label}`))
    if (cell.city) lines.push(`📍 ${cell.city.label}`)
    return lines
  }

  return (
    <div className="lc-page">
      <div className="bg-grid" />
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />

      <motion.div
        className="lc-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a href="/" className="lc-back">← Back to portfolio</a>
        <div className="lc-eyebrow">Life in Months</div>
        <h1 className="lc-title">Rodrigo's Life Calendar</h1>
        <p className="lc-sub">Every month since June 1989 — cities, careers, milestones, and everything in between.</p>
      </motion.div>

      <motion.div
        className="lc-legend"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
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

      <motion.div
        className="lc-grid-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Month headers */}
        <div className="lc-month-headers">
          <div className="lc-year-label-spacer" />
          <div className="lc-city-spacer" />
          {MONTHS.map(m => (
            <div key={m} className="lc-month-header">{m}</div>
          ))}
        </div>

        {/* Rows */}
        {years.map(year => {
          const rowCells = byYear[year]
          if (!rowCells || rowCells.length === 0) return null

          // City band for this row — use first cell's city color for the left bar gradient
          const firstCity = rowCells[0]?.city
          const lastCity = rowCells[rowCells.length - 1]?.city
          const cityGrad = firstCity && lastCity && firstCity.id !== lastCity.id
            ? `linear-gradient(to right, ${firstCity.color}, ${lastCity.color})`
            : firstCity ? firstCity.color : 'transparent'

          return (
            <div key={year} className="lc-row">
              <div className="lc-year-label">{year}</div>
              <div className="lc-city-bar" style={{ background: cityGrad }} title={firstCity?.label} />
              {/* Pad empty months at start of 1989 */}
              {rowCells[0]?.month > 1 && Array.from({ length: rowCells[0].month - 1 }).map((_, pi) => (
                <div key={`pad-${pi}`} className="lc-cell lc-cell-empty" />
              ))}
              {rowCells.map(cell => {
                const bg = cell.era ? cell.era.color : 'rgba(255,255,255,0.03)'
                const hasMilestone = cell.milestones.length > 0
                const hasSublabel = cell.sublabels.length > 0
                const tips = buildTooltip(cell)

                return (
                  <div
                    key={cell.i}
                    className={`lc-cell ${hasMilestone ? 'lc-cell-milestone' : ''} ${hasSublabel ? 'lc-cell-sublabel' : ''}`}
                    style={{ background: bg }}
                    onMouseEnter={(e) => {
                      if (tips.length > 0) {
                        setTooltip({ x: e.clientX, y: e.clientY, lines: tips })
                      }
                    }}
                    onMouseMove={(e) => {
                      if (tips.length > 0) {
                        setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : null)
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {hasMilestone && (
                      <span className="lc-milestone-dot" title={cell.milestones.map(m => m.label).join(', ')}>
                        {cell.milestones[0].emoji}
                      </span>
                    )}
                    {!hasMilestone && hasSublabel && isSubLabelStart(cell.sublabels[0], cell.i) && (
                      <span className="lc-sublabel-text">{cell.sublabels[0].label}</span>
                    )}
                  </div>
                )
              })}
              {/* Pad empty months at end */}
              {rowCells[rowCells.length - 1]?.month < 12 && Array.from({ length: 12 - rowCells[rowCells.length - 1].month }).map((_, pi) => (
                <div key={`epad-${pi}`} className="lc-cell lc-cell-empty" />
              ))}
            </div>
          )
        })}
      </motion.div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="lc-tooltip"
          style={{ left: tooltip.x + 14, top: tooltip.y - 10 }}
        >
          {tooltip.lines.map((line, i) => (
            <div key={i} className="lc-tooltip-line">{line}</div>
          ))}
        </div>
      )}
    </div>
  )
}
