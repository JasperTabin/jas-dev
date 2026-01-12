import bannerGif from "/src/assets/Cat-Banner.gif";
import { MapPin } from "lucide-react";

export const Home = () => {
  return (
    <section id="profile">
      {/* Banner */}
      <div className="relative w-full h-42 overflow-hidden rounded-2xl">
        <img
          src={bannerGif}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/5 to-transparent" />
      </div>

      {/* Profile + Intro */}
      <div className="mt-4 flex items-center gap-4">
        <img
          src="/Profile.jpg"
          alt="Profile"
          loading="lazy"
          className="mt-2 h-[70px] w-[70px] rounded-full border-2 object-cover object-[center_20%]"
          style={{ borderColor: "var(--border)" }}
        />

        <div>
          <h1
            className="flex items-center gap-2 text-2xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Hey, I'm Jasper
            <span className="inline-block cursor-pointer hand-wave" aria-hidden>
              👋
            </span>
          </h1>

          <div className="mt-1 flex items-center gap-1 text-xs">
            <MapPin className="h-3 w-3" />
            San Pedro, Philippines
          </div>

          <p className="mt-1 text-xs">
            Front-end Developer · Web Developer
          </p>
        </div>
      </div>

      {/* Brief Description */}
      
      <p
        className="mt-4 max-w-prose text-sm leading-relaxed"
        style={{ color: "var(--text-primary)" }}
      >
        Frontend Developer from the Philippines. I enjoy turning designs into
        code. When not coding, I'm exploring gaming, music, and coffee shops.
        Open to new opportunities!
      </p>

      {/* About */}
      <section className="pt-4">
        <h2
          className="text-xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          About
        </h2>
        <p
          className="pt-1 max-w-prose text-sm leading-relaxed"
          style={{ color: "var(--text-primary)" }}
        >
          Graduated in 2025 with a BS in Information Technology, earning honors
          as Dean's Lister, Best in Capstone, and Cum Laude. Focused on building
          clean, modern web applications.
        </p>
      </section>
    </section>
  );
};
