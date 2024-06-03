"use client";
import { useTheme } from "next-themes";
import {
    BarChart as BarGraph,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Bar,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { light_theme } from "@/lib/theme-constant";
import { CandlestickChart } from "lucide-react";

export type BarChartProps = {
    data: { month: string, total: number }[];
}

export default function BarChart({ data }: BarChartProps) {
    const { theme } = useTheme();
    
    return (
        <div className="bg-secondary/90 shadow flex w-full flex-col gap-3 rounded-[5px] p-5">
            <section className="flex justify-between gap-2 pb-2">
                <p>Sales Data</p>
                <CandlestickChart className="h-4 w-4" />
            </section>
            <ResponsiveContainer width={"100%"} height={350}>
                <BarGraph data={data} margin={{ top: 20, left: -10, right: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={`${theme === light_theme ? "#e0e0e0" : "#2f2f2f"}`} />
                    <XAxis
                        dataKey={"month"}
                        tickLine={false}
                        axisLine={false}
                        stroke={`${theme === light_theme ? "#000000" : "#f3f3f3"}`}
                        fontSize={13}
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        stroke={`${theme === light_theme ? "#000000" : "#f3f3f3"}`}
                        fontSize={13}
                        padding={{ top: 10, bottom: 10 }}
                        allowDecimals={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    
                    <Legend />
                    <Bar dataKey={"total"} radius={[5, 5, 0, 0]} stroke={`${theme === light_theme ? "#000000" : "#f3f3f3"}`} fill={`${theme === light_theme ? "#000000" : "#f3f3f3"}`} />
                </BarGraph>
            </ResponsiveContainer>
        </div>
    );
}
