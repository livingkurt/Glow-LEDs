import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import useWindowDimensions from "../../../shared/Hooks/useWindowDimensions";
import { setSideNavDrawer } from "../../../slices/cartSlice";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";

const LeftNavButtons = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  return (
    <div className="">
      <Link to="/" aria-label="Home Page">
        <Box display="flex" alignItems={"center"}>
          <Box
            component="img"
            sx={{ width: 50, height: 50 }}
            src="/images/optimized_images/logo_images/glow_logo_optimized.png"
            alt="Glow LEDs Logo"
            title="Big Logo"
          />
          <Typography variant="glow_leds" style={{ fontSize: "30px", width: "200px" }}>
            Glow LEDs
          </Typography>
        </Box>
      </Link>
      {width < 960 && (
        <GLButton
          className="side-bar-open p-10px"
          onClick={() => dispatch(setSideNavDrawer(true))}
          aria-label="Sidebar"
          style={{ fontSize: "30px !important" }}
        >
          <div className="box">
            <div className="head-btn not-active">
              <span className="span" />
              <span className="span" />
              <span className="span" />
            </div>
          </div>
        </GLButton>
      )}
    </div>
  );
};

export default LeftNavButtons;
