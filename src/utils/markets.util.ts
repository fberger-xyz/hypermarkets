import { EnrichedHyperbeatVault, EnrichedMorphobeatVault, MarketState, StructuredOutput } from '@/interfaces'
import { AaveFormattedReserve } from '@/types'
import { MarketsSortedByDirection } from '@/enums'
import { createProtocolFetcher, PROTOCOL_CONFIGS } from './protocol-fetcher.util'
import { extractErrorMessage } from './error.util'

/**
 * one fn per protocol
 */

export const fetchHyperlendReserves = (): Promise<StructuredOutput<AaveFormattedReserve[]>> =>
    createProtocolFetcher<AaveFormattedReserve>(PROTOCOL_CONFIGS.hyperlend)

export const fetchHypurrFiReserves = (): Promise<StructuredOutput<AaveFormattedReserve[]>> =>
    createProtocolFetcher<AaveFormattedReserve>(PROTOCOL_CONFIGS.hypurrfi)

export const fetchHyperbeatVaults = (): Promise<StructuredOutput<(EnrichedHyperbeatVault | EnrichedMorphobeatVault)[]>> =>
    createProtocolFetcher<EnrichedHyperbeatVault | EnrichedMorphobeatVault>(PROTOCOL_CONFIGS.hyperbeat)

/**
 * call all fns
 */

export const fetchAllMarkets = async () => {
    // prepare
    const fnName = 'fetchAllMarkets'
    const output: {
        hyperlendReserves: AaveFormattedReserve[]
        hypurrfiReserves: AaveFormattedReserve[]
        hyperbeatVaults: (EnrichedHyperbeatVault | EnrichedMorphobeatVault)[]
    } = {
        hyperlendReserves: [],
        hypurrfiReserves: [],
        hyperbeatVaults: [],
    }

    // safe exec
    try {
        // hyperlend
        const [hyperlendReserves, hypurrfiReserves, hyperbeatVaults] = await Promise.all([
            fetchHyperlendReserves(),
            fetchHypurrFiReserves(),
            fetchHyperbeatVaults(),
        ])

        // set
        if (hyperlendReserves.data) output.hyperlendReserves = hyperlendReserves.data
        if (hypurrfiReserves.data) output.hypurrfiReserves = hypurrfiReserves.data
        if (hyperbeatVaults.data) output.hyperbeatVaults = hyperbeatVaults.data
    } catch (error) {
        console.log(`${fnName}: unexpected error`, extractErrorMessage(error))
    }

    // -
    return output
}

/**
 * misc
 */

export const getMarketStateForAaveForks = (reserve: AaveFormattedReserve): MarketState => {
    // prepare
    const state = {
        supply: { balance: 0, usd: 0, apy: 0 },
        borrow: { balance: 0, usd: 0, apy: 0 },
        usage: 0,
    }

    // -
    try {
        // compute
        const borrowBalance = Number(reserve.totalScaledVariableDebt) * (Number(reserve.variableBorrowIndex) / Math.pow(10, 27))
        const supplyBalance = borrowBalance + Number(reserve.formattedAvailableLiquidity)
        const priceUsd = Number(reserve.priceInUSD)

        // set
        state.supply.balance = supplyBalance
        state.supply.usd = supplyBalance * priceUsd
        state.supply.apy = Number(reserve.supplyAPY)
        state.borrow.balance = borrowBalance
        state.borrow.usd = borrowBalance * priceUsd
        state.borrow.apy = Number(reserve.variableBorrowAPY)
        state.usage = borrowBalance / supplyBalance
    } catch (error) {
        // console.error('getMarketStateForAaveForks', { error })
    }

    // -
    return state
}

export const sortMarkets = (direction: MarketsSortedByDirection, a: number, b: number) => (direction === MarketsSortedByDirection.ASC ? a - b : b - a)
