import { Code } from "lucide-react";

const techStack = {
  Frontend: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Vite"],
  Backend: ["Node.js", "PHP", "MongoDB", "MySQL"],
  "Tools & Others": ["Git/GitHub", "Vercel", "Canva", "Figma", "VS Code"],
};

export const TechStack = () => {
  return (
    <section>
      <div className="flex items-center gap-2 pb-4">
        <Code className="h-5 w-5 text-[var(--text-primary)]"/>
        <h2 className="text-xl font-thin text-[var(--text-primary)] ">
          Tech Stack
        </h2>
      </div>

      {Object.entries(techStack).map(([category, items]) => (
        <div key={category}>
          <h3 className="mb-2 text-sm font-semibold text-[var(--text-primary)]">
            {category}
          </h3>

          <div className="flex flex-wrap gap-2 pb-4">
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
