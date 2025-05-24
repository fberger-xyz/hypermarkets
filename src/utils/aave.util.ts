import { RPCS } from '@/config/app.config'
import { ReservesData } from '@aave/contract-helpers'
import { Abi, createPublicClient, http } from 'viem'

/**
 * step 1 rpc call
 */

const chainIdToRPCS: Record<number, string[]> = {
    999: RPCS,
}

const MAX_RETRIES = 3
export async function fetchReservesWithRetry(
    chainId: number,
    uiPoolDataProvider: `0x${string}`,
    uiPoolDataProviderABI: Abi,
    poolAddressesProvider: `0x${string}`,
) {
    const debug = false
    let attempt = 0
    const rpcUrls = chainIdToRPCS[chainId]
    if (!rpcUrls?.length) return
    while (attempt < MAX_RETRIES) {
        const rpcUrl = rpcUrls[attempt % rpcUrls.length] // rotate between rpcs
        if (debug) console.log(`Attempt ${attempt + 1}: Fetching reserves from ${rpcUrl}`)
        try {
            // viem client
            const client = createPublicClient({ transport: http(rpcUrl) })

            // debug
            if (debug) console.log('getReservesData for', uiPoolDataProvider)

            // new
            const reservesData = (await client.readContract({
                address: uiPoolDataProvider,
                abi: uiPoolDataProviderABI,
                functionName: 'getReservesData',
                args: [poolAddressesProvider],
            })) as ReservesData

            // debug
            if (debug) console.log('getReservesData for', uiPoolDataProvider, 'DONE')

            // @ts-expect-error: tba
            const [reservesRaw, poolBaseCurrencyRaw] = reservesData
            return { reservesRaw, poolBaseCurrencyRaw }
        } catch (error) {
            console.error(`Error fetching reserves (attempt ${attempt + 1}):`, error)
            attempt++
            if (attempt < MAX_RETRIES) {
                const delay = 200 * Math.pow(2, attempt) // backoff
                if (debug) console.log(`Retrying in ${delay}ms...`)
                await new Promise((res) => setTimeout(res, delay))
            } else {
                console.error('Max retry attempts reached. Throwing error.')
                throw new Error('Failed to fetch reserves after multiple attempts.')
            }
        }
    }
}

/**
 * step 2 humanize
 */

export const humanizeReserves = (
    reservesRaw: ReservesData[0],
    poolBaseCurrencyRaw: ReservesData[1],
    chainId: number,
    lendingPoolAddressProvider: string,
) => {
    const reservesData = reservesRaw.map((reserveRaw, index) => {
        return {
            originalId: index,
            id: `${chainId}-${reserveRaw.underlyingAsset}-${lendingPoolAddressProvider}`.toLowerCase(),
            underlyingAsset: reserveRaw.underlyingAsset.toLowerCase(),
            name: reserveRaw.name,
            symbol: reserveRaw.symbol,
            decimals: Number(reserveRaw.decimals),
            baseLTVasCollateral: reserveRaw.baseLTVasCollateral.toString(),
            reserveLiquidationThreshold: reserveRaw.reserveLiquidationThreshold.toString(),
            reserveLiquidationBonus: reserveRaw.reserveLiquidationBonus.toString(),
            reserveFactor: reserveRaw.reserveFactor.toString(),
            usageAsCollateralEnabled: reserveRaw.usageAsCollateralEnabled,
            borrowingEnabled: reserveRaw.borrowingEnabled,
            isActive: reserveRaw.isActive,
            isFrozen: reserveRaw.isFrozen,
            liquidityIndex: reserveRaw.liquidityIndex.toString(),
            variableBorrowIndex: reserveRaw.variableBorrowIndex.toString(),
            liquidityRate: reserveRaw.liquidityRate.toString(),
            variableBorrowRate: reserveRaw.variableBorrowRate.toString(),
            lastUpdateTimestamp: Number(reserveRaw.lastUpdateTimestamp),
            aTokenAddress: reserveRaw.aTokenAddress.toString(),
            variableDebtTokenAddress: reserveRaw.variableDebtTokenAddress.toString(),
            interestRateStrategyAddress: reserveRaw.interestRateStrategyAddress.toString(),
            availableLiquidity: reserveRaw.availableLiquidity.toString(),
            totalScaledVariableDebt: reserveRaw.totalScaledVariableDebt.toString(),
            priceInMarketReferenceCurrency: reserveRaw.priceInMarketReferenceCurrency.toString(),
            priceOracle: reserveRaw.priceOracle,
            variableRateSlope1: reserveRaw.variableRateSlope1.toString(),
            variableRateSlope2: reserveRaw.variableRateSlope2.toString(),
            baseVariableBorrowRate: reserveRaw.baseVariableBorrowRate.toString(),
            optimalUsageRatio: reserveRaw.optimalUsageRatio.toString(),
            isPaused: reserveRaw.isPaused,
            debtCeiling: reserveRaw.debtCeiling.toString(),
            borrowCap: reserveRaw.borrowCap.toString(),
            supplyCap: reserveRaw.supplyCap.toString(),
            borrowableInIsolation: reserveRaw.borrowableInIsolation,
            accruedToTreasury: reserveRaw.accruedToTreasury.toString(),
            unbacked: reserveRaw.unbacked.toString(),
            isolationModeTotalDebt: reserveRaw.isolationModeTotalDebt.toString(),
            debtCeilingDecimals: Number(reserveRaw.debtCeilingDecimals),
            isSiloedBorrowing: reserveRaw.isSiloedBorrowing,
            flashLoanEnabled: reserveRaw.flashLoanEnabled,

            // missing in hypurrfi
            virtualAccActive: reserveRaw.virtualAccActive ?? true,
            virtualUnderlyingBalance: reserveRaw.virtualUnderlyingBalance?.toString() ?? '0',
        }
    })

    const baseCurrencyData = {
        marketReferenceCurrencyDecimals: poolBaseCurrencyRaw.marketReferenceCurrencyUnit.toString().length - 1,
        marketReferenceCurrencyPriceInUsd: poolBaseCurrencyRaw.marketReferenceCurrencyPriceInUsd.toString(),
        networkBaseTokenPriceInUsd: poolBaseCurrencyRaw.networkBaseTokenPriceInUsd.toString(),
        networkBaseTokenPriceDecimals: poolBaseCurrencyRaw.networkBaseTokenPriceDecimals,
    }

    return { reservesData, baseCurrencyData }
}

/**
 * step 3 format reserves
 */

// use @aave/math-utils
