import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { setSideNavDrawer } from "../../../slices/cartSlice";
import { useDispatch } from "react-redux";

const SidebarCloseButton = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="h-40px bg-primary ta-c title_font ai-c w-100per">
        <p className="w-100per fs-20px mt-24px" style={{ color: "white" }}>
          {"Find Your Glow"}
        </p>
      </div>
      <div className="ai-c">
        <div className="ai-c">
          <Link to="/" aria-label="Home Page">
            <div className="h-30px w-30px">
              <img
                className="zoom logo_s"
                src="/images/optimized_images/logo_images/glow_logo_optimized.png"
                alt="Glow LEDs Logo"
                title="Small Logo"
              />
            </div>
          </Link>

          <GLButton
            className="sidebar_close_button"
            aria-label="Close"
            onClick={() => dispatch(setSideNavDrawer(false))}
          >
            <div className="box ">
              <div className="side-btn active">
                <span className="span" />
                <span className="span" />
                <span className="span" />
              </div>
            </div>
          </GLButton>
        </div>
        <Link to="/" aria-label="Home Page">
          <label className="fs-20px mv-0px ff-h mr-20px ta-c">{"GL"}</label>
        </Link>
      </div>
    </>
  );
};

export default SidebarCloseButton;
