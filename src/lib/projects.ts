export interface FeaturedProject {
  id: string
  name: string
  description: string
  html_url: string
  language: string
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 't-c-io',
    name: 't-c.io',
    description: 'Personal portfolio site built with Next.js and Tailwind.',
    html_url: 'https://github.com/Kalophain14/t-c.io',
    language: 'TypeScript',
  },
  {
    id: 'bankcore-api',
    name: 'bankcore-api',
    description: 'Project base learning',
    html_url: 'https://github.com/Kalophain14/java_projects/tree/main/03_bankcore-api',
    language: 'Java',
  },
]