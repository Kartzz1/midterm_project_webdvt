import { Col, Row } from "react-bootstrap";
import { PiArrowCircleDownBold, PiArrowCircleUpBold, PiWalletDuotone } from "react-icons/pi";
import { formatCurrency } from "../utils/currency";

/**
 * Pure presentational component — receives already-computed totals as
 * props instead of transactions, so it never needs to recalculate
 * anything itself.
 */
function BalanceCard({ totalIncome, totalExpenses, balance }) {
  return (
    <Row className="g-3 mb-4">
      <Col xs={12} md={4}>
        <div className="glass glass-panel-sm h-100 d-flex align-items-center gap-3">
          <div className="icon-tile icon-tile-income">
            <PiArrowCircleUpBold size={22} />
          </div>
          <div>
            <div className="stat-label mb-1">Total Income</div>
            <h4 className="mb-0 amount-income">{formatCurrency(totalIncome)}</h4>
          </div>
        </div>
      </Col>
      <Col xs={12} md={4}>
        <div className="glass glass-panel-sm h-100 d-flex align-items-center gap-3">
          <div className="icon-tile icon-tile-expense">
            <PiArrowCircleDownBold size={22} />
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
            <PiWalletDuotone size={22} />
          </div>
          <div>
            <div className="stat-label mb-1">Current Balance</div>
            <h4 className="mb-0 gradient-text fw-bold">{formatCurrency(balance)}</h4>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default BalanceCard;
