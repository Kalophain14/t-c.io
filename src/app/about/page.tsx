// app/about/page.tsx
import Image from 'next/image'

export const metadata = { title: 'About' }

const experiences = [
  {
    company: 'Noone Ltd',
    role: 'Junior Developer',
    period: '2021 — Present',
  },
  {
    company: 'Capitec Bank Ltd',
    role: 'Junior Java Developer',
    period: '2023 — Present',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">About</h1>

      {/* Photo section */}
      <div className="mt-8 flex justify-center md:justify-start">
        <div className="relative h-40 w-40 overflow-hidden rounded-full border border-border md:h-48 md:w-48">
          <Image
            src="/images/profile.jpg"
            alt="Portrait of Temoso"
            fill
            sizes="(min-width: 768px) 192px, 160px"
            className="object-cover rotate-[-17deg] scale-125"
            priority
          />
        </div>
      </div>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <p className="text-lg leading-relaxed">
          My name is Temoso.
        </p>

        <p className="text-lg font-medium text-foreground">
          I don&apos;t just build systems, I listen to the people they&apos;re meant to serve.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          (01) — Listening First
        </h2>

        <p className="leading-relaxed">
          I believe the best technology is built by people who&apos;ve actually
          listened. Years spent with clients in banking, insurance, and
          administration taught me that not in a classroom, but in the room,
          watching what people actually needed versus what they said they needed.
        </p>

        <p className="leading-relaxed">
          It probably explains why I&apos;ve ended up in this line of work.
        </p>

        <p className="leading-relaxed">
          That experience is driving my move into technology-focused roles now not a pivot away from what I knew, but a continuation of it. Same
          instincts, new tools: I&apos;m still solving for the human on the other
          side of the problem, just building the solutions myself instead of only
          advocating for them.
        </p>

        <p className="leading-relaxed">
          I&apos;m still figuring a lot out and that&apos;s the point. Curiosity
          is the one dependency I never refactor out.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          (02) — Outside Work
        </h2>

        <p className="leading-relaxed">
          Music is where I go when everything else is chaos. I love making it,
          playing it, losing myself in live events there&apos;s something about
          building a sound from scratch, shaping it until it&apos;s mine, that&apos;s
          taught me as much about technology as any job has. Same instinct,
          really: take raw pieces, understand how they fit, make something that
          didn&apos;t exist before.
        </p>

        <p className="leading-relaxed">
          Beach walks at sunset hit like a new world every time that quiet
          reset before the noise starts again. And when I need to unwind
          differently, it&apos;s Call of Duty. We stay dirty, so that the world
          can get clean.
        </p>

        <p className="font-medium not-italic text-foreground italic">
          We ship truth. We stay no one.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-foreground">Experience</h2>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-card-foreground">{exp.company}</h3>
                <span className="text-sm text-muted-foreground">{exp.period}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{exp.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
