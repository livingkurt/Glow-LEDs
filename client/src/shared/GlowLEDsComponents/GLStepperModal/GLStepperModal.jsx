/* eslint-disable max-lines-per-function */
import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Step, StepLabel, Stepper } from "@mui/material";
import GLActionModal from "../GLActionModal/GLActionModal";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  stepper: {
    // maxWidth: "70%",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  divider: {
    marginTop: "1rem",
  },
});

const GLStepperModal = ({ step, isOpen, children, stepLabels, dataTest, ...otherProps }) => {
  const classes = useStyles();

  return (
    <GLActionModal isOpen={isOpen} dataTest={dataTest} {...otherProps}>
      <>
        <Box display="flex" justifyContent="center">
          <Stepper activeStep={step} className={classes.stepper}>
            {stepLabels.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Divider className={classes.divider} />
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
