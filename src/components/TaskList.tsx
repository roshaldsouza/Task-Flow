import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, History, Calendar } from "lucide-react";
import { toast } from "sonner";
import TaskForm, { Task } from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  };

  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    toast.success("Task deleted successfully!");
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.day]) {
      acc[task.day] = [];
    }
    acc[task.day].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No tasks yet. Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {daysOfWeek.map((day) => {
        const dayTasks = groupedTasks[day] || [];
        if (dayTasks.length === 0) return null;

        return (
          <div key={day} className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              {day}
              <Badge variant="secondary">{dayTasks.length}</Badge>
            </h3>
            <div className="grid gap-3">
              {dayTasks.map((task) => (
                <div key={task.id}>
                  {editingTask?.id === task.id ? (
                    <TaskForm
                      editTask={task}
                      onTaskAdded={() => {
                        setEditingTask(null);
                        loadTasks();
                      }}
                      onCancel={() => setEditingTask(null)}
                    />
                  ) : (
                    <Card className="hover:shadow-[var(--shadow-hover)]">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{task.title}</CardTitle>
                            <CardDescription className="mt-1">
                              Created: {formatTimestamp(task.createdAt)}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setEditingTask(task)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDelete(task.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground mb-3">{task.description}</p>
                        
                        {task.editHistory && task.editHistory.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center gap-2 mb-2">
                              <History className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-muted-foreground">
                                Edit History ({task.editHistory.length})
                              </span>
                            </div>
                            <div className="space-y-1">
                              {task.editHistory.slice(-3).reverse().map((edit, index) => (
                                <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                                  <span className="capitalize">{edit.field}</span>
                                  <span>•</span>
                                  <span>{formatTimestamp(edit.timestamp)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
