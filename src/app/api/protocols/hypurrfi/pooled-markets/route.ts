import { createAaveApiRoute, HYPURRFI_ABI } from '@/utils/aave-api.util'
import { HYPEREVM_CHAIN_ID, PROTOCOL_CONTRACTS } from '@/config/protocols-data.config'

export const runtime = 'nodejs'

export async function GET() {
    return await createAaveApiRoute({
        poolAddressesProvider: PROTOCOL_CONTRACTS.hypurrfi.poolAddressesProvider,
        uiPoolDataProvider: PROTOCOL_CONTRACTS.hypurrfi.uiPoolDataProvider,
        chainId: HYPEREVM_CHAIN_ID,
        abi: HYPURRFI_ABI,
        protocol: 'hypurrfi',
        requiresVirtualAccActive: true,
    })
}
