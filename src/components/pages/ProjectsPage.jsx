import { useEffect, useRef } from "react";
import gsap from "gsap";
import { All_Projects } from "../sections/All_Projects";

export function ProjectsPage() {
  const containerRef = useRef(null);

 useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(".project-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, containerRef);

  return () => ctx.revert();
}, []);


  return (
    <div ref={containerRef} className="space-y-10">
      <All_Projects />

       <footer className="w-full py-6 text-center text-xs font-mono border-t mt-4" style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}  >
        © 2026 Jasper Tabin. All rights reserved.
      </footer>
    </div>
    
  );
}
