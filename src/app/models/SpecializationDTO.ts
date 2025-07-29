export interface SpecializationDTO {
  specializationId: number;  // Added ID field which is typically needed
  name: string;
  description: string;
  icon?: string;
  imageUrl?: string; // Optional field if your API provides images
}
