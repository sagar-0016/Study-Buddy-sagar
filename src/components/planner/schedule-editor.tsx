
"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteField, collection, addDoc, serverTimestamp } from "firebase/firestore";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { ScheduleTask, DayType, Schedule } from "@/lib/types";
import { Pencil, Loader2, PlusCircle, Lock, Unlock, MessageSquareHeart, Trash2 } from "lucide-react";
import { getDisciplineMessages, getSchedule } from "@/lib/schedule";
import { Separator } from "@/components/ui/separator";
import { isDirectEditEnabled } from "@/lib/settings";

// Helper to shuffle an array
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[currentIndex], array[randomIndex]];
  }
  return array;
};

const logScheduleChange = async (
    type: DayType,
    changeType: 'added' | 'edited' | 'deleted',
    taskTime: string,
    taskContent: string,
    previousTaskContent?: string
) => {
    try {
        const logData: any = {
            type,
            changeType,
            taskTime,
            taskContent,
            timestamp: serverTimestamp(),
        };
        if (previousTaskContent) {
            logData.previousTaskContent = previousTaskContent;
        }
        await addDoc(collection(db, 'schedules-changes'), logData);
    } catch (error) {
        console.error("Failed to log schedule change:", error);
    }
};

const ScheduleList = ({
  schedule,
  type,
  onUpdate,
}: {
  schedule: Schedule | null;
  type: DayType;
  onUpdate: (updatedSchedule: Schedule) => void;
}) => {
  // Component State
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Data State
  const [selectedTask, setSelectedTask] = useState<ScheduleTask | null>(null);
  const [editedTime, setEditedTime] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newTask, setNewTask] = useState("");

  // Discipline Challenge State
  const [disciplineStepsLeft, setDisciplineStepsLeft] = useState<number | null>(null);
  const [disciplineMessages, setDisciplineMessages] = useState<string[]>([]);
  const [isDisciplineDialogOpen, setIsDisciplineDialogOpen] = useState(false);
  const [disciplineConfirmationCount, setDisciplineConfirmationCount] = useState(1);

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

  const handleEnableEditingClick = async () => {
    // Check the client-side setting first
    if (isDirectEditEnabled()) {
      setIsEditMode(true);
      toast({
        title: "Direct Edit Enabled",
        description: "You have bypassed the discipline challenge via settings.",
      });
      return;
    }

    if (disciplineStepsLeft === null) {
      // Starting the process for the first time
      const steps = Math.floor(Math.random() * 3) + 3; // 3 to 5 steps
      const allMessages = await getDisciplineMessages();
      setDisciplineMessages(shuffleArray(allMessages));
      setDisciplineStepsLeft(steps);
      setDisciplineConfirmationCount(1);
      setIsDisciplineDialogOpen(true);
    } else if (disciplineStepsLeft > 0) {
      // Continuing the process
      setIsDisciplineDialogOpen(true);
    }
  };

  const handleDisciplineYes = () => {
    const newStepsLeft = (disciplineStepsLeft ?? 1) - 1;
    setDisciplineStepsLeft(newStepsLeft);
    setDisciplineConfirmationCount(prev => prev + 1);
    setIsDisciplineDialogOpen(false);
    
    if (newStepsLeft <= 0) {
      setIsEditMode(true);
    }
  };

  const resetDisciplineChallenge = () => {
    setIsDisciplineDialogOpen(false);
    setDisciplineStepsLeft(null);
    setDisciplineMessages([]);
    setDisciplineConfirmationCount(1);
  };

  const handleFinishEditing = () => {
    setIsEditMode(false);
    resetDisciplineChallenge();
  };

  const handleEditClick = (task: ScheduleTask) => {
    setSelectedTask(task);
    setEditedTime(task.time);
    setEditedTask(task.formal);
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
        const scheduleDocRef = doc(db, "schedules", type);
        const updates: { [key: string]: any } = {};

        if (selectedTask.time !== editedTime) {
            updates[`tasks.${selectedTask.time}`] = deleteField();
        }
        
        updates[`tasks.${editedTime}`] = {
            formal: editedTask,
            informal: editedTask
        };

        await updateDoc(scheduleDocRef, updates);
        await logScheduleChange(type, 'edited', editedTime, editedTask, selectedTask.formal);


        const updatedScheduleData = await getSchedule(type);
        if (updatedScheduleData) onUpdate(updatedScheduleData);

        toast({ title: "Success!", description: "Your schedule has been updated." });
        setIsEditDialogOpen(false);
        setSelectedTask(null);

    } catch (error) {
        console.error("Error updating schedule:", error);
        toast({ title: "Error", description: "Could not update the schedule.", variant: "destructive" });
    } finally {
        setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    setIsSaving(true);
    try {
        const scheduleDocRef = doc(db, "schedules", type);
        await updateDoc(scheduleDocRef, {
            [`tasks.${selectedTask.time}`]: deleteField()
        });
        
        await logScheduleChange(type, 'deleted', selectedTask.time, selectedTask.formal);
        
        const updatedScheduleData = await getSchedule(type);
        if (updatedScheduleData) onUpdate(updatedScheduleData);
        
        toast({ title: "Task Deleted", description: "The task has been removed." });
        setIsEditDialogOpen(false);
        setSelectedTask(null);
    } catch (error) {
        console.error("Error deleting task:", error);
        toast({ title: "Error", description: "Could not delete the task.", variant: "destructive" });
    } finally {
        setIsSaving(false);
    }
  }

  const handleAddNewTask = async () => {
    if (!newTime || !newTask || !schedule) return;

    setIsSaving(true);
    try {
        const scheduleDocRef = doc(db, "schedules", type);
        await updateDoc(scheduleDocRef, {
            [`tasks.${newTime}`]: {
                formal: newTask,
                informal: newTask
            }
        });

        await logScheduleChange(type, 'added', newTime, newTask);

        const updatedScheduleData = await getSchedule(type);
        if (updatedScheduleData) onUpdate(updatedScheduleData);

        toast({ title: "Task Added!", description: "The new task has been added." });
        setIsAddDialogOpen(false);

    } catch(error) {
        console.error("Error adding task:", error);
        toast({ title: "Error", description: "Could not add the task.", variant: "destructive" });
    } finally {
        setIsSaving(false);
    }
  }

  const currentMessage = disciplineMessages[0] || "Are you sure this change aligns with your long-term goals?";
  
  return (
    <div>
      <ul className="space-y-2">
        {schedule.tasks.map((task) => (
          <li key={task.time} className="flex items-center justify-between rounded-md p-3 hover:bg-muted/50 transition-colors">
            <span className="text-muted-foreground">{`${task.time}: ${task.formal}`}</span>
            {isEditMode && (
              <Button variant="ghost" size="icon" onClick={() => handleEditClick(task)} className="transition-all">
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </li>
        ))}
      </ul>
      
      <Separator className="my-6" />

      <div className="flex justify-end gap-2">
          {isEditMode ? (
              <>
                  <Button onClick={handleAddClick} variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
                  </Button>
                  <Button onClick={handleFinishEditing}>
                      <Lock className="mr-2 h-4 w-4" /> Finish Editing
                  </Button>
              </>
          ) : (
              <Button onClick={handleEnableEditingClick}>
                  <Unlock className="mr-2 h-4 w-4" />
                  Enable Editing
              </Button>
          )}
      </div>


      {/* Discipline Dialog */}
       <Dialog open={isDisciplineDialogOpen} onOpenChange={setIsDisciplineDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquareHeart className="text-primary"/> A Moment of Reflection
            </DialogTitle>
             <DialogDescription>
                Before changing your schedule, consider this point. True progress comes from discipline.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 text-sm text-muted-foreground min-h-[80px] flex flex-col items-center justify-center text-center">
            <p className="italic">"{currentMessage}"</p>
            <Separator />
            <p className="font-semibold text-foreground">Are you sure you want to proceed?</p>
          </div>
          <DialogFooter className="grid grid-cols-2 gap-4">
             <Button onClick={resetDisciplineChallenge} variant="outline">No</Button>
             <Button onClick={handleDisciplineYes}>
                Yes {disciplineConfirmationCount > 1 ? `x${disciplineConfirmationCount}` : ''}
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Make changes below. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">Time</Label>
              <Input id="time" value={editedTime} onChange={(e) => setEditedTime(e.target.value)} className="col-span-3" type="time"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-right">Task</Label>
              <Input id="task" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter className="flex justify-between w-full">
            <Button variant="destructive" onClick={handleDelete} disabled={isSaving}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <div className="flex gap-2">
                <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save changes
                </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Task Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Enter the details. The task will be sorted by time automatically.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-time" className="text-right">Time</Label>
              <div className="col-span-3">
                <Input id="new-time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="w-full" type="time"/>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Use 24-hour format: <code className="bg-muted px-1 py-0.5 rounded">17:00</code> for 5:00 PM
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-task" className="text-right">Task</Label>
              <Input id="new-task" value={newTask} onChange={(e) => setNewTask(e.target.value)} className="col-span-3" placeholder="E.g., Review Physics Notes"/>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddNewTask} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};


export default function ScheduleEditor() {
  const [holidaySchedule, setHolidaySchedule] = useState<Schedule | null>(null);
  const [coachingSchedule, setCoachingSchedule] = useState<Schedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      try {
        const [holidayData, coachingData] = await Promise.all([
          getSchedule('holiday'),
          getSchedule('coaching'),
        ]);

        setHolidaySchedule(holidayData);
        setCoachingSchedule(coachingData);
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

  const handleUpdate = (type: DayType, updatedSchedule: Schedule) => {
    if (type === 'holiday') {
        setHolidaySchedule(updatedSchedule);
    } else {
        setCoachingSchedule(updatedSchedule);
    }
  }

  return (
    <Card className="border-0 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
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
