export interface IAppointment {
  appointmentId: number;
  doctorName: string;
  //patientName: string;
  doctorLocation?: string;
  doctorDetailedAddress?: string;
  doctorPhoneNumber: string;
  specializationName: string;
  startTime: string;
  endTime: string;
  date: string;
  //timeRange: string;    //- e.g. "10:00 - 10:30"
  videoCallUrl?: string;
  notes?: string;
  status: string;
}
