import { useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
  BookOpen,
  Target,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";


type Priority = "low" | "medium" | "high";

type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";


// A full task (existing or saved)
  interface Task {
    id: number;
    subject: string;
    topic : string;
    priority:Priority;
    deadline: string;
    timeSlot: string;
    duration: number;
    completed: boolean;
    dayOfWeek: DayOfWeek;
  }

  // For creating a new task (no id / completed yet)
interface NewTask {
  subject: string;
  topic: string;
  priority: Priority;
  deadline: string;
  timeSlot: string;
  duration: number;
  dayOfWeek: DayOfWeek;
}

// Optional state for editing (can be null)
type EditingTask = Task | null;













const StudyPlanner = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      subject: "Mathematics",
      topic: "Calculus Integration",
      priority: "high",
      deadline: "2025-09-10",
      timeSlot: "09:00",
      duration: 120,
      completed: false,
      dayOfWeek: "Monday",
    },
    {
      id: 2,
      subject: "Physics",
      topic: "Quantum Mechanics",
      priority: "medium",
      deadline: "2025-09-15",
      timeSlot: "14:00",
      duration: 90,
      completed: false,
      dayOfWeek: "Tuesday",
    },
  ]);

  const [newTask, setNewTask] = useState<NewTask>({
    subject: "",
    topic: "",
    priority: "medium",
    deadline: "",
    timeSlot: "",
    duration: 60,
    dayOfWeek: "Monday",
  });

  const [editingTask, setEditingTask] = useState<EditingTask>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const priorityColors = {
    high: "destructive",
    medium: "default",
    low: "secondary",
  } as const;

