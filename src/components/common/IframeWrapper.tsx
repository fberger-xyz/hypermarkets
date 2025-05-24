'use client'

import { useState } from 'react'

const IframeWrapper: React.FC<{
    src?: string
    width?: string
    height?: string
}> = ({ src, width = 'w-[300px] md:w-[600px]', height = 'h-[300px]' }) => {
    const [isLoading, setIsLoading] = useState(true)
    return (
        <div className={`relative z-10 ${width} ${height}`}>
            {isLoading && (
                <div className="absolute inset-0 z-10 flex animate-pulse items-center justify-center bg-background">
                    <div className="size-10 animate-spin rounded-full border-t-primary" />
                </div>
            )}
            <iframe src={src} className={`absolute left-0 top-0 z-10 rounded-xl ${width} ${height}`} onLoad={() => setIsLoading(false)} />
        </div>
    )
}

export default IframeWrapper
