import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PiListChecksBold, PiPlusCircleBold } from "react-icons/pi";
import BalanceCard from "../components/BalanceCard";
import FilterBar from "../components/FilterBar";
import TransactionList from "../components/TransactionList";
import { useTransactions } from "../hooks/useTransactions";

function Dashboard() {
  const { transactions } = useTransactions();
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Totals only need to be recalculated when the underlying transaction
  // list changes, not on every render triggered by filter changes —
  // useMemo avoids re-summing the whole array unnecessarily.
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    return { totalIncome: income, totalExpenses: expenses, balance: income - expenses };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => (typeFilter === "all" ? true : t.type === typeFilter))
      .filter((t) => (categoryFilter === "all" ? true : t.category === categoryFilter))
      .filter((t) =>
        searchTerm
          ? t.description.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, typeFilter, categoryFilter, searchTerm]);

  const handleReset = () => {
    setTypeFilter("all");
    setCategoryFilter("all");
    setSearchTerm("");
  };

  return (
    <div className="page-container">
      <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
        <div>
          <span className="page-eyebrow">Personal Finance</span>
          <h1 className="page-hero-title">
            Your money, <span className="gradient-text">simplified.</span>
          </h1>
          <p className="page-hero-subtitle">
            Track your income and expenses without the complexity.
          </p>
        </div>
        <Link
          to="/add"
          className="btn-glass-primary btn-glass-primary-lg btn d-inline-flex align-items-center gap-2 flex-shrink-0"
        >
          <PiPlusCircleBold size={22} />
          Add Transaction
        </Link>
      </div>

      <BalanceCard
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
      />

      <div className="d-flex justify-content-between align-items-end mb-3 flex-wrap gap-2">
        <div>
          <span className="page-eyebrow">Activity</span>
          <h4 className="mb-0 fw-bold" style={{ color: "var(--text-primary)" }}>
            Recent Transactions
          </h4>
        </div>
        <span className="d-inline-flex align-items-center gap-2 text-secondary-soft small fw-semibold">
          <PiListChecksBold size={16} />
          {filteredTransactions.length} transaction
          {filteredTransactions.length === 1 ? "" : "s"}
        </span>
      </div>

      <FilterBar
        typeFilter={typeFilter}
        categoryFilter={categoryFilter}
        searchTerm={searchTerm}
        onTypeChange={setTypeFilter}
        onCategoryChange={setCategoryFilter}
        onSearchChange={setSearchTerm}
        onReset={handleReset}
      />

      <TransactionList
        transactions={filteredTransactions}
        hasAnyTransactions={transactions.length > 0}
      />
    </div>
  );
}

export default Dashboard;
