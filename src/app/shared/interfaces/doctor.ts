export interface Doctor {
  doctorId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  balance: number;
  expYears: number;
  aboutMe: string;
  ratingValue: number;
  fees: number;
  service: string;
  serviceId: number;
  status: number;
  specialization: string;
  specializationId: number;
  location: string;
  detailedAddress: string;
  cityId: number;
  cityName: string;
  governmentId: number;
  governmentName: string;
  medicalLicenseUrl: string | null;
  nationalIdUrl: string | null;
  graduationCertificateUrl: string | null;
  experienceCertificateUrl: string | null;
  profilePictureUrl: string | null;
  gender: 'Male' | 'Female' | string;
}
