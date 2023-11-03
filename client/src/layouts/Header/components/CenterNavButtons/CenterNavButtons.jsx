import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../headerHelpers";
import { GLButton } from "../../../../shared/GlowLEDsComponents";
import NavColumn from "./components/NavColumn";
import DrawerItem from "./components/DrawerItem";
import SubDrawerItem from "./components/SubDrawerItem";
import { useDispatch } from "react-redux";
import * as API from "../../../../api";
import GlowLEDsTextLogo from "./components/GlowLEDsTextLogo";

const CenterNavButtons = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listChips());
    }
    return () => (clean = false);
  }, [dispatch]);

  return (
    <div className="column jc-c mh-auto">
      <GlowLEDsTextLogo />
      <div className="jc-b nav_bar">
        {navItems.map(item => (
          <div key={item.name} className="dropdown-nav">
            <Link to={item.path} aria-label={item.ariaLabel}>
              <GLButton variant="nav" className="title_font fs-17px" data-testid={item.dataTestId}>
                {item.name}
              </GLButton>
            </Link>
            {item.columns && (
              <div className="hover_fade_in nav-dropdown">
                <div className="jc-c">
                  <NavColumn columns={item.columns} />
                  <DrawerItem columns={item.columns} />
                  <SubDrawerItem columns={item.columns} />
                  <NavColumn columns={item.otherColumns} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CenterNavButtons;
