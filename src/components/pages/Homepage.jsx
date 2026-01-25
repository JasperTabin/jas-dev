import { Home } from "../sections/Home";
import { TechStack } from "../sections/TechStack";
import { Experience } from "../sections/Experience";
import { BeyondCoding } from "../sections/BeyondCoding";
import { About } from "../sections/About";
import { Projects } from "../sections/Projects";
import Type from "../sections/Type";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HomePage() {
  const containerRef = useRef(null);
  const sectionCard = "p-6 rounded-lg shadow-md border border-[var(--border)]";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current.children, {
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
    <div ref={containerRef} className="flex flex-col gap-4">
      <Home />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <section className={`lg:col-span-2 ${sectionCard}`}>
          <About />
        </section>
        <section className={`lg:col-span-3 ${sectionCard}`}>
          <Experience />
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <section className={`lg:col-span-3 ${sectionCard}`}>
          <TechStack />
        </section>
        <section className={`lg:col-span-2 ${sectionCard}`}>
          <BeyondCoding />
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <section className={`lg:col-span-2 ${sectionCard}`}>
          <Type />
        </section>
        <section className={`lg:col-span-3 ${sectionCard}`}>
          <Projects />
        </section>
      </div>

      <footer className="w-full py-6 text-center text-xs font-mono border-t mt-4" style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}  >
        © 2026 Jasper Tabin. All rights reserved.
      </footer>
    </div>
  );
}
