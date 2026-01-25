import { MapPin, Download, Mail } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

export const Home = () => {
  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Tabin.pdf";
    link.download = "Jasper_Resume.pdf";
    link.click();
  };

  const handleSendEmail = () => {
    const email = "tabinjasper@gmail.com";
    const subject = "Hello Jasper";
    const body = "Hi Jasper, I would like to connect with you regarding...";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="profile" className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <img
          src="/Profile.jpg"
          alt="Jasper Tabin"
          loading="lazy"
          className="h-[135px] w-[135px] rounded-lg object-cover object-[center_20%]"
        />

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-3xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
              Jasper Tabin <span className="hand-wave">👋</span>
            </h1>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
            <MapPin className="h-4 w-4" />
            San Pedro, Philippines
          </div>

          <p className="font-bold text-sm text-[var(--text-primary)]">
            Aspiring Front-end Developer / Web Developer
          </p>

          <div className="mt-4 flex gap-3 w-full max-w-sm">
            <button
              onClick={handleDownloadResume}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-[var(--border)] px-4 text-sm font-medium text-[var(--text-primary)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              Resume
            </button>

            <button
              onClick={handleSendEmail}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-[var(--border)] px-4 text-sm font-medium text-[var(--text-primary)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              Send Email
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
