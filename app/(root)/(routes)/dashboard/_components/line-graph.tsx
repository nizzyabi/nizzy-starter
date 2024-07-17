'use client'
import { useTheme } from 'next-themes'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from 'recharts'
import { light_theme } from '@/lib/theme-constant'
import { User } from 'lucide-react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

export type LineGraphProps = {
  data: { month: string; users: number }[]
}

export default function LineGraph({ data }: LineGraphProps) {
  const { theme } = useTheme()
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--primary))'
    },
    mobile: {
      label: 'Mobile',
      color: 'hsl(var(--primary))'
    }
  }

  return (
    <Card className="border-none bg-secondary dark:bg-secondary/50 shadow">
      <CardHeader>
        <CardTitle className="text-md font-normal">Number Of Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              data={data}
              margin={{ top: 20, left: 12, right: 12, bottom: 0 }}
              accessibilityLayer
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={'month'}
                tickLine={false}
                axisLine={false}
                stroke={`${theme === light_theme ? '#000' : '#fff'}`}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="users"
                type="natural"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
