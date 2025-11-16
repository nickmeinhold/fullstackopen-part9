import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { calculator } from "./calculator";

const app = express();
app.use(express.json());

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
    return res.status(400).json({ error: "malformatted parameters" });
  }

  try {
    const bmi = calculateBmi(heightNum, weightNum);
    return res.json({ weight: weightNum, height: heightNum, bmi });
  } catch (e) {
    return res.status(500).json({ error: "internal error" });
  }
});

// calculator route
// POST /calculate  { value1, value2, op }
app.post("/calculate", (req, res) => {
  const { value1, value2, op } = req.body;

  try {
    const result = calculator(value1, value2, op);
    return res.json({ result });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({ error: e.message });
    }
    return res.status(500).json({ error: "internal error" });
  }
});

// POST /exercises
// expects JSON: { target: number, daily_exercises: number[] }
app.post("/exercises", (req, res) => {
  const { target, daily_exercises } = req.body;

  if (target === undefined || daily_exercises === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }
  // Accept numbers or strings convertible to numbers
  const targetNum = Number(target);
  if (isNaN(targetNum)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const hours: number[] = daily_exercises.map((d: any) => Number(d));
  if (hours.some((h) => isNaN(h))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  try {
    const result = calculateExercises(hours, targetNum);
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: "internal error" });
  }
});

const PORT = 3003;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
