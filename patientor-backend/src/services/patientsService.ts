import patientsData from "../data/patients";
import { v4 as uuid } from "uuid";

import { Patient, PatientWithoutSsn, NewPatient } from "../types";

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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
  getPatients,
  addPatient,
  getPatientsWithoutSsn,
};
