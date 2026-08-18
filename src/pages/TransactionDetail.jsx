import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  PiArrowLeftBold,
  PiNotePencilBold,
  PiPencilSimpleBold,
  PiReceiptBold,
  PiSmileySadBold,
  PiTrashBold,
} from "react-icons/pi";

import ConfirmModal from "../components/ConfirmModal";
import TransactionForm from "../components/TransactionForm";
import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency } from "../utils/currency";
import { formatDate } from "../utils/date";

function TransactionBadge({ type }) {
  const isIncome = type === "income";

  return (
    <span className={isIncome ? "type-badge-income" : "type-badge-expense"}>
      {isIncome ? "Income" : "Expense"}
    </span>
  );
}

function TransactionAmount({ type, amount }) {
  const isIncome = type === "income";

  return (
    <strong className={isIncome ? "amount-income" : "amount-expense"}>
      {isIncome ? "+" : "-"}
      {formatCurrency(amount)}
    </strong>
  );
}

function TransactionList({ transactions }) {
  return (
    <div className="row g-3">
      {transactions.map((transaction) => (
        <div className="col-12 col-md-6" key={transaction.id}>
          <Link
            to={`/transaction/${transaction.id}`}
            className="text-decoration-none"
          >
            <div className="glass glass-card h-100">
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <TransactionBadge type={transaction.type} />

                  <h5
                    className="mt-3 mb-1 fw-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {transaction.description}
                  </h5>

                  <span className="category-chip">
                    {transaction.category}
                  </span>

                  <p className="text-secondary-soft small mt-3 mb-0">
                    {formatDate(transaction.date)}
                  </p>
                </div>

                <TransactionAmount
                  type={transaction.type}
                  amount={transaction.amount}
                />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

function EmptyTransactions() {
  return (
    <div className="glass glass-card empty-state">
      <PiReceiptBold className="empty-state-icon" />

      <h5 className="mb-2">No transactions yet.</h5>

      <p className="text-secondary-soft mb-4">
        Add your first transaction to see the details here.
      </p>

      <Link
        to="/add"
        className="btn-glass-primary btn d-inline-flex align-items-center gap-2"
      >
        Add Transaction
      </Link>
    </div>
  );
}

function TransactionNotFound() {
  return (
    <div className="page-container" style={{ maxWidth: 600 }}>
      <div className="glass glass-card empty-state">
        <PiSmileySadBold className="empty-state-icon" />

        <h5 className="mb-2">Transaction not found.</h5>

        <p className="text-secondary-soft mb-4">
          This transaction may have been deleted or the link is invalid.
        </p>

        <Link
          to="/transaction"
          className="btn-glass-primary btn d-inline-flex align-items-center gap-2"
        >
          <PiArrowLeftBold size={18} />
          Back to Transactions
        </Link>
      </div>
    </div>
  );
}

function TransactionInformation({ transaction }) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
        <div>
          <TransactionBadge type={transaction.type} />

          <h3
            className="mt-3 mb-1 fw-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {transaction.description}
          </h3>

          <span className="category-chip">{transaction.category}</span>
        </div>

        <h2
          className={
            transaction.type === "income"
              ? "amount-income"
              : "amount-expense"
          }
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </h2>
      </div>

      <hr className="divider-soft" />

      <dl className="row mb-0">
        <dt className="col-4 col-sm-3 text-secondary-soft fw-normal">
          Date
        </dt>

        <dd className="col-8 col-sm-9">
          {formatDate(transaction.date)}
        </dd>

        <dt className="col-4 col-sm-3 text-secondary-soft fw-normal">
          Category
        </dt>

        <dd className="col-8 col-sm-9">
          {transaction.category}
        </dd>

        <dt className="col-4 col-sm-3 text-secondary-soft fw-normal">
          Type
        </dt>

        <dd className="col-8 col-sm-9 text-capitalize">
          {transaction.type}
        </dd>

        {transaction.notes && (
          <>
            <dt className="col-4 col-sm-3 text-secondary-soft fw-normal">
              <span className="d-inline-flex align-items-center gap-1">
                <PiNotePencilBold />
                Notes
              </span>
            </dt>

            <dd className="col-8 col-sm-9">{transaction.notes}</dd>
          </>
        )}
      </dl>
    </>
  );
}

function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    transactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // The route decides whether this page shows the list or one transaction.
  if (!id) {
    return (
      <div className="page-container">
        <div className="mb-4">
          <span className="page-eyebrow">TRANSACTIONS</span>

          <h1 className="page-hero-title">
            Transaction <span className="gradient-text">Details</span>
          </h1>

          <p className="page-hero-subtitle">
            View and manage your recorded transactions.
          </p>
        </div>

        {transactions.length === 0 ? (
          <EmptyTransactions />
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </div>
    );
  }

  const transaction = getTransactionById(id);

  if (!transaction) {
    return <TransactionNotFound />;
  }

  const handleUpdate = (data) => {
    updateTransaction(transaction.id, data);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTransaction(transaction.id);
    navigate("/transaction");
  };

  return (
    <div className="page-container" style={{ maxWidth: 720 }}>
      <button
        type="button"
        className="btn-glass-outline border-0 d-inline-flex align-items-center gap-2 mb-4"
        onClick={() => navigate("/transaction")}
      >
        <PiArrowLeftBold size={18} />
        Back to Transactions
      </button>

      <div className="glass glass-card">
        {isEditing ? (
          <>
            <h4 className="mb-4">Edit Transaction</h4>

            <TransactionForm
              initialValues={transaction}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              submitLabel="Save Changes"
            />
          </>
        ) : (
          <>
            <TransactionInformation transaction={transaction} />

            <div className="d-flex gap-2 mt-4 flex-wrap">
              <button
                type="button"
                className="btn-glass-primary btn d-inline-flex align-items-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <PiPencilSimpleBold size={18} />
                Edit
              </button>

              <button
                type="button"
                className="btn-glass-danger border-0 d-inline-flex align-items-center gap-2"
                onClick={() => setShowDeleteModal(true)}
              >
                <PiTrashBold size={18} />
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        show={showDeleteModal}
        title="Delete this transaction?"
        message={`This will permanently remove "${transaction.description}". This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}

export default TransactionDetail;
