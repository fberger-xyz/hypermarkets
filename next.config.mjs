/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: '*' }],
    },
    output: 'standalone',
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Add polyfills for browser APIs that don't exist in Node.js
            config.resolve.fallback = {
                ...config.resolve.fallback,
                crypto: false,
                stream: false,
                buffer: false,
            }
            
            // Add global polyfill for IndexedDB to prevent build errors
            config.plugins.push(
                new config.webpack.DefinePlugin({
                    'global.indexedDB': 'undefined',
                    'globalThis.indexedDB': 'undefined',
                })
            )
        }
        return config
    },
}

export default nextConfig;
