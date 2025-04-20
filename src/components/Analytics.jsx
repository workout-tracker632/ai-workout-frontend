// src/components/Analytics.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../style/Analytics.css";
import BACKEND_HOST from "../config.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Analytics = () => {
  const [analyticsCounts, setAnalyticsCounts] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const todayName = WEEKDAYS[new Date().getDay()];
  const [selectedDay, setSelectedDay] = useState(todayName);

  useEffect(() => {
    if (!username) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_HOST}/analytics/${username}`);
        setAnalyticsCounts(res.data.counts || []);
        setSchedule(res.data.schedule || []);
        console.log("Analytics data:", res.data);
      } catch (err) {
        setError("Failed to fetch analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <div className="analytics-loading">Loading analytics…</div>;
  if (error) return <div className="analytics-error">{error}</div>;

  const daySchedule = schedule.filter((s) => s.day === selectedDay);

  // Map filtered counts by day
  const filteredCounts = analyticsCounts
    .filter((c) => c.day === selectedDay)
    .reduce((acc, curr) => {
      acc[curr.exercise_type] = curr.count;
      return acc;
    }, {});

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Your Workout Progress</h2>

      <div className="day-selector">
        <label htmlFor="day-select">Select Day: </label>
        <select
          id="day-select"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {WEEKDAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {daySchedule.length === 0 ? (
        <p className="no-schedule">
          No exercises scheduled for <strong>{selectedDay}</strong>.
        </p>
      ) : (
        <>
          <div className="chart-card">
            <Bar
              data={{
                labels: daySchedule.map((s) => s.exercise_type),
                datasets: [
                  {
                    label: "Completed",
                    data: daySchedule.map(
                      (s) => filteredCounts[s.exercise_type] || 0
                    ),
                    backgroundColor: "rgba(75,192,192,0.7)",
                  },
                  {
                    label: "Target",
                    data: daySchedule.map((s) => s.target),
                    backgroundColor: "rgba(192,75,75,0.7)",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: `${selectedDay}'s Workout`,
                  },
                },
                scales: {
                  y: { beginAtZero: true, ticks: { stepSize: 1 } },
                },
              }}
            />
          </div>

          <section className="completion-section">
            <table className="completion-table">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Target</th>
                  <th>Done</th>
                  <th>% Complete</th>
                </tr>
              </thead>
              <tbody>
                {daySchedule.map((s, idx) => {
                  const doneCount = filteredCounts[s.exercise_type] || 0;
                  const pct = s.target
                    ? Math.min(100, Math.round((doneCount / s.target) * 100))
                    : 0;
                  return (
                    <tr key={idx}>
                      <td>{s.exercise_type}</td>
                      <td>{s.target}</td>
                      <td>{doneCount}</td>
                      <td>{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  );
};

export default Analytics;
