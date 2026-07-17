'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function AccentColorLoader() {
  const t = useTranslations()

  useEffect(() => {
    const savedColor = localStorage.getItem('accent_color')
    if (savedColor) {
      document.documentElement.style.setProperty('--accent', savedColor)
    }

    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        const color = data?.accentColor || data?.accent_color || '#00c896'
        document.documentElement.style.setProperty('--accent', color)
        localStorage.setItem('accent_color', color)
      })
      .catch(() => {})
  }, [])

  return null
}
