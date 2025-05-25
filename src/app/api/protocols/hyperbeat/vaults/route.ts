import { HyperbeatVaults, SupportedProtocolNames } from '@/enums'
import { EnrichedHyperbeatVault, EnrichedMorphobeatVault, HyperbeatVault, MorphobeatVault } from '@/interfaces'
import { fetchWithTimeout, initOutput } from '@/utils'
import { NextResponse } from 'next/server'

const hardcodedHyperbeatVaultsData = [
    {
        id: 'usdt',
        name: 'Hyperbeat USDT',
        provider: HyperbeatVaults.NATIVE,
        contract: '0x5e105266db42f78fa814322bce7f388b4c2e61eb',
        supplyAPY: 0.25,
        token: '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb',
    },
    {
        id: 'hype',
        name: 'Hyperbeat Ultra HYPE',
        provider: HyperbeatVaults.NATIVE,
        contract: '0x96c6cbb6251ee1c257b2162ca0f39aa5fa44b1fb',
        supplyAPY: 0.06,
        token: '0x5555555555555555555555555555555555555555',
    },
    {
        id: 'ubtc',
        name: 'Hyperbeat Ultra UBTC',
        provider: HyperbeatVaults.NATIVE,
        contract: '0xc061d38903b99ac12713b550c2cb44b221674f94',
        supplyAPY: 0.025,
        token: '0x9FDBdA0A5e284c32744D2f17Ee5c74B284993463',
    },
]

export async function GET() {
    // prepare the response object
    const debug = false
    const responseBody = initOutput<(EnrichedHyperbeatVault | EnrichedMorphobeatVault)[]>()

    try {
        // debug
        if (debug) console.log(`fetching ${SupportedProtocolNames.HYPERBEAT} ...`)

        // run req
        const url = 'https://app.hyperbeat.org/api/combinedTvl'
        const fetchResponse = await fetchWithTimeout(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        })

        // error
        if (!fetchResponse.ok) {
            responseBody.error = `Error fetching ${url}`
            return NextResponse.json(responseBody, { status: fetchResponse.status })
        }

        /**
         * parse
         */

        const vaults = (await fetchResponse.json()) as (HyperbeatVault | MorphobeatVault)[]
        const enrichedVaults = vaults.map((vault): EnrichedHyperbeatVault | EnrichedMorphobeatVault => {
            if ('address' in vault) {
                return {
                    ...vault,
                    id: vault.address,
                    provider: HyperbeatVaults.MORPHO as const,
                    supplyAPY: 0.25,
                    supplyUsd: vault.totalSupply,
                    token: '',
                    contract: vault.address,
                }
            } else {
                return {
                    ...vault,
                    id: vault.name,
                    provider: HyperbeatVaults.NATIVE as const,
                    address: hardcodedHyperbeatVaultsData.find((data) => data.id === vault.name)?.contract ?? '',
                    supplyAPY: hardcodedHyperbeatVaultsData.find((data) => data.id === vault.name)?.supplyAPY ?? -1,
                    name: hardcodedHyperbeatVaultsData.find((data) => data.id === vault.name)?.name ?? '',
                    supplyUsd: vault.totalValueInUSD,
                    token: hardcodedHyperbeatVaultsData.find((data) => data.id === vault.name)?.token ?? '',
                    contract: hardcodedHyperbeatVaultsData.find((data) => data.id === vault.name)?.contract ?? '',
                }
            }
        })

        /**
         * finally
         */

        responseBody.data = enrichedVaults
        responseBody.success = true
        return NextResponse.json(responseBody)
    } catch (error) {
        responseBody.error = `Internal server error while fetching ${SupportedProtocolNames.FELIX}.`
        return NextResponse.json(responseBody, { status: 500 })
    }
}
