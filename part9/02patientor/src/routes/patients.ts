import express from "express";
import { getNonSensitiveEntries } from "../services/patientService";
import { NonSensitivePatient } from "../types";

const router = express.Router();

router.get("/", (_req, res): Array<NonSensitivePatient> => {
  const patients = getNonSensitiveEntries();
  res.status(200).send(patients);
  return patients;
});

export default router;
