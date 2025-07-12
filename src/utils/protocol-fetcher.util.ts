import { SITE_DOMAIN } from '@/config/app.config'
import { fetchWithTimeout, initOutput } from './requests.util'
import { extractErrorMessage } from './error.util'
import { StructuredOutput } from '@/interfaces'

export interface ProtocolConfig<T> {
    name: string
    endpoint: string
    processor?: (data: T[]) => T[]
}

export async function createProtocolFetcher<T>(config: ProtocolConfig<T>): Promise<StructuredOutput<T[]>> {
    const fnName = `fetch${config.name}`
    const output = initOutput<T[]>()

    try {
        const response = await fetchWithTimeout(`${SITE_DOMAIN}${config.endpoint}`)
        if (!response.ok) throw new Error(`${fnName}: !response.ok`)

        const responseJson = (await response.json()) as StructuredOutput<T[]>
        output.data = config.processor ? config.processor(responseJson.data || []) : responseJson.data
        output.success = true
    } catch (error) {
        output.error = extractErrorMessage(error)
        console.error(fnName, { error: output.error })
    }

    return output
}

export const PROTOCOL_CONFIGS = {
    hyperlend: {
        name: 'HyperlendReserves',
        endpoint: '/api/protocols/hyperlend/markets',
    },
    hypurrfi: {
        name: 'HypurrFiReserves',
        endpoint: '/api/protocols/hypurrfi/pooled-markets',
    },
    hyperbeat: {
        name: 'HyperbeatVaults',
        endpoint: '/api/protocols/hyperbeat/vaults',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        processor: (data: any[]) => data?.filter((vault) => !!vault.address) || [],
    },
} as const
