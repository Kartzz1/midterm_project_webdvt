import { v4 as uuidv4 } from "uuid";

/**
 * Small starter dataset so the Dashboard/Summary aren't blank on first
 * visit. Only used the very first time the app runs (no localStorage yet).
 */
const sampleTransactions = [
  {
    id: uuidv4(),
    description: "Monthly Salary",
    amount: 25000,
    type: "income",
    category: "Salary",
    date: "2026-08-01",
    notes: "",
  },
  {
    id: uuidv4(),
    description: "Grocery Run",
    amount: 1850,
    type: "expense",
    category: "Food",
    date: "2026-08-03",
    notes: "Weekly groceries",
  },
  {
    id: uuidv4(),
    description: "Jeepney Fare",
    amount: 250,
    type: "expense",
    category: "Transportation",
    date: "2026-08-04",
    notes: "",
  },
  {
    id: uuidv4(),
    description: "Electric Bill",
    amount: 2100,
    type: "expense",
    category: "Bills",
    date: "2026-08-05",
    notes: "",
  },
  {
    id: uuidv4(),
    description: "Freelance Design Gig",
    amount: 4500,
    type: "income",
    category: "Freelance",
    date: "2026-08-06",
    notes: "Logo design for a client",
  },
];

export default sampleTransactions;
