//       .~~~~`\~~\
//      ;       ~~ \
//      |           ;
//  ,--------,______|---.
// /          \-----`    \
// `.__________`-_______-'

/* eslint-disable max-lines-per-function */

import PropTypes from "prop-types";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import GLActionModal from "../GLActionModal/GLActionModal";

const StyledStepper = styled(Stepper)(({ theme }) => ({
  flexGrow: 1,
  justifyContent: "space-between",
  maxWidth: "75%",
  marginTop: theme.spacing(3),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const TwoStepModal = ({
  step,
  isOpen,
  onNextStep,
  onConfirm,
  onCancel,
  cancelLabel,
  onPrevious,
  backLabel,
  confirmLabel,
  confirmDisabled,
  nextDisabled,
  confirmLoading,
  nextLabel,
  children,
  title,
  stepLabels,
  dataTest,
  maxWidth,
}) => {
  return (
    <GLActionModal
      isOpen={isOpen}
      dataTest={dataTest}
      onConfirm={() => {
        if (step === 0) {
          onNextStep();
        } else {
          onConfirm();
        }
      }}
      onCancel={() => {
        if (step === 0) {
          onCancel();
        } else {
          onPrevious();
        }
      }}
      confirmLabel={step === 0 ? nextLabel : confirmLabel}
      cancelLabel={step === 0 ? cancelLabel : backLabel}
      confirmDisabled={step === 0 ? nextDisabled : confirmDisabled}
      title={title}
      confirmLoading={step === 1 ? confirmLoading : false}
      maxWidth={maxWidth}
    >
      <>
        <Box display="flex" justifyContent="center">
          <StyledStepper activeStep={step}>
            {stepLabels.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </StyledStepper>
        </Box>
        <StyledDivider />
        {children}
      </>
    </GLActionModal>
  );
};
TwoStepModal.defaultProps = {
  dataTest: "two-step-modal",
  confirmDisabled: false,
  nextDisabled: false,
  confirmLoading: false,
  maxWidth: "md",
  nextLabel: "Next",
  backLabel: "Back",
  cancelLabel: "Cancel",
};

TwoStepModal.propTypes = {
  step: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  dataTest: PropTypes.string,
  children: PropTypes.node.isRequired,
  stepLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  confirmDisabled: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  nextDisabled: PropTypes.bool,
  maxWidth: PropTypes.string,
  nextLabel: PropTypes.string,
  backLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

export default TwoStepModal;
