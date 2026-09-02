import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'

export const metadata = { title: 'Projects' }

const projects = [
  { title: 'Project One', description: 'A full-stack web application built with Next.js and TypeScript.', tags: ['Next.js', 'TypeScript', 'Tailwind'], github: 'https://github.com', demo: 'https://example.com' },
  { title: 'Project Two', description: 'An open-source CLI tool for automating developer workflows.', tags: ['Rust', 'CLI', 'Automation'], github: 'https://github.com', demo: null },
  { title: 'Project Three', description: 'A real-time collaborative editor with WebSockets.', tags: ['React', 'Node.js', 'WebSockets'], github: 'https://github.com', demo: 'https://example.com' },
]

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Projects</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <div key={p.title} className="flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/20">
            <h2 className="text-lg font-semibold text-card-foreground">{p.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => <span key={t} className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">{t}</span>)}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Link href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" /> Source
              </Link>
              {p.demo && (
                <Link href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-4 w-4" /> Demo
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
