import { Modal } from "react-bootstrap";
import { PiWarningCircleBold } from "react-icons/pi";

function ConfirmModal({
  show,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal show={show} onHide={onCancel} centered className="glass-modal">
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          <PiWarningCircleBold className="text-danger" size={22} />
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0 text-secondary-soft">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn-glass-outline border-0" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="btn-glass-danger border-0" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
