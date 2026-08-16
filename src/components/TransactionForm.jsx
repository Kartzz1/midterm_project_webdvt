import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Row } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { PiFloppyDiskBold, PiXBold } from "react-icons/pi";
import { getCategoriesForType } from "../data/categories";
import { todayISO } from "../utils/date";

const schema = yup.object({
  description: yup
    .string()
    .trim()
    .required("Description is required"),

  amount: yup
    .number()
    .typeError("Amount is required")
    .required("Amount is required")
    .moreThan(0, "Amount must be greater than 0"),

  type: yup
    .string()
    .oneOf(["income", "expense"])
    .required("Type is required"),

  category: yup
    .string()
    .required("Category is required"),

  date: yup
    .string()
    .required("Date is required"),

  notes: yup
    .string()
    .notRequired(),
});

const defaultValues = {
  description: "",
  amount: "",
  type: "expense",
  category: "",
  date: todayISO(),
  notes: "",
};

function TransactionForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Save Transaction",
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues || defaultValues,
  });

  const selectedType = useWatch({
    control,
    name: "type",
  });

  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  const categories = useMemo(
    () => getCategoriesForType(selectedType),
    [selectedType]
  );

  // Clear the category when it no longer matches the selected type.
  useEffect(() => {
    if (
      selectedCategory &&
      !categories.includes(selectedCategory)
    ) {
      setValue("category", "");
    }
  }, [selectedCategory, categories, setValue]);

  // Load the transaction values when editing an existing transaction.
  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const submitHandler = (data) => {
    onSubmit({
      ...data,
      amount: Number(data.amount),
    });
  };

  return (
    <Form
      onSubmit={handleSubmit(submitHandler)}
      noValidate
    >
      <Row className="g-4">
        <Col xs={12} md={6}>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>

            <Form.Control
              className="glass-input glass-input-lg"
              placeholder="e.g. Grocery shopping"
              isInvalid={!!errors.description}
              {...register("description")}
            />

            {errors.description && (
              <div className="invalid-feedback-glass">
                {errors.description.message}
              </div>
            )}
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="amount">
            <Form.Label>Amount (₱)</Form.Label>

            <Form.Control
              type="number"
              min="0.01"
              step="0.01"
              className="glass-input glass-input-lg"
              placeholder="0.00"
              isInvalid={!!errors.amount}
              {...register("amount")}
            />

            {errors.amount && (
              <div className="invalid-feedback-glass">
                {errors.amount.message}
              </div>
            )}
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>

            <Form.Select
              className="glass-input glass-input-lg"
              isInvalid={!!errors.type}
              {...register("type")}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Form.Select>

            {errors.type && (
              <div className="invalid-feedback-glass">
                {errors.type.message}
              </div>
            )}
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>

            <Form.Select
              className="glass-input glass-input-lg"
              isInvalid={!!errors.category}
              {...register("category")}
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>

            {errors.category && (
              <div className="invalid-feedback-glass">
                {errors.category.message}
              </div>
            )}
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>

            <Form.Control
              type="date"
              className="glass-input glass-input-lg"
              isInvalid={!!errors.date}
              {...register("date")}
            />

            {errors.date && (
              <div className="invalid-feedback-glass">
                {errors.date.message}
              </div>
            )}
          </Form.Group>
        </Col>

        <Col xs={12}>
          <Form.Group controlId="notes">
            <Form.Label>Notes (optional)</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              className="glass-input glass-input-lg"
              placeholder="Anything else worth remembering?"
              {...register("notes")}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex gap-3 mt-4 flex-wrap">
        <button
          type="submit"
          className="btn-glass-primary btn-glass-primary-lg btn d-inline-flex align-items-center gap-2"
          disabled={isSubmitting}
        >
          <PiFloppyDiskBold size={20} />
          {submitLabel}
        </button>

        {onCancel && (
          <button
            type="button"
            className="btn-glass-outline border-0 d-inline-flex align-items-center gap-2"
            onClick={onCancel}
          >
            <PiXBold size={18} />
            Cancel
          </button>
        )}
      </div>
    </Form>
  );
}

export default TransactionForm;
