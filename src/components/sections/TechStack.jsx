import React from "react";
import { Code } from "lucide-react"; // replace with any icon you like

const techStack = {
  Frontend: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Vite"],
  Backend: ["Node.js", "PHP", "MongoDB", "MySQL"],
  "Tools & Others": ["Git/Github", "Vercel", "Canva", "Figma", "VS Code"], 
};

export const TechStack = () => {
  return (
    <section id="techstack" className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Code className="w-5 h-5 text-[var(--text-primary)]" />
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Tech Stack
        </h2>
      </div>

      {/* Categories */}
      {Object.entries(techStack).map(([category, items]) => (
        <div key={category}>
          <h3 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">
            {category}
          </h3>

          {/* Items */}
          <div className="flex flex-wrap gap-2">
            {items.map(item => (
              <span
                key={item}
                className="rounded-md border border-[var(--border)] px-3 py-1 text-sm text-[var(--text-primary)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
