import express from "express";
const bodyParser = require("body-parser");
const app = express();

import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

//endpoint bmi
//input with query string parameters

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight)
    res.status(400).json({ error: "Missing parameters" });

  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight)))
    res.status(400).json({ error: "Malformatted parameters" });

  const bmi = calculateBmi(Number(height), Number(weight));

  res.status(200).json({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400).json({ error: "Missing parameters" });
  }

  const { daily_exercises, target } = req.body;

  if (
    isNaN(Number(target)) || //check if goals is a number
    !Array.isArray(daily_exercises) || //checks if the hour array is in fact an array
    !daily_exercises.some((i) => !Number.isInteger(i)) //checks if the daily_exercises array is a number array
  ) {
    res.status(400).json({ error: "Malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises, target);

  res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
