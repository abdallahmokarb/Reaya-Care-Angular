export interface Irating {
    id?: number;
    ratingValue: number; // Rating value (e.g., 1 to 5)
    comment: string; // Optional comment about the rating
    patientName?: string; // Name of the patient who gave the rating

    doctorId: number;
}
