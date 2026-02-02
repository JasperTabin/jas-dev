import React from 'react';
import { useTheme } from "../components/Theme/useTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage.jsx";
import { ProjectsPage } from "../pages/Projects/ProjectsPage.jsx";
import { Chatbot } from "../components/Chatbot/Chatbot.jsx"; 

function AppContent() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
      <Chatbot />
    </>
  );
}

export default function App() {
  useTheme();

  return (
    <Router>
      <AppContent />
    </Router>
  );
}