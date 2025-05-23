'use client'

import { useQueries } from '@tanstack/react-query'
import { APP_PROTOCOLS } from '@/config/protocols.config'
import { cn } from '@/utils'
import StyledTooltip from '../common/StyledTooltip'
import LinkWrapper from '../common/LinkWrapper'
import IframeWrapper from '../common/IframeWrapper'
import FileMapper from '../icons/FileMapper'

export default function Home() {
    useQueries({
        queries: [
            {
                queryKey: ['TBA'],
                enabled: true,
                queryFn: async () => {
                    return null
                },
                refetchOnWindowFocus: false,
                refetchInterval: 1000 * 60 * 5,
            },
        ],
    })

    return (
        <div className="flex flex-col gap-2 p-2 w-full">
            {Object.values(APP_PROTOCOLS).map((protocolConfig) => (
                <div
                    key={protocolConfig.name}
                    className={cn('flex items-center gap-3 bg-default/5 p-3 rounded-xl', { grayscale: protocolConfig.integrated })}
                >
                    <FileMapper id={protocolConfig.name} className="size-8 rounded-lg bg-[#CBEBE5]" />
                    <p className="font-bold text-xl">{protocolConfig.name}</p>

                    {/* todo: urls */}
                    <LinkWrapper href={protocolConfig.urls.docs} target="_blank" className="cursor-alias hover:underline">
                        docs
                    </LinkWrapper>

                    <StyledTooltip placement="top" closeDelay={100} content={<IframeWrapper src={protocolConfig.urls.website} />}>
                        <LinkWrapper
                            href={protocolConfig.urls.website}
                            target="_blank"
                            className="cursor-alias hover:underline hover:text-primary pl-1"
                        >
                            website
                        </LinkWrapper>
                    </StyledTooltip>
                </div>
            ))}
        </div>
    )
}
