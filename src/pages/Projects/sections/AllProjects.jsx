import { FaExternalLinkAlt } from "react-icons/fa";
import { defaultProjects } from "../../../data/ProjectData";
import { Link } from "react-router-dom";
import { memo } from "react";

const ProjectCard = memo(({ project }) => {
  const visitLink = project.links.find((l) => l.label === "visit");
  if (!visitLink) return null;

  return (
    <article className="group relative rounded-xl border border-(--border) overflow-hidden bg-(--bg-card) transition-shadow duration-300 hover:shadow-lg">
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <a
          href={visitLink.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-400"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium px-4 py-2 rounded-full border border-white/60 backdrop-blur-sm">
            View project →
          </span>
        </a>
      </div>

      <div className="p-4 pt-3 flex flex-col gap-3">
        <div>
          <h3 className="text-base font-semibold text-(--text-primary) leading-snug">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-(--text-secondary) leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full bg-(--bg-tag) text-(--text-secondary)"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-1">
          <a
            href={visitLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-(--border) text-sm font-medium text-(--text-primary) bg-transparent hover:bg-(--bg-hover) transition-colors duration-200"
          >
            <FaExternalLinkAlt className="text-xs" />
            {visitLink.displayName}
          </a>
        </div>
      </div>
    </article>
  );
});

ProjectCard.displayName = "ProjectCard";

export const AllProjects = () => {
  return (
    <section className="flex flex-col gap-10">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
        >
          ← Back to Home
        </Link>

        <div className="text-right">
          <h2 className="text-lg font-semibold text-(--text-primary)">
            All Projects
          </h2>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {defaultProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
