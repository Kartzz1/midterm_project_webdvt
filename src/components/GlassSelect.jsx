import { createPortal } from "react-dom";
import { Dropdown } from "react-bootstrap";
import { PiCaretDownBold } from "react-icons/pi";

// Keep the dropdown width aligned with the button.
const dropdownConfig = {
  modifiers: [
    {
      name: "flip",
      enabled: false,
    },
    {
      name: "sameWidth",
      enabled: true,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: ({ state }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      effect: ({ state }) => {
        state.elements.popper.style.width =
          `${state.elements.reference.offsetWidth}px`;
      },
    },
  ],
};

function GlassSelect({ id, value, options, onChange, ariaLabel }) {
  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (selectedValue) => {
    if (selectedValue) {
      onChange(selectedValue);
    }
  };

  return (
    <Dropdown
      className="w-100"
      onSelect={handleSelect}
      drop="down"
    >
      <Dropdown.Toggle
        as="button"
        type="button"
        bsPrefix="glass-select-toggle"
        id={id}
        aria-label={ariaLabel}
        className="glass-input w-100 d-flex justify-content-between align-items-center text-start"
      >
        <span className="text-truncate">
          {selectedOption?.label || "Select"}
        </span>

        <PiCaretDownBold
          size={14}
          className="flex-shrink-0 ms-2 text-secondary-soft"
        />
      </Dropdown.Toggle>

      {createPortal(
        <Dropdown.Menu
          className="glass-dropdown-menu"
          popperConfig={dropdownConfig}
        >
          {options.map((option) => (
            <Dropdown.Item
              key={option.value}
              eventKey={option.value}
              active={option.value === value}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>,
        document.body
      )}
    </Dropdown>
  );
}

export default GlassSelect;
