import { defaultProjects } from "../../Data/ProjectData";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Folder } from "lucide-react"; 

export const Projects = ({ projects = defaultProjects }) => {
  return (
    <section id="projects">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <h2 
            className="flex items-center gap-2 text-xl font-thin text-[var(--text-primary)]"
            style={{ color: 'var(--text-primary)' }}
          >
            <Folder className="h-5 w-5" />
            Pinned Projects
          </h2>

          <a
            href="/projects"
            className="text-sm font-semibold hover:underline transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            More projects →
          </a>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((p) => (
            <article
              key={p.id}
              className="group bg-transparent border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              style={{ borderColor: 'var(--border)' }}
            >
              <div 
                className="relative w-full aspect-video flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {p.links?.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--text-primary)' }}
                      aria-label={link.label}
                    >
                      {link.label === "Source" ? (
                        <FaGithub />
                      ) : (
                        <FaExternalLinkAlt />
                      )}
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <h3
                  id={`project-${p.id}`}
                  className="text-sm font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {p.title}
                </h3>
                <p 
                  className="mt-2 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
