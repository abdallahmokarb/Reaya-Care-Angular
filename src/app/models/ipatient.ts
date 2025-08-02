export interface Ipatient {
    userId?: string; // Optional, if not always present
    fullName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string; // ISO string format since DateOnly isn't available in JS
    gender: string; // Adjust enum as needed
   
    createdAt: string; // Same here for DateOnly
}
