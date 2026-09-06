import type { Metadata } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import { Layout } from '@/components/Layout'
import { Providers } from '@/components/Providers'
import '@/styles/tailwind.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 't-c.io', template: '%s | noone.io' },
  description: 'Developer, designer, and writer.',
  metadataBase: new URL('https://t-c.io'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <Providers><Layout>{children}</Layout></Providers>
      </body>
    </html>
  )
}
