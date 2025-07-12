import { MarketsSortedBy, MarketsSortedByDirection } from '@/enums'
import { Market } from '@/interfaces'

type SortableValue = number

interface MarketSortConfig {
    sortBy: MarketsSortedBy
    direction: MarketsSortedByDirection
}

const getMarketSortValue = (market: Market, sortBy: MarketsSortedBy): SortableValue => {
    switch (sortBy) {
        case MarketsSortedBy.SUPPLIED_USD:
            return market.state.supply.usd
        case MarketsSortedBy.SUPPLY_APY:
            return market.state.supply.apy
        case MarketsSortedBy.BORROWED_USD:
            return market.state.borrow.usd
        case MarketsSortedBy.BORROW_APY:
            return market.state.borrow.apy
        case MarketsSortedBy.USAGE:
            return market.state.usage
        default:
            return 0
    }
}

export const createMarketSorter = (config: MarketSortConfig) => {
    return (a: Market, b: Market): number => {
        const valueA = getMarketSortValue(a, config.sortBy)
        const valueB = getMarketSortValue(b, config.sortBy)

        return config.direction === MarketsSortedByDirection.ASC ? valueA - valueB : valueB - valueA
    }
}

export const sortMarkets = (markets: Market[], sortBy: MarketsSortedBy, direction: MarketsSortedByDirection): Market[] => {
    const sorter = createMarketSorter({ sortBy, direction })
    return [...markets].sort(sorter)
}

export const filterAndSortMarkets = (
    markets: Market[],
    filters: {
        protocols: Record<string, boolean>
        assets: Record<string, boolean>
    },
    sortConfig: MarketSortConfig,
): Market[] => {
    const filtered = markets.filter((market) => filters.protocols[market.protocol] && filters.assets[market.token.underlying])

    return sortMarkets(filtered, sortConfig.sortBy, sortConfig.direction)
}
