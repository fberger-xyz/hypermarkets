import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{ hostname: '*' }],
    },
    output: 'standalone',
    productionBrowserSourceMaps: true,
}

export default nextConfig
