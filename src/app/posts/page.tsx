import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/formatDate'
import { ArrowRight } from 'lucide-react'

export const metadata = { title: 'Posts' }

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Posts</h1>
      <div className="mt-10 space-y-6">
        {posts.length === 0 && (
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        )}
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group flex gap-5 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/20"
          >
            {post.coverImage && (
              <Link
                href={post.href}
                className="relative hidden aspect-square w-28 flex-none overflow-hidden rounded-lg sm:block"
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <h2 className="mt-2 text-xl font-semibold text-card-foreground group-hover:text-accent">
                <Link href={post.href}>{post.title}</Link>
              </h2>
              <p className="mt-2 text-muted-foreground">{post.description}</p>
              <Link
                href={post.href}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                Read more <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
