import express from "express";
const app = express();

import calculateBmi from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

//endpoint bmi
//input with query string parameters

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) res.status(400).json({ error: "Missing parameters" });
  if (isNaN(Number(height)) || isNaN(Number(weight)))
    res.status(400).json({ error: "Malformatted parameters" });

  const bmi = calculateBmi(Number(height), Number(weight));

  res.status(200).json({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
