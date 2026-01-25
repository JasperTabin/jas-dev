// Router & Layout

import { useTheme } from "./components/useTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/pages/Homepage";
import { ProjectsPage } from "./components/pages/ProjectsPage";

function AppContent() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </main>
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
