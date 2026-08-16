import { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import CategoryBreakdown from "../components/CategoryBreakdown";
import MonthlyGoalCard from "../components/MonthlyGoalCard";
import SummaryCard from "../components/SummaryCard";
import ThemeToggle from "../components/ThemeToggle";
import { useMonthlyGoal } from "../hooks/useMonthlyGoal";
import { useTransactions } from "../hooks/useTransactions";

function Summary() {
  const { transactions } = useTransactions();
  const { goal, setGoal } = useMonthlyGoal();

  const { totalExpenses, breakdown, topCategory } = useMemo(() => {
    const expenseTransactions = transactions.filter((t) => t.type === "expense");
    const total = expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

    const totalsByCategory = expenseTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

    const breakdownArr = Object.entries(totalsByCategory)
      .map(([category, catTotal]) => ({
        category,
        total: catTotal,
        percent: total > 0 ? (catTotal / total) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);

    return {
      totalExpenses: total,
      breakdown: breakdownArr,
      topCategory: breakdownArr[0] || null,
    };
  }, [transactions]);

  return (
    <div className="page-container">
      <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
        <div>
          <span className="page-eyebrow">Financial Overview</span>
          <h1 className="page-hero-title">Spending Summary</h1>
          <p className="page-hero-subtitle">
            Understand your spending habits at a glance.
          </p>
        </div>
        <div className="glass glass-panel-sm appearance-pill d-flex align-items-center gap-3 flex-shrink-0">
          <span className="small text-secondary-soft fw-semibold">Appearance</span>
          <ThemeToggle />
        </div>
      </div>

      <SummaryCard
        totalExpenses={totalExpenses}
        topCategory={topCategory}
        categoryCount={breakdown.length}
      />

      <Row className="g-3">
        <Col xs={12} lg={7}>
          <CategoryBreakdown breakdown={breakdown} />
        </Col>
        <Col xs={12} lg={5}>
          <MonthlyGoalCard goal={goal} totalExpenses={totalExpenses} onUpdateGoal={setGoal} />
        </Col>
      </Row>
    </div>
  );
}

export default Summary;
