import diaryData from "../data/entries";

import { NonSensitiveDiaryEntry, DiaryEntry } from "../types";

const getEntries = (): DiaryEntry[] => {
  return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryData;
};

const addDiary = () => {
  return null;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaryData.find((d) => d.id === id);
  return entry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
