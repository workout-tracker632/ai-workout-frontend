// GymTracker.jsx
import React, { useState, useRef } from 'react';
import '../style/Gym_Live.css'


const GymTracker = () => {
  const [data, setData] = useState({ counters: { curl: 0, squat: 0, pushup: 0 }, action: 'none', reps: 0, msg: '', time_diff: null, image: '' });
  const [recording, setRecording] = useState(false);
  const [records, setRecords] = useState([]);
  const wsRef = useRef(null);

  const startRecording = () => {
    const ws = new WebSocket('ws://localhost:8000/ws/auto-classify');
    ws.onopen = () => console.log('WebSocket connection opened');
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setData(msg);
      setRecords(prev => [...prev, { action: msg.action, reps: msg.reps, timestamp: new Date().toISOString() }]);
    };
    ws.onerror = (err) => console.error('WebSocket error', err);
    ws.onclose = () => console.log('WebSocket closed');

    wsRef.current = ws;
    setRecords([]);
    setRecording(true);
  };

  const stopRecording = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setRecording(false);
    console.log('Recorded session:', records);
  };

  return (
    <div className="gymtracker-container">
      <h1 className="gymtracker-header">Live Gym Tracker</h1>
      <div className="controls">
        <button className="btn start-btn" onClick={startRecording} disabled={recording}>Start Recording</button>
        <button className="btn stop-btn" onClick={stopRecording} disabled={!recording}>Stop Recording</button>
      </div>

      <section className="exercise-info">
        <h2>Current Exercise: <span className="highlight">{data.action}</span></h2>
        <h3>Reps: <span className="highlight">{data.reps}</span></h3>
        <p>{data.msg} {data.time_diff !== null && `(Time: ${data.time_diff}s)`}</p>
      </section>

      <section className="counters-section">
        <h3>Exercise Counters:</h3>
        <ul>
          {Object.entries(data.counters).map(([name, count]) => (
            <li key={name}>{name.charAt(0).toUpperCase() + name.slice(1)}: {count}</li>
          ))}
        </ul>
      </section>

      <section className="video-feed">
        <h3>Live Video Feed</h3>
        {data.image ? (
          <img src={`data:image/jpeg;base64,${data.image}`} alt="Live gym feed" />
        ) : (
          <p>No video stream available.</p>
        )}
      </section>
    </div>
  );
};

export default GymTracker;