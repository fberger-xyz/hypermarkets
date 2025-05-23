import { FileIds } from '@/enums'
import { cn } from '@/utils'
import { ReactNode } from 'react'
import DarkThemeSVG from './DarkThemeSVG'
import LightThemeSVG from './LightThemeSVG'
import { SupportedProtocolNames } from '@/enums/hyperevm.enum'
import Image from 'next/image'

export function FileWrapper(props: { children: ReactNode; className?: string }) {
    return <div className={cn('flex items-center justify-center relative', props.className)}>{props.children}</div>
}

export default function FileMapper(props: { id?: FileIds | SupportedProtocolNames; className?: string }) {
    if (props.id === FileIds.THEME_LIGHT) return <LightThemeSVG className={props.className} />
    if (props.id === FileIds.THEME_DARK) return <DarkThemeSVG className={props.className} />
    if (props.id === SupportedProtocolNames.HYPERLEND)
        return (
            <FileWrapper className={props.className}>
                <Image src={`/protocols/${props.id}.png`} alt={`${props.id} logo`} fill className={props.className} />
            </FileWrapper>
        )
    if (props.id === SupportedProtocolNames.FELIX)
        return (
            <FileWrapper className={props.className}>
                <Image src={`/protocols/${props.id}.jpeg`} alt={`${props.id} logo`} fill className={props.className} />
            </FileWrapper>
        )
    if (props.id === SupportedProtocolNames.HYPURRRFI)
        return (
            <FileWrapper className={props.className}>
                <Image src={`/protocols/${props.id}.png`} alt={`${props.id} logo`} fill className={props.className} />
            </FileWrapper>
        )
    if (props.id === SupportedProtocolNames.HYPERSWAP)
        return (
            <FileWrapper className={props.className}>
                <Image src={`/protocols/${props.id}.jpeg`} alt={`${props.id} logo`} fill className={props.className} />
            </FileWrapper>
        )
    if (props.id === SupportedProtocolNames.HYPERBEAT)
        return (
            <FileWrapper className={props.className}>
                <Image src={`/protocols/${props.id}.png`} alt={`${props.id} logo`} fill className={props.className} />
            </FileWrapper>
        )

    // fallback
    return <span className={cn('bg-gray-500', props.className)} />
}
