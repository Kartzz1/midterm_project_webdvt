import { formatCurrency } from "../utils/currency";

/**
 * `breakdown` is an array of { category, total, percent } sorted by
 * total descending, already computed by the Summary page.
 */
function CategoryBreakdown({ breakdown }) {
  if (breakdown.length === 0) {
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
      {breakdown.map(({ category, total, percent }) => (
        <div key={category} className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-1">
            <span className="fw-semibold" style={{ color: "var(--text-primary)" }}>
              {category}
            </span>
            <span className="text-secondary-soft small">
              {formatCurrency(total)} · {percent.toFixed(1)}%
            </span>
          </div>
          <div className="category-progress">
            <div
              className="category-progress-fill"
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryBreakdown;
