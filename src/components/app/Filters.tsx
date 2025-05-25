import { cn } from '@/utils'
import { ReactNode } from 'react'
import StyledTooltip from '../common/StyledTooltip'

export const FilterSection = (props: { title: string; children: ReactNode }) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="mx-auto font-light text-primary">{props.title}</p>
            <div className="flex flex-wrap gap-2">{props.children}</div>
        </div>
    )
}

interface FilterWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    integrated?: boolean
    isActive: boolean
    tooltipContent: ReactNode
}

export const FilterWrapper: React.FC<FilterWrapperProps> = ({ isActive, integrated = true, tooltipContent, ...props }) => {
    return (
        <StyledTooltip content={tooltipContent} disableAnimation closeDelay={500} placement="bottom">
            <button
                {...props}
                className={cn('rounded-xl px-3 py-2 cursor-pointer border-2', {
                    'border-primary': integrated && isActive,
                    'border-default/50 grayscale hover:grayscale-0 opacity-30': integrated && !isActive,
                    'border-default/50 grayscale opacity-30 cursor-not-allowed': !integrated,
                })}
            >
                {props.children}
            </button>
        </StyledTooltip>
    )
}
