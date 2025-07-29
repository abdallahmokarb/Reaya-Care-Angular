import { Irating } from "./irating";

export interface Idoctordetails {
    doctorId: number;
    fullName: string;
    profilePictureUrl: string; // URL to the doctor's profile picture
    specialization: string;
    experienceYears: number; // Years of experience
    serviceType: string; // e.g., "In-person", "Online"
    addresses: string[]; // List of addresses
    fees: number; // Consultation fees
    waitingTime: number; // Estimated waiting time in minutes
    ratingValue: number; // Rating out of 5
    about?: string; // Optional field for doctor's biography
}
