import { Col, Row } from "react-bootstrap";
import {
  PiArrowCircleDownBold,
  PiArrowCircleUpBold,
  PiWalletDuotone,
} from "react-icons/pi";
import { formatCurrency } from "../utils/currency";

// These settings control how each balance card looks and which value it displays.
const balanceItems = [
  {
    key: "income",
    label: "Total Income",
    icon: PiArrowCircleUpBold,
    iconClass: "icon-tile-income",
    amountClass: "amount-income",
    valueKey: "totalIncome",
  },
  {
    key: "expenses",
    label: "Total Expenses",
    icon: PiArrowCircleDownBold,
    iconClass: "icon-tile-expense",
    amountClass: "amount-expense",
    valueKey: "totalExpenses",
  },
  {
    key: "balance",
    label: "Current Balance",
    icon: PiWalletDuotone,
    iconClass: "icon-tile-accent",
    amountClass: "gradient-text fw-bold",
    valueKey: "balance",
  },
];

function BalanceCard({ totalIncome, totalExpenses, balance }) {
  // Keep the values together so each card can get its value using valueKey.
  const values = {
    totalIncome,
    totalExpenses,
    balance,
  };

  return (
    <Row className="g-3 mb-4">
      {balanceItems.map(
        ({
          key,
          label,
          icon: Icon,
          iconClass,
          amountClass,
          valueKey,
        }) => (
          <Col xs={12} md={4} key={key}>
            <div className="glass glass-panel-sm h-100 d-flex align-items-center gap-3">
              <div className={`icon-tile ${iconClass}`}>
                <Icon size={22} />
              </div>

              <div>
                <div className="stat-label mb-1">{label}</div>

                <h4 className={`mb-0 ${amountClass}`}>
                  {formatCurrency(values[valueKey])}
                </h4>
              </div>
            </div>
          </Col>
        )
      )}
    </Row>
  );
}

export default BalanceCard;