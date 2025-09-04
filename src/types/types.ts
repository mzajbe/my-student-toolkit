/* eslint-disable @typescript-eslint/no-explicit-any */


export interface ClassEvent {
  id?: number;
  title: string;
  start: Date;
  end: Date;
  subject: string;
  instructor: string;
  backgroundColor?: string;
  borderColor?: string;
  [key: string]: any;
}


//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------


//scheduleComponent types
export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

interface ClassInfo {
  subject: string;
  time: string;
  teacher: string;
  room: string;
}

export interface RoutineData {
  monday: ClassInfo[];
  tuesday: ClassInfo[];
  wednesday: ClassInfo[];
  thursday: ClassInfo[];
  friday: ClassInfo[];
}

export interface DayColors {
  bg: string;
  text: string;
  border: string;
}
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------
//-------------------------------------------------





export type Priority = "low" | "medium" | "high";


// A full task (existing or saved)
export interface Task {
  id: number;
  subject: string;
  topic: string;
  priority: Priority;
  deadline: string;
  timeSlot: string;
  duration: number;
  completed: boolean;
  dayOfWeek: DaysOfWeek;
}



export type DaysOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";



// For creating a new task (no id / completed yet)
 export interface NewTask {
  subject: string;
  topic: string;
  priority: Priority;
  deadline: string;
  timeSlot: string;
  duration: number;
  dayOfWeek: DayOfWeek;
}