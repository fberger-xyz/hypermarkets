import { IconIds } from '@/enums'
import IconWrapper from '../common/IconWrapper'

export default function AscDescFilters() {
    return (
        <div className="flex flex-col">
            <IconWrapper id={IconIds.TRIANGLE_UP} className="size-6 opacity-30" />
            <IconWrapper id={IconIds.TRIANGLE_DOWN} className="size-6 opacity-30 -mt-[18px]" />
        </div>
    )
}
