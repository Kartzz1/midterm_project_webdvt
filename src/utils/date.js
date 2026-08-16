import moment from "moment";

/** Formats an ISO date string for display, e.g. "Aug 9, 2026" */
export function formatDate(dateString) {
  if (!dateString) return "—";
  const m = moment(dateString);
  return m.isValid() ? m.format("MMM D, YYYY") : "Invalid date";
}

/** Returns today's date as an ISO date string (YYYY-MM-DD), for form defaults */
export function todayISO() {
  return moment().format("YYYY-MM-DD");
}

/** Relative time, e.g. "3 days ago" — used for small contextual hints */
export function formatRelative(dateString) {
  if (!dateString) return "";
  const m = moment(dateString);
  return m.isValid() ? m.fromNow() : "";
}
