/* eslint-disable react/function-component-definition */
/* eslint-disable max-lines-per-function */
import { useRef, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { makeStyles } from "@mui/styles";
import GLPopper from "../../GLPopper/GLPopper";
import { Paper, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Info } from "@mui/icons-material";
import GLIconButton from "../../GLIconButton/GLIconButton";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: 0,
  },
  icon: {
    marginLeft: theme.spacing,
  },
  popper: {
    zIndex: 1500,
  },
  paper: {
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
  listItemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const GLLegend = ({ colors }) => {
  const [open, setOpen] = useState(null);
  const classes = useStyles();

  const anchorRef = useRef(null);

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => {
        if (open) {
          setOpen(false);
        }
      }}
    >
      <div>
        <GLIconButton
          id="matrixMenuButton"
          color="secondary"
          tooltip="Color Legend"
          ref={anchorRef}
          variant="outlined"
          className={classes.filterButton}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Info />
        </GLIconButton>

        <GLPopper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          disablePortal={false}
          paperClasses={classes.mainMenu}
          flip
          transition
          boundariesElement="viewport"
        >
          <Paper className={classes.paper}>
            <Typography variant="h6" style={{ padding: "8px 16px" }}>
              Legend
            </Typography>
            <List className={classes.list}>
              {colors.map(color => (
                <ListItem key={color.name} style={{ backgroundColor: color.color }}>
                  <ListItemText primary={color.name} style={{ color: "white" }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </GLPopper>
      </div>
    </ClickAwayListener>
  );
};

export default GLLegend;
