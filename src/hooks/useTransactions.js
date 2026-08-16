import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import sampleTransactions from "../data/sampleTransactions";

const STORAGE_KEY = "budget-tracker-transactions";

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Guard against corrupted/unexpected localStorage content so a bad
    // value can never crash the app — we just treat it as "no data".
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeToStorage(transactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    // Storage might be full or unavailable — the app still works for
    // the current session, it just won't persist across refreshes.
  }
}

/**
 * Single source of truth for reading, adding, updating, deleting, and
 * persisting transactions. Every page uses this hook instead of talking
 * to localStorage directly, so persistence logic lives in exactly one
 * place.
 */
export function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    const saved = readFromStorage();
    if (saved) return saved;
    // First-ever run: seed with sample data so the UI isn't empty,
    // and persist that seed immediately.
    writeToStorage(sampleTransactions);
    return sampleTransactions;
  });

  // Keep storage in sync whenever transactions change.
  useEffect(() => {
    writeToStorage(transactions);
  }, [transactions]);

  const addTransaction = useCallback((transaction) => {
    const newTransaction = { ...transaction, id: uuidv4() };
    setTransactions((prev) => [newTransaction, ...prev]);
    return newTransaction;
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, id } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTransactionById = useCallback(
    (id) => transactions.find((t) => t.id === id),
    [transactions]
  );

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
  };
}

export default useTransactions;
