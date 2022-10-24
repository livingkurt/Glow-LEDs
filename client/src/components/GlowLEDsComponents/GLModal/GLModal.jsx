import React from "react";
import useWindowDimensions from "../../Hooks/windowDimensions";
import GLButton from "../GLButton/GLButton";
import GLCheckbox from "../GLCheckbox/GLCheckbox";
import styles from "./GLModal.module.scss";
import "./GLModal.scss";

const GLModal = ({
  children,
  id,
  show_modal,
  set_show_modal,
  title,
  onAction,
  onConfirm,
  onCancel,
  onEnter,
  actionLabel,
  confirmLabel,
  confirmDisabled,
  confirmLoading,
  cancelLabel,
  dividers,
  actionVariant,
  cancelVariant,
  actionColor,
  cancelColor,
  confirmColor,
  confirmVariant,
  maxWidth,
  fullWidth,
  dataTest,
  dialogClasses,
  titleClasses,
  contentClasses,
  actionClasses,
  cancelDisabled,
  actionDisabled,
  disableEscapeKeyDown,
  onClose,
  showClose,
  ...otherProps
}) => {
  return (
    <div
      id="gl-modal"
      className="modal"
      style={{
        display: show_modal ? "block" : "none"
      }}
    >
      <div className="gl-modal-content">
        <div className="gl-modal-header">
          {showClose && (
            <span className="gl-close" onClick={onClose}>
              &times;
            </span>
          )}
          <h2 id={title}> {title}</h2>
          <hr></hr>
        </div>
        <div className="gl-modal-body">{children}</div>
        <div className="gl-modal-footer">
          {actionLabel ? (
            <div className={styles.actionButton}>
              <GLButton
                dataTest="modal-action-button"
                customClassNames="actionButton"
                onClick={onAction}
                variant={actionVariant}
                color={actionColor}
                disabled={actionDisabled}
                aria-label={actionLabel}
              >
                {actionLabel}
              </GLButton>
            </div>
          ) : (
            <div />
          )}
          <div className={styles.dialogButtons}>
            {cancelLabel && (
              <GLButton
                id="modalCancelButton"
                dataTest="modal-cancel-button"
                customClassNames="cancelButton"
                onClick={onCancel}
                variant={cancelVariant}
                color={cancelColor}
                disabled={cancelDisabled}
                aria-label={cancelLabel}
              >
                {cancelLabel}
              </GLButton>
            )}
            {confirmLabel && (
              <GLButton
                id="modalSubmitButton"
                dataTest="submit"
                customClassNames="submitButton"
                onClick={onConfirm}
                variant={confirmVariant}
                color={confirmColor}
                disabled={confirmDisabled}
                aria-label={confirmLabel}
                loadingOnly={confirmLoading}
                loading={confirmLoading}
              >
                {confirmLabel}
              </GLButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GLModal;
