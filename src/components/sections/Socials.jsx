import { Link } from "lucide-react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jasper-tabin-1b8aaa348/",
    icon: FaLinkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/JasperTabin",
    icon: FaGithub,
  },
  {
    name: "Email",
    href: "mailto:tabinjasper@gmail.com",
    icon: FaEnvelope,
  },
];

export const Socials = () => {
  return (
    <section>
      <h2 className="text-xl font-thin mb-4 flex items-center gap-2 text-[var(--text-primary)]">
        <Link className="w-5 h-5" />
        Connect With Me
      </h2>

      <div className="flex flex-col gap-2">
        {SOCIAL_LINKS.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-[var(--border-color)] rounded-md px-4 py-2 text-[var(--text-primary)]"
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
};
