import React from "react";
import { Entry, Diagnosis } from "../types";
import { Box } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { assertNever } from "../helpers";

interface EntryDetailsProps {
  entry: Entry;
  diagnoses?: Diagnosis[];
}

const CommonEntryDetails: React.FC<{
  entry: Entry;
  children?: React.ReactNode;
}> = ({ entry, children }) => {
  const getDiagnosisName = (code: string) =>
    entry.diagnosisCodes?.find((d) => d === code) || "";

  return (
    <>
      <div>
        <strong>Date:</strong> {entry.date}
      </div>
      <div>
        <strong>Description:</strong> {entry.description}
      </div>
      <div>
        <strong>Diagnose by:</strong> {entry.specialist}
      </div>
      {children}
      {entry.diagnosisCodes && (
        <div>
          <strong>Diagnosis Codes:</strong>
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                {code} {getDiagnosisName(code)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

const getEntryIcon = (type: Entry["type"]): JSX.Element => {
  switch (type) {
    case "Hospital":
      return <LocalHospitalIcon color="error" fontSize="large" />;
    case "OccupationalHealthcare":
      return <WorkIcon color="primary" fontSize="large" />;
    case "HealthCheck":
      return <MedicalServicesIcon color="success" fontSize="large" />;
    default:
      return <span />;
  }
};

const getHealthRatingColor = (
  rating: number
): "error" | "warning" | "info" | "success" => {
  switch (rating) {
    case 0:
      return "success";
    case 1:
      return "info";
    case 2:
      return "warning";
    case 3:
      return "error";
    default:
      return "info";
  }
};

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box border={1} borderRadius={2} p={2} mb={2}>
          {getEntryIcon(entry.type)}
          <CommonEntryDetails entry={entry}>
            <div>
              <strong>Discharge:</strong> {entry.discharge.date} (
              {entry.discharge.criteria})
            </div>
          </CommonEntryDetails>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box border={1} borderRadius={2} p={2} mb={2}>
          {getEntryIcon(entry.type)}
          <CommonEntryDetails entry={entry}>
            <div>
              <strong>Employer:</strong> {entry.employerName}
            </div>
            {entry.sickLeave && (
              <div>
                <strong>Sick Leave:</strong> {entry.sickLeave.startDate} -{" "}
                {entry.sickLeave.endDate}
              </div>
            )}
          </CommonEntryDetails>
        </Box>
      );
    case "HealthCheck":
      return (
        <Box border={1} borderRadius={2} p={2} mb={2}>
          {getEntryIcon(entry.type)}
          <CommonEntryDetails entry={entry}>
            <div>
              <strong>Health Rating:</strong>{" "}
              <FavoriteIcon
                color={getHealthRatingColor(entry.healthCheckRating)}
                fontSize="large"
              />
            </div>
          </CommonEntryDetails>
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
