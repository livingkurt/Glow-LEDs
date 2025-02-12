/* eslint-disable max-lines-per-function */

import PropTypes from "prop-types";
import styles from "./GLActionModal.module.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const GLActionModal = ({
  id,
  isOpen,
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
  children,
  maxWidth,
  fullWidth,
  dataTest,
  dialogClasses,
  titleClasses,
  contentClasses,
  actionClasses,
  cancelDisabled,
  style,
  actionDisabled,
  disableEscapeKeyDown,
  backgroundColor,
  textColor,
}) => {
  const combinedStyle = {
    backgroundColor,
    color: textColor,
    ...style,
  };

  return (
    <div data-test={dataTest}>
      <Dialog
        id={id}
        TransitionProps={onEnter}
        classes={dialogClasses}
        open={isOpen}
        onClose={onCancel}
        PaperProps={{
          style: combinedStyle,
        }}
        aria-labelledby={title}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        disableEnforceFocus
        disableEscapeKeyDown={disableEscapeKeyDown}
      >
        {title && (
          <DialogTitle classes={titleClasses} id={title}>
            {title}
          </DialogTitle>
        )}
        <DialogContent classes={contentClasses} dividers={dividers} tabIndex={-1}>
          {children}
        </DialogContent>
        <DialogActions classes={actionClasses}>
          <div className={`${styles.buttonContainer} modalButtonContainer`}>
            {actionLabel && (
              <div className={styles.actionButton}>
                <Button
                  data-test="modal-action-button"
                  onClick={onAction}
                  variant={actionVariant}
                  color={actionColor}
                  disabled={actionDisabled}
                  aria-label={actionLabel}
                >
                  {actionLabel}
                </Button>
              </div>
            )}
            <div className={styles.dialogButtons}>
              {cancelLabel && (
                <Button
                  id="modalCancelButton"
                  data-test="modal-cancel-button"
                  onClick={onCancel}
                  variant={cancelVariant}
                  color={cancelColor}
                  disabled={cancelDisabled}
                  aria-label={cancelLabel}
                >
                  {cancelLabel}
                </Button>
              )}

              {confirmLabel && (
                <Button
                  id="modalSubmitButton"
                  data-test="submit"
                  onClick={onConfirm}
                  variant={confirmVariant}
                  color={confirmColor}
                  disabled={confirmDisabled}
                  aria-label={confirmLabel}
                  loading={confirmLoading ? "true" : undefined}
                >
                  {confirmLabel}
                </Button>
              )}
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

GLActionModal.defaultProps = {
  id: null,
  isOpen: false,
  dividers: true,
  confirmDisabled: false,
  cancelDisabled: false,
  actionDisabled: false,
  confirmLabel: null,
  confirmLoading: false,
  cancelLabel: null,
  actionLabel: null,
  title: null,
  onAction: null,
  onConfirm: null,
  onCancel: null,
  cancelVariant: "contained",
  cancelColor: "primary",
  confirmColor: "primary",
  confirmVariant: "contained",
  actionVariant: "contained",
  actionColor: "primary",
  maxWidth: "md",
  fullWidth: true,
  dataTest: "mui-dialog-container",
  dialogClasses: null,
  titleClasses: null,
  contentClasses: null,
  actionClasses: null,
  onEnter: null,
  disableEscapeKeyDown: false,
  style: null,
  backgroundColor: null,
  textColor: null,
};

GLActionModal.propTypes = {
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  dividers: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
  confirmDisabled: PropTypes.bool,
  cancelDisabled: PropTypes.bool,
  actionDisabled: PropTypes.bool,
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onAction: PropTypes.func,
  onEnter: PropTypes.func,
  actionLabel: PropTypes.string,
  confirmLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  confirmLoading: PropTypes.bool,
  cancelLabel: PropTypes.string,
  actionVariant: PropTypes.string,
  cancelVariant: PropTypes.string,
  actionColor: PropTypes.string,
  cancelColor: PropTypes.string,
  confirmColor: PropTypes.string,
  confirmVariant: PropTypes.string,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  dataTest: PropTypes.string,
  dialogClasses: PropTypes.object,
  titleClasses: PropTypes.object,
  contentClasses: PropTypes.object,
  actionClasses: PropTypes.object,
  style: PropTypes.object,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default GLActionModal;
