/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites: async () => [
        {
            source: '/:url(https.*)',
            destination: '/view?url=:url'
        },
        {
            source: '/reader/:url(https.*)',
            destination: '/view?url=:url&reader=true'
        }
    ]
}

module.exports = nextConfig
