import { WeekDays } from "./WeekDays";

export interface DoctorTimeSlotCreateDTO {
  doctorId: number;
  // startTime: Date;
  // endTime: Date;
  startTime: string;
  endTime: string;
  dayOfWeek: WeekDays;
}