import { DefiLlamaCategories, SupportedProtocolNames } from '@/enums/hyperevm.enum'
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
            website: 'https://hyperlend.finance/',
            docs: 'https://docs.hyperlend.finance/',
        },

        // app
        index: 1,
        integrated: false,

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
        index: 2,
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
    [SupportedProtocolNames.HYPURRRFI]: {
        // meta
        name: SupportedProtocolNames.HYPURRRFI,
        urls: {
            website: 'https://www.hypurr.fi/en-us/',
            x: 'https://x.com/hypurrfi',
            telegram: 'https://t.me/+YvsBvSxlQrVhNDkx',
            docs: 'https://docs.hypurr.fi/introduction/hypurrfi',
        },
        fork: {
            from: 'Aave v3',
            urls: {
                website: 'https://aave.com/',
            },
        },

        // app
        index: 3,
        integrated: false,

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
            website: 'https://app.hyperswap.exchange/#/swap',
            x: 'https://twitter.com/HyperSwapX',
            docs: 'https://docs.hyperswap.exchange/hyperswap',
            discord: 'https://discord.com/invite/hyperswap',
            git: 'https://github.com/HyperSwapX',
        },
        fork: {
            from: 'Aave v3',
            urls: {
                website: 'https://aave.com/',
            },
        },

        // app
        index: 4,
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
            website: 'https://app.hyperbeat.org/earn',
            x: 'https://x.com/0xhyperbeat',
            docs: 'https://docs.hyperbeat.org/',
            discord: 'https://discord.com/invite/0xhyperbeat',
        },

        // app
        index: 4,
        integrated: false,

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
