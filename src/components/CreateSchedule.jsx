// src/components/CreateSchedule.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/CreateSchedule.css";
import BACKEND_HOST from "../config.js"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const exercises = ["Push Up", "Squat", "Bicep Curl", "Shoulder Press"];

const dayOrder = Object.fromEntries(daysOfWeek.map((day, index) => [day, index]));

const CreateSchedule = () => {
  const [rows, setRows] = useState([{ day: "", exercise: "", target: 0 }]);
  const username = localStorage.getItem("username");

  // Load existing schedule on mount
  useEffect(() => {
    if (!username) return;

    axios.get(`${BACKEND_HOST}/schedule/${username}`)
      .then(resp => {
        const data = resp.data;
        if (Array.isArray(data) && data.length > 0) {
          const sorted = data
            .map(doc => ({
              day: doc.day,
              exercise: doc.exercise_type,
              target: doc.target
            }))
            .sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);
          setRows(sorted);
        }
      })
      .catch(err => {
        console.warn("No existing schedule or fetch failed:", err);
      });
  }, [username]);

  const addRow = () => {
    setRows([...rows, { day: "", exercise: "", target: 0 }]);
  };

  const updateRow = (i, key, val) => {
    const updated = [...rows];
    updated[i][key] = val;
    setRows(updated.sort((a, b) => dayOrder[a.day] - dayOrder[b.day]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_HOST}/schedule`, {
        username,
        schedule: rows,
      });
      alert("Schedule saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save schedule.");
    }
  };

  return (
    <div className="create-schedule-container">
      <h2>Create Your Workout Schedule</h2>
      <form onSubmit={handleSubmit} className="schedule-form">
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Exercise</th>
              <th>Target Reps</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>
                  <select
                    value={r.day}
                    onChange={(e) => updateRow(i, "day", e.target.value)}
                    required
                  >
                    <option value="">-- Select Day --</option>
                    {daysOfWeek.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={r.exercise}
                    onChange={(e) => updateRow(i, "exercise", e.target.value)}
                    required
                  >
                    <option value="">-- Select Exercise --</option>
                    {exercises.map((ex) => (
                      <option key={ex} value={ex}>
                        {ex}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={r.target}
                    onChange={(e) => updateRow(i, "target", +e.target.value)}
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-actions">
          <button type="button" className="btn" onClick={addRow}>
            Add Row
          </button>
          <button type="submit" className="btn primary">
            Save Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSchedule;
