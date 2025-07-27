export interface Idoctor {
  fullName: string;
  email: string;
  phoneNumber: string;
  balance: number;
  expYears: number;
  aboutMe: string;
  ratingValue: number;
  fees: number;
  status: number; // 1 = active, 0 = inactive
  specialization?: string | null;
  specializationId: number;
  service: string;
  serviceId: number;
  doctorId: number;
  profilePicture: string; // URL to the doctor's profile picture
  waitingTime: number; // in minutes
  addresses: string[];
}
