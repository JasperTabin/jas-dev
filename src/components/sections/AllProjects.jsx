import { FaExternalLinkAlt } from "react-icons/fa";
import { defaultProjects } from "../../Data/ProjectData";
import { Link } from "react-router-dom";
import { memo } from "react";

const ProjectCard = memo(({ project }) => {
  const visitLink = project.links?.find(
    (l) => l.label.toLowerCase() === "visit",
  );

  if (!visitLink) return null;

  return (
    <article className="project-card group relative p-4 rounded-lg shadow-md border border-[var(--border)]">
      <a
        href={visitLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-68 rounded-xl overflow-hidden relative"
      >
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          className="block w-full aspect-[4/3] rounded-xl overflow-hidden relative"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      </a>

      <div className="pt-4">
        <h3 className="text-lg font-semibold text-primary">{project.title}</h3>

        <p className="mt-2 text-sm text-secondary">{project.description}</p>

        <div className="mt-4">
          <a
            href={visitLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-theme bg-primary text-primary font-medium transition-transform duration-300 hover:scale-105"
          >
            <FaExternalLinkAlt />
            {visitLink.displayName ?? visitLink.label}
          </a>
        </div>
      </div>
    </article>
  );
});

export const AllProjects = () => {
  return (
    <section className="flex flex-col gap-16">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="text-sm font-medium text-primary hover:opacity-80"
        >
          ← Back to Home
        </Link>

        <h2 className="text-lg font-semibold text-primary">All Projects</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {defaultProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
