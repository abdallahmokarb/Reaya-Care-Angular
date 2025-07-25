export interface IRegister {

    email: string;
    password: string;
    fullName: string;
    userName: string;
    phone: string;
    isDoctor: boolean; // false = patient, true = doctor
}
