import {
  PiBriefcaseBold,
  PiBusBold,
  PiDotsThreeCircleBold,
  PiFilmSlateBold,
  PiGiftBold,
  PiGraduationCapBold,
  PiHeartbeatBold,
  PiForkKnifeBold,
  PiLaptopBold,
  PiPlusCircleBold,
  PiReceiptBold,
  PiShoppingBagBold,
} from "react-icons/pi";

/**
 * One icon per category so the transaction list reads at a glance
 * (Food ≠ Bills ≠ Transportation), instead of every card sharing the
 * same generic glyph.
 */
const CATEGORY_ICONS = {
  // Expense categories
  Food: PiForkKnifeBold,
  Transportation: PiBusBold,
  Bills: PiReceiptBold,
  Shopping: PiShoppingBagBold,
  Education: PiGraduationCapBold,
  Entertainment: PiFilmSlateBold,
  Health: PiHeartbeatBold,
  Other: PiDotsThreeCircleBold,
  // Income categories
  Salary: PiBriefcaseBold,
  Allowance: PiGiftBold,
  Freelance: PiLaptopBold,
  "Other Income": PiPlusCircleBold,
};

const FALLBACK_ICON = PiDotsThreeCircleBold;

export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || FALLBACK_ICON;
}

export default getCategoryIcon;
