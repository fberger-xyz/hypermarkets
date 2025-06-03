import { AppThemes, AppUrls, IconIds, FileIds } from '@/enums'
import { InterfaceAppLink } from '@/interfaces'
import { Inter } from 'next/font/google'
import resolveConfig from 'tailwindcss/resolveConfig'
import type { Config } from 'tailwindcss'
import tailwindConfig from '../../tailwind.config'
import { DefaultColors } from 'tailwindcss/types/generated/colors'
import { SupportedExplorers } from '@/enums'

/**
 * const
 */

export const SITE_NAME = 'HyperMarkets'
export const IS_DEV = process.env.NODE_ENV === 'development'
export const SITE_DOMAIN = IS_DEV ? 'http://localhost:3000' : `https://${SITE_NAME.toLowerCase()}.fberger.xyz`
export const SITE_URL = SITE_DOMAIN.replace('www.', '')
export const APP_METADATA = {
    SITE_NAME,
    SITE_DOMAIN,
    SITE_DESCRIPTION: 'HyperEVM money markets',
    SITE_URL: SITE_URL,
}

export const APP_PAGES: InterfaceAppLink[] = [
    {
        name: 'APYs',
        path: AppUrls.APYS,
    },
] as const

export const INTER_FONT = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    preload: true,
})

export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

export const APP_THEMES: Record<AppThemes, { index: number; iconId: IconIds; svgId: FileIds }> = {
    [AppThemes.LIGHT]: { index: 0, iconId: IconIds.THEME_LIGHT, svgId: FileIds.THEME_LIGHT },
    [AppThemes.DARK]: { index: 1, iconId: IconIds.THEME_DARK, svgId: FileIds.THEME_DARK },
} as const

const fullConfig = resolveConfig(tailwindConfig as Config)
export const AppColors = fullConfig.theme.colors as DefaultColors & {
    background: '#072722'
    primary: '#96FBE4'
    default: '#FFFFFF'
}

export const toastStyle = {
    borderRadius: '10px',
    background: AppColors.blue[800],
    borderColor: AppColors.blue[300],
    border: 2,
    color: AppColors.blue[300],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '800px',
} as const

/**
 * RPCs
 */

export const RPCS = [
    'https://rpc.hyperlend.finance',
    'https://hyperliquid.drpc.org',
    'https://rpc.hypurrscan.io',
    'https://hl-mainnet.rpc.p2p.world/evm',
    'https://rpc.hyperliquid.xyz/evm',
]

/**
 * Explorers
 */

export const EXPLORERS: Record<
    SupportedExplorers,
    {
        index: number
        url: string
    }
> = {
    [SupportedExplorers.PURRSEC]: {
        index: 0,
        url: 'https://purrsec.com/',
    },
    [SupportedExplorers.HYPERSCAN]: {
        index: 1,
        url: 'https://www.hyperscan.com/',
    },
}
