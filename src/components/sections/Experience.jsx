import { resumeData } from "../../Data/resumeData";
import { Briefcase } from "lucide-react";

const TimelineItem = ({ item, isFirst, isLast }) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center w-5">
        {!isFirst && (
          <div className="w-0.5 h-2 bg-[var(--border)]" />
        )}
        {isFirst && <div className="h-2" />}
        <div className="w-2 h-2 rounded-full bg-[var(--border)] shrink-0" />
        {!isLast && (
          <div className="w-0.5 flex-1 bg-[var(--border)]" />
        )}
      </div>

      <div className="flex-1 pb-4"> 
        <h3 className="font-semibold text-[var(--text-primary)]">
          {item.title}
        </h3>
        <p className="text-sm text-[var(--text-primary)]">{item.place}</p>
      </div>

      <div className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
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

      <div>
        {combinedExperience.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            isFirst={index === 0}
            isLast={index === combinedExperience.length - 1}
          />
        ))}
      </div>
    </section>
  );
};