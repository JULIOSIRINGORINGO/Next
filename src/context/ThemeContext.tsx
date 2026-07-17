'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

interface ThemeContextType {
  isDark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType>({ isDark: true, toggle: () => {} })

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const shouldBeDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(shouldBeDark)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark, ready])

  const toggle = useCallback(() => setIsDark((prev) => !prev), [])

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