//   const priorityLabels = {
//     high: "High Priority",
//     medium: "Medium Priority",
//     low: "Low Priority",
//   };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ] as const;

  const addTask = () => {
    if (newTask.subject && newTask.topic) {
      const task = {
        id: Date.now(),
        ...newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask({
        subject: "",
        topic: "",
        priority: "medium",
        deadline: "",
        timeSlot: "",
        duration: 60,
        dayOfWeek: "Monday",
      });
    }
  };

  const deleteTask = (id:number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id:number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
// Start editing a task
  const startEdit = (task: Task) => {
    setEditingTask({ ...task });
    setIsEditDialogOpen(true);
  };
// Save changes after editing
  const saveEdit = () => {
    if (!editingTask) return; //guard because editingTask can be null
    setTasks(
      tasks.map((task:Task) => (task.id === editingTask.id ? editingTask : task))
    );
    setIsEditDialogOpen(false);
    setEditingTask(null);
  };

  const getTasksForDay = (day:DayOfWeek) => {
    return tasks
      .filter((task) => task.dayOfWeek === day)
      .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
  };



  const getUpcomingTasks = () => {
    return tasks
      .filter(
        (task: Task) => !task.completed && new Date(task.deadline) >= new Date()
      ).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()).slice(0, 3);
  };
// Format duration in hours/minutes
  const formatDuration = (minutes:number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold ">Study Planner</h1>
              <p className=" mt-2">
                Break down big study goals into manageable tasks
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{tasks.length}</p>
                    <p className="text-sm  mt-1">Total Tasks</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold  ">
                      {tasks.filter((t) => t.completed).length}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold  ">
                      {
                        tasks.filter(
                          (t) => t.priority === "high" && !t.completed
                        ).length
                      }
                    </p>
                    <p className="text-sm text-slate-600 mt-1">High Priority</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Timer className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold  ">
                      {Math.round(
                        tasks.reduce((acc, task) => acc + task.duration, 0) / 60
                      )}
                      h
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Total Study Time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add New Task */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-600" />
                  Add New Task
                </CardTitle>
                <CardDescription>
                  Create a new study task with schedule and priority
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Mathematics"
                    value={newTask.subject}
                    onChange={(e) =>
                      setNewTask({ ...newTask, subject: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Calculus Integration"
                    value={newTask.topic}
                    onChange={(e) =>
                      setNewTask({ ...newTask, topic: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) =>
                        setNewTask({ ...newTask, priority: value as Priority })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Day</Label>
                    <Select
                      value={newTask.dayOfWeek}
                      onValueChange={(value) =>
                        setNewTask({ ...newTask, dayOfWeek: value as DayOfWeek })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newTask.timeSlot}
                      onChange={(e) =>
                        setNewTask({ ...newTask, timeSlot: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (min)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="15"
                      step="15"
                      value={newTask.duration}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          duration: parseInt(e.target.value) || 60,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) =>
                      setNewTask({ ...newTask, deadline: e.target.value })
                    }
                  />
                </div>

                <Button
                  onClick={addTask}
                  disabled={!newTask.subject || !newTask.topic}
                  className="w-full"
                  size="lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>
                  Tasks approaching their deadlines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getUpcomingTasks().map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        <Badge variant={priorityColors[task.priority]}>
                          {task.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium   truncate">{task.subject}</p>
                        <p className="text-sm text-slate-600 truncate">
                          {task.topic}
                        </p>
                        <p className="text-xs text-orange-600 mt-1">
                          {new Date(task.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {getUpcomingTasks().length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">No upcoming deadlines</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Schedule */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 " />
                  Weekly Schedule
                </CardTitle>
                <CardDescription>
                  Your study tasks organized by day of the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {daysOfWeek.map((day) => (
                    <Card key={day} className="">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-center text-lg">
                          {day}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 min-h-[300px]">
                          {getTasksForDay(day).map((task) => (
                            <Card
                              key={task.id}
                              className={`transition-all hover:shadow-md ${
                                task.completed ? "opacity-60" : ""
                              }`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <Checkbox
                                      checked={task.completed}
                                      onCheckedChange={() =>
                                        toggleComplete(task.id)
                                      }
                                      className="mt-1"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Badge
                                          variant={
                                            priorityColors[task.priority]
                                          }
                                          className="text-xs"
                                        >
                                          {task.priority.toUpperCase()}
                                        </Badge>
                                      </div>
                                      <h4
                                        className={`font-semibold mb-1 ${
                                          task.completed ? "line-through" : ""
                                        }`}
                                      >
                                        {task.subject}
                                      </h4>
                                      <p
                                        className={`text-sm  mb-2 ${
                                          task.completed ? "line-through" : ""
                                        }`}
                                      >
                                        {task.topic}
                                      </p>
                                      <div className="flex items-center gap-2 text-xs ">
                                        <Clock className="w-3 h-3" />
                                        <span>{task.timeSlot}</span>
                                        <Separator
                                          orientation="vertical"
                                          className="h-3"
                                        />
                                        <Timer className="w-3 h-3" />
                                        <span>
                                          {formatDuration(task.duration)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => startEdit(task)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => deleteTask(task.id)}
                                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          {getTasksForDay(day).length === 0 && (
                            <div className="text-center py-12">
                              <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                              <p className="text-slate-400 text-sm">
                                No tasks scheduled
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your study task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingTask && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-subject">Subject</Label>
                <Input
                  id="edit-subject"
                  value={editingTask.subject}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, subject: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-topic">Topic</Label>
                <Input
                  id="edit-topic"
                  value={editingTask.topic}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, topic: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={editingTask.priority}
                    onValueChange={(value) =>
                      setEditingTask({ ...editingTask, priority: value as Priority })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Day</Label>
                  <Select
                    value={editingTask.dayOfWeek}
                    onValueChange={(value) =>
                      setEditingTask({ ...editingTask, dayOfWeek: value as DayOfWeek })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Time</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={editingTask.timeSlot}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        timeSlot: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duration (min)</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    min="15"
                    step="15"
                    value={editingTask.duration}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        duration: parseInt(e.target.value) || 60,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-deadline">Deadline</Label>
                <Input
                  id="edit-deadline"
                  type="date"
                  value={editingTask.deadline}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, deadline: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudyPlanner;
