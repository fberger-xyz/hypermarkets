'use client'

import { APP_METADATA, APP_PAGES } from '@/config/app.config'
import { useAppStore } from '@/stores/app.store'
import { cn, isCurrentPath } from '@/utils'
import { useRef, useState, Suspense } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import Image from 'next/image'
import { AppUrls, IconIds } from '@/enums'
import IconWrapper from '../common/IconWrapper'
import LinkWrapper from '../common/LinkWrapper'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcutArgs'
import ThemeSwitcher from './ThemeSwitcher'
import { usePathname } from 'next/navigation'

export default function HeaderMobile() {
    const { showMobileMenu, setShowMobileMenu } = useAppStore()
    const pathname = usePathname()

    // grid
    const [openGridDropdown, setOpenGridDropdown] = useState(false)
    const gridDropown = useRef<HTMLButtonElement>(null)
    useClickOutside(gridDropown, () => setOpenGridDropdown(false))

    // menu
    const menuDropdown = useRef<HTMLButtonElement>(null)
    useKeyboardShortcut({ key: 'Escape', onKeyPressed: () => setShowMobileMenu(false) })

    return (
        <header className={cn('flex justify-center z-50 w-full', { 'fixed top-0': showMobileMenu })}>
            <div className="w-full lg:hidden flex justify-between px-5 pt-4 ">
                {/* left */}
                <div className="ml-2 flex gap-4 items-center z-30">
                    {/* grid */}
                    <button ref={gridDropown} className="relative hidden" onClick={() => setOpenGridDropdown(!openGridDropdown)}>
                        <div className="p-2 rounded-xl">
                            <Image src={'/dots-grid.svg'} alt="dots-grid" width={16} height={16} className="min-w-5" />
                        </div>

                        {/* grid dropdown */}
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
                                <p className="text-sm text-left">{APP_METADATA.SITE_NAME}</p>
                                <p className="bg-white/20 px-1 font-semibold rounded-sm text-xs text-background">SOON</p>
                            </div>
                            <div onClick={() => setOpenGridDropdown(false)} className="p-2.5 w-full rounded-xl">
                                <p className="text-sm text-left">{APP_METADATA.SITE_NAME}</p>
                            </div>
                        </div>
                    </button>

                    {/* logo */}
                    <p className="text-lg font-light tracking-wider">{APP_METADATA.SITE_NAME} 🛒</p>
                </div>

                {/* right */}
                <div className="flex gap-2 z-30">
                    {/* menu */}
                    <button
                        ref={menuDropdown}
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className={cn('flex items-center gap-1 transition-colors duration-300 rounded-xl py-2 px-3 hover:bg-default/10', {
                            'bg-default/5': showMobileMenu,
                        })}
                    >
                        <IconWrapper id={showMobileMenu ? IconIds.CLOSE : IconIds.MENU} className="size-8" />
                    </button>
                </div>

                {showMobileMenu && (
                    <div
                        className="fixed z-20 inset-0 flex size-full items-center justify-center px-4 backdrop-blur-xl bg-default/5"
                        onClick={(e) => {
                            // to improve later
                            if (e.target === e.currentTarget) {
                                setShowMobileMenu(false)
                            }
                        }}
                    >
                        <Suspense
                            fallback={
                                <nav className="absolute inset-2 z-30 flex items-center justify-center h-fit flex-col gap-2 pt-28">
                                    {[1, 2, 3].map((index) => (
                                        <div key={index}>
                                            <p className="text-base p-2.5 skeleton-loading text-transparent">----------------------</p>
                                        </div>
                                    ))}
                                </nav>
                            }
                        >
                            <nav className="absolute inset-2 z-30 flex items-center justify-center h-fit flex-col gap-4 pt-28 mx-auto w-fit text-xl">
                                {/* theme */}
                                <ThemeSwitcher buttonClassName="py-4 px-7 rounded-xl" iconClassName="size-7" />

                                {/* internal */}
                                {APP_PAGES.map((page) => (
                                    <LinkWrapper
                                        key={page.path}
                                        href={page.path}
                                        className={cn('w-full p-4 hover:bg-default/10 rounded-xl cursor-pointer flex justify-center', {
                                            'bg-default/5 text-primary': isCurrentPath(pathname, page.path),
                                            'font-light text-default/50': !isCurrentPath(pathname, page.path),
                                        })}
                                    >
                                        <p>{page.name}</p>
                                    </LinkWrapper>
                                ))}

                                {/* external */}
                                <LinkWrapper
                                    href={AppUrls.HL_APP}
                                    target="_blank"
                                    className="mt-8 gap-2 p-4 items-center hover:bg-default/10 rounded-xl cursor-pointer w-full flex justify-center opacity-70 hover:opacity-100"
                                >
                                    <p className="truncate">Hyperliquid</p>
                                    <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-5" />
                                </LinkWrapper>
                                <LinkWrapper
                                    href={AppUrls.HYPERUNIT}
                                    target="_blank"
                                    className="gap-2 p-4 items-center hover:bg-default/10 rounded-xl cursor-pointer w-full flex justify-center opacity-70 hover:opacity-100"
                                >
                                    <p className="truncate">Hyperunit</p>
                                    <IconWrapper id={IconIds.OPEN_LINK_IN_NEW_TAB} className="size-5" />
                                </LinkWrapper>
                            </nav>
                        </Suspense>
                    </div>
                )}
            </div>
        </header>
    )
}
