/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import {
  getNonSensitiveEntries,
  addPatient,
  getSinglePatient,
  addEntry,
} from "../services/patientService";
import { parseNewPatient, checkEntryData } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = getNonSensitiveEntries();
  res.status(200).send(patients);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = getSinglePatient(id);
  res.status(200).send(patient);
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newPatient = parseNewPatient(req.body);
    const updatedData = addPatient(newPatient);

    res.status(201).json(updatedData);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

//Add entries to a patient
router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = checkEntryData(req.body);
    const updatedData = addEntry(newEntry, req.params.id);

    res.status(201).json(updatedData);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
