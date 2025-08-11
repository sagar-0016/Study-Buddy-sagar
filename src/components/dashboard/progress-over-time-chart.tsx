
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getSyllabusProgressWithTimestamps } from '@/lib/syllabus';
import { getPyqProgressWithTimestamps } from '@/lib/pyq';
import type { SyllabusTopicWithTimestamp, PyqProgressWithTimestamp } from '@/lib/types';
import { subWeeks, subMonths, startOfWeek, startOfMonth, format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type AggregatedDataPoint = {
  date: string;
  topics: number;
  pyqs: number;
};

type ViewMode = 'weekly' | 'monthly';

// Helper function to aggregate data
const aggregateData = (
  syllabusProgress: SyllabusTopicWithTimestamp[],
  pyqProgress: PyqProgressWithTimestamp[],
  mode: ViewMode
): AggregatedDataPoint[] => {
  const allTimestamps = [
    ...syllabusProgress.map(p => p.lastUpdated.toDate()),
    ...pyqProgress.map(p => p.lastUpdated.toDate())
  ];

  if (allTimestamps.length === 0) return [];

  const firstDate = new Date(Math.min(...allTimestamps.map(d => d.getTime())));
  const now = new Date();

  let startDate;
  let formatString: string;
  let startOfPeriod: (date: Date) => Date;

  if (mode === 'weekly') {
    startDate = startOfWeek(firstDate);
    formatString = 'MMM d';
  } else { // monthly
    startDate = startOfMonth(firstDate);
    formatString = 'MMM yyyy';
  }

  const aggregated: { [key: string]: { topics: number, pyqs: number } } = {};

  const processItems = (items: (SyllabusTopicWithTimestamp | PyqProgressWithTimestamp)[], type: 'topics' | 'pyqs') => {
    items.forEach(item => {
      if (item.completed) {
        const date = item.lastUpdated.toDate();
        const periodStart = mode === 'weekly' ? startOfWeek(date) : startOfMonth(date);
        const key = format(periodStart, 'yyyy-MM-dd');
        
        if (!aggregated[key]) {
          aggregated[key] = { topics: 0, pyqs: 0 };
        }
        aggregated[key][type]++;
      }
    });
  };

  processItems(syllabusProgress, 'topics');
  processItems(pyqProgress, 'pyqs');

  const chartData: AggregatedDataPoint[] = [];
  let currentDate = startDate;

  while (currentDate <= now) {
    const key = format(currentDate, 'yyyy-MM-dd');
    chartData.push({
      date: format(currentDate, formatString),
      topics: aggregated[key]?.topics || 0,
      pyqs: aggregated[key]?.pyqs || 0,
    });
    if (mode === 'weekly') {
      currentDate.setDate(currentDate.getDate() + 7);
    } else {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  return chartData;
};


export default function ProgressOverTimeChart() {
    const [viewMode, setViewMode] = useState<ViewMode>('weekly');
    const [syllabusProgress, setSyllabusProgress] = useState<SyllabusTopicWithTimestamp[]>([]);
    const [pyqProgress, setPyqProgress] = useState<PyqProgressWithTimestamp[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [syllabusData, jeeMainData, jeeAdvancedData] = await Promise.all([
                getSyllabusProgressWithTimestamps(),
                getPyqProgressWithTimestamps('jeeMain'),
                getPyqProgressWithTimestamps('jeeAdvanced')
            ]);

            const combinedPyq = [...jeeMainData, ...jeeAdvancedData];
            const uniquePyq = Array.from(new Map(combinedPyq.map(item => [item.id, item])).values());
            
            setSyllabusProgress(syllabusData);
            setPyqProgress(uniquePyq);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    const chartData = useMemo(() => {
        return aggregateData(syllabusProgress, pyqProgress, viewMode);
    }, [syllabusProgress, pyqProgress, viewMode]);

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="border-0 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Progress Over Time</CardTitle>
                        <CardDescription>
                            Your completed topics and PYQs, aggregated {viewMode}.
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === 'weekly' ? 'default' : 'outline'}
                            onClick={() => setViewMode('weekly')}
                        >
                            Weekly
                        </Button>
                         <Button
                            variant={viewMode === 'monthly' ? 'default' : 'outline'}
                            onClick={() => setViewMode('monthly')}
                        >
                            Monthly
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)",
                            }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="topics" name="Topics Completed" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="pyqs" name="PYQs Completed" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
