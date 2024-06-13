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
import { light_theme } from '@/lib/theme-constant'
import { CandlestickChart } from 'lucide-react'

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
      <ResponsiveContainer width={'100%'} height={350}>
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
    </div>
  )
}
