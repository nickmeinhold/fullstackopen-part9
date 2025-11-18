import React, { useState } from "react";
import { Button, ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddOccupationalEntryForm from "./AddOccupationalEntryForm";
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";

interface AddEntryFormProps {
  patientId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

const AddEntryForm: React.FC<AddEntryFormProps> = ({
  patientId,
  onSuccess,
  onError,
  onCancel,
}) => {
  const [entryType, setEntryType] = useState<EntryType>("Hospital");

  return (
    <Box>
      <ToggleButtonGroup
        value={entryType}
        exclusive
        onChange={(_, value) => value && setEntryType(value)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="Hospital">Hospital</ToggleButton>
        <ToggleButton value="OccupationalHealthcare">
          Occupational Healthcare
        </ToggleButton>
        <ToggleButton value="HealthCheck">Health Check</ToggleButton>
      </ToggleButtonGroup>
      <Box>
        {entryType === "Hospital" && (
          <AddHospitalEntryForm
            patientId={patientId}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onCancel}
          />
        )}
        {entryType === "OccupationalHealthcare" && (
          <AddOccupationalEntryForm
            patientId={patientId}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onCancel}
          />
        )}
        {entryType === "HealthCheck" && (
          <AddHealthCheckEntryForm
            patientId={patientId}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onCancel}
          />
        )}
      </Box>
      <Button onClick={onCancel} color="secondary" sx={{ mt: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default AddEntryForm;
