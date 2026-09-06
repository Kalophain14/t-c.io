export const metadata = { title: 'Uses' }
const gear = [
  { category: 'Editor', items: ['VS Code', 'JetBrains Mono'] },
  { category: 'Terminal', items: ['Ghostty', 'zsh', 'oh-my-zsh'] },
  { category: 'Design', items: ['Figma', 'Linear'] },
  { category: 'Hardware', items: ['MacBook Pro M1', 'Keychron K8 Pro'] },
]
export default function UsesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Uses</h1>
      <div className="mt-10 space-y-8">
        {gear.map((g) => (
          <div key={g.category}>
            <h2 className="text-lg font-semibold text-foreground">{g.category}</h2>
            <ul className="mt-3 space-y-2">
              {g.items.map((item) => <li key={item} className="text-muted-foreground">{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
