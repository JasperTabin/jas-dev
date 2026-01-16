import bannerGif from "/src/assets/Cat-Banner.gif";
import { MapPin, User, Download, Mail } from "lucide-react";

export const Home = () => {
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/public/Tabin.pdf";
    link.download = "Jasper_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendEmail = () => {
    const email = "tabinjasper@gmail.com";
    const subject = "Hello Jasper";
    const body = "Hi Jasper, I would like to connect with you regarding...";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

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

          <p className="mt-1 text-xs">Front-end Developer \ Web Developer</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleDownloadResume}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
        >
          <Download className="h-4 w-4" />
          Resume
        </button>

        <button
          onClick={handleSendEmail}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
        >
          <Mail className="h-4 w-4" />
          Send Email
        </button>
      </div>

      <h3
        className="mt-4 flex items-center gap-2 text-xl font-thin"
        style={{ color: "var(--text-primary)" }}
      >
        <User className="h-5 w-5" />
        About
      </h3>

      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: "var(--text-primary)" }}
      >
        I am a fresh BSIT graduate and a Front-end Developer with a strong
        interest in building clean, responsive, and user-friendly web
        applications. I have experience working with React, Node.js TypeScript,
        and modern web technologies, and I am eager to continue learning,
        improving my skills, and growing in a professional development
        environment.
      </p>
    </section>
  );
};
