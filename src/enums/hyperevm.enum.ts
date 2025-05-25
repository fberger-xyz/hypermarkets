// https://defillama.com/chain/hyperliquid-l1
export enum SupportedProtocolNames {
    HYPERLEND = 'Hyperlend',
    FELIX = 'Felix',
    HYPURRFI = 'HypurrFi',
    // MORPHO = 'Morpho',
    HYPERSWAP = 'HyperSwap',
    HYPERBEAT = 'Hyperbeat',
    LIMINAL = 'Liminal',
}

export enum DefiLlamaCategories {
    LENDING = 'Lending',
    CDP = 'CDP',
    YIELD = 'Yield',
    DEX = 'DEX',
}

export enum SupportedExplorers {
    PURRSEC = 'purrsec',
    HYPERSCAN = 'hyperscan',
}

export enum SupportedUnderlyingAssetSymbols {
    HYPE = 'HYPE',
    BTC = 'BTC',
    ETH = 'ETH',
    USD = 'USD',
    OTHERS = 'OTHERS',
}

export enum SupportedMarketTypes {
    // POOLED_LENDING = 'Pooled lending',
    POOLED_LENDING = 'Aave fork',
    ISOLATED_LENDING = 'Isolated lending',
    STABILITY_POOLS = 'Stability pools',
    VAULTS = 'Curated vault',
}

export enum HyperbeatVaults {
    NATIVE = 'Native',
    MORPHO = 'Morpho',
}
