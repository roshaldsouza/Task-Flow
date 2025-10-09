import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface TaskFormProps {
  onTaskAdded: () => void;
  editTask?: Task;
  onCancel?: () => void;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  day: string;
  createdAt: string;
  editHistory: {
    timestamp: string;
    field: string;
  }[];
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TaskForm = ({ onTaskAdded, editTask, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(editTask?.title || "");
  const [description, setDescription] = useState(editTask?.description || "");
  const [day, setDay] = useState(editTask?.day || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !day) {
      toast.error("Please fill in all fields");
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    if (editTask) {
      // Edit existing task
      const taskIndex = tasks.findIndex((t: Task) => t.id === editTask.id);
      if (taskIndex !== -1) {
        const editHistory = [...(tasks[taskIndex].editHistory || [])];
        
        if (title !== editTask.title) {
          editHistory.push({ timestamp: new Date().toISOString(), field: "title" });
        }
        if (description !== editTask.description) {
          editHistory.push({ timestamp: new Date().toISOString(), field: "description" });
        }
        if (day !== editTask.day) {
          editHistory.push({ timestamp: new Date().toISOString(), field: "day" });
        }

        tasks[taskIndex] = {
          ...editTask,
          title: title.trim(),
          description: description.trim(),
          day,
          editHistory,
        };
      }
      toast.success("Task updated successfully!");
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        day,
        createdAt: new Date().toISOString(),
        editHistory: [],
      };
      tasks.push(newTask);
      toast.success("Task added successfully!");
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    setTitle("");
    setDescription("");
    setDay("");
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-muted/50 rounded-lg border">
      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you accomplished"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="day">Day of Week</Label>
        <select
          id="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">Select a day</option>
          {daysOfWeek.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="gradient" className="flex-1">
          {editTask ? "Update Task" : "Add Task"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
