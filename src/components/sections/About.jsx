import React from "react";
import { User } from "lucide-react";

export const About = () => {
  return (
    <section className="max-w-3xl">
      {/* Header */}
      <header className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-[var(--text-primary)]" />
        <h1 className="text-xl font-thin text-[var(--text-primary)]">
          Beyond Coding
        </h1>
      </header>

      {/* Description */}
      <p
        className="
          text-sm
          leading-relaxed
          text-[var(--text-primary)]
          text-justify
        "
      >
        When I'm not coding, I enjoy staying active and entertained. I love
        cooking, playing video games, reading manga and manhwa, and watching
        movies, shows, and anime across various genres. I also enjoy traveling
        and exploring new places whenever I get the chance. These activities
        help me maintain a healthy work-life balance and provide a great way to
        unwind and relax.
      </p>
    </section>
  );
};
