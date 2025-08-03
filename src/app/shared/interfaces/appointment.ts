export interface Appointment {
  appointmentId: number;
  createdAt: string;
  doctorTimeSlotId: number;
  notes?: string;
  patientId: number;
  paymentId: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  timeSlotId: number;
  vedioCallUrl: string;
}
