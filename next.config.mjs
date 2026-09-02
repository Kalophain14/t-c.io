/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'miro.medium.com' }],
  },
  async redirects() {
    return [
      { source: '/articles/:slug', destination: '/posts/:slug', permanent: true },
      { source: '/videos/:slug', destination: '/posts/:slug', permanent: true },
      { source: '/posts/my-desk-setup-for-2023', destination: '/posts/desk-setup', permanent: true },
      { source: '/gear', destination: '/uses', permanent: true },
    ]
  },
}
export default nextConfig
