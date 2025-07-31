
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Clock, Loader2, HelpCircle } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import { getDayType, setDayType, getSchedule } from '@/lib/schedule';
import type { Schedule, ScheduleTask } from '@/lib/types';

const TaskItem = ({ task, isActive, isUpcoming = false }: { task: ScheduleTask, isActive: boolean, isUpcoming?: boolean }) => {
    return (
        <div className={`p-4 rounded-lg transition-all duration-300 ${isActive ? 'bg-primary/10 ring-2 ring-primary' : 'bg-muted/50'}`}>
            <div className={`flex items-center font-semibold ${isActive ? 'text-primary' : isUpcoming ? 'text-accent' : 'text-muted-foreground'}`}>
                <Clock className="h-5 w-5 mr-2" />
                <p>{task.time}</p>
            </div>
            <h3 className={`text-lg font-bold mt-2 ${!isActive && 'text-foreground/80'}`}>{task.task}</h3>
        </div>
    )
}

const DayTypeSelector = ({ onSelect }: { onSelect: (type: 'coaching' | 'holiday') => void }) => (
    <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-lg text-center">
        <HelpCircle className="h-10 w-10 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">What's the plan for today?</h3>
        <p className="text-muted-foreground mb-4">Let me know if it's a coaching day or a holiday to pull up the right schedule.</p>
        <div className="flex gap-4">
            <Button onClick={() => onSelect('coaching')} size="lg">Coaching Day</Button>
            <Button onClick={() => onSelect('holiday')} variant="outline" size="lg">Holiday</Button>
        </div>
    </div>
)

export default function CurrentTask() {
  const [dayType, setDayTypeState] = useState<'coaching' | 'holiday' | null>(null);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchDayTypeAndSchedule = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const type = await getDayType();
        setDayTypeState(type);
        if (type) {
          const scheduleData = await getSchedule(type);
          setSchedule(scheduleData);
        }
      } catch (err) {
        console.error("Error fetching schedule info:", err);
        setError("Could not load schedule information.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDayTypeAndSchedule();
  }, []);

  const handleDayTypeSelect = async (type: 'coaching' | 'holiday') => {
    setIsLoading(true);
    try {
        await setDayType(type);
        setDayTypeState(type);
        const scheduleData = await getSchedule(type);
        setSchedule(scheduleData);
    } catch(err) {
        console.error("Error setting day type:", err);
        setError("Could not save your choice. Please try again.");
    } finally {
        setIsLoading(false);
    }
  }

  const getActiveTaskIndex = () => {
    if (!schedule) return -1;
    const now = currentTime;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    let activeIndex = -1;
    // Find the last task that has started
    for (let i = schedule.tasks.length - 1; i >= 0; i--) {
      const taskTime = schedule.tasks[i].time.split(':');
      const taskMinutes = parseInt(taskTime[0]) * 60 + parseInt(taskTime[1]);
      if (currentMinutes >= taskMinutes) {
        activeIndex = i;
        break;
      }
    }
     // If no task has started yet, default to the first task.
    if (activeIndex === -1 && schedule.tasks.length > 0) {
        return 0;
    }

    return activeIndex;
  }

  const activeTaskIndex = getActiveTaskIndex();

  const renderContent = () => {
    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        )
    }
    if (error) {
        return <p className="text-destructive text-center">{error}</p>;
    }
    if (!dayType) {
        return <DayTypeSelector onSelect={handleDayTypeSelect} />;
    }
    if (!schedule || schedule.tasks.length === 0) {
        return <p className="text-muted-foreground text-center">No tasks found for a {dayType} schedule.</p>;
    }
    if(activeTaskIndex === -1){
        return <p className="text-muted-foreground text-center">No tasks scheduled for today.</p>;
    }

    const currentTask = schedule.tasks[activeTaskIndex];
    const nextTask = activeTaskIndex + 1 < schedule.tasks.length ? schedule.tasks[activeTaskIndex + 1] : null;

    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-sm font-semibold text-primary mb-2">Current Task</h4>
                <TaskItem task={currentTask} isActive={true} />
            </div>

            {nextTask && (
                 <div>
                    <h4 className="text-sm font-semibold text-accent mb-2">Upcoming...</h4>
                    <TaskItem task={nextTask} isActive={false} isUpcoming={true} />
                </div>
            )}
            
            {!nextTask && (
                <p className="text-center text-muted-foreground pt-4">This is the last task for today. Well done!</p>
            )}
        </div>
    )
  }

  return (
    <Card className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg border-0">
      <CardHeader>
        <CardTitle>
            {dayType ? `Today's Focus (${dayType.charAt(0).toUpperCase() + dayType.slice(1)})` : "Today's Focus"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
