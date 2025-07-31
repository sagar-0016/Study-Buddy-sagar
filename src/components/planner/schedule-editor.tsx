
"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { ScheduleTask, DayType } from "@/lib/types";
import { Pencil, Loader2, PlusCircle } from "lucide-react";

type ScheduleDocument = {
  type: DayType;
  tasks: ScheduleTask[];
  formalTasks: string[];
};

const ScheduleList = ({
  schedule,
  type,
  onUpdate,
}: {
  schedule: ScheduleDocument | null;
  type: DayType;
  onUpdate: (updatedSchedule: ScheduleDocument) => void;
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{ index: number; value: string; originalTime: string } | null>(null);

  const [editedTime, setEditedTime] = useState("");
  const [editedTask, setEditedTask] = useState("");

  const [newTime, setNewTime] = useState("");
  const [newTask, setNewTask] = useState("");

  const { toast } = useToast();

  if (!schedule) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  const handleEditClick = (index: number) => {
    const taskString = schedule.formalTasks[index];
    const timeMatch = taskString.match(/^(\d{2}:\d{2}):\s/);
    const time = timeMatch ? timeMatch[1] : "";
    const task = timeMatch ? taskString.replace(timeMatch[0], "") : taskString;

    setSelectedTask({ index, value: taskString, originalTime: time });
    setEditedTime(time);
    setEditedTask(task);
    setIsEditDialogOpen(true);
  };

  const handleAddClick = () => {
    setNewTime("");
    setNewTask("");
    setIsAddDialogOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedTask || !schedule) return;

    setIsSaving(true);
    try {
      const updatedFormalTasks = [...schedule.formalTasks];
      updatedFormalTasks[selectedTask.index] = `${editedTime}: ${editedTask}`;
      updatedFormalTasks.sort();

      const updatedTasks = [...schedule.tasks];
      const informalTaskToUpdate = updatedTasks.find(t => t.time === selectedTask.originalTime);

      if (informalTaskToUpdate) {
        informalTaskToUpdate.time = editedTime;
        informalTaskToUpdate.task = `${editedTask} (Edited)`; // A simple way to sync, could be improved.
      }
      updatedTasks.sort((a, b) => a.time.localeCompare(b.time));

      const updatedScheduleData = {
        ...schedule,
        formalTasks: updatedFormalTasks,
        tasks: updatedTasks,
      };

      const scheduleDocRef = doc(db, "schedules", type);
      await updateDoc(scheduleDocRef, {
        formalTasks: updatedScheduleData.formalTasks,
        tasks: updatedScheduleData.tasks,
      });

      onUpdate(updatedScheduleData);
      toast({
        title: "Success!",
        description: "Your schedule has been updated.",
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating schedule:", error);
      toast({
        title: "Error",
        description: "Could not update the schedule. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNewTask = async () => {
    if (!newTime || !newTask || !schedule) return;

    setIsSaving(true);
    try {
        const newFormalTask = `${newTime}: ${newTask}`;
        const updatedFormalTasks = [...schedule.formalTasks, newFormalTask];
        updatedFormalTasks.sort();

        const newInformalTask: ScheduleTask = { time: newTime, task: newTask };
        const updatedTasks = [...schedule.tasks, newInformalTask];
        updatedTasks.sort((a, b) => a.time.localeCompare(b.time));
        
        const updatedScheduleData = {
            ...schedule,
            formalTasks: updatedFormalTasks,
            tasks: updatedTasks,
        };

        const scheduleDocRef = doc(db, "schedules", type);
        await updateDoc(scheduleDocRef, {
            formalTasks: updatedScheduleData.formalTasks,
            tasks: updatedScheduleData.tasks,
        });

        onUpdate(updatedScheduleData);
        toast({
            title: "Task Added!",
            description: "The new task has been added to your schedule.",
        });
        setIsAddDialogOpen(false);

    } catch(error) {
        console.error("Error adding task:", error);
        toast({
            title: "Error",
            description: "Could not add the task. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsSaving(false);
    }
  }

  return (
    <div>
        <div className="flex justify-end mb-4">
            <Button onClick={handleAddClick}>
                <PlusCircle className="mr-2" />
                Add New Task
            </Button>
        </div>
      <ul className="space-y-2">
        {schedule.formalTasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded-md border p-3"
          >
            <span className="text-muted-foreground">{task}</span>
            <Button variant="ghost" size="icon" onClick={() => handleEditClick(index)}>
              <Pencil className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your scheduled task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">Time</Label>
              <Input
                id="time"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                className="col-span-3"
                type="time"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-right">Task</Label>
              <Input
                id="task"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveChanges} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Enter the details for the new task. It will be automatically sorted by time.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-time" className="text-right">Time</Label>
              <Input
                id="new-time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="col-span-3"
                type="time"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-task" className="text-right">Task</Label>
              <Input
                id="new-task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="col-span-3"
                placeholder="E.g., Review Physics Notes"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddNewTask} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};


export default function ScheduleEditor() {
  const [holidaySchedule, setHolidaySchedule] = useState<ScheduleDocument | null>(null);
  const [coachingSchedule, setCoachingSchedule] = useState<ScheduleDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      try {
        const holidayDocRef = doc(db, "schedules", "holiday");
        const coachingDocRef = doc(db, "schedules", "coaching");

        const [holidaySnap, coachingSnap] = await Promise.all([
          getDoc(holidayDocRef),
          getDoc(coachingDocRef),
        ]);

        if (holidaySnap.exists()) {
          const data = holidaySnap.data() as ScheduleDocument;
          data.formalTasks.sort();
          setHolidaySchedule(data);
        }
        if (coachingSnap.exists()) {
          const data = coachingSnap.data() as ScheduleDocument;
          data.formalTasks.sort();
          setCoachingSchedule(data);
        }
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
        toast({
          title: "Error",
          description: "Could not load schedules from the database.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, [toast]);

  const handleUpdate = (type: DayType, updatedSchedule: ScheduleDocument) => {
    if (type === 'holiday') {
        setHolidaySchedule(updatedSchedule);
    } else {
        setCoachingSchedule(updatedSchedule);
    }
  }

  return (
    <Card>
      <CardContent className="p-0 sm:p-4">
        <Tabs defaultValue="holiday">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="holiday">Holiday Schedule</TabsTrigger>
            <TabsTrigger value="coaching">Coaching Schedule</TabsTrigger>
          </TabsList>
          <TabsContent value="holiday" className="p-4">
            <CardHeader className="px-0">
                <CardTitle>Holiday Tasks</CardTitle>
                <CardDescription>This is your planned schedule for holidays and non-coaching days.</CardDescription>
            </CardHeader>
            {isLoading ? (
                 <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (<Skeleton key={i} className="h-12 w-full" />))}
                </div>
            ) : (
                <ScheduleList schedule={holidaySchedule} type="holiday" onUpdate={(s) => handleUpdate('holiday', s)} />
            )}
          </TabsContent>
          <TabsContent value="coaching" className="p-4">
              <CardHeader className="px-0">
                <CardTitle>Coaching Day Tasks</CardTitle>
                <CardDescription>This is your planned schedule for the days you have coaching.</CardDescription>
            </CardHeader>
             {isLoading ? (
                 <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (<Skeleton key={i} className="h-12 w-full" />))}
                </div>
            ) : (
                <ScheduleList schedule={coachingSchedule} type="coaching" onUpdate={(s) => handleUpdate('coaching', s)} />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
