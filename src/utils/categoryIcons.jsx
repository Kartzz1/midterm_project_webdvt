import {
  PiBriefcaseBold,
  PiBusBold,
  PiDotsThreeCircleBold,
  PiFilmSlateBold,
  PiForkKnifeBold,
  PiGiftBold,
  PiGraduationCapBold,
  PiHeartbeatBold,
  PiLaptopBold,
  PiPlusCircleBold,
  PiReceiptBold,
  PiShoppingBagBold,
} from "react-icons/pi";

const CATEGORY_ICONS = {
  Food: PiForkKnifeBold,
  Transportation: PiBusBold,
  Bills: PiReceiptBold,
  Shopping: PiShoppingBagBold,
  Education: PiGraduationCapBold,
  Entertainment: PiFilmSlateBold,
  Health: PiHeartbeatBold,
  Other: PiDotsThreeCircleBold,

  Salary: PiBriefcaseBold,
  Allowance: PiGiftBold,
  Freelance: PiLaptopBold,
  "Other Income": PiPlusCircleBold,
};

const FALLBACK_ICON = PiDotsThreeCircleBold;

// Return the category icon when one exists; otherwise use a neutral icon
// so an unknown category never causes the transaction card to break.
export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] ?? FALLBACK_ICON;
}

export default getCategoryIcon;
