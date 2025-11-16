export type Weather = "sunny" | "windy" | "cloudy" | "rainy" | "stormy";
export type Visibility = "great" | "good" | "ok" | "poor";

export interface DiaryEntry {
  id: number | string;
  date: string; // ISO
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
