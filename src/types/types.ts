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
