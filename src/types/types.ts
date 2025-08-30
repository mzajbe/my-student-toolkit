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