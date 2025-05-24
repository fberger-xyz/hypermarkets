import { DefiLlamaCategories, SupportedProtocolNames, SupportedUnderlyingAssetSymbols } from '@/enums'
import dayjs, { Dayjs } from 'dayjs'

type ProtocolURLs = Partial<Record<'website' | 'x' | 'telegram' | 'discord' | 'docs' | 'git', string>>
export const APP_PROTOCOLS: Partial<
    Record<
        SupportedProtocolNames,
        {
            // meta
            name: SupportedProtocolNames
            urls: ProtocolURLs
            fork?: {
                from: string
                urls: ProtocolURLs
            }

            // app
            index: number
            integrated: boolean

            // defillama
            defillama?: {
                protocolId: string
                category: DefiLlamaCategories
            }

            // points program
            points?: {
                started: boolean
                url: string
                since?: Dayjs
                announcement?: string
            }
        }
    >
> = {
    [SupportedProtocolNames.HYPERLEND]: {
        // meta
        name: SupportedProtocolNames.HYPERLEND,
        urls: {
            website: 'https://hyperlend.finance',
            docs: 'https://docs.hyperlend.finance/',
        },
        fork: {
            // 'https://governance.aave.com/t/temp-check-recognize-hyperlend-as-a-friendly-fork/20969'
            from: 'Aave',
            urls: {
                website: 'https://aave.com/',
            },
        },

        // app
        index: 0,
        integrated: true,

        // defillama
        defillama: {
            protocolId: 'hyperlend',
            category: DefiLlamaCategories.LENDING,
        },

        // points program
        points: {
            started: true,
            since: dayjs('2025-03-24'),
            url: 'https://docs.hyperlend.finance/hyperlend-1/points',
        },
    },
    [SupportedProtocolNames.FELIX]: {
        // meta
        name: SupportedProtocolNames.FELIX,
        urls: {
            website: 'https://usefelix.xyz/borrow',
            docs: 'https://usefelix.gitbook.io/felix-docs',
        },
        fork: {
            from: 'Liquity v2',
            urls: {
                website: 'https://www.liquity.org/',
            },
        },

        // app
        index: 1,
        integrated: true,

        // defillama
        defillama: {
            protocolId: 'felix',
            category: DefiLlamaCategories.CDP,
        },

        // points program
        points: {
            started: true,
            url: 'https://usefelix.gitbook.io/felix-docs/money-market-products/points-and-incentives',
        },
    },
    [SupportedProtocolNames.HYPURRFI]: {
        // meta
        name: SupportedProtocolNames.HYPURRFI,
        urls: {
            website: 'https://www.hypurr.fi',
            x: 'https://x.com/hypurrfi',
            telegram: 'https://t.me/+YvsBvSxlQrVhNDkx',
            docs: 'https://docs.hypurr.fi/introduction/hypurrfi',
        },
        fork: {
            from: 'Aave',
            urls: {
                website: 'https://aave.com/',
            },
        },

        // app
        index: 2,
        integrated: true,

        // defillama
        defillama: {
            protocolId: 'hypurrfi',
            category: DefiLlamaCategories.LENDING,
        },

        // points program
        points: {
            started: true,
            url: 'https://app.hypurr.fi/points',
        },
    },
    [SupportedProtocolNames.HYPERSWAP]: {
        // meta
        name: SupportedProtocolNames.HYPERSWAP,
        urls: {
            website: 'https://app.hyperswap.exchange',
            x: 'https://twitter.com/HyperSwapX',
            docs: 'https://docs.hyperswap.exchange/hyperswap',
            discord: 'https://discord.com/invite/hyperswap',
            git: 'https://github.com/HyperSwapX',
        },
        fork: {
            from: 'Uniswap',
            urls: {
                git: 'https://github.com/bowd/hyperswap',
            },
        },

        // app
        index: 3,
        integrated: true,

        // defillama
        defillama: {
            protocolId: 'hyperswap',
            category: DefiLlamaCategories.DEX,
        },

        // points program
        points: {
            started: true,
            url: 'https://docs.hyperswap.exchange/hyperswap/points/or-point-program',
            announcement: 'https://x.com/HyperSwapX/status/1907840652446216439',
        },
    },
    [SupportedProtocolNames.HYPERBEAT]: {
        // meta
        name: SupportedProtocolNames.HYPERBEAT,
        urls: {
            website: 'https://app.hyperbeat.org',
            x: 'https://x.com/0xhyperbeat',
            docs: 'https://docs.hyperbeat.org/',
            discord: 'https://discord.com/invite/0xhyperbeat',
        },

        // app
        index: 4,
        integrated: true,

        // defillama
        defillama: {
            protocolId: 'hyperbeat',
            category: DefiLlamaCategories.YIELD,
        },

        // points program
        points: {
            started: true,
            url: 'https://app.hyperbeat.org/earn#hearts',
        },
    },
}

export const APP_UNDERLYINGS: Partial<
    Record<
        SupportedUnderlyingAssetSymbols,
        {
            // meta
            symbol: SupportedUnderlyingAssetSymbols
            urls: ProtocolURLs

            // app
            index: number
            integrated: boolean
        }
    >
> = {
    [SupportedUnderlyingAssetSymbols.HYPE]: {
        // meta
        symbol: SupportedUnderlyingAssetSymbols.HYPE,
        urls: {},

        // app
        index: 0,
        integrated: true,
    },
    [SupportedUnderlyingAssetSymbols.BTC]: {
        // meta
        symbol: SupportedUnderlyingAssetSymbols.BTC,
        urls: {},

        // app
        index: 1,
        integrated: true,
    },
    [SupportedUnderlyingAssetSymbols.ETH]: {
        // meta
        symbol: SupportedUnderlyingAssetSymbols.ETH,
        urls: {},

        // app
        index: 2,
        integrated: true,
    },
    [SupportedUnderlyingAssetSymbols.USD]: {
        // meta
        symbol: SupportedUnderlyingAssetSymbols.USD,
        urls: {},

        // app
        index: 3,
        integrated: true,
    },
    [SupportedUnderlyingAssetSymbols.OTHERS]: {
        // meta
        symbol: SupportedUnderlyingAssetSymbols.OTHERS,
        urls: {},

        // app
        index: 4,
        integrated: false,
    },
}
