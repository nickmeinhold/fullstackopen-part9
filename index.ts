import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/ping", (_req, res) => {
  res.send("pong");
});

// GET /bmi?height=180&weight=72
app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const heightNum = Number(req.query.height);
  const weightNum = Number(req.query.weight);

  if (isNaN(heightNum) || isNaN(weightNum)) {
  }

  try {
    const bmi = calculateBmi(heightNum, weightNum);
    return res.json({ weight: weightNum, height: heightNum, bmi });
  } catch (e) {
    return res.status(500).json({ error: "internal error" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
