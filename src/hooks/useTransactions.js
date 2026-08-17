import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import sampleTransactions from "../data/sampleTransactions";

const STORAGE_KEY = "budget-tracker-transactions";

function readTransactions() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return null;
    }

    const transactions = JSON.parse(storedData);

    // Only accept an array so invalid storage data cannot break the app.
    return Array.isArray(transactions) ? transactions : null;
  } catch {
    return null;
  }
}

function saveTransactions(transactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    // Keep the current state working even when browser storage is unavailable.
  }
}

function getInitialTransactions() {
  const savedTransactions = readTransactions();

  if (savedTransactions) {
    return savedTransactions;
  }

  saveTransactions(sampleTransactions);
  return sampleTransactions;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState(getInitialTransactions);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = useCallback((transaction) => {
    const newTransaction = {
      ...transaction,
      id: uuidv4(),
    };

    setTransactions((current) => [newTransaction, ...current]);

    return newTransaction;
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updates, id }
          : transaction
      )
    );
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id)
    );
  }, []);

  const getTransactionById = useCallback(
    (id) => transactions.find((transaction) => transaction.id === id),
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
