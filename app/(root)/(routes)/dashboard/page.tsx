import { Calendar, Check, CreditCard, DollarSign, LucideGitGraph, PersonStanding, PersonStandingIcon, UserPlus, UserRoundCheck } from "lucide-react";
import { DashboardCard } from "./_components/dashboard-card";
import BarChart from "./_components/barchart";
import LineGraph from "./_components/line-graph";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { formatDistanceToNow, startOfMonth, endOfMonth } from 'date-fns';
import UserDataCard, { UserDataProps } from "./_components/user-data-card";
import { tiers } from "@/components/pricing-card";
import UserPurchaseDataCard, { UserPurchaseDataProps } from "./_components/user-purchase-data";

export default async function DashboardPage(){

    // user count
    const userCount = await db.user.count();
    
    // new users this month:
    const currentDate = new Date();
    const newUsersCount = await db.user.count({
      where: {
        createdAt: {
          gte: startOfMonth(currentDate),
          lte: endOfMonth(currentDate),
        },
      },
    });
    // sales count
    const salesCount = await db.purchase.count();

    // sales amount count
    const totalAmountResult = await db.purchase.aggregate({
        _sum: {
          amount: true,
        },
      });
      const totalAmount = totalAmountResult._sum.amount || 0;

    
    // recent users
    const recentUsers = await db.user.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        take: 7,
      })

    const userData: UserDataProps[] = recentUsers.map(account => ({
        name: account.name || 'Unknown',
        email: account.email || 'No email',
        image: account.image || '/mesh.jpeg',
        time: formatDistanceToNow(new Date(account.createdAt), { addSuffix: true }),
    }));

    const recentPurchases = await db.purchase.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
        include: {
          user: true,
        },
      });
      const UserPurchaseData: UserPurchaseDataProps[] = await Promise.all(recentPurchases.map(async (purchase) => {
        const user = await db.user.findUnique({
          where: { id: purchase.userId },
        });
        return {
          name: user?.name || 'Unknown',
          email: user?.email || 'No email',
          image: user?.image || '/mesh.jpeg',
          saleAmount: `+$${(purchase.amount || 0).toFixed(2)}`,
        };
      }));
  


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
                            amount={`$${totalAmount}`}
                            description="All time"
                        />
                        <DashboardCard
                            label="Total Subscriptions"
                            Icon={Calendar}
                            amount={`+${salesCount}`}
                            description="All time"
                        />
                        <DashboardCard
                            label="Current Users"
                            Icon={PersonStandingIcon}
                            amount={`+${userCount}`}
                            description="All time"
                        />
                        <DashboardCard
                            label="New Users"
                            Icon={UserPlus}
                            amount={`+${newUsersCount}`}
                            description="This month"
                        />
                    </section>
                    {/* Graphs & Charts*/}
                    <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
                        {userData.map((data, index) => (
                            <UserDataCard
                            key={index}
                            email={data.email}
                            name={data.name}
                            image={data.image}
                            time={data.time}
                            />
                        ))}
                        {UserPurchaseData.map((data, index) => (
                            <UserPurchaseDataCard
                            key={index}
                            email={data.email}
                            image={data.image}
                            name={data.name}
                            saleAmount={data.saleAmount}
                            />
                        ))}
                    </section>                    
                </div>
            </div>
        </div>
    )
}