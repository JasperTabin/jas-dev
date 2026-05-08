import React from 'react';
import { defaultProjects } from "../../../data/ProjectData";
import { Code2, Folder, Smartphone } from "lucide-react";
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

                {p.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <ProjectTagIcon key={tag} tag={tag} />
                    ))}
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
