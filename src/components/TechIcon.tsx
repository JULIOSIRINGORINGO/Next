'use client'

import { useEffect, useState, memo } from 'react'
import { loadIcon } from '@/utils/skillIconMap'
import type { IconType } from 'react-icons'

function TechIconInner({ name, size = 24, color }: { name: string; size?: number; color?: string }) {
  const [Icon, setIcon] = useState<IconType | null>(null)

  useEffect(() => {
    let cancelled = false
    loadIcon(name).then(comp => {
      if (!cancelled) setIcon(comp)
    }).catch(() => {})
    return () => { cancelled = true }
  }, [name])

  if (!Icon) return null
  return <Icon size={size} style={color ? { color } : undefined} />
}

export const TechIcon = memo(TechIconInner)
