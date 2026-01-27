import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

const images = [
  { id: 1, src: "/src/assets/Gallery/G1.jpg", alt: "Photo 1" },
  { id: 2, src: "/src/assets/Gallery/G2.jpg", alt: "Photo 2" },
  { id: 3, src: "/src/assets/Gallery/G3.jpg", alt: "Photo 3" },
  { id: 4, src: "/src/assets/Gallery/G4.jpg", alt: "Photo 4" },
  { id: 5, src: "/src/assets/Gallery/G5.jpg", alt: "Photo 5" },
  { id: 6, src: "/src/assets/Gallery/G6.jpg", alt: "Photo 6" },
  { id: 7, src: "/src/assets/Gallery/G7.jpg", alt: "Photo 7" },
  { id: 8, src: "/src/assets/Gallery/G8.jpg", alt: "Photo 8" },
  { id: 9, src: "/src/assets/Gallery/G9.jpg", alt: "Photo 9" },
];

export const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewportRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const updateWidth = () => {
      if (viewportRef.current) {
        const firstItem = viewportRef.current.querySelector(".gallery-item");
        if (firstItem) {
          const containerWidth = viewportRef.current.offsetWidth;
          const itemWidth = firstItem.getBoundingClientRect().width; 
          setItemWidth(itemWidth);
          setItemsPerPage(Math.floor(containerWidth / itemWidth));
        }
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const scrollToIndex = (index) => {
    if (!viewportRef.current || itemWidth === 0) return;
    viewportRef.current.style.transform = `translateX(-${index * itemWidth}px)`;
    setCurrentIndex(index);
  };

  const scrollNext = () => {
    const maxIndex = images.length - itemsPerPage; 
    if (currentIndex < maxIndex) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const scrollPrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-thin mb-4 flex items-center gap-2 text-[var(--text-primary)]">
        <Images className="w-5 h-5 text-[var(--text-primary)]" /> Gallery
      </h2>

      <div className="relative overflow-hidden">
        <div
          ref={viewportRef}
          className="flex transition-transform duration-500 ease-in-out"
        >
          {images.map((image) => (
            <div
              key={image.id}
              className="gallery-item flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-2 box-border"
            >
              <div className="aspect-square rounded-lg border-2 border-[var(--border)] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={scrollPrev}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-[var(--border)] ${
            currentIndex === 0
              ? "bg-white/20 text-gray-400"
              : "bg-black/60 text-white hover:scale-110"
          }`}
        >
          <ChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollNext}
          disabled={currentIndex >= images.length - itemsPerPage}
          className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-[var(--border)] ${
            currentIndex >= images.length - itemsPerPage
              ? "bg-white/20 text-gray-400"
              : "bg-black/60 text-white hover:scale-110"
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};
