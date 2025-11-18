import React, { useState } from "react";
import { Button, TextField, FormControl, InputLabel } from "@mui/material";

interface OccupationalHealthcareEntryForm {
  type: "OccupationalHealthcare";
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface AddOccupationalEntryFormProps {
  patientId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

const AddOccupationalEntryForm: React.FC<AddOccupationalEntryFormProps> = ({
  patientId,
  onSuccess,
  onError,
  onCancel,
}) => {
  const [formData, setFormData] = useState<OccupationalHealthcareEntryForm>({
    type: "OccupationalHealthcare",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    employerName: "",
    sickLeave: { startDate: "", endDate: "" },
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

  const handleSickLeaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      sickLeave: {
        ...(prev.sickLeave ?? { startDate: "", endDate: "" }),
        [name.split(".")[1]]: value,
      },
    }));
  };

  const handleCancel = () => {
    setFormData({
      type: "OccupationalHealthcare",
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      employerName: "",
      sickLeave: { startDate: "", endDate: "" },
    });
    if (typeof onCancel === "function") onCancel();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const entryData = { ...formData };
      if (!entryData.sickLeave?.startDate || !entryData.sickLeave?.endDate) {
        delete entryData.sickLeave;
      }
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
        <InputLabel shrink>Occupational Healthcare Entry</InputLabel>
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
        label="Employer Name"
        name="employerName"
        value={formData.employerName}
        onChange={handleFormChange}
        fullWidth
        style={{ marginBottom: 16 }}
      />
      <TextField
        label="Sick Leave Start"
        name="sickLeave.startDate"
        type="date"
        value={formData.sickLeave?.startDate || ""}
        onChange={handleSickLeaveChange}
        fullWidth
        style={{ marginBottom: 16 }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Sick Leave End"
        name="sickLeave.endDate"
        type="date"
        value={formData.sickLeave?.endDate || ""}
        onChange={handleSickLeaveChange}
        fullWidth
        style={{ marginBottom: 16 }}
        InputLabelProps={{ shrink: true }}
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

export default AddOccupationalEntryForm;
