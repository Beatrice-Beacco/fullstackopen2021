/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from "../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";

import { v1 as uuid } from "uuid";
const uniqueId = uuid();

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

export const addPatient = (inputPatient: NewPatient): Patient => {
  const newPatientEntry = {
    id: uniqueId,
    ...inputPatient,
  };

  patientData.push(newPatientEntry);

  return newPatientEntry;
};
