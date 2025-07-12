import { HyperbeatVaults, SupportedProtocolNames } from '@/enums'
import { EnrichedHyperbeatVault, EnrichedMorphobeatVault, HyperbeatVault, MorphobeatVault } from '@/interfaces'
import { fetchWithTimeout, initOutput } from '@/utils'
import { HYPERBEAT_VAULTS_DATA, EXTERNAL_APIS } from '@/config/protocols-data.config'
import { NextResponse } from 'next/server'

export async function GET() {
    // prepare the response object
    const debug = false
    const responseBody = initOutput<(EnrichedHyperbeatVault | EnrichedMorphobeatVault)[]>()

    try {
        // debug
        if (debug) console.log(`fetching ${SupportedProtocolNames.HYPERBEAT} ...`)

        // run req
        const url = EXTERNAL_APIS.hyperbeat
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
                    address: HYPERBEAT_VAULTS_DATA.find((data) => data.id === vault.name)?.contract ?? '',
                    supplyAPY: HYPERBEAT_VAULTS_DATA.find((data) => data.id === vault.name)?.supplyAPY ?? -1,
                    name: HYPERBEAT_VAULTS_DATA.find((data) => data.id === vault.name)?.name ?? '',
                    supplyUsd: vault.totalValueInUSD,
                    token: HYPERBEAT_VAULTS_DATA.find((data) => data.id === vault.name)?.token ?? '',
                    contract: HYPERBEAT_VAULTS_DATA.find((data) => data.id === vault.name)?.contract ?? '',
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
