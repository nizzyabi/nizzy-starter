"use client";
import { useTheme } from "next-themes";
import {
    BarChart as BarGraph,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Bar
  } from "recharts";
import { light_theme } from "@/lib/theme-constant";
import { CandlestickChart } from "lucide-react";

// TODO: Make it functional 
const cashData = [
    {
        month: "Jan",
        total: Math.floor(Math.random() * 100)
    },
    {
        month: "Feb",
        total: Math.floor(Math.random() * 100)
    },
    {
        month: "Mar",
        total: Math.floor(Math.random() * 100)
    },
    {
        month: "Apr",
        total: Math.floor(Math.random() * 100)
    },
    {
        month: "May",
        total: Math.floor(Math.random() * 100)
    },
    {
        month: "Jun",
        total: Math.floor(Math.random() * 100)
    },
    {
        month: "Jul",
        total: Math.floor(Math.random() * 100)
    },
    {
        month: "Aug",
        total: Math.floor(Math.random() * 100)
    },
    {
        month: "Sep",
        total: Math.floor(Math.random() * 100)
    },
    {
        month: "Oct",
        total: Math.floor(Math.random() * 100)
    },
    {
        month: "Nov",
        total: Math.floor(Math.random() * 100)
    },
    {
        month: "Dec",
        total: Math.floor(Math.random() * 100)
    }
]

export default function BarChart() {

    const { theme }  = useTheme()
    
    return (
        <div className="bg-secondary/90 shadow flex w-full flex-col gap-3 rounded-[5px] p-5">
            <section className="flex justify-between gap-2 pb-2">
                <p>Sales Data</p>
                <CandlestickChart className="h-4 w-4" />
            </section>
            <ResponsiveContainer width={"100%"} height={350}>
                <BarGraph data={cashData} margin={{ top: 0, left: -15, right: 0, bottom: 0 }}>
                    <XAxis
                        dataKey={"month"}
                        tickLine={false}
                        axisLine={true}
                        stroke={`${theme === light_theme ? "#000000" : "#f3f3f3"}`}
                        fontSize={13}
                        padding={{ left: 0, right: 0 }}
                    />
                    <YAxis
                        dataKey={"total"}
                        tickLine={false}
                        axisLine={true}
                        stroke={`${theme === light_theme ? "#000000" : "#f3f3f3"}`}
                        fontSize={13}
                        tickFormatter={(value) => `$${value}`}
                        padding={{ top: 0, bottom: 0 }}
                    />
                <Bar dataKey={"total"} radius={[5, 5, 0, 0]} stroke={`${theme === light_theme ? "#000000" : "#f3f3f3"}`} fill={`${theme === light_theme ? "#000000" : "#f3f3f3"}`} />
            </BarGraph>
        </ResponsiveContainer>
      </div>
    )
    }
