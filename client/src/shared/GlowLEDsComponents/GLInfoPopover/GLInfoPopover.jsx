import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Info from "@mui/icons-material/Info";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
const GLInfoPopover = ({ details }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleInfoClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `info-popover-${Math.random()}` : undefined;

  return (
    <>
      <IconButton onClick={handleInfoClick} size="large" aria-describedby={id}>
        <Info color="white" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleInfoClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#585858",
              color: "white",
              maxWidth: "300px",
              maxHeight: "200px",
              overflow: "auto",
            },
          },
        }}
      >
        <Typography sx={{ p: 2 }}>{details}</Typography>
      </Popover>
    </>
  );
};

export default GLInfoPopover;
