import { Check, CreditCard, DollarSign, LucideGitGraph, PersonStanding, PersonStandingIcon } from "lucide-react";
import { DashboardCard } from "./_components/dashboard-card";
import BarChart from "./_components/barchart";
import LineGraph from "./_components/line-graph";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export default async function DashboardPage(){

    // user count
    const userCount = await db.user.count();
    
    // sales count
    const salesCount = await db.userSubscription.count();

    // purchases count

    // recent users


    return (
        <div className="flex flex-col gap-5 w-full">
            <h1 className="font-bold text-4xl mx-6 text-center">Dashboard</h1>
            <div className="container mx-auto py-8">
                <div className="flex flex-col gap-5 w-full">
                    {/* Dashboard Cards */}
                    <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
                        <DashboardCard
                            label="Revenue"
                            Icon={DollarSign}
                            amount="$12,000"
                            description="All time"
                        />
                        <DashboardCard
                            label="Monthly Customers"
                            Icon={CreditCard}
                            amount={salesCount}
                            description="+22 this month"
                        />
                        <DashboardCard
                            label="Users"
                            Icon={PersonStandingIcon}
                            amount={userCount}
                            description="All time"
                        />
                        <DashboardCard
                            label="Sales"
                            Icon={CreditCard}
                            amount="+40"
                            description="From the last month"
                        />
                    </section>
                    {/* Graphs & Charts*/}
                    <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
                        <BarChart />
                        <LineGraph  />
                    </section>                    
                </div>
            </div>
        </div>
    )
}