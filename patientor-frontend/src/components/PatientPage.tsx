import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Diagnosis } from "../types";

interface Entry {
  date: string;
  description: string;
  diagnosisCodes?: string[];
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage: React.FC<PatientPageProps> = ({ diagnoses }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries.</p>
      ) : (
        <div>
          {patient.entries.map((entry, idx) => (
            <div key={idx} style={{ marginBottom: "1em" }}>
              {entry.date}
              <em> {entry.description}</em>
              <br />
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <ul>
                  {entry.diagnosisCodes.map((code) => {
                    const diagnosis = diagnoses.find((d) => d.code === code);
                    return (
                      <li key={code}>
                        {code} {diagnosis ? `- ${diagnosis.name}` : ""}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPage;
