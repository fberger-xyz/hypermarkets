import { DefiLlamaCategories, SupportedProtocolNames, SupportedUnderlyingAssetSymbols } from '@/enums'
import dayjs, { Dayjs } from 'dayjs'

type ProtocolURLs = Partial<Record<'website' | 'x' | 'telegram' | 'discord' | 'docs' | 'git' | 'ref', string>>
export const APP_PROTOCOLS: Record<
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
> = {
    [SupportedProtocolNames.HYPERLEND]: {
        // meta
        name: SupportedProtocolNames.HYPERLEND,
        urls: {
            website: 'https://hyperlend.finance',
            docs: 'https://docs.hyperlend.finance/',
            ref: 'https://app.hyperlend.finance/?ref=HYPERMARKETS',
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
            ref: 'https://usefelix.xyz?ref=36F2BFC5',
        },
        fork: {
            from: 'Liquity v2',
            urls: {
                website: 'https://www.liquity.org/',
            },
        },

        // app
        index: 1,
        integrated: false,

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
            ref: 'https://app.hypurr.fi/buddies/D7A25D7',
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
            ref: 'https://app.hyperswap.exchange/#/swap?referral=fberger',
        },
        fork: {
            from: 'Uniswap',
            urls: {
                git: 'https://github.com/bowd/hyperswap',
            },
        },

        // app
        index: 3,
        integrated: false,

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
            ref: 'https://app.hyperbeat.org/earn?referral=DE579276',
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
    [SupportedProtocolNames.LIMINAL]: {
        // meta
        name: SupportedProtocolNames.LIMINAL,
        urls: {
            website: 'https://liminal.money',
            x: 'https://x.com/liminalmoney',
            telegram: 'https://t.me/liminalmoney',
            docs: 'https://docs.liminal.money/',
            discord: 'https://discord.com/invite/mEg5xTdXQv',
            ref: 'https://liminal.money/join/FBERGER',
        },

        // app
        index: 5,
        integrated: false,

        // defillama
        defillama: {
            protocolId: '',
            category: DefiLlamaCategories.YIELD,
        },

        // points program
        // tba
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
