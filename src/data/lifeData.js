// ─── Color Palette ───────────────────────────────────────────────
export const COLORS = {
  childhood:    '#4a90d9',
  school:       '#5ba3e8',
  uh:           '#cc2222',
  architecture: '#2d8a4e',
  wework:       '#00b4a0',
  netflix:      '#7c3aed',
  peopleinc:    '#6d28d9',
  apple:        '#6b7280',
  unemployment: '#eab308',
  ga:           '#f59e0b',
  covid:        '#ec4899',
  milestone:    '#06b6d4',
}

export const CITY_COLORS = {
  mexicoCity:   '#9a3412',
  sugarLand1:   '#c2410c',
  houston:      '#ea580c',
  sugarLand2:   '#f97316',
  sanFrancisco: '#fb923c',
  sfSunnyvale:  '#fdba74',
}

export const events = [
  // Milestones
  { id: 'birth',    label: 'Born in CDMX',          emoji: '🌎', start: { year: 1989, month: 6  }, end: { year: 1989, month: 6  }, color: COLORS.milestone,    type: 'milestone' },
  { id: 'moveSL',   label: 'Moved to Sugar Land',   emoji: '📦', start: { year: 1991, month: 5  }, end: { year: 1991, month: 5  }, color: COLORS.milestone,    type: 'milestone' },
  { id: 'moveSF',   label: 'Moved to San Francisco', emoji: '🌉', start: { year: 2016, month: 4  }, end: { year: 2016, month: 4  }, color: COLORS.milestone,    type: 'milestone' },
  { id: 'metWife',  label: 'Met my now wife',        emoji: '💛', start: { year: 2016, month: 8  }, end: { year: 2016, month: 8  }, color: COLORS.milestone,    type: 'milestone' },
  { id: 'apt1',     label: 'Moved in together',      emoji: '🏠', start: { year: 2018, month: 2  }, end: { year: 2018, month: 2  }, color: COLORS.milestone,    type: 'milestone' },
  { id: 'proposed', label: 'Proposed',               emoji: '💍', start: { year: 2019, month: 3  }, end: { year: 2019, month: 3  }, color: COLORS.milestone,    type: 'milestone' },
  { id: 'moveSV',   label: 'Moved to Sunnyvale',     emoji: '📦', start: { year: 2020, month: 8  }, end: { year: 2020, month: 8  }, color: COLORS.milestone,    type: 'milestone' },
  { id: 'apt2',     label: 'Moved into 2nd apt',     emoji: '🏠', start: { year: 2021, month: 2  }, end: { year: 2021, month: 2  }, color: COLORS.milestone,    type: 'milestone' },
  { id: 'wedding',  label: 'Wedding Day',            emoji: '💒', start: { year: 2022, month: 5  }, end: { year: 2022, month: 5  }, color: COLORS.milestone,    type: 'milestone' },
  { id: 'bb1',      label: 'BB1 arrived',            emoji: '👶', start: { year: 2023, month: 8  }, end: { year: 2023, month: 8  }, color: COLORS.milestone,    type: 'milestone' },
  { id: 'apt3',     label: 'Moved into 3rd apt',     emoji: '🏠', start: { year: 2024, month: 11 }, end: { year: 2024, month: 11 }, color: COLORS.milestone,    type: 'milestone' },

  // Eras
  { id: 'babydays', label: 'Little Baby Days',       start: { year: 1989, month: 6  }, end: { year: 1991, month: 5  }, color: COLORS.childhood,    type: 'era' },
  { id: 'child',    label: 'Childhood',              start: { year: 1991, month: 6  }, end: { year: 1995, month: 7  }, color: COLORS.childhood,    type: 'era' },
  { id: 'es',       label: 'ES',                     start: { year: 1995, month: 8  }, end: { year: 2000, month: 5  }, color: COLORS.school,       type: 'era' },
  { id: 'ms1',      label: 'MS 1',                   start: { year: 2000, month: 8  }, end: { year: 2001, month: 5  }, color: COLORS.school,       type: 'era' },
  { id: 'ms2',      label: 'MS 2',                   start: { year: 2001, month: 8  }, end: { year: 2004, month: 5  }, color: COLORS.school,       type: 'era' },
  { id: 'hs1',      label: 'HS 1',                   start: { year: 2004, month: 8  }, end: { year: 2006, month: 5  }, color: COLORS.school,       type: 'era' },
  { id: 'hs2',      label: 'HS 2',                   start: { year: 2006, month: 8  }, end: { year: 2008, month: 5  }, color: COLORS.school,       type: 'era' },
  { id: 'uh',       label: 'UH · BARCH',             start: { year: 2008, month: 8  }, end: { year: 2014, month: 5  }, color: COLORS.uh,           type: 'era' },
  { id: 'pbdesign', label: 'Patrick Berrios Design', start: { year: 2014, month: 7  }, end: { year: 2015, month: 7  }, color: COLORS.architecture, type: 'era' },
  { id: 'unemp1',   label: '1st Unemployment',       start: { year: 2015, month: 7  }, end: { year: 2016, month: 5  }, color: COLORS.unemployment, type: 'era' },
  { id: 'dsk',      label: 'dsk Architects',         start: { year: 2016, month: 5  }, end: { year: 2018, month: 7  }, color: COLORS.architecture, type: 'era' },
  { id: 'wework',   label: 'WeWork',                 start: { year: 2018, month: 7  }, end: { year: 2020, month: 6  }, color: COLORS.wework,       type: 'era' },
  { id: 'unemp2',   label: '2nd Unemployment',       start: { year: 2020, month: 6  }, end: { year: 2021, month: 1  }, color: COLORS.unemployment, type: 'era' },
  { id: 'netflix',  label: 'Netflix',                start: { year: 2021, month: 1  }, end: { year: 2022, month: 7  }, color: COLORS.netflix,      type: 'era' },
  { id: 'people',   label: 'People Inc.',            start: { year: 2022, month: 8  }, end: { year: 2024, month: 11 }, color: COLORS.peopleinc,    type: 'era' },
  { id: 'apple',    label: 'Apple',                  start: { year: 2024, month: 12 }, end: null,                      color: COLORS.apple,        type: 'era' },

  // Overlays
  { id: 'covid',    label: 'COVID',                  start: { year: 2020, month: 3  }, end: { year: 2022, month: 4  }, color: COLORS.covid,        type: 'overlay' },
  { id: 'ga',       label: 'General Assembly',       start: { year: 2020, month: 9  }, end: { year: 2020, month: 11 }, color: COLORS.ga,           type: 'sublabel' },
  { id: 'patlv',    label: 'Pat Leave',              start: { year: 2023, month: 8  }, end: { year: 2023, month: 10 }, color: COLORS.milestone,    type: 'sublabel' },
]

export const cities = [
  { id: 'mx',  label: 'Mexico City',    start: { year: 1989, month: 6 }, end: { year: 1991, month: 5 }, color: CITY_COLORS.mexicoCity   },
  { id: 'sl1', label: 'Sugar Land',     start: { year: 1991, month: 5 }, end: { year: 2008, month: 8 }, color: CITY_COLORS.sugarLand1   },
  { id: 'hou', label: 'Houston',        start: { year: 2008, month: 8 }, end: { year: 2014, month: 7 }, color: CITY_COLORS.houston      },
  { id: 'sl2', label: 'Sugar Land',     start: { year: 2014, month: 7 }, end: { year: 2016, month: 4 }, color: CITY_COLORS.sugarLand2   },
  { id: 'sf',  label: 'San Francisco',  start: { year: 2016, month: 4 }, end: { year: 2020, month: 8 }, color: CITY_COLORS.sanFrancisco },
  { id: 'sv',  label: 'SF / Sunnyvale', start: { year: 2020, month: 8 }, end: null,                     color: CITY_COLORS.sfSunnyvale  },
]

export const GRID_START = { year: 1989, month: 6 }
export const GRID_END   = { year: 2026, month: 3 }
export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
