'use client'
import { useTheme } from 'next-themes'
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { light_theme } from '@/lib/theme-constant'
import { CandlestickChart } from 'lucide-react'
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "primary",
  },
  mobile: {
    label: "Mobile",
    color: "primary",
  },
} satisfies ChartConfig

export type BarChartProps = {
  data: { month: string; total: number }[]
}

export default function BarChart({ data }: BarChartProps) {
  const { theme } = useTheme()

  return (
    <div className="bg-secondary dark:bg-secondary/50 shadow flex w-full flex-col gap-3 rounded-lg p-5">
      <section className="flex justify-between gap-2 pb-2">
        <p>Sales Data</p>
        <CandlestickChart className="h-4 w-4" />
      </section>
      <ChartContainer config={chartConfig} className="">
        <ResponsiveContainer width="100%" height={300}>
          <BarGraph
            data={data}
            margin={{ top: 20, left: -10, right: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="2 2"
              stroke={`${theme === light_theme ? '#000' : '#fff'}`}
              className="opacity-25"
            />
            <XAxis
              dataKey={'month'}
              tickLine={false}
              axisLine={true}
              stroke={`${theme === light_theme ? '#000' : '#fff'}`}
              fontSize={13}
              padding={{ left: 0, right: 0 }}
            />
            <ChartTooltip  content={<ChartTooltipContent />} />
            <YAxis
              tickLine={false}
              axisLine={true}
              stroke={`${theme === light_theme ? '#000' : '#fff'}`}
              fontSize={13}
              padding={{ top: 0, bottom: 0 }}
              allowDecimals={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Legend />
            <Bar
              dataKey={'total'}
              radius={[5, 5, 0, 0]}
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
            />
          </BarGraph>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
