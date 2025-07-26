export interface Idoctor {
    doctorId: number;
    profilePicture: string; // URL to the doctor's profile picture
    fullName: string;
    waitingTime: number; // in minutes
    fees: number; // in currency units
    service: string; // e.g., "General Checkup", "Dental", etc.
    addresses: string[];
    specialization?: string; // Optional field for doctor's specialization
    experienceYears?: number; // Optional field for years of experience
    ratingValue: number; // Rating out of 5
}
