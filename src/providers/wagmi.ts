import { APP_METADATA, RPCS, SITE_DOMAIN } from '@/config/app.config'
import { getDefaultConfig } from 'connectkit'
import { createConfig, http } from 'wagmi'
import { type Chain } from 'viem'

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not defined')
}

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

const hyperEVMChain: Chain = {
    id: 999,
    name: 'HyperEVM',
    nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: RPCS },
        public: { http: RPCS },
    },
}

const configParams = getDefaultConfig({
    walletConnectProjectId: projectId,
    appUrl: SITE_DOMAIN,
    transports: { 999: http(RPCS[0]) },
    appName: APP_METADATA.SITE_NAME,
    ssr: true,
    chains: [hyperEVMChain],
})

export const config = createConfig(configParams)
