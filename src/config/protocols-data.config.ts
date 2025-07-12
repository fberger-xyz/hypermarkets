import { HyperbeatVaults } from '@/enums'

export const HYPEREVM_CHAIN_ID = 999

export const PROTOCOL_CONTRACTS = {
    hyperlend: {
        poolAddressesProvider: '0x72c98246a98bFe64022a3190e7710E157497170C',
        uiPoolDataProvider: '0x3Bb92CF81E38484183cc96a4Fb8fBd2d73535807',
    },
    hypurrfi: {
        poolAddressesProvider: '0xa73ff12d177d8f1ec938c3ba0e87d33524dd5594',
        uiPoolDataProvider: '0x7b883191011aeae40581d3fa1b112413808c9c00',
    },
} as const

export const HYPERBEAT_VAULTS_DATA: {
    id: string
    name: string
    provider: HyperbeatVaults.NATIVE
    contract: string
    supplyAPY: number
    token: string
}[] = [
    // {
    //     id: 'usdt',
    //     name: 'Hyperbeat USDT',
    //     provider: HyperbeatVaults.NATIVE,
    //     contract: '0x5e105266db42f78fa814322bce7f388b4c2e61eb',
    //     supplyAPY: 0.25,
    //     token: '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb',
    // },
    // {
    //     id: 'hype',
    //     name: 'Hyperbeat Ultra HYPE',
    //     provider: HyperbeatVaults.NATIVE,
    //     contract: '0x96c6cbb6251ee1c257b2162ca0f39aa5fa44b1fb',
    //     supplyAPY: 0.06,
    //     token: '0x5555555555555555555555555555555555555555',
    // },
    // {
    //     id: 'ubtc',
    //     name: 'Hyperbeat Ultra UBTC',
    //     provider: HyperbeatVaults.NATIVE,
    //     contract: '0xc061d38903b99ac12713b550c2cb44b221674f94',
    //     supplyAPY: 0.025,
    //     token: '0x9FDBdA0A5e284c32744D2f17Ee5c74B284993463',
    // },
]

export const EXTERNAL_APIS = {
    hyperbeat: 'https://app.hyperbeat.org/api/combinedTvl',
} as const
