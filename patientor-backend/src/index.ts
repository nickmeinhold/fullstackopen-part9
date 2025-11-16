import express from "express";
import diagnosesService from "./services/diagnosesService";
import patientsService from "./services/patientsService";

const app = express();

app.get("/api/ping", (_req, res) => {
  res.json({ message: "pong" });
});

app.get("/api/diagnoses", (_req, res) => {
  res.json(diagnosesService.getDiagnoses());
});

app.get("/api/patients", (_req, res) => {
  res.json(patientsService.getPatients());
});

const PORT = 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Patientor backend running on port ${PORT}`);
  });
}

export default app;
