import { formatCurrency } from "../utils/currency";

// Show each category's name, amount, percentage, and progress bar.
function CategoryBreakdown({ breakdown }) {
  if (!breakdown.length) {
    return (
      <div className="glass glass-card empty-state">
        <p className="text-secondary-soft mb-0">
          No expenses recorded yet — add a transaction to see your breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="glass glass-card h-100">
      <h5 className="mb-4">Spending by Category</h5>

      {breakdown.map(({ category, total, percent }) => {
        // Keep the progress bar from going beyond its container.
        const progress = Math.min(percent, 100);

        return (
          <div key={category} className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-1">
              <span
                className="fw-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {category}
              </span>

              <span className="text-secondary-soft small">
                {formatCurrency(total)} · {percent.toFixed(1)}%
              </span>
            </div>

            <div className="category-progress">
              <div
                className="category-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryBreakdown;
