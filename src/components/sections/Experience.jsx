import { resumeData } from "../../Data/resumeData";
import { Briefcase } from "lucide-react";

const TimelineItem = ({ item, isLatest }) => {
  return (
    <div className="grid grid-cols-[20px_1fr_auto] gap-4 items-start">
      <div className="flex justify-center items-start pt-2">
        <div
          className={`w-3 h-3 rounded-full border-2 ${
            isLatest
              ? "bg-[var(--text-primary)] border-[var(--text-primary)]"
              : "bg-[var(--background)] border-[var(--text-primary)]"
          }`}
        />
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-[var(--text-primary)]">
          {item.title}
        </h3>
        <p className="text-sm text-[var(--text-primary)]">{item.place}</p>
      </div>

      <div className="text-xs text-[var(--text-secondary)] whitespace-nowrap pt-1">
        {item.date}
      </div>
    </div>
  );
};

export const Experience = () => {
  const combinedExperience = [...resumeData.Experience].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 text-xl font-thin text-[var(--text-primary)]">
        <Briefcase className="h-5 w-5" />
        Experience
      </h2>

      <div className="space-y-6">
        {combinedExperience.map((item, index) => (
          <TimelineItem key={index} item={item} isLatest={index === 0} />
        ))}
      </div>
    </section>
  );
};
