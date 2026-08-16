import { createPortal } from "react-dom";
import { Dropdown } from "react-bootstrap";
import { PiCaretDownBold } from "react-icons/pi";

/**
 * Replaces native <select> for the Dashboard filters. Two problems
 * this solves:
 *  1. The native OS dropdown ignored our glass theming, especially in
 *     dark mode.
 *  2. Every glass panel uses `backdrop-filter`, which creates its own
 *     CSS stacking context — so a dropdown menu rendered inside one
 *     glass panel could be visually clipped/covered by a later glass
 *     panel on the page (e.g. the transaction list), no matter how
 *     high its z-index was set.
 *
 * Portaling the menu straight to `document.body` sidesteps both:
 * Popper positions it against the toggle button regardless of where
 * it lives in the DOM, so it always renders above everything, fully
 * opaque and legible in either theme. `flip` is also disabled so it
 * always opens downward instead of occasionally flipping upward near
 * the bottom of the viewport.
 */
function GlassSelect({ id, value, options, onChange, ariaLabel }) {
  const selected = options.find((opt) => opt.value === value);

  return (
    <Dropdown className="w-100" onSelect={(val) => val && onChange(val)} drop="down">
      <Dropdown.Toggle
        as="button"
        type="button"
        bsPrefix="glass-select-toggle"
        id={id}
        aria-label={ariaLabel}
        className="glass-input w-100 d-flex justify-content-between align-items-center text-start"
      >
        <span className="text-truncate">{selected ? selected.label : "Select"}</span>
        <PiCaretDownBold size={14} className="flex-shrink-0 ms-2 text-secondary-soft" />
      </Dropdown.Toggle>
      {createPortal(
        <Dropdown.Menu
          className="glass-dropdown-menu"
          popperConfig={{
            modifiers: [
              { name: "flip", enabled: false },
              {
                name: "sameWidth",
                enabled: true,
                phase: "beforeWrite",
                requires: ["computeStyles"],
                fn: ({ state }) => {
                  state.styles.popper.width = `${state.rects.reference.width}px`;
                },
                effect: ({ state }) => {
                  state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
                },
              },
            ],
          }}
        >
          {options.map((opt) => (
            <Dropdown.Item key={opt.value} eventKey={opt.value} active={opt.value === value}>
              {opt.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>,
        document.body
      )}
    </Dropdown>
  );
}

export default GlassSelect;
