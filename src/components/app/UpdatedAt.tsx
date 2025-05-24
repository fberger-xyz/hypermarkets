'use client'

import useTimeAgo from '@/hooks/useTimeAgo'
import { useAppStore } from '@/stores/app.store'

export default function UpdatedAt() {
    const { appStoreRefreshedAt } = useAppStore()
    const timeago = useTimeAgo(appStoreRefreshedAt ?? Date.now())
    return (
        <div className="mx-auto text-primary font-light text-sm">
            {appStoreRefreshedAt > 0 && !timeago.includes('year') ? (
                <div className="flex flex-col items-center">
                    <p>Markets data refreshed every 30s</p>
                    <p className="text-default/40 text-xs">Last update: {timeago}</p>
                </div>
            ) : (
                <p>Loading current APYs...</p>
            )}
        </div>
    )
}
