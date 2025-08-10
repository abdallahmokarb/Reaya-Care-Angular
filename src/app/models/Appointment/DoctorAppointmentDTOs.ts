export interface DoctorAppointment {
  appointmentId: number;
  patientName: string;
  patientPhone: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  status: string;
  meetingUrl?: string;
  serviceType: 'Online' | 'InClinic';
}