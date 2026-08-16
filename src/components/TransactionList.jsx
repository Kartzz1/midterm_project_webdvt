import { Link } from "react-router-dom";
import {
  PiPlusCircleBold,
  PiReceiptBold,
} from "react-icons/pi";
import TransactionCard from "./TransactionCard";

function TransactionList({
  transactions,
  hasAnyTransactions,
}) {
  const hasResults = transactions.length > 0;
  const showEmptyList = !hasResults;

  const emptyTitle = hasAnyTransactions
    ? "No transactions match your filters."
    : "No transactions yet.";

  const emptyMessage = hasAnyTransactions
    ? "Try clearing your filters to see everything."
    : "Start tracking your income and expenses.";

  // Show the empty state when there are no transactions to display.
  if (showEmptyList) {
    return (
      <div className="glass glass-card empty-state">
        <PiReceiptBold className="empty-state-icon" />

        <h5 className="mb-2">
          {emptyTitle}
        </h5>

        <p className="text-secondary-soft mb-4">
          {emptyMessage}
        </p>

        {!hasAnyTransactions && (
          <Link
            to="/add"
            className="btn-glass-primary btn d-inline-flex align-items-center gap-2"
          >
            <PiPlusCircleBold size={18} />
            Add Your First Transaction
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </div>
  );
}

export default TransactionList;
