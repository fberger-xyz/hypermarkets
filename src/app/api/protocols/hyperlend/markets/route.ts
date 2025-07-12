import { createAaveApiRoute, HYPERLEND_ABI } from '@/utils/aave-api.util'
import { HYPEREVM_CHAIN_ID, PROTOCOL_CONTRACTS } from '@/config/protocols-data.config'

export const runtime = 'nodejs'

export async function GET() {
    return await createAaveApiRoute({
        poolAddressesProvider: PROTOCOL_CONTRACTS.hyperlend.poolAddressesProvider,
        uiPoolDataProvider: PROTOCOL_CONTRACTS.hyperlend.uiPoolDataProvider,
        chainId: HYPEREVM_CHAIN_ID,
        abi: HYPERLEND_ABI,
        protocol: 'hyperlend',
    })
}
