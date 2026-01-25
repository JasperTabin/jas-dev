import { FaExternalLinkAlt } from "react-icons/fa";
import { defaultProjects } from "../../Data/ProjectData";

export const All_Projects = () => {
  return (
    <section className="flex flex-col gap-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <a
          href="/"
          className="text-sm font-medium"
          style={{ color: "var(--text-primary)", textDecoration: "none" }}
        >
          ← Back to Home
        </a>
        <h2
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          All Projects
        </h2>
      </div>

      {/* Project List */}
      {defaultProjects.map((project) => {
        const visitLink = project.links?.find(
          (l) => l.label.toLowerCase() === "visit",
        );

        return (
          <div key={project.id} className="project-card group relative">
            {" "}
            {visitLink && (
              <a
                href={visitLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-68 rounded-xl overflow-hidden relative"
              >
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 hover:opacity-100 rounded-xl" />
              </a>
            )}
            <div className="pt-4">
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm mt-2"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.description}
              </p>

              {project.tech?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs rounded-full hover:opacity-80 transition-opacity"
                      style={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--text-primary)",
                        opacity: "0.8",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {visitLink && (
                <div className="mt-4">
                  <a
                    href={visitLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 inline-flex items-center gap-2 font-medium rounded-lg transition-transform duration-300 hover:scale-105"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <FaExternalLinkAlt />
                    {visitLink.label}
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};
