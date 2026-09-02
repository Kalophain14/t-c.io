'use client'
import { motion } from 'motion/react'
export function DialogOverlay({ onClose, 'aria-label': ariaLabel }: { onClose: () => void; 'aria-label'?: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} role="button"
      aria-label={ariaLabel || 'Close dialog'} tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose() }}
    />
  )
}
