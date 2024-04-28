import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
    label: string;
    icon: LucideIcon;
    amount: string;
    description: string;
}

export const DashboardCard = (props: DashboardCardProps) => {
    return (
        <DashboardCardContent className="border border-opacity-10">
            <section className="flex justify-between gap-2">
                {/* label */}
                <p className="text-sm">{props.label}</p>
                {/* icon */}
                <props.icon className="h-4 w-4" />
            </section>
            <section className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold">{props.amount}</h2>
                <p className="text-xs">{props.description}</p>
            </section>
        </DashboardCardContent>
    )
}

export function DashboardCardContent(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        {...props}
        className={cn(
          "flex w-full flex-col gap-3 rounded-[5px] p-5",
          props.className
        )}
      />
    );
  }