'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { APP_METADATA, IS_DEV } from '@/config/app.config'
import { Market } from '@/interfaces'
import { SupportedProtocolNames, SupportedUnderlyingAssetSymbols } from '@/enums'
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

    /**
     * markets
     */

    hyperlendReserves: AaveFormattedReserve[]
    hypurrfiReserves: AaveFormattedReserve[]
    setMarkets: (data: { hyperlendReserves: AaveFormattedReserve[]; hypurrfiReserves: AaveFormattedReserve[] }) => void

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
            uiProtocols: Object.values(APP_PROTOCOLS)
                .filter((protocol) => protocol.integrated)
                .reduce((acc, protocol) => ({ ...acc, [protocol.name]: true }), {}),
            toggleUiProtocol: (protocol) => set((state) => ({ uiProtocols: { ...state.uiProtocols, [protocol]: !state.uiProtocols[protocol] } })),

            /**
             * markets
             */

            hyperlendReserves: [],
            hypurrfiReserves: [],
            setMarkets: (data) =>
                set(() => ({
                    hyperlendReserves: data.hyperlendReserves,
                    hypurrfiReserves: data.hypurrfiReserves,
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
                        type: 'Pooled',
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
                        type: 'Pooled',
                        rawData: {
                            hypurrfi: hypurrfiReserves[reserveIndex],
                        },
                        state: getMarketStateForAaveForks(hypurrfiReserves[reserveIndex]),
                        link: `https://app.hypurr.fi/markets/pooled/999/${token.address}`,
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
