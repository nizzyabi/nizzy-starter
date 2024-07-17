'use client'
import { LineChart, Line, XAxis, CartesianGrid } from 'recharts'
import { TrendingDown, TrendingUp } from 'lucide-react'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export type UserChartProps = {
  data: { month: string; users: number }[]
}

const chartConfig = {
  users: {
    label: 'Users',
    color: 'hsl(var(--chart-1))'
  }
} as ChartConfig

export default function UserChart({ data }: UserChartProps) {
  const currentMonthUsers = data[5].users
  const monthBeforeUsers = data[4].users
  const percentageIncrease =
    ((currentMonthUsers - monthBeforeUsers) / currentMonthUsers) * 100

  return (
    <Card className="bg-secondary dark:bg-secondary/50 border-0">
      <CardHeader>
        <CardTitle className="text-primary">Number of Users</CardTitle>
        <CardDescription>
          {data.length > 0 && (
            <>
              {data[0].month} - {data[data.length - 1].month}{' '}
              {new Date().getFullYear()}
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="users"
              type="linear"
              stroke="var(--color-users)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div
          className={`flex gap-2 font-medium leading-none ${percentageIncrease === 0 ? 'text-foreground' : percentageIncrease > 0 ? 'text-green-500' : 'text-red-500'}`}
        >
          {percentageIncrease > 0 ? (
            <>
              Trending up this month by{' '}
              {Math.abs(percentageIncrease).toFixed(1)}%
              <TrendingUp className="h-4 w-4" />
            </>
          ) : percentageIncrease === 0 ? (
            'Trending unchanged this month'
          ) : (
            <>
              Trending down this month by{' '}
              {Math.abs(percentageIncrease).toFixed(1)}%
              <TrendingDown className="h-4 w-4" />
            </>
          )}
        </div>

        <div className="leading-none text-muted-foreground">
          Showing total new users for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
