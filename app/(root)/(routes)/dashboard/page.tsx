import { DollarSign } from "lucide-react";
import { DashboardCard, DashboardCardContent } from "./_components/dashboard-card";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-5 w-full">
            <h1 className="font-bold text-2xl mx-6 text-center">Dashboard</h1>
            <div className="container mx-auto py-8">
                <div className="flex flex-col gap-5 w-full">
                    <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
                        <DashboardCardContent>
                            <DashboardCard
                                label="Total Revenue"
                                icon={DollarSign}
                                amount="$12,000"
                                description="This month"
                            />
                        </DashboardCardContent>
                    </section>
                </div>
            </div>
        </div>
    )
}