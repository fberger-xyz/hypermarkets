'use client'

import { cn } from '@/utils'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import IconWrapper from '../common/IconWrapper'
import { APP_THEMES } from '@/config/app.config'

export default function ThemeSwitcher({
    containerClassName = 'gap-2',
    buttonClassName = 'px-3 py-2 rounded-xl',
    iconClassName = 'size-6 rounded-xl',
}: {
    containerClassName?: string
    buttonClassName?: string
    iconClassName?: string
}) {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()
    useEffect(() => setMounted(true), [])
    return (
        <div className={cn('z-50 flex items-center', containerClassName)}>
            {Object.entries(APP_THEMES)
                .sort((curr, next) => curr[1].index - next[1].index)
                .map(([theme, config]) => (
                    <button
                        key={theme}
                        onClick={() => setTheme(theme)}
                        className={cn('hover:bg-default/10 transition-all duration-200 ease-in-out', buttonClassName, {
                            'bg-default/5 text-primary': resolvedTheme === theme,
                            'text-inactive opacity-50 hover:text-default': resolvedTheme !== theme,
                            'skeleton-loading': !mounted,
                        })}
                    >
                        {mounted ? <IconWrapper id={config.iconId} className={cn('m-auto', iconClassName)} /> : <div className={iconClassName} />}
                    </button>
                ))}
        </div>
    )
}
