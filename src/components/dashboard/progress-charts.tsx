
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import { progressChartData } from "@/lib/data";
import type { ChartConfig } from "@/components/ui/chart";
import { getProgressData } from "@/lib/progress";
import type { ProgressData } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const lineChartConfig = {
  completed: {
    label: "Topics Completed",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const radialChartConfig = {
    Physics: { label: "Physics" },
    Chemistry: { label: "Chemistry" },
    Maths: { label: "Maths" },
} satisfies ChartConfig;

// Helper to aggregate progress data by subject
const aggregateProgress = (progress: ProgressData[]) => {
    const subjectProgress: Record<string, { completed: number; total: number }> = {};

    progress.forEach(item => {
        if (!subjectProgress[item.subject]) {
            subjectProgress[item.subject] = { completed: 0, total: 0 };
        }
        subjectProgress[item.subject].completed += item.completed;
        subjectProgress[item.subject].total += item.total;
    });

    return Object.entries(subjectProgress).map(([subject, data], index) => ({
        subject,
        value: data.total > 0 ? (data.completed / data.total) * 100 : 0,
        fill: `var(--color-chart-${(index % 5) + 1})`
    }));
}

export default function ProgressCharts() {
  const [completionData, setCompletionData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
        setIsLoading(true);
        const progress = await getProgressData();
        const aggregated = aggregateProgress(progress);
        setCompletionData(aggregated);
        setIsLoading(false);
    };
    fetchProgress();
  }, []);

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
          <CardTitle>Flashcard Completion</CardTitle>
          <CardDescription>Breakdown of your progress in each subject.</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
            {isLoading ? (
                 <div className="w-full h-full flex items-center justify-center">
                    <Skeleton className="w-[200px] h-[200px] rounded-full" />
                </div>
            ) : (
                <ChartContainer config={radialChartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                        innerRadius="20%" 
                        outerRadius="100%" 
                        data={completionData} 
                        startAngle={-270}
                        endAngle={90}
                    >
                        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff', fontSize: '12px' }} background clockWise dataKey='value' />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="subject" />}
                            className="!mt-2"
                        />
                        <Tooltip content={<ChartTooltipContent nameKey="subject" formatter={(value) => `${Math.round(Number(value))}%`} />} />
                    </RadialBarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
