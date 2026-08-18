export const TRANSACTION_TYPES = {
  INCOME: "income",
  EXPENSE: "expense",
};

export const INCOME_CATEGORIES = [
  "Salary",
  "Allowance",
  "Freelance",
  "Other Income",
];

export const EXPENSE_CATEGORIES = [
  "Food",
  "Transportation",
  "Bills",
  "Shopping",
  "Education",
  "Entertainment",
  "Health",
  "Other",
];

// Gets the categories that match the transaction type.
export function getCategoriesForType(type) {
  return type === TRANSACTION_TYPES.INCOME
    ? INCOME_CATEGORIES
    : EXPENSE_CATEGORIES;
}

export const ALL_CATEGORIES = [
  ...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]),
];
