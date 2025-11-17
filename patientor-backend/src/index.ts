import express from "express";
import diagnosesService from "./services/diagnosesService";
import patientsService from "./services/patientsService";
import cors from "cors";
import toNewPatient from "./utils";
import z from "zod";

const app = express();

app.use(cors());
app.use(express.json());

const patientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  ssn: z.string(),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string(),
});

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
    const validatedPatient = patientSchema.parse(req.body);
    const newPatient = toNewPatient(validatedPatient); // Use toNewPatient for validation
    const addedPatient = patientsService.addPatient(newPatient); // Let addPatient handle id generation
    res.status(201).json(addedPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(500).json({ error: "Internal server error" });
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
