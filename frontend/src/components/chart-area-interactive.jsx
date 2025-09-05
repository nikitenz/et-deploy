"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", HTE: 222, student: 150 },
  { date: "2024-04-02", HTE: 97, student: 180 },
  { date: "2024-04-03", HTE: 167, student: 120 },
  { date: "2024-04-04", HTE: 242, student: 260 },
  { date: "2024-04-05", HTE: 373, student: 290 },
  { date: "2024-04-06", HTE: 301, student: 340 },
  { date: "2024-04-07", HTE: 245, student: 180 },
  { date: "2024-04-08", HTE: 409, student: 320 },
  { date: "2024-04-09", HTE: 59, student: 110 },
  { date: "2024-04-10", HTE: 261, student: 190 },
  { date: "2024-04-11", HTE: 327, student: 350 },
  { date: "2024-04-12", HTE: 292, student: 210 },
  { date: "2024-04-13", HTE: 342, student: 380 },
  { date: "2024-04-14", HTE: 137, student: 220 },
  { date: "2024-04-15", HTE: 120, student: 170 },
  { date: "2024-04-16", HTE: 138, student: 190 },
  { date: "2024-04-17", HTE: 446, student: 360 },
  { date: "2024-04-18", HTE: 364, student: 410 },
  { date: "2024-04-19", HTE: 243, student: 180 },
  { date: "2024-04-20", HTE: 89, student: 150 },
  { date: "2024-04-21", HTE: 137, student: 200 },
  { date: "2024-04-22", HTE: 224, student: 170 },
  { date: "2024-04-23", HTE: 138, student: 230 },
  { date: "2024-04-24", HTE: 387, student: 290 },
  { date: "2024-04-25", HTE: 215, student: 250 },
  { date: "2024-04-26", HTE: 75, student: 130 },
  { date: "2024-04-27", HTE: 383, student: 420 },
  { date: "2024-04-28", HTE: 122, student: 180 },
  { date: "2024-04-29", HTE: 315, student: 240 },
  { date: "2024-04-30", HTE: 454, student: 380 },
  { date: "2024-05-01", HTE: 165, student: 220 },
  { date: "2024-05-02", HTE: 293, student: 310 },
  { date: "2024-05-03", HTE: 247, student: 190 },
  { date: "2024-05-04", HTE: 385, student: 420 },
  { date: "2024-05-05", HTE: 481, student: 390 },
  { date: "2024-05-06", HTE: 498, student: 520 },
  { date: "2024-05-07", HTE: 388, student: 300 },
  { date: "2024-05-08", HTE: 149, student: 210 },
  { date: "2024-05-09", HTE: 227, student: 180 },
  { date: "2024-05-10", HTE: 293, student: 330 },
  { date: "2024-05-11", HTE: 335, student: 270 },
  { date: "2024-05-12", HTE: 197, student: 240 },
  { date: "2024-05-13", HTE: 197, student: 160 },
  { date: "2024-05-14", HTE: 448, student: 490 },
  { date: "2024-05-15", HTE: 473, student: 380 },
  { date: "2024-05-16", HTE: 338, student: 400 },
  { date: "2024-05-17", HTE: 499, student: 420 },
  { date: "2024-05-18", HTE: 315, student: 350 },
  { date: "2024-05-19", HTE: 235, student: 180 },
  { date: "2024-05-20", HTE: 177, student: 230 },
  { date: "2024-05-21", HTE: 82, student: 140 },
  { date: "2024-05-22", HTE: 81, student: 120 },
  { date: "2024-05-23", HTE: 252, student: 290 },
  { date: "2024-05-24", HTE: 294, student: 220 },
  { date: "2024-05-25", HTE: 201, student: 250 },
  { date: "2024-05-26", HTE: 213, student: 170 },
  { date: "2024-05-27", HTE: 420, student: 460 },
  { date: "2024-05-28", HTE: 233, student: 190 },
  { date: "2024-05-29", HTE: 78, student: 130 },
  { date: "2024-05-30", HTE: 340, student: 280 },
  { date: "2024-05-31", HTE: 178, student: 230 },
  { date: "2024-06-01", HTE: 178, student: 200 },
  { date: "2024-06-02", HTE: 470, student: 410 },
  { date: "2024-06-03", HTE: 103, student: 160 },
  { date: "2024-06-04", HTE: 439, student: 380 },
  { date: "2024-06-05", HTE: 88, student: 140 },
  { date: "2024-06-06", HTE: 294, student: 250 },
  { date: "2024-06-07", HTE: 323, student: 370 },
  { date: "2024-06-08", HTE: 385, student: 320 },
  { date: "2024-06-09", HTE: 438, student: 480 },
  { date: "2024-06-10", HTE: 155, student: 200 },
  { date: "2024-06-11", HTE: 92, student: 150 },
  { date: "2024-06-12", HTE: 492, student: 420 },
  { date: "2024-06-13", HTE: 81, student: 130 },
  { date: "2024-06-14", HTE: 426, student: 380 },
  { date: "2024-06-15", HTE: 307, student: 350 },
  { date: "2024-06-16", HTE: 371, student: 310 },
  { date: "2024-06-17", HTE: 475, student: 520 },
  { date: "2024-06-18", HTE: 107, student: 170 },
  { date: "2024-06-19", HTE: 341, student: 290 },
  { date: "2024-06-20", HTE: 408, student: 450 },
  { date: "2024-06-21", HTE: 169, student: 210 },
  { date: "2024-06-22", HTE: 317, student: 270 },
  { date: "2024-06-23", HTE: 480, student: 530 },
  { date: "2024-06-24", HTE: 132, student: 180 },
  { date: "2024-06-25", HTE: 141, student: 190 },
  { date: "2024-06-26", HTE: 434, student: 380 },
  { date: "2024-06-27", HTE: 448, student: 490 },
  { date: "2024-06-28", HTE: 149, student: 200 },
  { date: "2024-06-29", HTE: 103, student: 160 },
  { date: "2024-06-30", HTE: 446, student: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },

  HTE: {
    label: "HTE",
    color: "var(--primary)",
  },

  student: {
    label: "Student",
    color: "var(--primary)",
  }
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Assessment Status</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex">
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillHTE" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-HTE)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-HTE)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-student)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-student)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot" />
              } />
            <Area
              dataKey="student"
              type="natural"
              fill="url(#fillStudent)"
              stroke="var(--color-student)"
              stackId="a" />
            <Area
              dataKey="HTE"
              type="natural"
              fill="url(#fillHTE)"
              stroke="var(--color-HTE)"
              stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
