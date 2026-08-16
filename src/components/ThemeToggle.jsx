import { Button } from "react-bootstrap";
import { PiMoonStarsBold, PiSunBold } from "react-icons/pi";
import { useTheme } from "../context/ThemeContext";

/**
 * Small standalone toggle. Pulls theme state straight from context —
 * no props needed from any parent, so it can be dropped anywhere
 * (navbar, Summary page) without prop drilling.
 */
function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      onClick={toggleTheme}
      className={`btn-glass-outline btn-icon-only ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <PiSunBold size={18} /> : <PiMoonStarsBold size={18} />}
    </Button>
  );
}

export default ThemeToggle;
