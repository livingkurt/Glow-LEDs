import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import useWindowDimensions from "../../../shared/Hooks/useWindowDimensions";
import { setSideNavDrawer } from "../../../slices/cartSlice";
import { useDispatch } from "react-redux";

const LeftNavButtons = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  return (
    <div className="menu_button w-233px">
      <Link to="/" aria-label="Home Page">
        <div className="row">
          <div className="logo h-125px w-125px" aria-label="Home Page" role="button">
            <img
              className="zoom logo_s"
              src="/images/optimized_images/logo_images/glow_logo_optimized.png"
              alt="Glow LEDs Logo"
              title="Big Logo"
            />
          </div>
        </div>
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
