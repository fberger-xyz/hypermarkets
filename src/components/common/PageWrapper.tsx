import { cn } from '@/utils'

export default function PageWrapper({ children, className, ...props }: { children: React.ReactNode; className?: string; showQuote?: boolean }) {
    return (
        <div
            {...props}
            className={cn(
                'flex min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-137px)] h-full w-full max-w-[1100px] rounded-xl mx-auto flex-col items-start gap-10 px-4 overflow-x-hidden overflow-y-scroll mb-4',
                className,
            )}
        >
            {children}
        </div>
    )
}
