// app/page.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RotatingGreeting } from '@/components/RotatingGreetings'
import { FEATURED_PROJECTS } from '@/lib/projects'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        <RotatingGreeting />, I&apos;m <span className="text-accent">Temoso</span>.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        We are the null before the object, the instance with no fixed zone, the query that finds signal WHERE others find noise. We strip syntax to deploy something true. We are noone.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/about" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          About me <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground transition-colors hover:bg-accent">
          Get in touch
        </Link>
      </div>
      <div className="mt-16">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Featured Projects</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FEATURED_PROJECTS.map((project) => (
            <div key={project.id} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/20">
              <h3 className="font-semibold text-card-foreground">{project.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span>{project.language}</span>
              </div>
              
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                View on GitHub <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}