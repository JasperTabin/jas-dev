import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Home } from "../sections/Home";
import { TechStack } from "../sections/TechStack";
import { Experience } from "../sections/Experience";
import { BeyondCoding } from "../sections/BeyondCoding";
import { About } from "../sections/About";
import { Projects } from "../sections/Projects";
import { Gallery } from '../sections/Gallery';
import { Socials } from "../sections/Socials";
import Type from "../sections/Type";

// layout 
const GridRow = ({ children }) => (
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
    {children}
  </div>
);

// Styling
const SectionCard = ({ children, className }) => (
  <section className={`p-4 rounded-lg shadow-md border border-[var(--border)] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 ${className}`}>
    {children}
  </section>
);


export function HomePage() {
  // GSAP Animation
  const containerRef = useRef(null);

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
    <div ref={containerRef} className="flex flex-col gap-4 ">
      {/* Sections */}
      <Home />

      <GridRow>
        <SectionCard className="lg:col-span-2"><About /></SectionCard>
        <SectionCard className="lg:col-span-3"><Experience /></SectionCard>
      </GridRow>
      
      <GridRow>
        <SectionCard className="lg:col-span-5"><Type /></SectionCard>
      </GridRow>
      
      <GridRow>
        <SectionCard className="lg:col-span-3"><TechStack /></SectionCard>
        <SectionCard className="lg:col-span-2"><BeyondCoding /></SectionCard>
      </GridRow>

      <GridRow>
        <SectionCard className="lg:col-span-5"><Projects /></SectionCard>
      </GridRow>

      <GridRow>
            <SectionCard className="lg:col-span-2"><Socials /></SectionCard>
            <SectionCard className="lg:col-span-3"><Gallery /></SectionCard>
      </GridRow>



      <footer 
        className="w-full py-6 text-center text-xs font-mono border-t mt-4" 
        style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
      >
        © 2026 Jasper Tabin. All rights reserved.
      </footer>
    </div>
  );
}
