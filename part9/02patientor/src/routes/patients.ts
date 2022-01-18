/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { getNonSensitiveEntries, addPatient } from "../services/patientService";
import parseNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = getNonSensitiveEntries();
  res.status(200).send(patients);
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newPatient = parseNewPatient(req.body);
    const updatedData = addPatient(newPatient);

    res.status(201).json(updatedData);
  } catch (error: unknown) {
    console.log("dentro errore");

    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
