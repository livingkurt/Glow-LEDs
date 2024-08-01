import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../headerHelpers";
import HeaderColumn from "./components/HeaderColumn";
import HeaderDrawer from "./components/HeaderDrawer";
import HeaderSubDrawer from "./components/HeaderSubDrawer";
import { useDispatch } from "react-redux";
import * as API from "../../../../api";
import GlowLEDsTextLogo from "./components/GlowLEDsTextLogo";
import HeaderButton from "./components/HeaderButton";
import { Box } from "@mui/material";

const CenterNavButtons = () => {
  return (
    <Box display="flex">
      {navItems.map(item => (
        <div key={item.name} className="header-center-dropdown-container">
          <HeaderButton to={item.path} ariaLabel={item.ariaLabel}>
            {item.name}
          </HeaderButton>
          {item.columns && (
            <div className="header-center-dropdown hover_fade_in">
              <div className="jc-c">
                <HeaderColumn columns={item.columns} />
                <HeaderDrawer columns={item.columns} />
                <HeaderSubDrawer columns={item.columns} />
                <HeaderColumn columns={item.otherColumns} />
              </div>
            </div>
          )}
        </div>
      ))}
    </Box>
  );
};

export default CenterNavButtons;
