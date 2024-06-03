import { Calendar, CreditCard, DollarSign, PersonStandingIcon, UserPlus, UserRoundCheck } from "lucide-react";
import { DashboardCard, DashboardCardContent } from "./_components/dashboard-card";
import { db } from "@/lib/db";
import { formatDistanceToNow, startOfMonth, endOfMonth, eachMonthOfInterval, format } from 'date-fns';
import UserDataCard, { UserDataProps } from "./_components/user-data-card";
import UserPurchaseDataCard, { UserPurchaseDataProps } from "./_components/user-purchase-data";
import GoalDataCard from "./_components/goal";
import LineGraph from "./_components/line-graph";
import BarChart from "./_components/barchart";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const role = await auth();

    if (role?.user.role === 'USER' || !role) {
        return redirect('/')
    }

    const currentDate = new Date();

    // Fetch user count
    const userCount = await db.user.count();

    // Fetch new users count for the current month
    const newUsersCount = await db.user.count({
        where: {
            createdAt: {
                gte: startOfMonth(currentDate),
                lte: endOfMonth(currentDate),
            },
        },
    });

    // Fetch total sales count
    const salesCount = await db.purchase.count();

    // Fetch total sales amount
    const totalAmountResult = await db.purchase.aggregate({
        _sum: {
            amount: true,
        },
    });
    const totalAmount = totalAmountResult._sum.amount || 0;

    const goalAmount = 100;
    const progressValue = (totalAmount / goalAmount) * 100;

    // Fetch recent users
    const recentUsers = await db.user.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 7,
    });

    const userData: UserDataProps[] = recentUsers.map(account => ({
        name: account.name || 'Unknown',
        email: account.email || 'No email',
        image: account.image || '/mesh.jpeg',
        time: formatDistanceToNow(new Date(account.createdAt), { addSuffix: true }),
    }));

    // Fetch recent purchases
    const recentPurchases = await db.purchase.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 5,
        include: {
            user: true,
        },
    });

    const userPurchaseData: UserPurchaseDataProps[] = recentPurchases.map(purchase => ({
        name: purchase.user?.name || 'Unknown',
        email: purchase.user?.email || 'No email',
        image: purchase.user?.image || '/mesh.jpeg',
        saleAmount: `+$${(purchase.amount || 0).toFixed(2)}`,
    }));

    // Calculate users joined per month
    const usersByMonth = await db.user.groupBy({
        by: ['createdAt'],
        _count: {
            createdAt: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    const monthlyUserData = eachMonthOfInterval({
        start: startOfMonth(new Date(usersByMonth[0]?.createdAt || new Date())),
        end: endOfMonth(currentDate),
    }).map(month => {
        const monthString = format(month, 'MMM');
        const usersInMonth = usersByMonth.filter(user => format(new Date(user.createdAt), 'MMM') === monthString)
            .reduce((total, user) => total + user._count.createdAt, 0);
        return { month: monthString, users: usersInMonth };
    });

     // Calculate sales amount per month
     const salesByMonth = await db.purchase.groupBy({
        by: ['createdAt'],
        _sum: {
            amount: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    const monthlySalesData = eachMonthOfInterval({
        start: startOfMonth(new Date(salesByMonth[0]?.createdAt || new Date())),
        end: endOfMonth(currentDate),
    }).map(month => {
        const monthString = format(month, 'MMM');
        const salesInMonth = salesByMonth.filter(sale => format(new Date(sale.createdAt), 'MMM') === monthString)
            .reduce((total, sale) => total + sale._sum.amount!, 0);
        return { month: monthString, total: salesInMonth };
    });   

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
                            label="Total Paid Subscriptions"
                            Icon={Calendar}
                            amount={`+${salesCount}`}
                            description="All time"
                        />
                        <DashboardCard
                            label="Total Users"
                            Icon={PersonStandingIcon}
                            amount={`+${userCount}`}
                            description="All time"
                        />
                        <DashboardCard
                            label="Users This Month"
                            Icon={UserPlus}
                            amount={`+${newUsersCount}`}
                            description="This month"
                        />
                    </section>
                    {/* User Data and Purchase Data Cards */}
                    <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 text-primary">
                        <DashboardCardContent>
                            <section className="flex justify-between gap-2 text-primary pb-2">
                                <p>Recent Users</p>
                                <UserRoundCheck className="h-4 w-4" />
                            </section>
                            {userData.map((data, index) => (
                                <UserDataCard
                                    key={`user-${index}`}
                                    email={data.email}
                                    name={data.name}
                                    image={data.image}
                                    time={data.time}
                                />
                            ))}
                        </DashboardCardContent>
                        <DashboardCardContent>
                            <section className="flex justify-between gap-2 text-primary pb-2">
                                <p>Recent Sales</p>
                                <CreditCard className="h-4 w-4" />
                            </section>
                            {userPurchaseData.map((data, index) => (
                                <UserPurchaseDataCard
                                    key={`purchase-${index}`}
                                    email={data.email}
                                    image={data.image}
                                    name={data.name}
                                    saleAmount={data.saleAmount}
                                />
                            ))}
                        </DashboardCardContent>
                    </section>

                    <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 text-primary">
                        <LineGraph data={monthlyUserData} />
                        <BarChart data={monthlySalesData} />
                    </section>

                    <GoalDataCard 
                        goal={goalAmount}
                        value={progressValue}
                    />
                </div>
            </div>
        </div>
    );
}
