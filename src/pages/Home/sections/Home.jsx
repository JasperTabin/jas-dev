// Done

import React from "react";
import { MapPin } from "lucide-react";
import { ThemeToggle } from "../../../components/Theme/ThemeToggle";

export const Home = () => {
  return (
    <section id="profile">
      <div className="flex items-center gap-6">
        <img
          src="/Profile2.png"
          alt="Jasper Tabin"
          loading="lazy"
          className="h-25 w-25 rounded-lg object-cover object-[center_20%]"
        />

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-3xl font-semibold text-(--text-primary)">
              Jasper Tabin <span className="hand-wave">👋</span>
            </h1>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 text-sm text-(--text-primary)">
            <MapPin className="h-4 w-4" />
            San Pedro, Philippines
          </div>

          <p className="inline-block px-2 py-1 font-semibold text-xs bg-(--tagline-bg) text-(--tagline-text) rounded-lg">
            Aspiring Front-end Developer / Web Developer
          </p>
        </div>
      </div>
    </section>
  );
};
