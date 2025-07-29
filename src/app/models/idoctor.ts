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
    location: string; // Location of the doctor
    detailedAddress?: string; // Detailed address for the doctor's clinic or office
    medicalLicenseUrl: string; // Optional medical license number
    nationalIdUrl: string; // Optional national ID UR
    graduationCertificateUrl: string; // Optional graduation certificate URL
    experienceCertificateUrl: string; // Optional experience certificate URL
    profilePictureUrl: string; // Optional profile picture URL
    profileImageUrl: string; // URL to the doctor's profile picture
    gender:string; // Gender of the doctor
}
