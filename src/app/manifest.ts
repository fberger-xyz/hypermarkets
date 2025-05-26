import { MetadataRoute } from 'next'
import { APP_METADATA } from '@/config/app.config'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: APP_METADATA.SITE_NAME,
        short_name: APP_METADATA.SITE_NAME,
        description: APP_METADATA.SITE_DESCRIPTION,
        start_url: '/',
        icons: [
            {
                src: '/favicon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
        lang: 'en',
        categories: ['finance', 'defi', 'web3'],
    }
}
