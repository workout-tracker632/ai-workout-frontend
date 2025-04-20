// src/components/Exercises.jsx
import React, { useState, useEffect } from "react";
import "../style/Exercises.css";

const exercises = [
  { id: 1, name: "Push Up", description: "A bodyweight exercise that works the chest, shoulders, and triceps. Keep your body straight and lower until elbows are 90°.", calories: "7 kcal/rep", recommended: "3 sets × 12 reps" },
  { id: 2, name: "Squat", description: "A lower-body movement targeting quads and glutes. Feet shoulder-width, lower hips as if sitting.", calories: "5 kcal/rep", recommended: "3 sets × 15 reps" },
  { id: 3, name: "Bicep Curl", description: "Isolate the biceps by curling weights up with elbows stationary.", calories: "4 kcal/rep", recommended: "3 sets × 12 reps" },
  { id: 4, name: "Shoulder Press", description: "Strengthens shoulders and triceps. Press weights overhead from shoulder level.", calories: "6 kcal/rep", recommended: "3 sets × 10 reps" },
];

const Exercises = () => {
  const [selected, setSelected] = useState(null);

  const openModal = (ex, e) => {
    e.stopPropagation();    // prevent this click from bubbling up
    setSelected(ex);
  };

  const closeModal = (e) => {
    // only close if clicking on the overlay itself (not the inner modal)
    if (e.target === e.currentTarget) {
      setSelected(null);
    }
  };


  
  return (
    <div className="exercises-page" onClick={() => selected && setSelected(null)}>
      <h1>Exercises</h1>

      <div className="exercises-grid">
        {exercises.map(ex => (
          <div
            key={ex.id}
            className={`exercise-card item-${ex.id}`}
            onClick={(e) => openModal(ex, e)}
          >
            <h3>{ex.name}</h3>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>
              &times;
            </button>
            <div className={`modal-image item-${selected.id}`} />
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <p><strong>Calories:</strong> {selected.calories}</p>
            <p><strong>Recommended:</strong> {selected.recommended}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;
