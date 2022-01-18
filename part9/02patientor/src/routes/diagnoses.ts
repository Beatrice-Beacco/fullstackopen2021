import express from "express";
import { getEntries } from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses = getEntries();
  res.status(200).send(diagnoses);
});

export default router;
