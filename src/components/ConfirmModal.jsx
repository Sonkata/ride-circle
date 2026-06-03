function ConfirmModal({
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}) {
  return (
    <div className="modal-backdrop">
      <div className="confirm-modal">
        <h2>{title}</h2>
        <p>{message}</p>

        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>

          <button className="modal-confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;