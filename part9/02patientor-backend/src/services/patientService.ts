import patientData from "../data/patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from "../types";

import { v1 as uuid } from "uuid";
const uniqueId = uuid();

export const getEntries = (): Array<Patient> => {
  return patientData;
};

export const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const getSinglePatient = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id == id);
};

export const addPatient = (inputPatient: NewPatient): Patient => {
  const newPatientEntry = {
    id: uniqueId,
    ...inputPatient,
  };

  patientData.push(newPatientEntry);

  return newPatientEntry;
};

let patients: Patient[] = patientData;

export const addEntry = (entry: NewEntry, id: string): Entry => {
  const newEntry = { ...entry, id: uuid() };
  const patient = patientData.find((patient) => patient.id == id);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const updatedPatient = {
    ...patient,
    entries: patient.entries?.concat(newEntry),
  };

  patients = patients.map((patient) => {
    if (patient.id === updatedPatient.id) {
      return updatedPatient;
    }
    return patient;
  });

  return updatedPatient;
};
