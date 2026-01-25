import { User } from "lucide-react";

export const BeyondCoding = () => {
  return (
    <section>
      <header className="mb-2 flex items-center gap-2">
        <User className="h-5 w-5 text-[var(--text-primary)]" />
        <h1 className="text-xl font-thin text-[var(--text-primary)]">
          Beyond Coding
        </h1>
      </header>

      <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
        When I’m not coding, I enjoy cooking, playing video games, reading manga
        and manhwa, and watching movies, shows, and anime. I also like traveling
        and exploring new places. I am currently focused on learning, building
        projects, and preparing for my first professional role.
      </p>
    </section>
  );
};
