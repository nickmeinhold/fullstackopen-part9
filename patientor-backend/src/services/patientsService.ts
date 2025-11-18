import patientsData from "../data/patients";
import { v4 as uuid } from "uuid";

import { Patient, PatientWithoutSsn, NewPatient } from "../types";

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

export default {
  getPatient,
  getPatients,
  addPatient,
  getPatientsWithoutSsn,
};
