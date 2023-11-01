import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../headerHelpers";
import { GLButton } from "../../../../shared/GlowLEDsComponents";
import NavColumn from "./components/NavColumn";
import DrawerItem from "./components/DrawerItem";
import SubDrawerItem from "./components/SubDrawerItem";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSubDrawerColumnId } from "../../../../slices/settingSlice";
import GlowLEDsTextLogo from "./components/GlowLEDsTextLogo";

const CenterNavButtons = () => {
  const dispatch = useDispatch();
  const settingPage = useSelector(state => state.settings);
  const { subDrawerColumnId } = settingPage;

  const updateSubDrawerColumnId = newId => {
    if (subDrawerColumnId === newId) {
      dispatch(setOpenSubDrawerColumnId(null));
      return;
    }
    dispatch(setOpenSubDrawerColumnId(null));
    setTimeout(() => {
      dispatch(setOpenSubDrawerColumnId(newId));
    }, 300);
  };

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
                  <DrawerItem columns={item.columns} updateSubDrawerColumnId={updateSubDrawerColumnId} />
                  <SubDrawerItem columns={item.columns} updateSubDrawerColumnId={updateSubDrawerColumnId} />
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
