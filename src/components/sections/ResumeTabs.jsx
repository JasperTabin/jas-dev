import { useState } from "react";
import { resumeData } from "../../Data/resumeData";
import { Briefcase } from "lucide-react";

const TABS = ["Work", "Education"];

const Avatar = ({ logo, title }) => {
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative z-10 flex-shrink-0">
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--border)] bg-[var(--secondary)]">
        {logo ? (
          <img src={logo} alt={title} className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            {initials}
          </span>
        )}
      </div>
    </div>
  );
};

export const ResumeTabs = () => {
  const [activeTab, setActiveTab] = useState("Work");

  return (
    <section id="resume">
      {/* Heading */}
      <h2 className="mb-4 flex items-center gap-2 text-xl font-thin text-[var(--text-primary)]">
        <Briefcase className="h-5 w-5" />
        My Career
      </h2>

      {/* Tabs */}
      <div className="mb-2 grid h-9 w-full grid-cols-2 rounded-lg bg-[var(--border)] p-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-[var(--primary)] font-semibold text-[var(--text-primary)] shadow"
                    : "text-[var(--text-secondary)]"
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative rounded-xl border border-[var(--border)]">
        {/* Vertical line */}
        <div className="absolute left-12 top-0 bottom-0 z-0 w-px bg-[var(--border)]" />

        <div className="relative z-10 space-y-8 p-6">
          {resumeData[activeTab].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <Avatar logo={item.logo} title={item.title} />

              <div>
                {item.date && (
                  <p className="text-xs text-[var(--text-secondary)]">
                    {item.date}
                  </p>
                )}

                {item.title && (
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                )}

                {item.place && (
                  <p className="text-sm text-[var(--text-primary)]">
                    {item.place}
                  </p>
                )}

                {item.details?.length > 0 && (
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">
                    {item.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                )}

                {item.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
