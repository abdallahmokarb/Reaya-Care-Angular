export interface LoginResponse {
  token: string;
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  doctorinfo: string;
  patientinfo: Number;
}
