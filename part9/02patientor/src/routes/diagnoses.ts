import express from "express";
import { getEntries } from "../services/diagnosesService";
import { Diagnose } from "../types";

const router = express.Router();

router.get("/", (_req, res): Array<Diagnose> => {
  const diagnoses = getEntries();
  res.status(200).send(diagnoses);
  return diagnoses;
});

export default router;
