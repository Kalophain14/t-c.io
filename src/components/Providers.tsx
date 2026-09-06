'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

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

function applyThemeClass(resolved: string) {
  const root = document.documentElement
  if (resolved === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState('system')
  const [resolvedTheme, setResolvedTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  const mediaRef = useRef<MediaQueryList | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'system'
    setThemeState(saved)

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    mediaRef.current = mql

    const onChange = () => {
      setThemeState((current) => {
        if (current === 'system') {
          const next = mql.matches ? 'dark' : 'light'
          setResolvedTheme(next)
          applyThemeClass(next)
        }
        return current
      })
    }

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange)
    } else {
      mql.addListener(onChange)
    }

    const initialResolved = saved === 'system' ? (mql.matches ? 'dark' : 'light') : saved
    setResolvedTheme(initialResolved)
    applyThemeClass(initialResolved)

    setMounted(true)

    return () => {
      if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', onChange)
      } else {
        mql.removeListener(onChange)
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const mql = mediaRef.current
    const systemDark = mql ? mql.matches : window.matchMedia('(prefers-color-scheme: dark)').matches
    const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme
    setResolvedTheme(resolved)
    applyThemeClass(resolved)
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
