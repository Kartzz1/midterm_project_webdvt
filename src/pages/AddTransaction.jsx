import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import { useTransactions } from "../hooks/useTransactions";

function AddTransaction() {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  // Save the form data first, then return to the dashboard.
  const handleSubmit = (transaction) => {
    addTransaction(transaction);
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="mb-4">
        <span className="page-eyebrow">New Entry</span>
        <h1 className="page-hero-title">Add Transaction</h1>
        <p className="page-hero-subtitle">
          Record a new income or expense entry.
        </p>
      </div>

      <div className="glass glass-card glass-card-lg">
        <TransactionForm
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
          submitLabel="Add Transaction"
        />
      </div>
    </div>
  );
}

export default AddTransaction;
