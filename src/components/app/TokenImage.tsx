'use client'

import { HyperswapToken } from '@/interfaces'
import ImageWrapper from '../common/ImageWrapper'

// https://github.com/HyperSwapX/hyperswap-token-list
export default function TokenImage(props: { token: HyperswapToken; className?: string; size?: number }) {
    if (!props.token.logoURI) return <span className="animate-pulse rounded-full bg-milk-150" style={{ width: props.size, height: props.size }} />
    return (
        <ImageWrapper
            src={props.token.logoURI}
            size={props.size ?? 20}
            alt={`Logo of ${props.token.logoURI.toLowerCase() ?? 'unknown'}`}
            className={props.className}
        />
    )
}
