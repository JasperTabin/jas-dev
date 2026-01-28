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
        Socials
      </h2>

      <p className="mb-4 text-[var(--text-secondary)]">
          Want to say hello? Let's connect.
        {" "}
      </p>

      <div className="flex flex-col gap-2">
        {SOCIAL_LINKS.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-[var(--border)] rounded-md px-4 py-2 text-[var(--text-primary)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </a>
          );
        })}
      </div>

       <p className="mt-4 text-[var(--text-secondary)]">
        I read every message personally and respond when I can. Looking forward
        to connecting!{" "}
      </p>
    </section>
  );
};
