import { cn } from '@/shared/lib/utils'
import { Package } from 'lucide-react'
import React from 'react'

interface Props {
    title?: string,
    value?: string,
    icone?: React.ReactNode,
    className?: string
}

export const CheckoutItemsDetails: React.FC<Props> = ({ title, value, icone, className }) => {
  return (
    <div className={cn("flex my-4 items-center gap-2", className)}>
    {icone}
    <span className="flex flex-1 text-lg text-neutral-500">
        {title}
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
    </span>
    <span className="text-lg font-bold">{value}</span>
</div>
  )
}

