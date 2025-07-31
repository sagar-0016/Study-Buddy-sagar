
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

type Task = {
  id: string;
  taskName: string;
  subject: string;
  startTime: Timestamp;
  endTime: Timestamp;
};

const TaskItem = ({ task }: { task: Task }) => {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }

    return (
        <div className="p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center text-primary font-semibold">
                <Clock className="h-5 w-5 mr-2" />
                <p>{formatTime(task.startTime.toDate())} - {formatTime(task.endTime.toDate())}</p>
            </div>
            <h3 className="text-xl font-bold mt-2">{task.taskName}</h3>
            <p className="text-sm text-muted-foreground">{task.subject}</p>
        </div>
    )
}

export default function CurrentTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setError(null);
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const q = query(
          collection(db, "schedule"),
          where("startTime", ">=", startOfDay),
          where("startTime", "<=", endOfDay),
          orderBy("startTime")
        );

        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Task));
        setTasks(tasksData);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError("Could not load schedule. Make sure you've added tasks for today in the 'schedule' collection in Firestore.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const now = new Date();
  const upcomingTasks = tasks.filter(task => task.startTime.toDate() > now);
  const currentOrPastTasks = tasks.filter(task => task.startTime.toDate() <= now);

  return (
    <Card className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg border-0">
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && (
            <>
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {!isLoading && !error && tasks.length === 0 && (
            <p className="text-muted-foreground">No tasks scheduled for today. Add some in the planner!</p>
        )}
        
        {currentOrPastTasks.map(task => <TaskItem key={task.id} task={task} />)}

        {currentOrPastTasks.length > 0 && upcomingTasks.length > 0 && (
           <p className="text-muted-foreground font-semibold px-1 pt-2">Upcoming...</p>
        )}
        
        {upcomingTasks.map(task => <TaskItem key={task.id} task={task} />)}
        
      </CardContent>
    </Card>
  );
}
