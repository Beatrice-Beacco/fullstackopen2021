import patientData from "../data/patients";
import { Patient, NonSensitivePatient } from "../types";

export const getEntries = (): Array<Patient> => {
  return patientData;
};

export const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
