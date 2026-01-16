import { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import gsap from "gsap";

import { Home } from "./components/sections/Home";
import { Navbar } from "./components/Navbar";
import { ResumeTabs } from "./components/sections/ResumeTabs";
import { TechStack } from "./components/sections/TechStack";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import Footer from "./components/Footer";
import Type from "./components/sections/Type";
import { All_Projects } from "./components/sections/All_Projects";

function AppContent() {
  const mainRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!mainRef.current) return;

    gsap.fromTo(
      mainRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power2.out" }
    );
  }, [location]);

  return (
    <main
      ref={mainRef}
      className="relative mx-auto max-w-xl px-6 overflow-hidden"
    >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="space-y-10">
              <Home />
              <TechStack />
              <ResumeTabs />
              <About />
              <Projects />
              <Type />
              <Footer />
            </div>
          }
        />
        <Route
          path="/projects"
          element={
            <div className="space-y-10">
              <All_Projects />
              <Footer />
            </div>
          }
        />
      </Routes>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
