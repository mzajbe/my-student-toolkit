/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Plus, Pencil, Trash2 } from "lucide-react";

// Import Big Calendar CSS
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { ClassEvent } from "@/types/types";




// Create a localizer
const localizer = momentLocalizer(moment);

// Subject color mapping
const SUBJECT_COLORS: Record<
  string,
  { backgroundColor: string; borderColor: string }
> = {
  Mathematics: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    borderColor: "blue",
  },
  "Computer Science": {
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    borderColor: "green",
  },
  Physics: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    borderColor: "red",
  },
  Chemistry: {
    backgroundColor: "rgba(168, 85, 247, 0.2)",
    borderColor: "purple",
  },
  Default: {
    backgroundColor: "rgba(156, 163, 175, 0.2)",
    borderColor: "gray",
  },
};

const Calender: React.FC = () => {
  const [events, setEvents] = useState<ClassEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ClassEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Event state for modal
  const [eventForm, setEventForm] = useState<ClassEvent>({
    title: "",
    start: new Date(),
    end: new Date(),
    subject: "",
    instructor: "",
  });

  // Subjects list
  const SUBJECTS: string[] = [
    "Mathematics",
    "Computer Science",
    "Physics",
    "Chemistry",
  ];

  // Handle Event Selection
  const handleSelectEvent = useCallback((event: ClassEvent) => {
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      start: event.start,
      end: event.end,
      subject: event.subject,
      instructor: event.instructor,
    });
    setIsModalOpen(true);
  }, []);

  // Handle Slot Selection (for creating new event)
  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setSelectedEvent(null);
      setEventForm({
        title: "",
        start,
        end,
        subject: "",
        instructor: "",
      });
      setIsModalOpen(true);
    },
    []
  );

  // Save or Update Event
  const handleSaveEvent = () => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === selectedEvent.id
            ? {
                ...eventForm,
                id: selectedEvent.id,
                ...(SUBJECT_COLORS[eventForm.subject] ||
                  SUBJECT_COLORS["Default"]),
              }
            : evt
        )
      );
    } else {
      // Add new event
      const newEvent: ClassEvent = {
        ...eventForm,
        id: Date.now(),
        ...(SUBJECT_COLORS[eventForm.subject] || SUBJECT_COLORS["Default"]),
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    // Close modal
    setIsModalOpen(false);
  };

  // Delete Event
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.filter((evt) => evt.id !== selectedEvent.id)
      );
      setIsModalOpen(false);
    }
  };
  // Custom Event Styling
  const eventStyleGetter = (event: ClassEvent) => {
    const style = {
      backgroundColor:
        event.backgroundColor || SUBJECT_COLORS["Default"].backgroundColor,
      borderColor: event.borderColor || SUBJECT_COLORS["Default"].borderColor,
      color: "black",
      borderWidth: "2px",
      borderRadius: "5px",
    };
    return { style };
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Class Schedule Calendar</h1>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventStyleGetter}
        />
      </div>

      {/* Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {selectedEvent ? "Edit Event" : "Add New Event"}
            </h2>

            {/* Title Input */}
            <div className="mb-4">
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={eventForm.title}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    title: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                placeholder="Enter event title"
              />
            </div>

            {/* Subject Dropdown */}
            <div className="mb-4">
              <label className="block mb-2">Subject</label>
              <select
                value={eventForm.subject}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    subject: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Select Subject</option>
                {SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Instructor Input */}
            <div className="mb-4">
              <label className="block mb-2">Instructor</label>
              <input
                type="text"
                value={eventForm.instructor}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    instructor: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                placeholder="Enter instructor name"
              />
            </div>

            {/* Start and End Time */}
            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label className="block mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  value={moment(eventForm.start).format("YYYY-MM-DDTHH:mm")}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      start: new Date(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2">End Time</label>
                <input
                  type="datetime-local"
                  value={moment(eventForm.end).format("YYYY-MM-DDTHH:mm")}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      end: new Date(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              {selectedEvent && (
                <button
                  onClick={handleDeleteEvent}
                  className="flex items-center text-red-500 hover:bg-red-100 p-2 rounded"
                >
                  <Trash2 className="mr-2" /> Delete
                </button>
              )}
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEvent}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender;
