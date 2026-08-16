import { Button } from "react-bootstrap";
import { PiMoonStarsBold, PiSunBold } from "react-icons/pi";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const label = isDark
    ? "Switch to light mode"
    : "Switch to dark mode";

  // Keep the button accessible while the icon changes with the theme.
  return (
    <Button
      type="button"
      onClick={toggleTheme}
      className={`btn-glass-outline btn-icon-only ${className}`.trim()}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <PiSunBold size={18} aria-hidden="true" />
      ) : (
        <PiMoonStarsBold size={18} aria-hidden="true" />
      )}
    </Button>
  );
}

export default ThemeToggle;
