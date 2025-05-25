import { SupportedMarketTypes, SupportedProtocolNames } from '@/enums'
import { HyperswapToken } from '../hyperscan.interface'
import { AaveFormattedReserve } from '@/types'
import { EnrichedHyperbeatVault, EnrichedMorphobeatVault } from './hyperbeat.interface'

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
    type: SupportedMarketTypes
    rawData: {
        hyperlend?: AaveFormattedReserve
        hypurrfi?: AaveFormattedReserve
        hyperbeat?: EnrichedHyperbeatVault | EnrichedMorphobeatVault
    }
    state: MarketState
    link: string
    purrsec?: string
}
