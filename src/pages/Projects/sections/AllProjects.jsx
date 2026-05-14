import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Code2, Smartphone } from "lucide-react";
import {
  SiArduino,
  SiCss3,
  SiEspressif,
  SiFirebase,
  SiFramer,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { defaultProjects } from "../../../data/ProjectData";

const TAG_ICON_MAP = {
  "MIT App Inventor": { Icon: Smartphone, color: "#8BC34A" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  ESP32: { Icon: SiEspressif, color: "#E7352C" },
  "Arduino IDE": { Icon: SiArduino, color: "#00878F" },
  "React (Vite)": { Icon: SiReact, color: "#61DAFB" },
  "React (Native)": { Icon: SiReact, color: "#61DAFB" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Framer Motion": { Icon: SiFramer, color: "#0055FF" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  CSS: { Icon: SiCss3, color: "#1572B6" },
};

const DEFAULT_TAG_ICON = { Icon: Code2, color: "var(--text-secondary)" };

const getVisitLink = (links = []) => {
  return links.find((link) => link.label === "visit");
};

const ProjectTagIcon = ({ tag }) => {
  const { Icon, color } = TAG_ICON_MAP[tag] ?? DEFAULT_TAG_ICON;

  return (
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-md"
      style={{ backgroundColor: "var(--bg-tag)", color }}
      title={tag}
      aria-label={tag}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    </span>
  );
};

const ProjectCard = memo(({ project }) => {
  const visitLink = getVisitLink(project.links);
  if (!visitLink) return null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[10px] border border-(--border) bg-(--bg-card) text-inherit transition-transform duration-200 hover:-translate-y-1">
      <a
        href={visitLink.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className="block aspect-video shrink-0 overflow-hidden"
      >
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </a>

      <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        <h3 className="min-h-8.5 text-[13px] leading-snug font-bold text-(--text-primary)">
          {project.title}
        </h3>

        <p className="text-[11px] leading-[1.65] text-(--text-secondary)">
          {project.description}
        </p>

        {project.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {project.tags.map((tag) => (
              <ProjectTagIcon key={tag} tag={tag} />
            ))}
          </div>
        )}
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
          className="inline-flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--text-primary)"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="text-right">
          <h2 className="text-lg font-semibold text-(--text-primary)">
            All Projects
          </h2>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {defaultProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
