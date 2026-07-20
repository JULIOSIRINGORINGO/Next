'use client'

import { memo } from 'react'
import { loadIcon } from '@/utils/skillIconMap'

function TechIconInner({ name, size = 24, color }: { name: string; size?: number; color?: string }) {
  const Icon = loadIcon(name)
  if (!Icon) return null
  return <Icon size={size} style={color ? { color } : undefined} />
}

export const TechIcon = memo(TechIconInner)
