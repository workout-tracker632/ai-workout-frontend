import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./VideoUpload.css";

const VideoUpload = () => {
  const [exercise, setExercise] = useState("Push Up");
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [count, setCount] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef();

  const username = localStorage.getItem("username");

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a video file.");
      return;
    }
    if (!username) {
      setError("You must be logged in.");
      return;
    }
    setLoading(true);
    setError("");
    setCount(null);
    setVideoUrl(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("exercise", exercise);
    formData.append("username", username);

    try {
      const res = await axios.post(
        "http://localhost:8000/analyze-video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob"
        }
      );
      // Blob is returned directly
      const blob = res.data;
      const url  = URL.createObjectURL(blob);
      setVideoUrl(url);

      const cnt = res.headers["x-repetition-count"];
      setCount(cnt);
    } catch {
      setError("Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  return (
    <div className="video-upload-container">
      <h2>Workout AI Tracker</h2>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="exercise">Exercise Type</label>
          <select
            id="exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="exercise-select"
          >
            <option>Push Up</option>
            <option>Squat</option>
            <option>Bicept Curl</option>
            <option>Shoulder Press</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="file">Video File</label>
          <input
            id="file"
            className="file-input"
            type="file"
            accept="video/mp4,video/webm"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Video"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {videoUrl && (
        <div className="video-result">
          <h3>Processed Video</h3>
          <video
            ref={videoRef}
            controls
            className="video-player"
            onError={() => setError("Video playback error")}
          >
            <source src={videoUrl} type="video/webm" />
            Your browser does not support WebM.
          </video>
          {count != null && (
            <div className="repetition-count">
              {exercise} Count: {count}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
