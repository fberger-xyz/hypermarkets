import { APP_METADATA, RPCS, SITE_DOMAIN } from '@/config/app.config'
import { getDefaultConfig } from 'connectkit'
import { createConfig, http } from 'wagmi'

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? ''
if (!projectId) throw new Error('WALLET_CONNECT_PROJECT_ID is not defined')

const configParams = getDefaultConfig({
    walletConnectProjectId: projectId,
    appUrl: SITE_DOMAIN,
    transports: { 999: http(RPCS[0]) },
    appName: APP_METADATA.SITE_NAME,
    ssr: true,
})

export const config = createConfig(configParams)
