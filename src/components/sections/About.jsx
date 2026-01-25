import { User } from "lucide-react";

export const About = () => {
  return (
    <section>
      <header className="mb-2 flex items-center gap-2">
        <User className="h-5 w-5 text-[var(--text-primary)]" />
        <h1 className="text-xl font-thin text-[var(--text-primary)]">
          About Me
        </h1>
      </header>

      <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
        I am a fresh BSIT graduate and a aspiring Front-end Developer with a
        strong interest in building clean, responsive, and user-friendly web
        applications. 
        
        <br /> 
        <br />

        I have experience working with React, Node.js TypeScript
        and I am eager to continue learning, improving my skills, and growing in
        a professional development environment.
      </p>
    </section>
  );
};
