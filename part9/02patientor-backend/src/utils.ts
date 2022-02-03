import {
  NewPatient,
  Gender,
  HealthCheckRating,
  DischargeInfo,
  EntryType,
  NewBaseEntry,
  NewEntry,
} from "./types";

//Parse string arguments
const parseString = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error("Incorrect or missing argument");
  }

  return input;
};

const isString = (input: unknown): input is string => {
  return typeof input === "string" || input instanceof String;
};

//Parse date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

//Parse gender
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

//Check and compose objects
type Fields = {
  name: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  occupation: unknown;
  gender: unknown;
};

export const parseNewPatient = ({
  name,
  ssn,
  dateOfBirth,
  occupation,
  gender,
}: Fields): NewPatient => {
  const parsedNewEntry: NewPatient = {
    name: parseString(name),
    ssn: parseString(ssn),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseString(occupation),
    gender: parseGender(gender),
    entries: [],
  };

  return parsedNewEntry;
};

const parseEntryType = (param: unknown): EntryType => {
  if (!param || !isString(param) || !isEntryType(param)) {
    throw new Error("Incorrect or missing health check rating: " + param);
  }
  return param;
};

const isEntryType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

//Check specific for entry type HealthCheck
const parseHealthCheck = (healthCheckRating: unknown): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      "Incorrect or missing health check rating: " + healthCheckRating
    );
  }
  return healthCheckRating;
};

//Check if a value is a number
const isNumber = (input: unknown): input is number => {
  return typeof Number(input) === "number";
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

//Check specific for entry type Hospital
const parseHospital = (discharge: unknown): DischargeInfo => {
  if (!discharge || !isDischargeInfo(discharge)) {
    throw new Error("Incorrect or missing discharge info: " + discharge);
  }
  return discharge;
};

const isDischargeInfo = (param: any): param is DischargeInfo => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return isDate(param.startDate) && isDate(param.endDate);
};

//Check specific for entry type OccupationalHealthcare
const parseOccupationalHealthcare = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing discharge info: " + employerName);
  }
  return employerName;
};

type EntryFields = {
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  type: unknown;
  healthCheckRating?: unknown;
  discharge?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
};

export const checkEntryData = (entry: EntryFields): NewEntry => {
  const newEntry = toNewBaseEntry(entry) as NewEntry;

  switch (entry.type) {
    case EntryType.HealthCheck:
      newEntry.healthCheckRating = parseHealthCheck(entry.discharge);
      return newEntry;
    case EntryType.Hospital:
      newEntry.discharge = parseHospital(entry);
      return newEntry;
    case EntryType.OccupationalHealthcare:
      newEntry.employerName = parseOccupationalHealthcare(entry.employerName);
      return newEntry;
    default:
      throw new Error(
        `Incorrect values for new entry: ${JSON.stringify(entry.sickLeave)}`
      );
  }
};

const toNewBaseEntry = (entry: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    description: parseString(entry.description),
    date: parseDate(entry.date),
    specialist: parseString(entry.specialist),
    type: parseEntryType(entry.type),
  };

  return newBaseEntry;
};
