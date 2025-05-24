import { SupportedUnderlyingAssetSymbols } from '@/enums'

export interface HyperscanToken {
    address: string
    circulating_market_cap: null
    decimals: null | string
    exchange_rate: null
    holders: string
    icon_url: null
    name: null | string
    symbol: null | string
    total_supply: null | string
    type: string
    volume_24h: null

    // adding
    underlying: SupportedUnderlyingAssetSymbols
}

export interface HyperswapToken {
    name: string
    decimals: number
    symbol: string
    address: string
    chainId: number
    logoURI: string
    tags: string[]

    // adding
    underlying: SupportedUnderlyingAssetSymbols
}
