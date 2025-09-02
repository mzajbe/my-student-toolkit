import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Clock, Plus, Edit, Trash2 } from "lucide-react";
import type { DayOfWeek } from "@/types/types";
import { dayColors } from "./dayColors";
import { routineData } from "./routineData";

// Define the form data type
interface ClassFormData {
  subject: string;
  time: string;
  teacher: string;
  room: string;
}

const daysOfWeek: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const Routine = () => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("monday");
  const [classes, setClasses] = useState(routineData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<{
    day: DayOfWeek;
    index: number;
  } | null>(null);
  const [formData, setFormData] = useState<ClassFormData>({
    subject: "",
    time: "",
    teacher: "",
    room: "",
  });

  // Open modal for adding a new class
  const openAddModal = (day: DayOfWeek) => {
    setEditingClass(null);
    setFormData({ subject: "", time: "", teacher: "", room: "" });
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing class
  const openEditModal = (day: DayOfWeek, index: number) => {
    const classToEdit = classes[day][index];
    setEditingClass({ day, index });
    setFormData({ ...classToEdit });
    setIsModalOpen(true);
  };

  // Delete a class
  const deleteClass = (day: DayOfWeek, index: number) => {
    const updatedClasses = { ...classes };
    updatedClasses[day] = updatedClasses[day].filter((_, i) => i !== index);
    setClasses(updatedClasses);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedClasses = { ...classes };

    if (editingClass) {
      // Update existing class
      updatedClasses[editingClass.day][editingClass.index] = { ...formData };
    } else {
      // Add new class
      updatedClasses[selectedDay] = [
        ...updatedClasses[selectedDay],
        { ...formData },
      ];
    }

    setClasses(updatedClasses);
    setIsModalOpen(false);
    setFormData({ subject: "", time: "", teacher: "", room: "" });
    setEditingClass(null);
  };

  return (
    <>
      <Card className="w-full max-w-5xl border  mx-auto mt-6 shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CalendarDays className="w-6 h-6 text-blue-600" /> Class Routine
            </h2>
            <button
              onClick={() => openAddModal(selectedDay)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Class
            </button>
          </div>

          <Tabs defaultValue="daily" className="w-full">
            {/* Tab Buttons */}
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
            </TabsList>

            {/* Daily View */}
            <TabsContent value="daily">
              <div className="flex gap-2 overflow-x-auto pb-3">
                {daysOfWeek.map((day) => {
                  const colorSet = dayColors[day];
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                        selectedDay === day
                          ? "bg-blue-600 text-white"
                          : `${colorSet.bg} ${colorSet.text} hover:opacity-90`
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="overflow-x-auto mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Teacher
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Room
                      </TableHead>
                      <TableHead className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Time
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classes[selectedDay].map((cls, i) => (
                      <TableRow key={i}>
                        <TableCell>{cls.subject}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {cls.teacher}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {cls.room}
                        </TableCell>
                        <TableCell>{cls.time}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditModal(selectedDay, i)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteClass(selectedDay, i)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Weekly View */}
            <TabsContent value="weekly">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Teacher
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Room
                      </TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {daysOfWeek.map((day) =>
                      classes[day].map((cls, i) => {
                        const colorSet = dayColors[day];
                        return (
                          <TableRow
                            key={`${day}-${i}`}
                            className={`${colorSet.border}`}
                          >
                            <TableCell
                              className={`capitalize font-medium ${colorSet.text}`}
                            >
                              {day}
                            </TableCell>
                            <TableCell>{cls.subject}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {cls.teacher}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {cls.room}
                            </TableCell>
                            <TableCell>{cls.time}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => openEditModal(day, i)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteClass(day, i)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modal for adding/editing classes */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingClass ? "Edit Class" : "Add New Class"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Teacher
                  </label>
                  <input
                    type="text"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Room</label>
                  <input
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="e.g., 9:00 AM - 10:00 AM"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                {!editingClass && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Day
                    </label>
                    <select
                      value={selectedDay}
                      onChange={(e) =>
                        setSelectedDay(e.target.value as DayOfWeek)
                      }
                      className="w-full p-2 border rounded-md"
                    >
                      {daysOfWeek.map((day) => (
                        <option key={day} value={day}>
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingClass ? "Update" : "Add"} Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Routine;
