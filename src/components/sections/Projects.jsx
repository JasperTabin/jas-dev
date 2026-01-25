import { defaultProjects } from "../../Data/ProjectData";
import { Folder } from "lucide-react";

export const Projects = ({ projects = defaultProjects }) => {
  return (
    <section id="projects">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <h2
            className="flex items-center gap-2 text-xl font-thin"
            style={{ color: "var(--text-primary)" }}
          >
            <Folder className="h-5 w-5" />
            Recent Projects
          </h2>

          <a
            href="/projects"
            className="text-sm font-semibold transition-colors"
            style={{ color: "var(--text-primary)", textDecoration: "none" }}
          >
            More projects →
          </a>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {projects.slice(0, 2).map((p) => {
            const mainLink = p.links?.find((link) => link.label !== "Source");

            return (
              <a
                key={p.id}
                href={mainLink?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg p-4 border transition-transform duration-200 hover:-translate-y-0.5"
                style={{ borderColor: "var(--border)", textDecoration: "none" }}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className="text-base font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {p.title}
                  </h3>
                </div>

                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p.description}
                </p>

                {mainLink && (
                  <span
                    className="inline-block mt-2 px-2 py-0.5 text-[10px] font-mono rounded"
                    style={{
                      backgroundColor: "var(--secondary)",
                      color: "var(--primary)",
                    }}
                  >
                    {mainLink.displayName || mainLink.label}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
