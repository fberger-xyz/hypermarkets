import { SupportedProtocolNames } from '@/enums'
import { HyperswapToken } from '../hyperscan.interface'
import { AaveFormattedReserve } from '@/types'

export interface MarketState {
    supply: {
        usd: number
        balance: number
        apy: number
    }
    borrow: {
        usd: number
        balance: number
        apy: number
    }
    usage: number
}

export interface Market {
    protocol: SupportedProtocolNames
    token: HyperswapToken
    type: string // Pooled lending | Isolated lending | Stability pools
    rawData: {
        hyperlend?: AaveFormattedReserve
        hypurrfi?: AaveFormattedReserve
    }
    state: MarketState
    link: string
}
