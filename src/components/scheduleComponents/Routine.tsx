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
import { CalendarDays, Clock } from "lucide-react";
import type { DayOfWeek } from "@/types/types";
import { dayColors } from "./dayColors";
import { routineData } from "./routineData";

const daysOfWeek: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const Routine = () => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("monday");

  return (
    <Card className="w-full max-w-5xl mx-auto mt-6 shadow-xl rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-blue-600" /> Class Routine
        </h2>

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
                    <TableHead className="hidden md:table-cell">Room</TableHead>
                    <TableHead className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> Time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routineData[selectedDay].map((cls, i) => (
                    <TableRow key={i}>
                      <TableCell>{cls.subject}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {cls.teacher}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {cls.room}
                      </TableCell>
                      <TableCell>{cls.time}</TableCell>
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
                    <TableHead className="hidden md:table-cell">Room</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {daysOfWeek.map((day) =>
                    routineData[day].map((cls, i) => {
                      const colorSet = dayColors[day];
                      return (
                        <TableRow
                          key={`${day}-${i}`}
                          className={` ${colorSet.border}`}
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
  );
};

export default Routine;
