interface CategoryVisual {
  from: string
  to: string
  icon: string
}

const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  'otvody': {
    from: '#1d4ed8',
    to: '#3b82f6',
    icon: '<path d="M150 90 v90 a70 70 0 0 0 70 70 h90" stroke="white" stroke-width="34" fill="none" stroke-linecap="round"/>',
  },
  'troyniki': {
    from: '#0f766e',
    to: '#14b8a6',
    icon: '<path d="M90 200 h220 M200 200 v110" stroke="white" stroke-width="34" fill="none" stroke-linecap="round"/>',
  },
  'mufty': {
    from: '#4338ca',
    to: '#6366f1',
    icon: '<rect x="70" y="172" width="100" height="56" rx="10" fill="white"/><rect x="230" y="172" width="100" height="56" rx="10" fill="white"/><rect x="150" y="184" width="100" height="32" rx="8" fill="white" fill-opacity="0.55"/>',
  },
  'perehody': {
    from: '#b45309',
    to: '#f59e0b',
    icon: '<path d="M100 160 h90 l70 80 h-90 Z" fill="white"/>',
  },
  'zaglushki': {
    from: '#475569',
    to: '#64748b',
    icon: '<circle cx="200" cy="200" r="85" fill="none" stroke="white" stroke-width="26"/><circle cx="200" cy="200" r="34" fill="white"/>',
  },
  'krany-sharovye': {
    from: '#1d4ed8',
    to: '#2563eb',
    icon: '<circle cx="200" cy="215" r="60" fill="white"/><rect x="188" y="110" width="24" height="80" rx="10" fill="white"/><rect x="150" y="96" width="100" height="22" rx="10" fill="white"/>',
  },
  'zadvizhki': {
    from: '#334155',
    to: '#475569',
    icon: '<circle cx="200" cy="130" r="46" fill="none" stroke="white" stroke-width="18"/><rect x="184" y="170" width="32" height="46" fill="white"/><rect x="150" y="216" width="100" height="70" rx="10" fill="white"/>',
  },
  'klapany': {
    from: '#0e7490',
    to: '#0891b2',
    icon: '<circle cx="200" cy="200" r="90" fill="none" stroke="white" stroke-width="22"/><path d="M170 210 l30 30 l55 -60" stroke="white" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  'flantsy': {
    from: '#7c2d12',
    to: '#c2410c',
    icon: '<circle cx="200" cy="200" r="95" fill="none" stroke="white" stroke-width="28"/><circle cx="200" cy="118" r="11" fill="white"/><circle cx="200" cy="282" r="11" fill="white"/><circle cx="118" cy="200" r="11" fill="white"/><circle cx="282" cy="200" r="11" fill="white"/>',
  },
  'kompensatory': {
    from: '#6d28d9',
    to: '#8b5cf6',
    icon: '<path d="M80 200 q20 -50 40 0 q20 -50 40 0 q20 -50 40 0 q20 -50 40 0 q20 -50 40 0 q20 -50 40 0" stroke="white" stroke-width="20" fill="none" stroke-linecap="round"/>',
  },
  'fitingi': {
    from: '#166534',
    to: '#16a34a',
    icon: '<path d="M200 100 l86 50 v100 l-86 50 -86 -50 v-100 Z" fill="none" stroke="white" stroke-width="22" stroke-linejoin="round"/>',
  },
  'truby': {
    from: '#334155',
    to: '#0f172a',
    icon: '<rect x="80" y="176" width="240" height="48" rx="24" fill="white"/><rect x="80" y="176" width="240" height="48" rx="24" fill="none" stroke="white" stroke-opacity="0.4" stroke-width="4"/><circle cx="90" cy="200" r="20" fill="none" stroke="white" stroke-width="10" stroke-opacity="0.7"/>',
  },
  'soedinitelnye-elementy': {
    from: '#a16207',
    to: '#ca8a04',
    icon: '<path d="M140 140 l40 -20 l40 20 v50 l-40 20 l-40 -20 Z" fill="white"/><path d="M220 210 l40 -20 l40 20 v50 l-40 20 l-40 -20 Z" fill="white" fill-opacity="0.75"/>',
  },
  'zapornaya-armatura': {
    from: '#1e3a8a',
    to: '#1d4ed8',
    icon: '<circle cx="200" cy="180" r="70" fill="none" stroke="white" stroke-width="20"/><rect x="188" y="245" width="24" height="60" fill="white"/><rect x="150" y="298" width="100" height="20" rx="8" fill="white"/>',
  },
}

const DEFAULT_VISUAL: CategoryVisual = {
  from: '#1d4ed8',
  to: '#3b82f6',
  icon: '<circle cx="200" cy="200" r="70" fill="none" stroke="white" stroke-width="20"/>',
}

function hashSeed(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function buildSvg(categorySlug: string, label: string, variantSeed: number): string {
  const visual = CATEGORY_VISUALS[categorySlug] ?? DEFAULT_VISUAL
  const rotation = ((variantSeed % 5) - 2) * 6
  const opacity = 0.9 + (variantSeed % 3) * 0.03

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <linearGradient id="g${variantSeed}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${visual.from}"/>
        <stop offset="100%" stop-color="${visual.to}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#g${variantSeed})"/>
    <rect width="400" height="400" fill="#0f172a" fill-opacity="0.04"/>
    <g transform="rotate(${rotation} 200 200)" opacity="${opacity}">${visual.icon}</g>
    <rect x="0" y="336" width="400" height="64" fill="#0f172a" fill-opacity="0.28"/>
    <text x="200" y="374" font-family="Arial, sans-serif" font-size="22" fill="white" text-anchor="middle" font-weight="600">${escapeXml(label)}</text>
  </svg>`

  return svg
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function toSvgDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function generateProductImages(categorySlug: string, label: string, seedKey: string, count = 3): string[] {
  const baseSeed = hashSeed(seedKey)
  return Array.from({ length: count }, (_, index) => toSvgDataUri(buildSvg(categorySlug, label, baseSeed + index * 7)))
}
