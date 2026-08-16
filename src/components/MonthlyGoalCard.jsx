import { useState } from "react";
import { PiTargetBold } from "react-icons/pi";
import { formatCurrency } from "../utils/currency";

/**
 * Lets the user set a monthly spending limit and see how current total
 * expenses compare to it. `goal` and `onUpdateGoal` come from
 * useMonthlyGoal (via the Summary page); `totalExpenses` comes from the
 * already-computed expense breakdown so this component doesn't need to
 * touch transactions directly.
 */
function MonthlyGoalCard({ goal, totalExpenses, onUpdateGoal }) {
  const [inputValue, setInputValue] = useState(goal);

  const percentUsed = goal > 0 ? Math.min((totalExpenses / goal) * 100, 100) : 0;
  const isOverBudget = totalExpenses > goal;
  const remaining = goal - totalExpenses;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateGoal(inputValue);
  };

  return (
    <div className="glass glass-card h-100 d-flex flex-column">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="icon-tile icon-tile-accent">
          <PiTargetBold size={22} />
        </div>
        <div>
          <h5 className="mb-1">Monthly Goal</h5>
          <p className="text-secondary-soft small mb-0">
            Keep your spending within your target.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="spending-limit" className="form-label">
          Spending limit
        </label>
        <input
          id="spending-limit"
          type="number"
          min="1"
          step="0.01"
          className="form-control glass-input mb-3"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="btn-glass-primary btn w-100">
          Update Goal
        </button>
      </form>

      <hr className="divider-soft my-4" />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-secondary-soft small fw-semibold">Spent</span>
        <span className={isOverBudget ? "amount-expense" : "fw-bold"} style={!isOverBudget ? { color: "var(--text-primary)" } : undefined}>
          {formatCurrency(totalExpenses)}
        </span>
      </div>

      <div className="category-progress mb-2">
        <div
          className="category-progress-fill"
          style={{
            width: `${percentUsed}%`,
            background: isOverBudget
              ? "linear-gradient(135deg, var(--expense), #f59e0b)"
              : undefined,
          }}
        />
      </div>
      <span
        className={`small fw-semibold ${isOverBudget ? "amount-expense" : "amount-income"}`}
      >
        {isOverBudget
          ? `${formatCurrency(Math.abs(remaining))} over budget`
          : `${formatCurrency(remaining)} remaining`}
      </span>
    </div>
  );
}

export default MonthlyGoalCard;
