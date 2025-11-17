import React, { useState } from "react";
import axios from "axios";

interface DiaryEntry {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<DiaryEntry>({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewDiary({ ...newDiary, [name]: value });
  };

  const addDiary = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<DiaryEntry>(
        "http://localhost:3000/api/diaries",
        newDiary
      );
      setDiaries([...diaries, response.data]);
      setNewDiary({ date: "", weather: "", visibility: "", comment: "" });
    } catch (error) {
      console.error("Error adding diary:", error);
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error details:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <>
      <div>
        <h1>Flight Diary</h1>
        <form onSubmit={addDiary}>
          <div>
            <label>Date: </label>
            <input
              type="date"
              name="date"
              value={newDiary.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Weather: </label>
            <select
              name="weather"
              value={newDiary.weather}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="sunny">Sunny</option>
              <option value="rainy">Rainy</option>
              <option value="cloudy">Cloudy</option>
              <option value="stormy">Stormy</option>
              <option value="windy">Windy</option>
            </select>
          </div>
          <div>
            <label>Visibility: </label>
            <select
              name="visibility"
              value={newDiary.visibility}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="great">Great</option>
              <option value="good">Good</option>
              <option value="ok">Ok</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div>
            <label>Comment: </label>
            <input
              type="text"
              name="comment"
              value={newDiary.comment}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add</button>
        </form>
        <h2>Diary Entries</h2>
        <ul>
          {diaries.map((diary, index) => (
            <li key={index}>
              <p>Date: {diary.date}</p>
              <p>Weather: {diary.weather}</p>
              <p>Visibility: {diary.visibility}</p>
              <p>Comment: {diary.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
