export interface AvailableDoctorTimeSlotDTO {
  doctorId: number;
  timeSlotId: number;
  startTime: Date;
  endTime: Date;
  dayOfWeek: string;
}