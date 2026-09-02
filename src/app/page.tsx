// app/page.tsx
import Link from 'next/link'
import { ArrowRight, Star, GitFork } from 'lucide-react'
import { RotatingGreeting } from '@/components/RotatingGreetings'

const GITHUB_USERNAME = 'kalophain14'
const PINNED_REPO = 'java_projects' // always shown in the second slot

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
}

async function getFeaturedRepos(): Promise<GitHubRepo[]> {
  try {
    // Fetch the pinned repo directly by name
    const pinnedRes = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${PINNED_REPO}`,
      { next: { revalidate: 3600 } }
    )
    const pinned: GitHubRepo | null = pinnedRes.ok ? await pinnedRes.json() : null

    // Fetch the user's most recently updated repos, then pick one that isn't the pinned repo
    const listRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
      { next: { revalidate: 3600 } }
    )
    const list: GitHubRepo[] = listRes.ok ? await listRes.json() : []
    const other = list.find((r) => r.name !== PINNED_REPO) || null

    return [other, pinned].filter((r): r is GitHubRepo => r !== null)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const repos = await getFeaturedRepos()

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
          {repos.length > 0 ? (
            repos.map((repo) => (
              <div key={repo.id} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/20">
                <h3 className="font-semibold text-card-foreground">{repo.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {repo.description || 'No description provided.'}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" /> {repo.forks_count}
                  </span>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  View on GitHub <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            ))
          ) : (
            [1, 2].map((i) => (
              <div key={i} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/20">
                <h3 className="font-semibold text-card-foreground">Project {i}</h3>
                <p className="mt-2 text-sm text-muted-foreground">A brief description of this amazing project goes here.</p>
                <Link href="/projects" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                  View project <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
