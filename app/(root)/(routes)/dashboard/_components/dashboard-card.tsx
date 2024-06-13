import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
interface DashboardCardProps {
  label: string
  Icon: LucideIcon
  amount: any
  description: string
}

export const DashboardCard = ({
  label,
  Icon,
  amount,
  description
}: DashboardCardProps) => {
  return (
    <div className="bg-secondary/90 shadow flex w-full flex-col gap-3 rounded-[5px] p-5">
      {/* Label & Icon */}
      <section className="flex justify-between gap-2">
        <p className="text-sm">{label}</p>
        <Icon className="h-4 w-4" />
      </section>
      {/* Amount & Description */}
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{amount}</h2>
        <p className="text-xs">{description}</p>
      </section>
    </div>
  )
}

export function DashboardCardContent(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={cn(
        'flex w-full flex-col gap-3 rounded-[5px] p-5 shadow bg-secondary',
        props.className
      )}
    />
  )
}
