import { DoctorService } from "../shared/services/doctor-service";

export interface Idoctorcard {
  fullName: string;
  expYears: number;
  aboutMe: string;
  ratingValue: number;
  fees: number;
  specialization?: string | null;
  specializationId: number;
  governemntId: number;
  doctorService: string;
  doctorId: number;
  profilePictureUrl: string; // URL to the doctor's profile picture
  waitingTime: number; // in minutes
  addresses: string[];
  gender: string; 
  hasAvailableTimeSlots: boolean;
  hasAvailableTimeSlotsToday: boolean;
  hasAvailableTimeSlotsTomorrow: boolean;
}
