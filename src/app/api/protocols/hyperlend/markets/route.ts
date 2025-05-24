import { NextResponse } from 'next/server'
import { formatReserves } from '@aave/math-utils'
import { extractErrorMessage, fetchReservesWithRetry, humanizeReserves, initOutput } from '@/utils'
import { Abi } from 'viem'

export const runtime = 'nodejs'

/**
 * actual route
 */

// aave and hyperlend
const uiPoolDataProviderABI = [
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

export async function GET() {
    const responseBody = initOutput<ReturnType<typeof formatReserves>>()
    try {
        // https://docs.hyperlend.finance/developer-documentation/contract-addresses
        // https://purrsec.com/address/0x72c98246a98bfe64022a3190e7710e157497170c/contract
        const POOL_ADDRESSES_PROVIDER = '0x72c98246a98bFe64022a3190e7710E157497170C'
        // https://purrsec.com/address/0x3Bb92CF81E38484183cc96a4Fb8fBd2d73535807/contract
        const UI_POOL_DATA_PROVIDER = '0x3Bb92CF81E38484183cc96a4Fb8fBd2d73535807'
        const HYPER_EVM_CHAIN_ID = 999

        // step 1: rpc calls
        const reservesData = await fetchReservesWithRetry(HYPER_EVM_CHAIN_ID, UI_POOL_DATA_PROVIDER, uiPoolDataProviderABI, POOL_ADDRESSES_PROVIDER)
        if (!reservesData) throw new Error('undefined reservesData')
        const { reservesRaw, poolBaseCurrencyRaw } = reservesData

        // step 2: humanize
        const humanizedReserves = humanizeReserves(reservesRaw, poolBaseCurrencyRaw, HYPER_EVM_CHAIN_ID, POOL_ADDRESSES_PROVIDER)

        // step 3: format
        // @ts-expect-error: poorly typed
        responseBody.data = formatReserves({
            reserves: humanizedReserves.reservesData,
            marketReferenceCurrencyDecimals: humanizedReserves.baseCurrencyData.marketReferenceCurrencyDecimals,
            marketReferencePriceInUsd: humanizedReserves.baseCurrencyData.marketReferenceCurrencyPriceInUsd,
        })
        responseBody.success = true

        // return json
        return NextResponse.json(responseBody)
    } catch (error) {
        responseBody.error = extractErrorMessage(error)
        console.error(responseBody.error)
        return NextResponse.json(responseBody)
    }
}
