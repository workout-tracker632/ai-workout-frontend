// src/components/Home.jsx
import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import {
  FaComments,
  FaTimes,
  FaDumbbell,
  FaChartLine,
  FaVideo,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../style/Home.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};



export default function Home() {


  return (
    <div className="home-page">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ClassesSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <motion.h1
        className="hero-title"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Welcome to <span>Workout Tracker</span>
      </motion.h1>
      <motion.p
        className="hero-subtitle"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
      >
        AI‑powered real‑time tracking. Personalized plans. Instant feedback.
      </motion.p>
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.4 }}>
        <Link to="/create-schedule" className="btn primary">
          Get Started
        </Link>
        <Link to="/learn-more" className="btn secondary">
          Learn More
        </Link>
      </motion.div>
      <div className="hero-accent" />
    </section>
  );
}

function AboutSection() {
  return (
    <motion.section
      className="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <h2>About Workout Tracker</h2>
      <p>
        Your ultimate gym companion: combining cutting‑edge AI with proven
        exercise science. Track reps, correct form, and optimize results.
      </p>
    </motion.section>
  );
}

function FeaturesSection() {
  const items = [
    {
      icon: <FaDumbbell />,
      title: "Real‑Time Pose Detection",
      text: "AI analyzes your form live, so every rep counts.",
    },
    {
      icon: <FaChartLine />,
      title: "Progress Analytics",
      text: "Visualize improvements with dynamic charts and insights.",
    },
    {
      icon: <FaVideo />,
      title: "Video Analysis",
      text: "Record sessions and review automated feedback in HD.",
    },
  ];

  return (
    <section className="features">
      <h2>Why Choose Us</h2>
      <div className="features-grid">
        {items.map((f, i) => (
          <motion.div
            className="feature-card"
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: i * 0.2 }}
          >
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ClassesSection() {
  const names = ["Push Ups", "Squats", "Bicep Curls", "Shoulder Press"];
  return (
    <section className="classes" id="classes">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        Popular Workouts
      </motion.h2>
      <div className="classes-grid">
        {names.map((n, i) => (
          <motion.div
            className={`card card-${i + 1}`}
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: i * 0.2 }}
          >
            {n}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const quotes = [
    {
      name: "Alex M.",
      text: `"Workout Pro completely transformed my routine—AI form corrections saved me from injury."`,
    },
    {
      name: "Jamie L.",
      text: `"Seeing daily progress charts motivated me to push harder every session."`,
    },
  ];

  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <div className="testimonials-grid">
        {quotes.map((q, i) => (
          <motion.blockquote
            key={i}
            className="testimonial"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: i * 0.3 }}
          >
            <p>{q.text}</p>
            <footer>— {q.name}</footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="gallery" id="gallery">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`gallery-item item-${i}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: i * 0.15 }}
          />
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <motion.section
      className="contact"
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <h2>Get In Touch</h2>
      <form>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message" rows={4} required />
        <button type="submit" className="btn primary">
          Send Message
        </button>
      </form>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Workout Pro. All rights reserved.</p>
    </footer>
  );
}

function Chatbot() {
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState([]);
  const [input, setInput] = React.useState("");

  const toggle = () => setOpen((o) => !o);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMsgs((m) => [...m, { from: "user", text: userMsg }]);
    setInput("");
    try {
      // using Advice Slip API as placeholder
      const res = await fetch("https://api.adviceslip.com/advice?" + Date.now());
      const { slip } = await res.json();
      setMsgs((m) => [...m, { from: "bot", text: slip.advice }]);
    } catch {
      setMsgs((m) => [...m, { from: "bot", text: "Sorry, I'm offline." }]);
    }
  };

  return (
    <>
      {open && (
        <motion.div
          className="chat-window"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="chat-header">
            <span>Coach Bot</span>
            <button onClick={toggle}>
              <FaTimes />
            </button>
          </div>
          <div className="chat-body">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                {m.text}
              </div>
            ))}
          </div>
          <form className="chat-input" onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
            />
            <button type="submit">▶</button>
          </form>
        </motion.div>
      )}
      <button className="chat-toggle" onClick={toggle}>
        <FaComments />
      </button>
    </>
  );
}
