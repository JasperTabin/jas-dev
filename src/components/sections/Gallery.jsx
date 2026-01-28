import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { galleryImages } from "../../Data/GalleryData";

export const Gallery = () => {
  const [index, setIndex] = useState(0);
  const itemRefs = useRef([]);

  // Fixed NavButton
  const NavButton = ({ direction, onClick, disabled }) => {
    const positionClass = direction === "left" ? "-left-3" : "-right-3";

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`absolute ${positionClass} top-1/2 -translate-y-1/2 p-2 rounded-full border border-[var(--border)] transition-transform z-10 shadow-lg ${
          disabled
            ? "bg-white/20 text-gray-400 cursor-not-allowed"
            : "bg-black/80 text-white hover:scale-110"
        }`}
      >
        {direction === "left" ? (
          <ChevronLeft className="w-6 h-6" />
        ) : (
          <ChevronRight className="w-6 h-6" />
        )}
      </button>
    );
  };

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const visibleCount = getVisibleCount();
  const maxIndex = galleryImages.length - visibleCount;

  const scrollTo = (newIndex) => {
    itemRefs.current[newIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setIndex(newIndex);
  };

  return (
    <section>
      <h2 className="text-xl font-thin mb-4 flex items-center gap-2 text-[var(--text-primary)]">
        <Images className="w-5 h-5" /> Gallery
      </h2>

      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex overflow-x-hidden gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={img.id}
                ref={(el) => (itemRefs.current[i] = el)}
                className="w-[calc(100%-1rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] flex-shrink-0"
              >
                <div className="aspect-square rounded-lg border-2 border-[var(--border)] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <NavButton
          direction="left"
          onClick={() => scrollTo(index - 1)}
          disabled={index === 0}
        />
        <NavButton
          direction="right"
          onClick={() => scrollTo(index + 1)}
          disabled={index >= maxIndex}
        />
      </div>
    </section>
  );
};