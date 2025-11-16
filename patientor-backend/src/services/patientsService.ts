import patientsData from "../data/patients";

import { Patient } from "../types";

const getPatients = (): Patient[] => {
  return patientsData;
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
};
