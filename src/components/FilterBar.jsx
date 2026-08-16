import { Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import {
  PiFunnelBold,
  PiMagnifyingGlassBold,
  PiXCircleBold,
} from "react-icons/pi";
import { ALL_CATEGORIES } from "../data/categories";
import GlassSelect from "./GlassSelect";

// Filter options used by the dropdowns.
const TYPE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  ...ALL_CATEGORIES.map((category) => ({
    value: category,
    label: category,
  })),
];

function FilterBar({
  typeFilter,
  categoryFilter,
  searchTerm,
  onTypeChange,
  onCategoryChange,
  onSearchChange,
  onReset,
}) {
  // Used to disable Reset when no filter has been selected.
  const hasActiveFilters =
    typeFilter !== "all" ||
    categoryFilter !== "all" ||
    Boolean(searchTerm);

  const formik = useFormik({
    initialValues: {
      search: searchTerm || "",
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const handleSearchChange = (event) => {
    const value = event.target.value;

    formik.handleChange(event);
    onSearchChange(value);
  };

  const handleReset = () => {
    formik.resetForm({
      values: { search: "" },
    });

    onReset();
  };

  return (
    <div className="glass glass-panel-sm mb-4">
      <div className="d-flex align-items-center gap-2 mb-3 text-secondary-soft fw-semibold">
        <PiFunnelBold size={18} className="gradient-text" />
        Filter Transactions
      </div>

      <Row className="g-3 align-items-end">
        <Col xs={12} md={4}>
          <Form.Label htmlFor="search-filter">Search</Form.Label>

          <div className="search-input-wrap">
            <PiMagnifyingGlassBold
              className="search-input-icon"
              size={16}
            />

            <Form.Control
              id="search-filter"
              name="search"
              className="glass-input"
              placeholder="Search description..."
              value={formik.values.search}
              onChange={handleSearchChange}
            />
          </div>
        </Col>

        <Col xs={12} sm={6} md={3}>
          <Form.Label htmlFor="type-filter">
            Transaction Type
          </Form.Label>

          <GlassSelect
            id="type-filter"
            ariaLabel="Transaction Type"
            value={typeFilter}
            options={TYPE_OPTIONS}
            onChange={onTypeChange}
          />
        </Col>

        <Col xs={12} sm={6} md={3}>
          <Form.Label htmlFor="category-filter">
            Category
          </Form.Label>

          <GlassSelect
            id="category-filter"
            ariaLabel="Category"
            value={categoryFilter}
            options={CATEGORY_OPTIONS}
            onChange={onCategoryChange}
          />
        </Col>

        <Col
          xs={12}
          md={2}
          className="d-flex justify-content-md-end"
        >
          <button
            type="button"
            className="btn-glass-outline d-inline-flex align-items-center gap-2 border-0 w-100 justify-content-center"
            onClick={handleReset}
            disabled={!hasActiveFilters}
          >
            <PiXCircleBold size={18} />
            Reset
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default FilterBar;