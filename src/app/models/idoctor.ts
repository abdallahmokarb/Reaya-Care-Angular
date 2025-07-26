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
  specialization: string | null;
}
