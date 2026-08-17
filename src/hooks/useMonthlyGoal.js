import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "budget-tracker-monthly-goal";
const DEFAULT_GOAL = 10000;

function getStoredGoal() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    const goal = Number(storedValue);

    if (Number.isFinite(goal) && goal > 0) {
      return goal;
    }
  } catch {
    // Use the default when browser storage cannot be accessed.
  }

  return DEFAULT_GOAL;
}

export function useMonthlyGoal() {
  const [goal, setGoal] = useState(getStoredGoal);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(goal));
    } catch {
      // The current goal remains available even if it cannot be saved.
    }
  }, [goal]);

  const updateGoal = useCallback((value) => {
    const nextGoal = Number(value);

    // Ignore empty, invalid, zero, or negative values.
    if (!Number.isFinite(nextGoal) || nextGoal <= 0) {
      return;
    }

    setGoal(nextGoal);
  }, []);

  return {
    goal,
    setGoal: updateGoal,
  };
}

export default useMonthlyGoal;
