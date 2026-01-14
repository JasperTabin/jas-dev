// Added useTheme for dark mode feature.

import { Link } from "react-router-dom";
import { useTheme } from "./useTheme";

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between mb-4 mt-4">
      <Link
        to="/"
        className="text-lg font-bold transition-colors duration-300"
        style={{ color: 'var(--text-primary)' }}
      >
        JAS.
      </Link>

      <div className="flex items-center space-x-6 text-sm">

        <button
          onClick={toggleTheme}
          className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-all duration-300 ease-in-out focus:outline-none ${
            isDark 
              ? 'bg-transparent border-white' 
              : 'bg-transparent border-black'
          }`}
          role="switch"
          aria-checked={isDark}
          aria-label="Toggle dark mode"
        >
          <span
            className={`inline-block h-3 w-3 rounded-full transition-transform duration-300 ease-in-out ${
              isDark 
                ? 'translate-x-6 bg-white' 
                : 'translate-x-1 bg-black'
            }`}
          />
        </button>
      </div>
    </nav>
  );
};