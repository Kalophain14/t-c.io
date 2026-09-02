// components/RotatingGreeting.tsx
'use client'

import { useState, useEffect } from 'react'

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

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0)

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % greetings.length)
        setOpacity(1)
      }, 300)
    }, 2000)

    return () => clearInterval(interval)
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
