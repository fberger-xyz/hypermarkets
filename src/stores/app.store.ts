'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { APP_METADATA, IS_DEV } from '@/config/app.config'
import { EnrichedHyperbeatVault, EnrichedMorphobeatVault, Market } from '@/interfaces'
import { MarketsSortedBy, MarketsSortedByDirection, SupportedMarketTypes, SupportedProtocolNames, SupportedUnderlyingAssetSymbols } from '@/enums'
import { hyperswapTokenList } from '@/data/hardcoded-tokens-list'
import { AaveFormattedReserve } from '@/types'
import { APP_PROTOCOLS, APP_UNDERLYINGS } from '@/config/protocols.config'
import { getMarketStateForAaveForks } from '@/utils/markets.util'

export const useAppStore = create<{
    /**
     * store
     */

    hasHydrated: boolean
    setHasHydrated: (hasHydrated: boolean) => void

    /**
     * ui
     */

    appStoreRefreshedAt: number
    setAppStoreRefreshedAt: (appStoreRefreshedAt: number) => void
    showMobileMenu: boolean
    setShowMobileMenu: (showMobileMenu: boolean) => void
    uiAssets: Partial<Record<SupportedUnderlyingAssetSymbols, boolean>>
    toggleUiUnderlyingAsset: (asset: SupportedUnderlyingAssetSymbols) => void
    uiProtocols: Partial<Record<SupportedProtocolNames, boolean>>
    toggleUiProtocol: (protocol: SupportedProtocolNames) => void
    marketsSortedBy: MarketsSortedBy
    setMarketsSortedBy: (marketsSortedBy: MarketsSortedBy) => void
    marketsSortedByDirection: MarketsSortedByDirection
    setMarketsSortedByDirection: (marketsSortedByDirection: MarketsSortedByDirection) => void
    setMarketsSort: (marketsSortedBy: MarketsSortedBy, marketsSortedByDirection: MarketsSortedByDirection) => void

    /**
     * markets
     */

    hyperlendReserves: AaveFormattedReserve[]
    hypurrfiReserves: AaveFormattedReserve[]
    hyperbeatVaults: (EnrichedHyperbeatVault | EnrichedMorphobeatVault)[]
    setMarkets: (data: {
        hyperlendReserves: AaveFormattedReserve[]
        hypurrfiReserves: AaveFormattedReserve[]
        hyperbeatVaults: (EnrichedHyperbeatVault | EnrichedMorphobeatVault)[]
    }) => void

    /**
     * computeds
     */

    getMarkets(): Market[]
}>()(
    persist(
        (set, get) => ({
            /**
             * store
             */

            hasHydrated: false,
            setHasHydrated: (hasHydrated) => set(() => ({ hasHydrated })),

            /**
             * ui
             */

            appStoreRefreshedAt: -1,
            setAppStoreRefreshedAt: (appStoreRefreshedAt) => set(() => ({ appStoreRefreshedAt })),
            showMobileMenu: false,
            setShowMobileMenu: (showMobileMenu) => set(() => ({ showMobileMenu })),
            uiAssets: Object.values(APP_UNDERLYINGS)
                .filter((underlying) => underlying.integrated)
                .reduce((acc, underlying) => ({ ...acc, [underlying.symbol]: true }), {}),
            toggleUiUnderlyingAsset: (asset) => set((state) => ({ uiAssets: { ...state.uiAssets, [asset]: !state.uiAssets[asset] } })),
            uiProtocols: Object.values(APP_PROTOCOLS).reduce((acc, protocol) => ({ ...acc, [protocol.name]: true }), {}),
            toggleUiProtocol: (protocol) => set((state) => ({ uiProtocols: { ...state.uiProtocols, [protocol]: !state.uiProtocols[protocol] } })),
            marketsSortedBy: MarketsSortedBy.SUPPLIED_USD,
            setMarketsSortedBy: (marketsSortedBy) => set(() => ({ marketsSortedBy })),
            marketsSortedByDirection: MarketsSortedByDirection.DESC,
            setMarketsSortedByDirection: (marketsSortedByDirection) => set(() => ({ marketsSortedByDirection })),
            setMarketsSort: (marketsSortedBy, marketsSortedByDirection) => set(() => ({ marketsSortedBy, marketsSortedByDirection })),

            /**
             * markets
             */

            hyperlendReserves: [],
            hypurrfiReserves: [],
            hyperbeatVaults: [],
            setMarkets: (data) =>
                set((state) => ({
                    hyperlendReserves: data.hyperlendReserves.length ? data.hyperlendReserves : state.hyperlendReserves,
                    hypurrfiReserves: data.hypurrfiReserves.length ? data.hypurrfiReserves : state.hypurrfiReserves,
                    hyperbeatVaults: data.hyperbeatVaults.length ? data.hyperbeatVaults : state.hyperbeatVaults,
                    appStoreRefreshedAt: Date.now(),
                })),

            /**
             * computeds
             */

            getMarkets: () => {
                const markets: Market[] = []

                // hyperlend
                const hyperlendReserves = get().hyperlendReserves
                for (let reserveIndex = 0; reserveIndex < hyperlendReserves.length; reserveIndex++) {
                    const assetAddress = hyperlendReserves[reserveIndex].underlyingAsset.toLowerCase()
                    const token = hyperswapTokenList.find((token) => token.address === assetAddress)
                    if (!token) continue
                    const market = {
                        protocol: SupportedProtocolNames.HYPERLEND,
                        token,
                        type: SupportedMarketTypes.POOLED_LENDING,
                        rawData: {
                            hyperlend: hyperlendReserves[reserveIndex],
                        },
                        state: getMarketStateForAaveForks(hyperlendReserves[reserveIndex]),
                        link: `https://app.hyperlend.finance/markets/${token.address}`,
                    }
                    markets.push(market)
                }

                // hyperlend
                const hypurrfiReserves = get().hypurrfiReserves
                for (let reserveIndex = 0; reserveIndex < hypurrfiReserves.length; reserveIndex++) {
                    const assetAddress = hypurrfiReserves[reserveIndex].underlyingAsset.toLowerCase()
                    const token = hyperswapTokenList.find((token) => token.address === assetAddress)
                    if (!token) continue
                    const market = {
                        protocol: SupportedProtocolNames.HYPURRFI,
                        token,
                        type: SupportedMarketTypes.POOLED_LENDING,
                        rawData: {
                            hypurrfi: hypurrfiReserves[reserveIndex],
                        },
                        state: getMarketStateForAaveForks(hypurrfiReserves[reserveIndex]),
                        link: `https://app.hypurr.fi/markets/pooled/999/${token.address}`,
                    }
                    markets.push(market)
                }

                // hyperbeat
                const hyperbeatVaults = get().hyperbeatVaults
                for (let vaultIndex = 0; vaultIndex < hyperbeatVaults.length; vaultIndex++) {
                    const assetAddress = hyperbeatVaults[vaultIndex].token?.toLowerCase()
                    const token = hyperswapTokenList.find((token) => token.address === assetAddress)
                    if (!token) continue
                    const market = {
                        protocol: SupportedProtocolNames.HYPERBEAT,
                        token,
                        type: SupportedMarketTypes.VAULTS,
                        rawData: {
                            hyperbeat: hyperbeatVaults[vaultIndex],
                        },
                        state: {
                            supply: { balance: 0, usd: hyperbeatVaults[vaultIndex].supplyUsd, apy: hyperbeatVaults[vaultIndex].supplyAPY },
                            borrow: { balance: 0, usd: 0, apy: 0 },
                            usage: 0,
                        },
                        link: `https://app.hyperbeat.org/vaults/${hyperbeatVaults[vaultIndex].id}`,
                        purrsec: `https://purrsec.com/address/${hyperbeatVaults[vaultIndex].contract}`,
                    }
                    markets.push(market)
                }

                return markets
            },
        }),
        {
            name: `${APP_METADATA.SITE_DOMAIN}-app-store-${IS_DEV ? 'dev' : 'prod'}-${process.env.NEXT_PUBLIC_COMMIT_TIMESTAMP}`,
            storage: createJSONStorage(() => sessionStorage),
            skipHydration: false,
            onRehydrateStorage: () => (state) => {
                if (state && !state.hasHydrated) state.setHasHydrated(true)
            },
        },
    ),
)
