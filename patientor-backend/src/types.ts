export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string; // Ensure ssn is required
  gender: Gender;
  occupation: string;
}

export type PatientWithoutSsn = Omit<Patient, "ssn">;
export type NewPatient = Omit<Patient, "id">;
