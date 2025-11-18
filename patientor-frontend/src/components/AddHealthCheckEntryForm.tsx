import React, { useState } from "react";
import { Button, TextField, FormControl, InputLabel } from "@mui/material";

interface HealthCheckEntryForm {
  type: "HealthCheck";
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  healthCheckRating: number;
}

interface AddHealthCheckEntryFormProps {
  patientId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

const AddHealthCheckEntryForm: React.FC<AddHealthCheckEntryFormProps> = ({
  patientId,
  onSuccess,
  onError,
  onCancel,
}) => {
  const [formData, setFormData] = useState<HealthCheckEntryForm>({
    type: "HealthCheck",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    healthCheckRating: 0,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "healthCheckRating" ? Number(value) : value,
    }));
  };

  const handleDiagnosisCodesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      diagnosisCodes: e.target.value.split(",").map((code) => code.trim()),
    }));
  };

  const handleCancel = () => {
    setFormData({
      type: "HealthCheck",
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      healthCheckRating: 0,
    });
    if (typeof onCancel === "function") onCancel();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const entryData = { ...formData };
      const response = await fetch(
        `http://localhost:3001/api/patients/${patientId}/entries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entryData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          typeof errorData.error === "string"
            ? errorData.error
            : "Failed to add entry"
        );
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to add entry";
      if (onError) onError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <InputLabel shrink>Health Check Entry</InputLabel>
      </FormControl>
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleFormChange}
        fullWidth
        style={{ marginBottom: 16 }}
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleFormChange}
        fullWidth
        style={{ marginBottom: 16 }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Specialist"
        name="specialist"
        value={formData.specialist}
        onChange={handleFormChange}
        fullWidth
        style={{ marginBottom: 16 }}
      />
      <TextField
        label="Diagnosis Codes (comma separated)"
        name="diagnosisCodes"
        value={formData.diagnosisCodes.join(",")}
        onChange={handleDiagnosisCodesChange}
        fullWidth
        style={{ marginBottom: 16 }}
      />
      <TextField
        label="Health Check Rating (0-3)"
        name="healthCheckRating"
        type="number"
        value={formData.healthCheckRating}
        onChange={handleFormChange}
        fullWidth
        style={{ marginBottom: 16 }}
        inputProps={{ min: 0, max: 3 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginRight: 8 }}
      >
        OK
      </Button>
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </form>
  );
};

export default AddHealthCheckEntryForm;
