import { memo } from "react";
import { Link } from "react-router-dom";
import { PiCaretRightBold } from "react-icons/pi";
import { formatCurrency } from "../utils/currency";
import { formatDate } from "../utils/date";
import { getCategoryIcon } from "../utils/categoryIcons";

/**
 * Displays a single transaction. Memoized with React.memo (see
 * TransactionList) so that re-filtering the list doesn't force every
 * unchanged card to re-render — only cards whose props actually
 * changed do.
 */
function TransactionCard({ transaction }) {
  const isIncome = transaction.type === "income";
  const CategoryIcon = getCategoryIcon(transaction.category);

  return (
    <Link
      to={`/transaction/${transaction.id}`}
      className="text-decoration-none"
    >
      <div className="glass glass-panel-sm mb-3 hover-lift d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div className="d-flex align-items-center gap-3 flex-grow-1 min-width-0">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
            style={{
              width: 44,
              height: 44,
              background: isIncome
                ? "rgba(16,185,129,0.15)"
                : "rgba(239,68,68,0.15)",
            }}
          >
            <CategoryIcon
              size={20}
              color={isIncome ? "var(--income)" : "var(--expense)"}
            />
          </div>
          <div className="min-width-0">
            <div className="fw-semibold text-truncate" style={{ color: "var(--text-primary)" }}>
              {transaction.description}
            </div>
            <div className="d-flex align-items-center gap-2 flex-wrap mt-1">
              <span className="category-chip">{transaction.category}</span>
              <span className="small text-secondary-soft">
                {formatDate(transaction.date)}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className={isIncome ? "amount-income" : "amount-expense"}>
            {isIncome ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </span>
          <PiCaretRightBold className="text-secondary-soft" />
        </div>
      </div>
    </Link>
  );
}

export default memo(TransactionCard);
