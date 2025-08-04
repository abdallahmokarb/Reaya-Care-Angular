export interface DoctorTimeSlotDTO {
  doctorTimeSlotId: number;
  doctorId: number;
  timeSlotId: number;
  startTime: Date;
  endTime: Date;
  dayOfWeek: string;
  isAvailable: boolean;
}