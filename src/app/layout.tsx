import type { Metadata } from 'next'
import './globals.css'
import { INTER_FONT, APP_METADATA } from '../config/app.config'
import { cn } from '../utils'
import { Suspense } from 'react'
import DefaultFallback from '@/components/layouts/DefaultFallback'
import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorBoundaryFallback } from '@/components/common/ErrorBoundaryFallback'
import Footer from '@/components/layouts/Footer'
import { Analytics } from '@/components/analytics/GoogleAnalytics'
import HeaderDesktop from '@/components/layouts/HeaderDesktop'
import HeaderMobile from '@/components/layouts/HeaderMobile'
import { WagmiAndReactQueryProviders } from '@/providers/wagmi-and-react-query.providers'
import { ThemeProvider } from 'next-themes'
import { AppThemes } from '@/enums'

export const metadata: Metadata = {
    icons: {
        icon: '/favicon.svg',
    },
    title: APP_METADATA.SITE_NAME,
    description: APP_METADATA.SITE_DESCRIPTION,
    metadataBase: new URL(APP_METADATA.SITE_URL),
    manifest: '/manifest.json',
    appleWebApp: {
        title: APP_METADATA.SITE_NAME,
        capable: true,
        statusBarStyle: 'black-translucent',
    },
    openGraph: {
        type: 'website',
        title: APP_METADATA.SITE_URL.replace('https://', ''),
        siteName: APP_METADATA.SITE_NAME,
        description: APP_METADATA.SITE_DESCRIPTION,
        url: APP_METADATA.SITE_URL,
        // images: [
        //     {
        //         url: '/background.jpg',
        //         width: 1100,
        //         height: 400,
        //         alt: 'Alt',
        //         type: 'image/jpg',
        //     },
        // ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@fberger_xyz',
        title: APP_METADATA.SITE_NAME,
        description: APP_METADATA.SITE_DESCRIPTION,
        // images: [
        //     {
        //         url: '/background.jpg',
        //         width: 1100,
        //         height: 400,
        //         alt: 'Alt',
        //         type: 'image/jpg',
        //     },
        // ],
    },
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="h-screen w-screen bg-background">
            <body
                className={cn(
                    INTER_FONT.className,
                    INTER_FONT.variable,
                    'relative h-screen w-screen bg-background overflow-x-auto overflow-y-auto text-default',
                )}
            >
                <div
                    className="fixed inset-0 z-0"
                    style={{
                        backgroundImage: "url('/background.jpg')",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center top',
                        backgroundAttachment: 'fixed',
                        filter: 'blur(6px)',
                        opacity: 0.05,
                        pointerEvents: 'none',
                    }}
                />
                <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange themes={Object.values(AppThemes)}>
                    <WagmiAndReactQueryProviders>
                        <main className="relative">
                            <div className="absolute -top-[600px] -z-20 h-[800px] w-full rounded-full bg-primary opacity-5 blur-3xl dark:opacity-[0.08]" />
                            <Suspense fallback={null}>
                                <HeaderDesktop />
                                <HeaderMobile />
                            </Suspense>
                            <Suspense fallback={<DefaultFallback />}>
                                <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>{children}</ErrorBoundary>
                            </Suspense>
                            <Suspense fallback={null}>
                                <Footer />
                            </Suspense>
                            <Toaster position="bottom-center" reverseOrder={true} />
                        </main>
                    </WagmiAndReactQueryProviders>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    )
}
