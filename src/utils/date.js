import moment from "moment";

const DISPLAY_FORMAT = "MMM D, YYYY";
const ISO_FORMAT = "YYYY-MM-DD";

function parseTransactionDate(value) {
  if (!value) return null;

  const date = moment(value, ISO_FORMAT, true);
  return date.isValid() ? date : null;
}

export function formatDate(dateString) {
  const date = parseTransactionDate(dateString);

  return date ? date.format(DISPLAY_FORMAT) : "Invalid date";
}

export function todayISO() {
  return moment().format(ISO_FORMAT);
}

export function formatRelative(dateString) {
  const date = parseTransactionDate(dateString);

  return date ? date.fromNow() : "";
}
