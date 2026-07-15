"use client"
import type { Dispatch, SetStateAction } from "react";
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useState, useEffect, useRef } from 'react'
import type { TaskStatus, TaskData } from '../types/Task';
import "./TaskForm.css";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const categories = [
  { label: "No category", value: null },
  { label: "Work", value: "work" },
  { label: "Home", value: "home" },
  { label: "School", value: "school" },
]
type TaskForm = {
  handleCreate: (task: TaskData) => Promise<void>;
  handleUpdate: (task: TaskData) => Promise<void>;
  taskToUpdate: TaskData | null;
  isTaskFormOpen: boolean;
  setIsTaskFormOpen: Dispatch<SetStateAction<boolean>>;

}

export function TaskForm({ handleCreate, handleUpdate, taskToUpdate, isTaskFormOpen, setIsTaskFormOpen }: TaskForm) {
  const [task, setTask] = useState<TaskData>({ id: null, title: "", description: "", status: "todo", ends_at: null })

  // Para ajustar corretamente a altura da descrição conforme o usuário digita.
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [task?.description])
  useEffect(() => {
    if (!taskToUpdate) return;
    setTask(taskToUpdate);
  }, [taskToUpdate]);
  const updateTaskData = <K extends keyof TaskData>(
    key: K,
    value: TaskData[K]
  ) => {
    setTask((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault()
    if (!task.id) handleCreate(task)
    else handleUpdate(task);
    resetForm();
    setIsTaskFormOpen(false);
  }
  function resetForm() {
    setTask({ id: null, title: "", description: "", status: "todo", ends_at: "" });
  }
  return (
    <>
      <Button variant="outline" onClick={() => setIsTaskFormOpen(true)}>Create New Task</Button>
      <Dialog open={isTaskFormOpen} onOpenChange={setIsTaskFormOpen}>
        <DialogContent className="sm:max-w-xl">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="flex flex-row items-center gap-4 w-full mb-4">
              <Select items={categories}>
                <SelectTrigger className="w-full max-w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger render={<Button variant={"outline"} data-empty={!task?.ends_at} className="w-46 justify-between text-left font-normal data-[empty=true]:text-muted-foreground">{task?.ends_at ? format(new Date(task?.ends_at), "PPP") : <span>Pick a date</span>}<ChevronDownIcon data-icon="inline-end" /></Button>} />
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(task?.ends_at || Date.now())}
                    onSelect={(date) => { updateTaskData("ends_at", date ? date.toISOString() : ""); }}
                    defaultMonth={new Date(task?.ends_at || Date.now())}
                  />
                </PopoverContent>
              </Popover>
            </DialogHeader>
            <Input placeholder="New task..." id="title" name="title" value={task?.title} onChange={(e) => updateTaskData("title", e.target.value)} className="rounded-b-none" />
            <Textarea placeholder="Description..." id="description" name="description" value={task?.description} onChange={(e) => updateTaskData("description", e.target.value)} className="rounded-t-none resize-none overflow-y-auto max-h-40 break-all" />
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button type="submit">Save task</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

