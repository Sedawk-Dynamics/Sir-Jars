/**
 * Background textures drawn from the logo palette. Used by the page masthead
 * and by every dark (plum) band so no dark section is a flat fill.
 *
 * Apply with `className="patterned"` plus `style={patternVars('hatch')}` — the
 * texture renders on a ::before layer (see globals.css), so it works even when
 * the element sets its own inline `background`.
 */

export type PatternName =
  | 'hatch'
  | 'grid'
  | 'dots'
  | 'diagonal'
  | 'waves'
  | 'circuit'
  | 'weave'

export type PatternTone = 'ivory' | 'gold' | 'rose'

const tones: Record<PatternTone, string> = {
  ivory: 'rgba(252,251,248,0.09)',
  gold: 'rgba(241,181,59,0.13)',
  rose: 'rgba(214,112,150,0.16)',
}

/** Short parallel strokes in blocks at varied angles — a hand-hatched texture. */
function hatch(c: string) {
  const blocks: [number, number, number][] = [
    [20, 20, 0], [70, 15, 60], [120, 25, -30], [165, 20, 90],
    [25, 75, 120], [75, 70, 20], [125, 80, 80], [170, 70, -60],
    [20, 125, 45], [70, 130, -15], [120, 120, 100], [170, 125, 30],
    [25, 175, -45], [75, 170, 75], [125, 175, 10], [170, 180, 135],
  ]
  const g = blocks
    .map(([cx, cy, a]) => {
      const lines = Array.from({ length: 7 }, (_, i) => {
        const x = -14 + i * 4.5
        return `<line x1="${x}" y1="-18" x2="${x}" y2="18"/>`
      }).join('')
      return `<g transform="translate(${cx} ${cy}) rotate(${a})">${lines}</g>`
    })
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="none" stroke="${c}">${g}</svg>`
}

const builders: Record<PatternName, { svg: (c: string) => string; size: string }> = {
  hatch: { svg: hatch, size: '200px 200px' },
  grid: {
    svg: (c) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="${c}"><path d="M48 0H0V48"/><circle cx="0" cy="0" r="2" fill="${c}"/></svg>`,
    size: '48px 48px',
  },
  dots: {
    svg: (c) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><circle cx="2" cy="2" r="1.4" fill="${c}"/></svg>`,
    size: '22px 22px',
  },
  diagonal: {
    svg: (c) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="${c}"><path d="M-4 4l8-8M0 16L16 0M12 20l8-8"/></svg>`,
    size: '16px 16px',
  },
  waves: {
    svg: (c) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="24" fill="none" stroke="${c}"><path d="M0 12c10-10 30-10 40 0s30 10 40 0"/></svg>`,
    size: '80px 24px',
  },
  circuit: {
    svg: (c) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="none" stroke="${c}"><path d="M0 24h30l12 12v30M96 72H60L48 60V0M24 96V78h18"/><circle cx="42" cy="66" r="3"/><circle cx="60" cy="72" r="3"/><circle cx="30" cy="24" r="3"/></svg>`,
    size: '96px 96px',
  },
  weave: {
    svg: (c) =>
      `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="${c}"><path d="M0 10h20M20 30h20M10 0v20M30 20v20"/></svg>`,
    size: '40px 40px',
  },
}

export function patternImage(name: PatternName, tone: PatternTone = 'ivory') {
  return `url("data:image/svg+xml,${encodeURIComponent(builders[name].svg(tones[tone]))}")`
}

/** CSS custom properties consumed by the `.patterned` class. */
export function patternVars(name: PatternName, tone: PatternTone = 'ivory') {
  return {
    '--pattern': patternImage(name, tone),
    '--pattern-size': builders[name].size,
  } as React.CSSProperties
}
