// components/RotatingGreeting.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

const greetings = [
  'Dumela',   // Sepedi
  'Ndaa',     // TshiVenda
  'Avuxeni',  // TsiTsonga
  'Molo',     // Xhosa
  'Hallo',    // Afrikaans
  'Hola',     // Spanish
  'Bonjour',  // French
  'Dumela',   // Setswana
]

export function RotatingGreeting() {
  const [index, setIndex] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setOpacity(0)

      fadeTimeoutRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % greetings.length)
        setOpacity(1)
      }, 300)
    }, 2000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current)
        fadeTimeoutRef.current = null
      }
    }
  }, [])

  return (
    <span
      className="inline-block transition-opacity duration-300"
      style={{ opacity }}
    >
      {greetings[index]}
    </span>
  )
}
