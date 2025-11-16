import patientsData from "../data/patients";

import { Patient, PatientWithoutSsn } from "../types";

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

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
  getPatientsWithoutSsn,
};
