import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "budget-tracker-monthly-goal";
const DEFAULT_GOAL = 10000;

function readGoal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_GOAL;
  } catch {
    return DEFAULT_GOAL;
  }
}

/**
 * Persists the user's monthly spending limit to localStorage, mirroring
 * the pattern used by useTransactions — one hook owns the read/write
 * logic so the Summary page doesn't touch localStorage directly.
 */
export function useMonthlyGoal() {
  const [goal, setGoalState] = useState(readGoal);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(goal));
    } catch {
      // Non-fatal — goal just won't persist across refreshes this session.
    }
  }, [goal]);

  const setGoal = useCallback((value) => {
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric > 0) {
      setGoalState(numeric);
    }
  }, []);

  return { goal, setGoal };
}

export default useMonthlyGoal;
