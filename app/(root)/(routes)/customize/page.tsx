'use client'
import { ColorPicker } from '@/components/color-picker'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { TriangleAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  BarChartMixed,
  BarChartMultiple,
  PieChartDonut,
  LineChartMultiple,
  RadialChartGrid,
  RadarChartLines
} from './_components'
import { Calendar } from '@/components/ui/calendar'
import { DateRange } from 'react-day-picker'
import { RadialChartShape } from './_components/radial-chart-shape'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function () {
  const [range, setRange] = useState<DateRange | undefined>()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = (prevProgress + 10) % 101
        return newProgress
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="w-full max-w-6xl flex flex-col gap-16 p-6">
      <div className="flex flex-col sm:flex-row w-fit mx-auto md:max-w-md gap-2 rounded-lg bg-yellow-300/50 border-2 border-yellow-500/75 p-4 text-foreground">
        <TriangleAlert className="w-8 h-8 sm:w-6 sm:h-6 mx-auto sm:mx-0" />
        <span className="w-fit">
          If you refresh the page, it will reset the colors. Update{' '}
          <code className="rounded-lg p-1 bg-foreground/10">globals.css</code>{' '}
          with your new colors.
        </span>
      </div>
      <div className="flex flex-col w-fit mx-auto max-w-xs xs:max-w-xl lg:max-w-full lg:mx-0 lg:flex-row lg:w-full justify-between gap-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 w-fit xs:w-full mx-auto sm:mx-0 gap-8">
          <div className="w-min sm:w-max flex flex-col items-center mx-auto gap-2 text-lg md:text-xl sm:whitespace-nowrap">
            <span>Primary color</span>
            <ColorPicker variable="--primary" />
          </div>
          <div className="w-min sm:w-max flex flex-col items-center mx-auto gap-2 text-lg md:text-xl sm:whitespace-nowrap">
            <span>Primary text color</span>
            <ColorPicker variable="--primary-foreground" />
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-6 text-lg md:text-xl sm:whitespace-nowrap">
          <span>Components</span>
          <div className="flex flex-wrap justify-center items-center sm:justify-start w-full h-fit gap-6">
            <Button variant="default">Default</Button>
            <Button variant="ghost">Ghost</Button>
            <Checkbox defaultChecked={true} className="w-5 h-5" />
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="max-w-36"
            />
            <Switch defaultChecked />
            <Progress value={progress} />
            <Card className="w-full bg-transparent relative">
              <CardHeader>
                <CardTitle>Newsletter</CardTitle>
                <CardDescription>
                  Showcase purposes, doesn't actually work.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Email</Label>
                      <Input id="name" placeholder="example@gmail.com" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-fit mx-auto max-w-xs xs:max-w-xl lg:max-w-full lg:mx-0 lg:flex-row lg:w-full justify-between gap-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 w-fit xs:w-full mx-auto sm:mx-0 gap-8">
          <div className="w-min flex flex-col items-center mx-auto gap-2 text-lg md:text-xl sm:whitespace-nowrap">
            <span>Chart Color 1</span>
            <ColorPicker variable="--chart-1" />
          </div>
          <div className="w-min flex flex-col items-center mx-auto gap-2 text-lg md:text-xl sm:whitespace-nowrap">
            <span>Chart Color 2</span>
            <ColorPicker variable="--chart-2" />
          </div>
          <div className="w-min flex flex-col items-center mx-auto gap-2 text-lg md:text-xl sm:whitespace-nowrap">
            <span>Chart Color 3</span>
            <ColorPicker variable="--chart-3" />
          </div>
          <div className="w-min flex flex-col items-center mx-auto gap-2 text-lg md:text-xl sm:whitespace-nowrap">
            <span>Chart Color 4</span>
            <ColorPicker variable="--chart-4" />
          </div>
          <div className="w-min col-span-2 flex flex-col items-center mx-auto gap-2 text-lg md:text-xl sm:whitespace-nowrap">
            <span>Chart Color 5</span>
            <ColorPicker variable="--chart-5" />
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-6 text-lg md:text-xl sm:whitespace-nowrap">
          <span>Charts</span>
          <div className="flex flex-wrap max-w-[250px] xs:max-w-full mx-auto justify-center items-center sm:justify-start w-full h-fit gap-6">
            <BarChartMultiple />
            <BarChartMixed />
            <LineChartMultiple />
            <div className="flex flex-col sm:flex-row w-full">
              <PieChartDonut />
              <RadialChartGrid />
            </div>
            <div className="flex flex-col sm:flex-row w-full">
              <RadarChartLines />
              <RadialChartShape />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
