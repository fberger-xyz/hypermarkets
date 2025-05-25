'use client'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(relativeTime)

import { cn } from '@/utils'
import LinkWrapper from '../common/LinkWrapper'
import { AppUrls, IconIds } from '@/enums'
import IframeWrapper from '../common/IframeWrapper'
import StyledTooltip from '../common/StyledTooltip'
import IconWrapper from '../common/IconWrapper'
import DeployedAt from '../app/DeployedAt'

export default function Footer(props: { className?: string }) {
    const [commitDate, setCommitDate] = useState<null | Date>(null)
    useEffect(() => {
        const timestamp = process.env.NEXT_PUBLIC_COMMIT_TIMESTAMP
        if (timestamp) {
            const date = new Date(parseInt(timestamp, 10) * 1000)
            setCommitDate(date)
        }
    }, [])
    if (!commitDate) return null
    return (
        <footer
            className={cn(
                'w-full flex flex-col items-center lg:flex-row lg:justify-between lg:items-end py-4 px-8 font-light text-xs gap-1',
                props.className,
            )}
        >
            {/* left */}
            <div className="flex flex-col gap-1 lg:gap-8 lg:flex-row items-center">
                {/* <p className="truncate opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out">
                    2025 © {SITE_URL.replace('https://', '')}
                </p> */}
                <DeployedAt commitDate={commitDate} />
            </div>

            {/* right */}
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-8 items-center">
                {/* author */}
                <p className="opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out">
                    By
                    <StyledTooltip placement="top" closeDelay={500} content={<IframeWrapper src={AppUrls.AUTHOR_WEBSITE} />}>
                        <LinkWrapper href={AppUrls.AUTHOR_WEBSITE} target="_blank" className="cursor-alias hover:underline hover:text-primary pl-1">
                            @fberger_xyz
                        </LinkWrapper>
                    </StyledTooltip>
                </p>

                {/* hl */}
                <LinkWrapper
                    href={AppUrls.HL_APP}
                    target="_blank"
                    className="flex items-center gap-1 cursor-alias hover:underline opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out"
                >
                    <p className="truncate">Hyperliquid</p>
                    <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-4" />
                </LinkWrapper>
            </div>
        </footer>
    )
}
