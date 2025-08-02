export interface IAppointment {
  appointmentId: number;
  doctorName: string;
  specializationName: string;
  startTime: string;
  endTime: string;
  date: string;
  //timeRange: string;    // e.g. "10:00 - 10:30"
  //notes?: string;
  status:string;
}
