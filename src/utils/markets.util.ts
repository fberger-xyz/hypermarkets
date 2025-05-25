import { SITE_DOMAIN } from '@/config/app.config'
import { fetchWithTimeout, initOutput } from './requests.util'
import { extractErrorMessage } from './error.util'
import { EnrichedHyperbeatVault, EnrichedMorphobeatVault, MarketState, StructuredOutput } from '@/interfaces'
import { AaveFormattedReserve } from '@/types'
import { MarketsSortedByDirection } from '@/enums'

/**
 * one fn per protocol
 */

export async function fetchHyperlendReserves(): Promise<StructuredOutput<AaveFormattedReserve[]>> {
    const fnName = 'fetchHyperlendReserves'
    const output = initOutput<AaveFormattedReserve[]>()
    try {
        const response = await fetchWithTimeout(`${SITE_DOMAIN}/api/protocols/hyperlend/markets`)
        if (!response.ok) throw new Error(`${fnName}: !response.ok`)
        const responseJson = (await response.json()) as StructuredOutput<AaveFormattedReserve[]>
        output.data = responseJson.data
        output.success = true
        // if (output.data?.length) toast.success(`${SupportedProtocolNames.HYPERLEND}: ${output.data?.length} markets refreshed`)
    } catch (error) {
        output.error = extractErrorMessage(error)
        console.error(fnName, { error: output.error })
    }
    return output
}

export async function fetchHypurrFiReserves(): Promise<StructuredOutput<AaveFormattedReserve[]>> {
    const fnName = 'fetchHypurrFiReserves'
    const output = initOutput<AaveFormattedReserve[]>()
    try {
        const response = await fetchWithTimeout(`${SITE_DOMAIN}/api/protocols/hypurrfi/pooled-markets`)
        if (!response.ok) throw new Error(`${fnName}: !response.ok`)
        const responseJson = (await response.json()) as StructuredOutput<AaveFormattedReserve[]>
        output.data = responseJson.data
        output.success = true
        // if (output.data?.length) toast.success(`${SupportedProtocolNames.HYPURRFI}: ${output.data?.length} markets refreshed`)
    } catch (error) {
        output.error = extractErrorMessage(error)
        console.error(fnName, { error: output.error })
    }
    return output
}

export async function fetchHyperbeatVaults(): Promise<StructuredOutput<(EnrichedHyperbeatVault | EnrichedMorphobeatVault)[]>> {
    const fnName = 'fetchHyperbeatVaults'
    const output = initOutput<(EnrichedHyperbeatVault | EnrichedMorphobeatVault)[]>()
    try {
        const response = await fetchWithTimeout(`${SITE_DOMAIN}/api/protocols/hyperbeat/vaults`)
        if (!response.ok) throw new Error(`${fnName}: !response.ok`)
        const responseJson = (await response.json()) as StructuredOutput<(EnrichedHyperbeatVault | EnrichedMorphobeatVault)[]>
        output.data = responseJson.data?.filter((vault) => !!vault.address)
        output.success = true
        // if (output.data?.length) toast.success(`${SupportedProtocolNames.HYPERBEAT}: ${output.data.length} vaults refreshed`)
    } catch (error) {
        output.error = extractErrorMessage(error)
        console.error(fnName, { error: output.error })
    }
    return output
}

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
