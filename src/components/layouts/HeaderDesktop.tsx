'use client'

import { cn } from '@/utils'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { APP_METADATA } from '@/config/app.config'
import ThemeSwitcher from './ThemeSwitcher'
import { AppUrls, IconIds } from '@/enums'
import IconWrapper from '../common/IconWrapper'
import LinkWrapper from '../common/LinkWrapper'

export default function HeaderDesktop(props: { className?: string }) {
    const [openGridDropdown, setOpenGridDropdown] = useState(false)
    const gridDropown = useRef<HTMLButtonElement>(null)
    useClickOutside(gridDropown, () => setOpenGridDropdown(false))

    /**
     * manage url sync with currently selected chain and tokens
     */

    return (
        <header className={cn('hidden lg:grid grid-cols-3 items-center w-full px-4 py-4', props.className)}>
            {/* left */}
            <div className="ml-2 flex gap-4 items-center">
                {/* grid */}
                <button ref={gridDropown} onClick={() => setOpenGridDropdown(!openGridDropdown)} className="relative hidden">
                    <div className="p-2.5 rounded-xl">
                        <Image src={'/dots-grid.svg'} alt="dots-grid" width={16} height={16} className="min-w-4" />
                    </div>
                    <div
                        className={cn(
                            `absolute left-0 mt-2 w-52 rounded-2xl backdrop-blur-lg border-2 shadow-lg p-2 transition-all origin-top-left flex flex-col items-start z-10 gap-1`,
                            {
                                'scale-100 opacity-100': openGridDropdown,
                                'scale-95 opacity-0 pointer-events-none': !openGridDropdown,
                            },
                        )}
                    >
                        <div className="cursor-not-allowed p-2.5 w-full rounded-xl flex justify-between items-center">
                            <p className="text-sm text-gray-500 text-left">Explorer</p>
                            <p className="bg-white/20 px-1 font-semibold rounded-sm text-xs text-background">SOON</p>
                        </div>
                        <div onClick={() => setOpenGridDropdown(false)} className="bg-gray-600/20 p-2.5 w-full rounded-xl">
                            <p className="text-sm text-left">Orderbook</p>
                        </div>
                    </div>
                </button>

                {/* logo */}
                <p className="text-sm font-light tracking-wider">{APP_METADATA.SITE_NAME} 🛒</p>
            </div>

            {/* middle */}
            <div className="flex gap-8 justify-center items-center text-xs">
                {/* unit */}
                <LinkWrapper
                    href={AppUrls.HL_ECOSYSTEM}
                    target="_blank"
                    className="flex items-center gap-1 cursor-alias hover:underline opacity-30 hover:opacity-100 transition-all duration-300 ease-in-out"
                >
                    <p className="truncate">Ecosystem</p>
                    <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-4" />
                </LinkWrapper>

                {/* unit */}
                <LinkWrapper
                    href={AppUrls.HYPERUNIT}
                    target="_blank"
                    className="flex items-center gap-1 cursor-alias hover:underline opacity-30 hover:opacity-100 transition-all duration-300 ease-in-out"
                >
                    <p className="truncate">Hyperunit</p>
                    <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-4" />
                </LinkWrapper>

                {/* hl */}
                <LinkWrapper
                    href={AppUrls.HL_APP}
                    target="_blank"
                    className="flex items-center gap-1 cursor-alias hover:underline opacity-30 hover:opacity-100 transition-all duration-300 ease-in-out"
                >
                    <p className="truncate">Hyperliquid</p>
                    <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-4" />
                </LinkWrapper>
            </div>

            {/* right */}
            <div className="flex z-20 items-center justify-end">
                {/* theme */}
                <ThemeSwitcher />

                {/* hl */}
                {/* <LinkWrapper
                    href={AppUrls.HL_APP}
                    target="_blank"
                    className="flex items-center gap-1 px-2.5 cursor-alias w-max hover:underline ml-4 mr-6"
                >
                    <p className="text-sm truncate">Hyperliquid</p>
                    <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-4" />
                </LinkWrapper> */}
            </div>
        </header>
    )
}
