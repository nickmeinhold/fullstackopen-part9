import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Diagnosis, Patient } from "../types";
import EntryDetails from "./EntryDetails";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import { Button, Alert } from "@mui/material";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage: React.FC<PatientPageProps> = ({ diagnoses }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get<Patient>(
          `http://localhost:3001/api/patients/${id}`
        );
        setPatient(response.data);
      } catch (err) {
        setError("Could not fetch patient data.");
      }
    };
    fetchPatient();
  }, [id]);

  useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => setFormError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [formError]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <MaleIcon fontSize="large" />
        ) : patient.gender === "female" ? (
          <FemaleIcon fontSize="large" />
        ) : (
          <TransgenderIcon fontSize="large" />
        )}
      </h2>
      <p>
        <strong>ID:</strong> {patient.id}
      </p>
      <p>
        <strong>Date of Birth:</strong> {patient.dateOfBirth}
      </p>
      <p>
        <strong>SSN:</strong> {patient.ssn}
      </p>
      <p>
        <strong>Occupation:</strong> {patient.occupation}
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowEntryForm(true)}
        style={{ marginBottom: 16 }}
      >
        Add Entry
      </Button>
      {formError && (
        <Alert severity="error" style={{ marginBottom: 16 }}>
          {formError}
        </Alert>
      )}
      {showEntryForm && (
        <AddHospitalEntryForm
          patientId={patient.id}
          onSuccess={async () => {
            setShowEntryForm(false);
            const response = await axios.get<Patient>(
              `http://localhost:3001/api/patients/${patient.id}`
            );
            setPatient(response.data);
          }}
          onError={setFormError}
          onCancel={() => setShowEntryForm(false)}
        />
      )}

      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries.</p>
      ) : (
        <div>
          {patient.entries
            .slice()
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((entry) => (
              <EntryDetails
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default PatientPage;
