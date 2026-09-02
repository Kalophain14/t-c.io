'use client'
import { useRef } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'
export function Halo() {
  let ref = useRef<HTMLDivElement>(null)
  let { x, y } = useMousePosition(ref)
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div className="absolute size-64 rounded-full bg-accent/10 blur-3xl transition-opacity duration-300"
        style={{ left: x !== null ? x - 128 : '50%', top: y !== null ? y - 128 : '50%', opacity: x !== null && y !== null ? 1 : 0 }}
      />
    </div>
  )
}
