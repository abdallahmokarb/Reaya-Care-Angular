export interface AppointmentWithDoctorDTO {
  appointmentId: number;
  status: AppointmentStatus;
  createdAt: Date;
  notes?: string;
  videoCallUrl?: string | null;

  // Patient Info
  patientId: number;
  patientName: string;
  patientEmail: string;

  // Time Slot Info
  startTime: Date;
  endTime: Date;
  dayOfWeek: WeekDays;
}

export enum AppointmentStatus {
  Confirmed = 0,
  Cancelled = 1,
  Finished = 2,
  NonAttendence = 3
}

export enum WeekDays {
  Sunday = 1,
  Monday = 2,
  Tuesday = 3,
  Wednesday = 4,
  Thursday = 5,
  Friday = 6,
  Saturday = 7
}

export interface UpdateAppointmentStatusDTO {
  status: AppointmentStatus;
  doctorId: number;
}

// Additional utility interfaces
export interface AppointmentFilter {
  value: string;
  label: string;
  count: number;
}

export interface DoctorUser {
  doctorId: number;
  name: string;
  email: string;
  // Add other doctor properties as needed
}

// API Response interfaces
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  error: string;
  message?: string;
  status?: number;
}