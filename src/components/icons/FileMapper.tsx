import { FileIds, SupportedUnderlyingAssetSymbols } from '@/enums'
import { cn } from '@/utils'
import { ReactNode } from 'react'
import DarkThemeSVG from './DarkThemeSVG'
import LightThemeSVG from './LightThemeSVG'
import { SupportedProtocolNames } from '@/enums'
import Image from 'next/image'

export function FileWrapper(props: { children: ReactNode; className?: string }) {
    return <div className={cn('flex items-center justify-center relative', props.className)}>{props.children}</div>
}

export default function FileMapper({
    className = 'size-5',
    sizes = '20px',
    ...props
}: {
    id?: FileIds | SupportedProtocolNames | SupportedUnderlyingAssetSymbols | string
    sizes?: string
    className?: string
}) {
    // theme
    if (props.id === FileIds.THEME_LIGHT) return <LightThemeSVG className={className} />
    if (props.id === FileIds.THEME_DARK) return <DarkThemeSVG className={className} />

    // protocols
    if (props.id === SupportedProtocolNames.HYPERLEND)
        return (
            <FileWrapper className={className}>
                <Image src={`/protocols/${props.id}.png`} alt={`${props.id} logo`} sizes={sizes} fill className={className} />
            </FileWrapper>
        )
    if (props.id === SupportedProtocolNames.FELIX)
        return (
            <FileWrapper className={className}>
                <Image src={`/protocols/${props.id}.jpeg`} alt={`${props.id} logo`} sizes={sizes} fill className={className} />
            </FileWrapper>
        )
    if (props.id === SupportedProtocolNames.HYPURRFI)
        return (
            <FileWrapper className={className}>
                <Image src={`/protocols/${props.id}.png`} alt={`${props.id} logo`} sizes={sizes} fill className={`${className} bg-default/50`} />
            </FileWrapper>
        )
    if (props.id === SupportedProtocolNames.HYPERSWAP)
        return (
            <FileWrapper className={className}>
                <Image src={`/protocols/${props.id}.jpeg`} alt={`${props.id} logo`} sizes={sizes} fill className={className} />
            </FileWrapper>
        )
    if (props.id === SupportedProtocolNames.HYPERBEAT)
        return (
            <FileWrapper className={className}>
                <Image src={`/protocols/${props.id}.png`} alt={`${props.id} logo`} sizes={sizes} fill className={`${className} bg-default/50`} />
            </FileWrapper>
        )

    // underlyings
    if (props.id === SupportedUnderlyingAssetSymbols.BTC)
        return (
            <FileWrapper className={className}>
                <Image src={`/underlyings/${props.id.toLowerCase()}.png`} alt={`${props.id} logo`} sizes={sizes} fill className={className} />
            </FileWrapper>
        )
    if (props.id === SupportedUnderlyingAssetSymbols.ETH)
        return (
            <FileWrapper className={className}>
                <Image src={`/underlyings/${props.id.toLowerCase()}.png`} alt={`${props.id} logo`} sizes={sizes} fill className={className} />
            </FileWrapper>
        )
    if (props.id === SupportedUnderlyingAssetSymbols.HYPE)
        return (
            <FileWrapper className={className}>
                <Image src={`/underlyings/${props.id.toLowerCase()}.png`} alt={`${props.id} logo`} sizes={sizes} fill className={className} />
            </FileWrapper>
        )
    if (props.id === SupportedUnderlyingAssetSymbols.USD)
        return (
            <FileWrapper className={className}>
                <Image
                    // src={`/underlyings/${props.id.toLowerCase()}.png`}
                    src={`/underlyings/trump.png`}
                    alt={`${props.id} logo`}
                    sizes={sizes}
                    fill
                    className={`${className} bg-default`}
                />
            </FileWrapper>
        )

    // fallback
    return <div className={cn('bg-gray-500 rounded-full', className)} />
}
