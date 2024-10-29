import React from "react";
import PropTypes from "prop-types";
import { Grow, Paper, Popper as MuiPopper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPopper = styled(MuiPopper)(({ theme }) => ({
  zIndex: 2000,
  fontSize: "16px",
  '&[x-placement*="bottom"] .arrow': {
    top: 0,
    left: 0,
    marginTop: "-0.9em",
    width: "3em",
    height: "1em",
    "&::before": {
      borderWidth: "0 1em 1em 1em",
      borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
    },
  },
  '&[x-placement*="top"] .arrow': {
    bottom: 0,
    left: 0,
    marginBottom: "-0.9em",
    width: "3em",
    height: "1em",
    "&::before": {
      borderWidth: "1em 1em 0 1em",
      borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
    },
  },
  '&[x-placement*="right"] .arrow': {
    left: 0,
    marginLeft: "-0.9em",
    height: "3em",
    width: "1em",
    "&::before": {
      borderWidth: "1em 1em 1em 0",
      borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
    },
  },
  '&[x-placement*="left"] .arrow': {
    right: 0,
    marginRight: "-0.9em",
    height: "3em",
    width: "1em",
    "&::before": {
      borderWidth: "1em 0 1em 1em",
      borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
    },
  },
}));

const StyledPaper = styled(Paper)({
  overflow: "auto",
  fontSize: "16px",
});

const GLPopper = ({
  open,
  anchorEl,
  placement,
  popperClasses,
  paperClasses,
  children,
  boundariesElement,
  flip,
  transition,
}) => {
  return (
    <StyledPopper
      open={open || false}
      anchorEl={anchorEl}
      placement={placement}
      disablePortal={false}
      className={popperClasses}
      transition={transition}
      modifiers={[
        {
          name: "flip",
          enabled: flip,
        },
        {
          name: "preventOverflow",
          enabled: true,
          options: {
            boundariesElement,
          },
        },
      ]}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} timeout={350} style={{ transformOrigin: "0 0 0" }}>
          <StyledPaper className={paperClasses}>{children}</StyledPaper>
        </Grow>
      )}
    </StyledPopper>
  );
};

GLPopper.defaultProps = {
  open: false,
  anchorEl: {},
  placement: "bottom-start",
  popperClasses: "",
  paperClasses: "",
  boundariesElement: "viewport",
  flip: true,
  transition: true,
};

GLPopper.propTypes = {
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  placement: PropTypes.string,
  popperClasses: PropTypes.string,
  paperClasses: PropTypes.string,
  boundariesElement: PropTypes.string,
  flip: PropTypes.bool,
  transition: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default GLPopper;
