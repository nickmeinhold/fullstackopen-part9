import React, { useState, useEffect } from "react";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get<DiaryEntry[]>(
          "http://localhost:3000/api/diaries"
        );
        setDiaries(response.data);
      } catch (error) {
        let message = "Error fetching diaries.";
        if (axios.isAxiosError(error)) {
          message = error.response?.data?.error || error.message;
        }
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(null), 5000);
      }
    };

    fetchDiaries();
  }, []);

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
      let message = "Error adding diary.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error || error.message;
      }
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <>
      <div>
        <h1>Flight Diary</h1>
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "1em" }}>
            {errorMessage}
          </div>
        )}
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
            <div>
              <label>
                <input
                  type="radio"
                  name="weather"
                  value="sunny"
                  checked={newDiary.weather === "sunny"}
                  onChange={handleChange}
                />
                Sunny
              </label>
              <label>
                <input
                  type="radio"
                  name="weather"
                  value="rainy"
                  checked={newDiary.weather === "rainy"}
                  onChange={handleChange}
                />
                Rainy
              </label>
              <label>
                <input
                  type="radio"
                  name="weather"
                  value="cloudy"
                  checked={newDiary.weather === "cloudy"}
                  onChange={handleChange}
                />
                Cloudy
              </label>
              <label>
                <input
                  type="radio"
                  name="weather"
                  value="stormy"
                  checked={newDiary.weather === "stormy"}
                  onChange={handleChange}
                />
                Stormy
              </label>
              <label>
                <input
                  type="radio"
                  name="weather"
                  value="windy"
                  checked={newDiary.weather === "windy"}
                  onChange={handleChange}
                />
                Windy
              </label>
            </div>
          </div>
          <div>
            <label>Visibility: </label>
            <div>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="great"
                  checked={newDiary.visibility === "great"}
                  onChange={handleChange}
                />
                Great
              </label>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="good"
                  checked={newDiary.visibility === "good"}
                  onChange={handleChange}
                />
                Good
              </label>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="ok"
                  checked={newDiary.visibility === "ok"}
                  onChange={handleChange}
                />
                Ok
              </label>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="poor"
                  checked={newDiary.visibility === "poor"}
                  onChange={handleChange}
                />
                Poor
              </label>
            </div>
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

        {diaries.map((diary) => (
          <>
            <h3>{diary.date}</h3>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
            <p>Comment: {diary.comment}</p>
          </>
        ))}
      </div>
    </>
  );
}

export default App;
