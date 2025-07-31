"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import { progressChartData, completionData } from "@/lib/data";
import type { ChartConfig } from "@/components/ui/chart"

const lineChartConfig = {
  completed: {
    label: "Topics Completed",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const radialChartConfig = {
    physics: {
        label: "Physics",
    },
    chemistry: {
        label: "Chemistry",
    },
    maths: {
        label: "Maths",
    }
} satisfies ChartConfig;

export default function ProgressCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Progress Over Time</CardTitle>
          <CardDescription>Number of syllabus topics completed each month.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineChartConfig} className="h-[250px] w-full">
            <LineChart
              data={progressChartData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="var(--color-completed)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Syllabus Completion</CardTitle>
          <CardDescription>Breakdown of your progress in each subject.</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px]">
            <ChartContainer config={radialChartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                    innerRadius="20%" 
                    outerRadius="100%" 
                    data={completionData} 
                    startAngle={-270}
                    endAngle={90}
                >
                    <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey='value' />
                    <ChartLegend
                        content={<ChartLegendContent nameKey="subject" />}
                        className="!mt-2"
                    />
                    <Tooltip content={<ChartTooltipContent nameKey="subject" />} />
                </RadialBarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
