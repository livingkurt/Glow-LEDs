import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grow, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(theme => ({
  paper: {
    overflow: "auto",
    fontSize: "16px"
  },
  arrow: {},
  popper: {
    zIndex: 2000,
    fontSize: "16px",
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${theme.palette.background.paper} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`
      }
    }
  }
}));

const Popper = ({ open, anchorEl, placement, popperClasses, paperClasses, children, boundariesElement, flip, transition }) => {
  const classes = useStyles();
  return (
    <div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        disablePortal={false}
        className={classNames(classes.popper, popperClasses)}
        transition={transition}
        modifiers={{
          flip: {
            enabled: flip
          },
          preventOverflow: {
            enabled: true,
            boundariesElement
          }
        }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350} style={{ transformOrigin: "0 0 0" }}>
            <Paper className={classNames(classes.paper, paperClasses)}>{children}</Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

Popper.defaultProps = {
  open: false,
  anchorEl: {},
  placement: "bottom-start",
  popperClasses: "",
  paperClasses: "",
  boundariesElement: "viewport",
  flip: true,
  transition: true
};

Popper.propTypes = {
  open: PropTypes.bool,
  anchorEl: PropTypes.object,
  placement: PropTypes.string,
  popperClasses: PropTypes.string,
  paperClasses: PropTypes.string,
  boundariesElement: PropTypes.string,
  flip: PropTypes.bool,
  transition: PropTypes.bool
};

export default Popper;
