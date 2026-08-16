import { Col, Row } from "react-bootstrap";
import {
  PiChartPieSliceBold,
  PiCrownBold,
  PiReceiptBold,
} from "react-icons/pi";
import { formatCurrency } from "../utils/currency";

function SummaryCard({ totalExpenses, topCategory, categoryCount }) {
  // Keep the summary items together so the layout stays consistent.
  const summaryItems = [
    {
      label: "Total Expenses",
      value: formatCurrency(totalExpenses),
      icon: PiReceiptBold,
      iconClass: "icon-tile-expense",
      valueClass: "amount-expense",
    },
    {
      label: "Top Category",
      value: topCategory?.category || "None",
      subValue: topCategory
        ? formatCurrency(topCategory.total)
        : null,
      icon: PiCrownBold,
      iconClass: "icon-tile-accent",
      valueClass: "",
    },
    {
      label: "Categories Used",
      value: categoryCount,
      icon: PiChartPieSliceBold,
      iconClass: "icon-tile-accent",
      valueClass: "",
    },
  ];

  return (
    <Row className="g-3 mb-4">
      {summaryItems.map(
        ({
          label,
          value,
          subValue,
          icon: Icon,
          iconClass,
          valueClass,
        }) => (
          <Col xs={12} md={4} key={label}>
            <div className="glass glass-panel-sm h-100 d-flex align-items-center gap-3">
              <div className={`icon-tile ${iconClass}`}>
                <Icon size={22} />
              </div>

              <div>
                <div className="stat-label mb-1">
                  {label}
                </div>

                <h4
                  className={`mb-0 ${valueClass}`}
                  style={
                    !valueClass
                      ? { color: "var(--text-primary)" }
                      : undefined
                  }
                >
                  {value}
                </h4>

                {subValue && (
                  <span className="small text-secondary-soft">
                    {subValue}
                  </span>
                )}
              </div>
            </div>
          </Col>
        )
      )}
    </Row>
  );
}

export default SummaryCard;
