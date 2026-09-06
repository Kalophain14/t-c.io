import type { Transition } from 'motion/react'
export function motionTransition(t: Transition, reduceMotion?: boolean | null): Transition {
  if (reduceMotion) return { duration: 0 }
  return t
}
export const bouncySpring: Transition = { type: 'spring', stiffness: 300, damping: 25 }
export function bouncy(): Transition {
  return { type: 'spring', stiffness: 300, damping: 25 }
}
export const contentFade: Transition = { duration: 0.15 }
