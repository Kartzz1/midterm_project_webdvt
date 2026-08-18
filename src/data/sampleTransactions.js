import { v4 as uuidv4 } from "uuid";

// Sample transactions for new users.
const sampleTransactions = [
  {
    id: uuidv4(),
    description: "Monthly Allowance",
    amount: 25000,
    type: "income",
    category: "Salary",
    date: "2026-08-18",
    notes: "Monthly income",
  },
  {
    id: uuidv4(),
    description: "Palengke and Grocery",
    amount: 1850,
    type: "expense",
    category: "Food",
    date: "2026-08-16",
    notes: "Food and household supplies",
  },
  {
    id: uuidv4(),
    description: "Jeepney and Tricycle Fare",
    amount: 250,
    type: "expense",
    category: "Transportation",
    date: "2026-08-15",
    notes: "Daily transportation",
  },
  {
    id: uuidv4(),
    description: "Meralco Electric Bill",
    amount: 2100,
    type: "expense",
    category: "Bills",
    date: "2026-08-14",
    notes: "Monthly electricity bill",
  },
  {
    id: uuidv4(),
    description: "Freelance Logo Project",
    amount: 4500,
    type: "income",
    category: "Freelance",
    date: "2026-08-12",
    notes: "Payment for a logo design project",
  },
];

export default sampleTransactions;
