import React, { useState } from "react";
import { Button, TextField, FormControl, InputLabel } from "@mui/material";

interface HospitalEntryForm {
  type: "Hospital";
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  discharge: {
    date: string;
    criteria: string;
  };
}

interface AddHospitalEntryFormProps {
  patientId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

const AddHospitalEntryForm: React.FC<AddHospitalEntryFormProps> = ({
  patientId,
  onSuccess,
  onError,
  onCancel,
}) => {
  const [formData, setFormData] = useState<HospitalEntryForm>({
    type: "Hospital",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    discharge: { date: "", criteria: "" },
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiagnosisCodesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      diagnosisCodes: e.target.value.split(",").map((code) => code.trim()),
    }));
  };

  const handleDischargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      discharge: {
        ...prev.discharge,
        [name]: value,
      },
    }));
  };

  const handleCancel = () => {
    setFormData({
      type: "Hospital",
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      discharge: { date: "", criteria: "" },
    });
    if (onCancel) onCancel();
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
        <InputLabel shrink>Hospital Entry</InputLabel>
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
        label="Discharge Date"
        name="date"
        type="date"
        value={formData.discharge.date}
        onChange={handleDischargeChange}
        fullWidth
        style={{ marginBottom: 16 }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Discharge Criteria"
        name="criteria"
        value={formData.discharge.criteria}
        onChange={handleDischargeChange}
        fullWidth
        style={{ marginBottom: 16 }}
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

export default AddHospitalEntryForm;
