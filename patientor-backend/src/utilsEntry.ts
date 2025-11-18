import { HealthCheckRating } from "./types";
import type {
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDiagnosisCodes = (codes: unknown): Array<string> | undefined => {
  if (!codes) return undefined;
  if (!Array.isArray(codes) || !codes.every(isString)) {
    throw new Error("Incorrect diagnosis codes");
  }
  return codes as Array<string>;
};

const parseType = (
  type: unknown
): "Hospital" | "OccupationalHealthcare" | "HealthCheck" => {
  if (
    !isString(type) ||
    !["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(type)
  ) {
    throw new Error("Incorrect or missing entry type: " + type);
  }
  return type as "Hospital" | "OccupationalHealthcare" | "HealthCheck";
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== "number" || rating < 0 || rating > 3) {
    throw new Error("Incorrect or missing healthCheckRating");
  }
  return rating as HealthCheckRating;
};

const parseDischarge = (discharge: any): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Missing discharge");
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseDescription(discharge.criteria),
  };
};

const parseSickLeave = (
  sickLeave: any
): { startDate: string; endDate: string } | undefined => {
  if (!sickLeave) return undefined;
  if (typeof sickLeave !== "object") {
    throw new Error("Incorrect sickLeave");
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }
  return employerName;
};

export const toNewEntry = (
  object: any
):
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id"> => {
  const type = parseType(object.type);
  const base = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };
  switch (type) {
    case "Hospital":
      return {
        ...base,
        type,
        discharge: parseDischarge(object.discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...base,
        type,
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
    case "HealthCheck":
      return {
        ...base,
        type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    default:
      throw new Error("Unknown entry type: " + type);
  }
};
