import express from "express";
import diagnosesService from "./services/diagnosesService";
import patientsService from "./services/patientsService";
import cors from "cors";
import toNewPatient from "./utils";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.json({ message: "pong" });
});

app.get("/api/diagnoses", (_req, res) => {
  res.json(diagnosesService.getDiagnoses());
});

app.get("/api/patients", (_req, res) => {
  res.json(patientsService.getPatientsWithoutSsn());
});

app.post("/api/patients", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body); // Use toNewPatient for validation
    const addedPatient = patientsService.addPatient(newPatient); // Let addPatient handle id generation
    res.status(201).json(addedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
});

const PORT = 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Patientor backend running on port ${PORT}`);
  });
}

export default app;
