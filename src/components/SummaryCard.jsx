import { Col, Row } from "react-bootstrap";
import { PiChartPieSliceBold, PiCrownBold, PiReceiptBold } from "react-icons/pi";
import { formatCurrency } from "../utils/currency";

function SummaryCard({ totalExpenses, topCategory, categoryCount }) {
  return (
    <Row className="g-3 mb-4">
      <Col xs={12} md={4}>
        <div className="glass glass-panel-sm h-100 d-flex align-items-center gap-3">
          <div className="icon-tile icon-tile-expense">
            <PiReceiptBold size={22} />
          </div>
          <div>
            <div className="stat-label mb-1">Total Expenses</div>
            <h4 className="mb-0 amount-expense">{formatCurrency(totalExpenses)}</h4>
          </div>
        </div>
      </Col>
      <Col xs={12} md={4}>
        <div className="glass glass-panel-sm h-100 d-flex align-items-center gap-3">
          <div className="icon-tile icon-tile-accent">
            <PiCrownBold size={22} />
          </div>
          <div>
            <div className="stat-label mb-1">Top Category</div>
            <h4 className="mb-0" style={{ color: "var(--text-primary)" }}>
              {topCategory ? topCategory.category : "None"}
            </h4>
            {topCategory && (
              <span className="small text-secondary-soft">
                {formatCurrency(topCategory.total)}
              </span>
            )}
          </div>
        </div>
      </Col>
      <Col xs={12} md={4}>
        <div className="glass glass-panel-sm h-100 d-flex align-items-center gap-3">
          <div className="icon-tile icon-tile-accent">
            <PiChartPieSliceBold size={22} />
          </div>
          <div>
            <div className="stat-label mb-1">Categories Used</div>
            <h4 className="mb-0" style={{ color: "var(--text-primary)" }}>
              {categoryCount}
            </h4>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default SummaryCard;
