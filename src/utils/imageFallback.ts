import type { SyntheticEvent } from 'react'
import { toSvgDataUri } from './placeholder'

// Нейтральная монохромная заглушка на случай, если стоковое фото не загрузилось (offline).
const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#f4f4f5"/>
  <g stroke="#a1a1aa" stroke-width="10" fill="none" stroke-linecap="round">
    <rect x="120" y="176" width="160" height="48" rx="24"/>
    <circle cx="120" cy="200" r="16"/>
    <circle cx="280" cy="200" r="16"/>
  </g>
  <text x="200" y="270" font-family="Arial, sans-serif" font-size="18" fill="#a1a1aa" text-anchor="middle">нет фото</text>
</svg>`

export const FALLBACK_IMAGE = toSvgDataUri(FALLBACK_SVG)

export function onImageError(event: SyntheticEvent<HTMLImageElement>): void {
  const img = event.currentTarget
  if (img.dataset.fallbackApplied === 'true') return
  img.dataset.fallbackApplied = 'true'
  img.src = FALLBACK_IMAGE
}
