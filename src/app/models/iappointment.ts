export interface IAppointment {
  id: number;
  doctorName: string;
  specialization: string;
  date: string;         // ISO format (e.g., "2024-01-01T10:00:00")
  startTime: string;    // e.g. "10:00"
  endTime: string;      // e.g. "10:30"
  timeRange: string;    // e.g. "10:00 - 10:30"
  notes?: string;
  status: 'Scheduled' | 'Completed' | 'Canceled';
}
