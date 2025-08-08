export interface AdminDTO {
  adminId: number;
  appUserId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: Gender;
  systemId: number;
}

export interface AdminCreateDTO {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: Gender;
  systemId: number;
}

export interface AdminUpdateDTO {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: Gender;
  systemId: number;
}

export enum Gender {
  Male = 0,
  Female = 1
}