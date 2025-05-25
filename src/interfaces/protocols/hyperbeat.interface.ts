import { HyperbeatVaults } from '@/enums'

export interface HyperbeatVault {
    name: string
    totalValueInUSD: number
    shareValueInUSD: number
}

export interface MorphobeatVault {
    address: string
    symbol: string
    tokenPrice: number
    totalSupply: number
    oracleAddress: string
}

export interface EnrichedHyperbeatVault extends HyperbeatVault {
    provider: HyperbeatVaults.NATIVE
    address: string
    id: string
    supplyAPY: number
    supplyUsd: number
    token: string
    contract: string
}

export interface EnrichedMorphobeatVault extends MorphobeatVault {
    provider: HyperbeatVaults.MORPHO
    supplyAPY: number
    id: string
    supplyUsd: number
    token: string
    contract: string
}

// [
//     {
//         name: 'hypereth',
//         totalValueInUSD: 8769941.9883147,
//         shareValueInUSD: 2487.3,
//     },
//     {
//         name: 'hyperbtc',
//         totalValueInUSD: 1516170.97091648,
//         shareValueInUSD: 106864,
//     },
//     {
//         name: 'hyperusd',
//         totalValueInUSD: 5243599.6124194,
//         shareValueInUSD: 0.999779,
//     },
//     {
//         name: 'hype',
//         totalValueInUSD: 41560763.8230624,
//         shareValueInUSD: 35.73,
//     },
//     {
//         name: 'ubtc',
//         totalValueInUSD: 14061007.688785,
//         shareValueInUSD: 107141,
//     },
//     {
//         name: 'usdt',
//         totalValueInUSD: 4320609.35881312,
//         shareValueInUSD: 1,
//     },
//     {
//         address: '0x5eEC795d919FA97688Fb9844eeB0072E6B846F9d',
//         name: 'Gauntlet USDe Vault',
//         symbol: 'USDe',
//         tokenPrice: 1,
//         totalSupply: 113542.800895389,
//         totalValueInUSD: 113542.800895389,
//         oracleAddress: '0x0000000000000000000000000000000000000000',
//     },
//     {
//         address: '0x53A333e51E96FE288bC9aDd7cdC4B1EAD2CD2FfA',
//         name: 'Gauntlet USDT0 Vault',
//         symbol: 'USDT0',
//         tokenPrice: 1,
//         totalSupply: 461166.239657619,
//         totalValueInUSD: 461166.239657619,
//         oracleAddress: '0x0000000000000000000000000000000000000000',
//     },
//     {
//         address: '0x0571362ba5EA9784a97605f57483f865A37dBEAA',
//         name: 'Gauntlet uETH Vault',
//         symbol: 'uETH',
//         tokenPrice: 2490.84660795,
//         totalSupply: 19.2760449946789,
//         totalValueInUSD: 48013.6712896874,
//         oracleAddress: '0x4BAD96DD1C7D541270a0C92e1D4e5f12EEEA7a57',
//     },
//     {
//         address: '0xd19e3d00f8547f7d108abFD4bbb015486437B487',
//         name: 'MEV WHYPE vault',
//         symbol: 'wHYPE',
//         tokenPrice: 35.89194768,
//         totalSupply: 28047.3417935143,
//         totalValueInUSD: 1006673.72421589,
//         oracleAddress: '0xa8a94Da411425634e3Ed6C331a32ab4fd774aa43',
//     },
// ]
