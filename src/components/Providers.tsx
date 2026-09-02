'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextValue {
  theme: string
  setTheme: (theme: string) => void
  resolvedTheme: string
  systemTheme: string
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  setTheme: () => {},
  resolvedTheme: 'light',
  systemTheme: 'light',
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState('system')
  const [resolvedTheme, setResolvedTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'system'
    setThemeState(saved)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme
    setResolvedTheme(resolved)
    const root = document.documentElement
    if (resolved === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const setTheme = (t: string) => setThemeState(t)
  const systemTheme = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
