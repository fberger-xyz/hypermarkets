import { NextResponse } from 'next/server'
import { formatReserves } from '@aave/math-utils'
import { extractErrorMessage, fetchReservesWithRetry, humanizeReserves, initOutput } from '@/utils'
import { Abi } from 'viem'

export interface AaveProtocolConfig {
    poolAddressesProvider: string
    uiPoolDataProvider: string
    chainId: number
    abi: Abi
    protocol: string
    requiresVirtualAccActive?: boolean
}

export const HYPERLEND_ABI = [
    {
        type: 'function',
        name: 'getReservesData',
        stateMutability: 'view',
        inputs: [{ name: 'provider', type: 'address' }],
        outputs: [
            {
                name: '',
                type: 'tuple[]',
                components: [
                    { name: 'underlyingAsset', type: 'address' },
                    { name: 'name', type: 'string' },
                    { name: 'symbol', type: 'string' },
                    { name: 'decimals', type: 'uint256' },
                    { name: 'baseLTVasCollateral', type: 'uint256' },
                    { name: 'reserveLiquidationThreshold', type: 'uint256' },
                    { name: 'reserveLiquidationBonus', type: 'uint256' },
                    { name: 'reserveFactor', type: 'uint256' },
                    { name: 'usageAsCollateralEnabled', type: 'bool' },
                    { name: 'borrowingEnabled', type: 'bool' },
                    { name: 'isActive', type: 'bool' },
                    { name: 'isFrozen', type: 'bool' },
                    { name: 'liquidityIndex', type: 'uint128' },
                    { name: 'variableBorrowIndex', type: 'uint128' },
                    { name: 'liquidityRate', type: 'uint128' },
                    { name: 'variableBorrowRate', type: 'uint128' },
                    { name: 'lastUpdateTimestamp', type: 'uint40' },
                    { name: 'aTokenAddress', type: 'address' },
                    { name: 'variableDebtTokenAddress', type: 'address' },
                    { name: 'interestRateStrategyAddress', type: 'address' },
                    { name: 'availableLiquidity', type: 'uint256' },
                    { name: 'totalScaledVariableDebt', type: 'uint256' },
                    { name: 'priceInMarketReferenceCurrency', type: 'uint256' },
                    { name: 'priceOracle', type: 'address' },
                    { name: 'variableRateSlope1', type: 'uint256' },
                    { name: 'variableRateSlope2', type: 'uint256' },
                    { name: 'baseVariableBorrowRate', type: 'uint256' },
                    { name: 'optimalUsageRatio', type: 'uint256' },
                    { name: 'isPaused', type: 'bool' },
                    { name: 'isSiloedBorrowing', type: 'bool' },
                    { name: 'accruedToTreasury', type: 'uint128' },
                    { name: 'unbacked', type: 'uint128' },
                    { name: 'isolationModeTotalDebt', type: 'uint128' },
                    { name: 'flashLoanEnabled', type: 'bool' },
                    { name: 'debtCeiling', type: 'uint256' },
                    { name: 'debtCeilingDecimals', type: 'uint256' },
                    { name: 'borrowCap', type: 'uint256' },
                    { name: 'supplyCap', type: 'uint256' },
                    { name: 'borrowableInIsolation', type: 'bool' },
                    { name: 'virtualAccActive', type: 'bool' },
                    { name: 'virtualUnderlyingBalance', type: 'uint128' },
                ],
            },
            {
                name: '',
                type: 'tuple',
                components: [
                    { name: 'marketReferenceCurrencyUnit', type: 'uint256' },
                    { name: 'marketReferenceCurrencyPriceInUsd', type: 'int256' },
                    { name: 'networkBaseTokenPriceInUsd', type: 'int256' },
                    { name: 'networkBaseTokenPriceDecimals', type: 'uint8' },
                ],
            },
        ],
    },
] as Abi

