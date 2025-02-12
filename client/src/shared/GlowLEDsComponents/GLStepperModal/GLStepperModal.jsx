
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import GLActionModal from "../GLActionModal/GLActionModal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

const StyledStepper = styled(Stepper)(({ theme }) => ({
  flexGrow: 1,
  justifyContent: "space-between",
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const GLStepperModal = ({ step, isOpen, children, stepLabels, dataTest, ...otherProps }) => {
  return (
    <GLActionModal isOpen={isOpen} dataTest={dataTest} {...otherProps}>
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

GLStepperModal.defaultProps = {
  dataTest: "stepper-modal",
};

GLStepperModal.propTypes = {
  step: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  dataTest: PropTypes.string,
  children: PropTypes.node.isRequired,
  stepLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GLStepperModal;
