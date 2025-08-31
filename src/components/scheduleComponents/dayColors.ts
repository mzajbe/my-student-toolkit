import type { DayColors, DayOfWeek } from "@/types/types";


// Color scheme for each day
export const dayColors: Record<DayOfWeek, DayColors> = {
  monday: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  tuesday: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  wednesday: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  thursday: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
  friday: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-200" },
};