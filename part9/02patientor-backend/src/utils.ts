import { NewPatient, Gender } from "./types";

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

const parseNewPatient = ({
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

export default parseNewPatient;
