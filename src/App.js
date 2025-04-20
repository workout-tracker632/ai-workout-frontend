// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import VideoUpload from "./components/VideoUpload";
import GymTracker from "./components/GymTracker";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Analytics from "./components/Analytics";
import CreateSchedule from "./components/CreateSchedule";  // <-- import
import "./App.css";
import Exercises from "./components/Exercises";

// Simple authentication check: returns true if there's a token.
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// PrivateRoute component for React Router v6.
const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home"     element={<Home />} />
          <Route path="/"         element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
          {/* Protected Routes */}/
          <Route
            path="/video-upload"
            element={
              <PrivateRoute>
                <VideoUpload />
              </PrivateRoute>
            }
          />
          <Route
            path="/auto-classify"
            element={
              <PrivateRoute>
                <GymTracker />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-schedule"       // <-- new schedule route
            element={
              <PrivateRoute>
                <CreateSchedule />
              </PrivateRoute>
            }
          />

          {/* Redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
