import { Itimeslot } from '../../models/itimeslot';

export interface BookingDetails {
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  street: string;
  building: string;
  floor: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  items: {
    name: string;
    serviceId: string;
    serviceCatogry: string;
    description: string;
    amount: number;
    quantity: number;
  }[];
}

export interface YourBooking {
  doctorId: number;
  doctorName: string;
  slot?: Itimeslot;
  userId: string;
}
