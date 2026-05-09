import { AllProjects } from "../Projects/sections/AllProjects";

export function ProjectsPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Sections  */}
      <AllProjects />

      <footer
        className="mt-auto w-full border-t py-6 text-center font-mono text-xs"
        style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
      >
        © 2026 Jasper Tabin. All rights reserved.
      </footer>
    </div>
  );
}
