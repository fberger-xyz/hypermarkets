import PageWrapper from '../common/PageWrapper'

export function DefaultFallbackContent() {
    return (
        <div className="size-full flex flex-col gap-4 max-w-[1200px] mx-auto">
            <div className="skeleton-loading h-28" />
            <div className="skeleton-loading h-80" />
        </div>
    )
}

export default function DefaultFallback() {
    return (
        <PageWrapper>
            <DefaultFallbackContent />
        </PageWrapper>
    )
}
