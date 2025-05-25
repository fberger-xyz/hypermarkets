import { IconIds } from '@/enums'
import IconWrapper from '../common/IconWrapper'
import { cn } from '@/utils'

export default function AscDescFilters(props: { up?: boolean; down?: boolean }) {
    return (
        <div className="flex flex-col">
            <IconWrapper id={IconIds.TRIANGLE_UP} className={cn('size-6', { 'text-primary': props.up, 'opacity-30': !props.up })} />
            <IconWrapper id={IconIds.TRIANGLE_DOWN} className={cn('size-6 -mt-[18px]', { 'text-primary': props.down, 'opacity-30': !props.down })} />
        </div>
    )
}
