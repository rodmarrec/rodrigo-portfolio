import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { events, cities, COLORS, GRID_START, GRID_END, MONTHS } from '../data/lifeData'
import './LifeCalendar.css'

const WEEKS_PER_MONTH = 4

function toWeekIdx(year, month, week = 0) {
  const mIdx = (year - GRID_START.year) * 12 + (month - GRID_START.month)
  return mIdx * WEEKS_PER_MONTH + week
}

function totalWeeks() {
  const mIdx = (GRID_END.year - GRID_START.year) * 12 + (GRID_END.month - GRID_START.month)
  return mIdx * WEEKS_PER_MONTH
}

function toMonthIdx(year, month) {
  return (year - GRID_START.year) * 12 + (month - GRID_START.month)
}

function cityAtMonth(mIdx) {
  for (let i = cities.length - 1; i >= 0; i--) {
    const c = cities[i]
    const s = toMonthIdx(c.start.year, c.start.month)
    const e = c.end ? toMonthIdx(c.end.year, c.end.month) : 99999
    if (mIdx >= s && mIdx < e) return c
  }
  return null
}

function eraAtWeek(weekIdx) {
  const mIdx = Math.floor(weekIdx / WEEKS_PER_MONTH)
  let era = null
  for (const ev of events) {
    if (ev.type !== 'era' && ev.type !== 'overlay') continue
    const s = toMonthIdx(ev.start.year, ev.start.month) * WEEKS_PER_MONTH
    const e = ev.end ? toMonthIdx(ev.end.year, ev.end.month) * WEEKS_PER_MONTH : 999999
    if (weekIdx >= s && weekIdx < e) {
      if (ev.type === 'overlay') return ev
      if (!era) era = ev
    }
  }
  return era
}

function milestoneAtWeek(weekIdx) {
  for (const ev of events) {
    if (ev.type !== 'milestone') continue
    const s = toWeekIdx(ev.start.year, ev.start.month, 0)
    const e = s + WEEKS_PER_MONTH
    if (weekIdx >= s && weekIdx < e) return ev
  }
  return null
}

function sublabelAtWeek(weekIdx) {
  for (const ev of events) {
    if (ev.type !== 'sublabel') continue
    const s = toMonthIdx(ev.start.year, ev.start.month) * WEEKS_PER_MONTH
    const e = toMonthIdx(ev.end.year, ev.end.month) * WEEKS_PER_MONTH + WEEKS_PER_MONTH
    if (weekIdx >= s && weekIdx < e) return ev
  }
  return null
}

function eraStartAtWeek(weekIdx) {
  for (const ev of events) {
    if (ev.type !== 'era' || !ev.label) continue
    const s = toMonthIdx(ev.start.year, ev.start.month) * WEEKS_PER_MONTH
    if (weekIdx === s) return ev
  }
  return null
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

  // Build rows by year
  const rows = useMemo(() => {
    return years.map(year => {
      // For each month in year, build 4 week cells
      const startMonth = year === GRID_START.year ? GRID_START.month : 1
      const endMonth = year === GRID_END.year ? GRID_END.month : 12

      const months = []
      for (let m = 1; m <= 12; m++) {
        const weeks = []
        for (let w = 0; w < WEEKS_PER_MONTH; w++) {
          const mIdx = toMonthIdx(year, m)
          const weekIdx = mIdx * WEEKS_PER_MONTH + w

          if (m < startMonth || m > endMonth) {
            weeks.push({ empty: true, weekIdx })
            continue
          }

          const era = eraAtWeek(weekIdx)
          const milestone = milestoneAtWeek(weekIdx)
          const sublabel = sublabelAtWeek(weekIdx)
          const eraStart = w === 0 ? eraStartAtWeek(weekIdx) : null

          weeks.push({ weekIdx, era, milestone, sublabel, eraStart, empty: false, month: m, week: w })
        }
        months.push({ month: m, weeks })
      }

      // City for left bar
      const mIdx = toMonthIdx(year, startMonth)
      const city = cityAtMonth(mIdx)

      return { year, months, city, startMonth, endMonth }
    })
  }, [])

  function buildTooltip(cell) {
    const lines = []
    if (cell.milestone) lines.push(`${cell.milestone.emoji} ${cell.milestone.label}`)
    if (cell.sublabel) lines.push(cell.sublabel.label)
    if (cell.era) lines.push(cell.era.label || '')
    return lines.filter(Boolean)
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
        {/* Month headers */}
        <div className="lc-month-row lc-month-header-row">
          <div className="lc-row-left" />
          {MONTHS.map(m => (
            <div key={m} className="lc-month-group lc-month-header-group">
              <span className="lc-month-label">{m}</span>
            </div>
          ))}
        </div>

        {/* Year rows */}
        {rows.map(row => (
          <div key={row.year} className="lc-row">
            <div className="lc-row-left">
              <div
                className="lc-city-bar"
                style={{ background: row.city?.color || 'rgba(255,255,255,0.1)' }}
                title={row.city?.label}
              />
              <span className="lc-year-label">{row.year}</span>
            </div>

            {row.months.map(({ month, weeks }) => (
              <div key={month} className="lc-month-group">
                {weeks.map(cell => {
                  if (cell.empty) return <div key={cell.weekIdx} className="lc-week lc-week-empty" />

                  const bg = cell.era ? cell.era.color : 'rgba(255,255,255,0.05)'
                  const hasMilestone = !!cell.milestone
                  const hasSublabel = !!cell.sublabel && !hasMilestone
                  const showLabel = cell.eraStart && cell.eraStart.label && cell.week === 0
                  const tips = buildTooltip(cell)

                  return (
                    <div
                      key={cell.weekIdx}
                      className={`lc-week${hasMilestone ? ' lc-milestone-cell' : ''}${hasSublabel ? ' lc-sublabel-cell' : ''}`}
                      style={{ background: bg }}
                      onMouseEnter={e => tips.length > 0 && setTooltip({ x: e.clientX, y: e.clientY, lines: tips })}
                      onMouseMove={e => tips.length > 0 && setTooltip(t => t ? { ...t, x: e.clientX, y: e.clientY } : null)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {hasMilestone && <span className="lc-emoji">{cell.milestone.emoji}</span>}
                      {showLabel && !hasMilestone && (
                        <span className="lc-era-label">{cell.eraStart.label}</span>
                      )}
                    </div>
                  )
                })}
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
