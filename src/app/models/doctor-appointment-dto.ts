export interface DoctorAppointmentDTO {
  date: string;       // التاريخ بصيغة "dd/MM/yyyy"
  time: string;       // الوقت بصيغة "hh:mm tt"
  patientName: string;
  status: string;
}
