```
# t-c.io

Personal site for t-c.io — portfolio, writing, projects, uses, and contact.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **MDX** for posts
- **Tailwind CSS v4**
- **Motion** for animation
- **Spring Boot** backend for contact form (separate repo)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── about/            # About page
│   ├── contact/          # Contact form (proxies to backend)
│   ├── posts/            # MDX blog posts
│   ├── projects/         # Project showcase
│   ├── uses/             # Gear / tools
│   └── api/contact/      # API route → Spring Boot backend
├── components/           # React components
│   ├── Header.tsx        # Navigation + theme toggle
│   ├── Footer.tsx        # Footer links
│   ├── Layout.tsx        # Page shell
│   └── ...
├── lib/                  # Utilities
│   ├── posts.ts          # Post discovery + metadata
│   ├── formatDate.ts     # Date formatting
│   └── utils.ts          # cn() helper
├── hooks/                # Custom React hooks
├── styles/               # Tailwind + Prism CSS
└── images/               # Static assets
```

## Adding content

### Posts

Create a folder + `page.mdx` inside `src/app/posts/`:

```
src/app/posts/my-post/
└── page.mdx
```

```mdx
export const post = {
  type: 'article',
  title: 'My Post Title',
  description: 'Short excerpt shown in listings.',
  author: 'Your Name',
  date: '2026-07-24',
  coverImage: '/images/post-cover.jpg',
}

# My Post Title

Your markdown content here.
```

### Projects

Edit `src/app/projects/page.tsx` and add to the `projects` array:

```ts
{
  title: 'Project Name',
  description: 'What it does.',
  tags: ['Next.js', 'TypeScript'],
  github: 'https://github.com/you/repo',
  demo: 'https://demo.vercel.app',
}
```

## Environment

| Variable      | Purpose                                                 |
| ------------- | ------------------------------------------------------- |
| `BACKEND_URL` | Spring Boot contact API URL (e.g. `https://api.t-c.io`) |

## License

MIT — feel free to fork and personalize.
```

---

Save as `README.md` next to `package.json`.
