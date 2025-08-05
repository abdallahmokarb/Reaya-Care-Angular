
export interface DoctorResult {
    doctorId: number;
    Specialization: string;
    Availability: AvailabilitySlot[];
    Text: string;
}

export interface AvailabilitySlot {
    Day: number;
    Start: string;  // ISO datetime string
    End: string;    // ISO datetime string
}