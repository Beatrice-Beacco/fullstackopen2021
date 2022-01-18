import diagnosesData from "../data/diagnoses";
import { Diagnose } from "../types";

export const getEntries = (): Array<Diagnose> => {
  return diagnosesData;
};
