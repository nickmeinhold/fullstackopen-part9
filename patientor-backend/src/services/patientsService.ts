import patientsData from "../data/patients";
import { v4 as uuid } from "uuid";

import { Patient, PatientWithoutSsn, NewPatient, Entry } from "../types";
import {
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from "../types";

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatient = (id: string): Patient => {
  const patient: Patient | undefined = patientsData.find((p) => p.id === id);
  if (patient === undefined) {
    throw Error(`no patient exists with id: ${id}`);
  }
  return patient;
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatient,
  };
  patientsData.push(patient);
  return patient;
};

const addEntry = (patientId: string, entry: Omit<Entry, "id">): Entry => {
  const patient = patientsData.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }
  let newEntry;
  switch (entry.type) {
    case "Hospital":
      newEntry = { ...entry, id: uuid() } as HospitalEntry;
      break;
    case "OccupationalHealthcare":
      newEntry = {
        ...entry,
        id: uuid(),
      } as OccupationalHealthcareEntry;
      break;
    case "HealthCheck":
      newEntry = {
        ...entry,
        id: uuid(),
      } as HealthCheckEntry;
      break;
    default:
      throw new Error("Invalid entry type");
  }
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatient,
  getPatients,
  addPatient,
  getPatientsWithoutSsn,
  addEntry,
};
