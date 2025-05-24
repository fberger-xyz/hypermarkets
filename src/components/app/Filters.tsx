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
    isActive: boolean
    tooltipContent: ReactNode
}

export const FilterWrapper: React.FC<FilterWrapperProps> = ({ isActive, tooltipContent, ...props }) => {
    return (
        <StyledTooltip content={tooltipContent} disableAnimation placement="bottom">
            <button
                {...props}
                className={cn('rounded-xl px-3 py-2 cursor-pointer border-2', {
                    'border-primary': isActive,
                    'border-default/50 grayscale hover:grayscale-0 opacity-30': !isActive,
                })}
            >
                {props.children}
            </button>
        </StyledTooltip>
    )
}
