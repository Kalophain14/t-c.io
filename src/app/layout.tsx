import type { Metadata } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import { Layout } from '@/components/Layout'
import { Providers } from '@/components/Providers'
import '@/styles/tailwind.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 't-c.io', template: '%s | t-c.io' },
  description: 'Developer, designer, and writer.',
  metadataBase: new URL('https://t-c.io'),
}

const themeInitScript = `
(function(){
  try {
    var saved = localStorage.getItem('theme') || 'system';
    var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved = saved === 'system' ? (systemDark ? 'dark' : 'light') : saved;
    if (resolved === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Providers><Layout>{children}</Layout></Providers>
      </body>
    </html>
  )
}
