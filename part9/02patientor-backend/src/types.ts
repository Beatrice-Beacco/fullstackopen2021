export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

type GenderType = "male" | "female" | "other";

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: GenderType;
  occupation: string;
  entries: Entry[] | [];
}

///Diagnoses
export interface BaseEntry {
  id: string;
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheck extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface DischargeInfo {
  date: string;
  criteria: string;
}

export interface Hospital extends BaseEntry {
  type: EntryType.Hospital;
  discharge: DischargeInfo;
}

interface SickLeaveInfo {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcare extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeaveInfo;
}

export type Entry = HealthCheck | Hospital | OccupationalHealthcare;

export type NewBaseEntry = Omit<BaseEntry, "id">;

export type NewEntry =
  | Omit<Hospital, "id">
  | Omit<OccupationalHealthcare, "id">
  | Omit<HealthCheck, "id">;

export type NewPatient = Omit<Patient, "id">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
