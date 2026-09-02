'use client'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          website: data.get('website'),
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-8 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
        <CheckCircle className="h-5 w-5" /><p>Message sent successfully!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div className="hidden"><input name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
        <input name="name" id="name" required className="mt-1 block w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-card-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
        <input name="email" id="email" type="email" required className="mt-1 block w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-card-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
        <textarea name="message" id="message" rows={5} required className="mt-1 block w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-card-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
      </div>
      {status === 'error' && <div className="flex items-center gap-2 text-sm text-destructive"><AlertCircle className="h-4 w-4" /> Something went wrong. Please try again.</div>}
      <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        <Send className="h-4 w-4" /> Send message
      </button>
    </form>
  )
}
