// UI 

import { useTheme } from "./useTheme";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-all duration-300 focus:outline-none ${
        isDark ? "border-white" : "border-black"
      }`}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
    >
      <span
        className={`inline-block h-3 w-3 rounded-full transition-transform duration-300 ${
          isDark ? "translate-x-6 bg-white" : "translate-x-1 bg-black"
        }`}
      />
    </button>
  );
};