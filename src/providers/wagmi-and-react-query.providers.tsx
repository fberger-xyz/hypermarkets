// https://docs.family.co/connectkit/getting-started#getting-started-nextjs-app-router
// https://wagmi-safe-integration.vercel.app/

'use client'

import * as React from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import { config } from './wagmi'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Disable queries during SSR to prevent hydration issues
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
        },
    },
})

export function WagmiAndReactQueryProviders({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>{mounted ? <ConnectKitProvider>{children}</ConnectKitProvider> : children}</QueryClientProvider>
        </WagmiProvider>
    )
}