export const HYPURRFI_ABI = [
    {
        type: 'function',
        name: 'getReservesData',
        stateMutability: 'view',
        inputs: [{ name: 'provider', type: 'address' }],
        outputs: [
            {
                components: [
                    { internalType: 'address', name: 'underlyingAsset', type: 'address' },
                    { internalType: 'string', name: 'name', type: 'string' },
                    { internalType: 'string', name: 'symbol', type: 'string' },
                    { internalType: 'uint256', name: 'decimals', type: 'uint256' },
                    { internalType: 'uint256', name: 'baseLTVasCollateral', type: 'uint256' },
                    { internalType: 'uint256', name: 'reserveLiquidationThreshold', type: 'uint256' },
                    { internalType: 'uint256', name: 'reserveLiquidationBonus', type: 'uint256' },
                    { internalType: 'uint256', name: 'reserveFactor', type: 'uint256' },
                    { internalType: 'bool', name: 'usageAsCollateralEnabled', type: 'bool' },
                    { internalType: 'bool', name: 'borrowingEnabled', type: 'bool' },
                    { internalType: 'bool', name: 'stableBorrowRateEnabled', type: 'bool' },
                    { internalType: 'bool', name: 'isActive', type: 'bool' },
                    { internalType: 'bool', name: 'isFrozen', type: 'bool' },
                    { internalType: 'uint128', name: 'liquidityIndex', type: 'uint128' },
                    { internalType: 'uint128', name: 'variableBorrowIndex', type: 'uint128' },
                    { internalType: 'uint128', name: 'liquidityRate', type: 'uint128' },
                    { internalType: 'uint128', name: 'variableBorrowRate', type: 'uint128' },
                    { internalType: 'uint128', name: 'stableBorrowRate', type: 'uint128' },
                    { internalType: 'uint40', name: 'lastUpdateTimestamp', type: 'uint40' },
                    { internalType: 'address', name: 'aTokenAddress', type: 'address' },
                    { internalType: 'address', name: 'stableDebtTokenAddress', type: 'address' },
                    { internalType: 'address', name: 'variableDebtTokenAddress', type: 'address' },
                    { internalType: 'address', name: 'interestRateStrategyAddress', type: 'address' },
                    { internalType: 'uint256', name: 'availableLiquidity', type: 'uint256' },
                    { internalType: 'uint256', name: 'totalPrincipalStableDebt', type: 'uint256' },
                    { internalType: 'uint256', name: 'averageStableRate', type: 'uint256' },
                    { internalType: 'uint256', name: 'stableDebtLastUpdateTimestamp', type: 'uint256' },
                    { internalType: 'uint256', name: 'totalScaledVariableDebt', type: 'uint256' },
                    { internalType: 'uint256', name: 'priceInMarketReferenceCurrency', type: 'uint256' },
                    { internalType: 'address', name: 'priceOracle', type: 'address' },
                    { internalType: 'uint256', name: 'variableRateSlope1', type: 'uint256' },
                    { internalType: 'uint256', name: 'variableRateSlope2', type: 'uint256' },
                    { internalType: 'uint256', name: 'stableRateSlope1', type: 'uint256' },
                    { internalType: 'uint256', name: 'stableRateSlope2', type: 'uint256' },
                    { internalType: 'uint256', name: 'baseStableBorrowRate', type: 'uint256' },
                    { internalType: 'uint256', name: 'baseVariableBorrowRate', type: 'uint256' },
                    { internalType: 'uint256', name: 'optimalUsageRatio', type: 'uint256' },
                    { internalType: 'bool', name: 'isPaused', type: 'bool' },
                    { internalType: 'bool', name: 'isSiloedBorrowing', type: 'bool' },
                    { internalType: 'uint128', name: 'accruedToTreasury', type: 'uint128' },
                    { internalType: 'uint128', name: 'unbacked', type: 'uint128' },
                    { internalType: 'uint128', name: 'isolationModeTotalDebt', type: 'uint128' },
                    { internalType: 'bool', name: 'flashLoanEnabled', type: 'bool' },
                    { internalType: 'uint256', name: 'debtCeiling', type: 'uint256' },
                    { internalType: 'uint256', name: 'debtCeilingDecimals', type: 'uint256' },
                    { internalType: 'uint8', name: 'eModeCategoryId', type: 'uint8' },
                    { internalType: 'uint256', name: 'borrowCap', type: 'uint256' },
                    { internalType: 'uint256', name: 'supplyCap', type: 'uint256' },
                    { internalType: 'uint16', name: 'eModeLtv', type: 'uint16' },
                    { internalType: 'uint16', name: 'eModeLiquidationThreshold', type: 'uint16' },
                    { internalType: 'uint16', name: 'eModeLiquidationBonus', type: 'uint16' },
                    { internalType: 'address', name: 'eModePriceSource', type: 'address' },
                    { internalType: 'string', name: 'eModeLabel', type: 'string' },
                    { internalType: 'bool', name: 'borrowableInIsolation', type: 'bool' },
                ],
                internalType: 'struct IUiPoolDataProviderV3.AggregatedReserveData[]',
                name: '',
                type: 'tuple[]',
            },
            {
                components: [
                    { internalType: 'uint256', name: 'marketReferenceCurrencyUnit', type: 'uint256' },
                    { internalType: 'int256', name: 'marketReferenceCurrencyPriceInUsd', type: 'int256' },
                    { internalType: 'int256', name: 'networkBaseTokenPriceInUsd', type: 'int256' },
                    { internalType: 'uint8', name: 'networkBaseTokenPriceDecimals', type: 'uint8' },
                ],
                internalType: 'struct IUiPoolDataProviderV3.BaseCurrencyInfo',
                name: '',
                type: 'tuple',
            },
        ],
    },
] as Abi

export async function createAaveApiRoute(config: AaveProtocolConfig) {
    const responseBody = initOutput<ReturnType<typeof formatReserves>>()

    try {
        const reservesData = await fetchReservesWithRetry(
            config.chainId,
            config.uiPoolDataProvider as `0x${string}`,
            config.abi,
            config.poolAddressesProvider as `0x${string}`,
        )

        if (!reservesData) throw new Error('undefined reservesData')
        const { reservesRaw, poolBaseCurrencyRaw } = reservesData

        if (config.requiresVirtualAccActive) {
            reservesRaw.virtualAccActive = true
            reservesRaw.virtualUnderlyingBalance = '0'
        }

        const humanizedReserves = humanizeReserves(reservesRaw, poolBaseCurrencyRaw, config.chainId, config.poolAddressesProvider)

        // @ts-expect-error: poorly typed
        responseBody.data = formatReserves({
            reserves: humanizedReserves.reservesData,
            marketReferenceCurrencyDecimals: humanizedReserves.baseCurrencyData.marketReferenceCurrencyDecimals,
            marketReferencePriceInUsd: humanizedReserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        })
        responseBody.success = true

        return NextResponse.json(responseBody)
    } catch (error) {
        responseBody.error = extractErrorMessage(error)
        console.error(`${config.protocol} API error:`, responseBody.error)
        return NextResponse.json(responseBody)
    }
}
