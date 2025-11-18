import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Entry {} // You can expand this based on your backend Entry type

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

const PatientPage: React.FC = () => {
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
      <h2>{patient.name}</h2>
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
        <strong>Gender:</strong> {patient.gender}
      </p>
      <p>
        <strong>Occupation:</strong> {patient.occupation}
      </p>
      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries.</p>
      ) : (
        <ul>
          {patient.entries.map((_entry, idx) => (
            <li key={idx}>Entry details here</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientPage;
