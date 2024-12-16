import { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import GLPopper from "../../GLPopper/GLPopper";

import GLIconButton from "../../GLIconButton/GLIconButton";
import Info from "@mui/icons-material/Info";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: 0,
}));

const StyledGLIconButton = styled(GLIconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: 0,
  backgroundColor: theme.palette.background.paper,
}));

const StyledList = styled(List)({
  paddingTop: 0,
  paddingBottom: 0,
});

const StyledListItem = styled(ListItem)(({ backgroundColor }) => ({
  backgroundColor,
}));

const StyledListItemText = styled(ListItemText)({
  color: "white",
});

const GLLegend = ({ colors }) => {
  const [open, setOpen] = useState(false);
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
      <Root>
        <StyledGLIconButton
          id="matrixMenuButton"
          color="secondary"
          tooltip="Color Legend"
          ref={anchorRef}
          variant="outlined"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Info />
        </StyledGLIconButton>

        <GLPopper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          disablePortal={false}
          paperClasses={{ root: StyledPaper.toString() }}
          flip
          transition
          boundariesElement="viewport"
        >
          <StyledPaper>
            <Typography variant="h6" sx={{ padding: "8px 16px" }}>
              {"Legend"}
            </Typography>
            <StyledList>
              {colors.map(color => (
                <StyledListItem key={color.name} backgroundColor={color.color}>
                  <StyledListItemText primary={color.name} />
                </StyledListItem>
              ))}
            </StyledList>
          </StyledPaper>
        </GLPopper>
      </Root>
    </ClickAwayListener>
  );
};

export default GLLegend;
