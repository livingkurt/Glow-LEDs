import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navItems } from "../../headerHelpers";
import { GLButton } from "../../../../shared/GlowLEDsComponents";
import NavColumn from "./components/NavColumn";
import DrawerItem from "./components/DrawerItem";
import SubDrawerItem from "./components/SubDrawerItem";
import { useDispatch, useSelector } from "react-redux";
import { set_chip_name, set_current_id, set_last_id } from "../../../../slices/settingSlice";
import { update_products_url } from "../../../../utils/helper_functions";
import * as API from "../../../../api";
import GlowLEDsTextLogo from "./components/GlowLEDsTextLogo";

const CenterNavButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settingPage = useSelector(state => state.settings);
  const { last_id, chip_name } = settingPage;

  const chipPage = useSelector(state => state.chips);
  const { chips: chips_list } = chipPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listChips({}));
    }
    return () => (clean = false);
  }, []);

  const show_hide = id => {
    dispatch(set_current_id(id));
    var elems = document.querySelectorAll(".nav-dropdown-subcategory-content");
    [].forEach.call(elems, el => {
      el.classList.remove("show-dropdown");
    });
    const current_menu = document.getElementById(id);
    if (last_id === id) {
      current_menu.classList.remove("show-dropdown");
    } else {
      current_menu.classList.add("show-dropdown");
    }

    dispatch(set_last_id(id));
  };
  const show_hide_nested = id => {
    set_current_id(id);
    var elems = document.querySelectorAll(".nav-dropdown-nested-content");
    [].forEach.call(elems, el => {
      el.classList.remove("show-dropdown-nested");
    });
    const current_menu = document.getElementById(id);

    if (last_id === id) {
      current_menu.classList.remove("show-dropdown-nested");
    } else {
      current_menu.classList.add("show-dropdown-nested");
    }

    dispatch(set_last_id(id));
  };

  const filterHandler = e => {
    const chip_selected = JSON.parse(e.target.value);
    update_products_url(navigate, "", "", chip_selected.name, "", "0", "/collections/all/products");
    dispatch(
      API.listProducts({
        chip: chip_selected._id,
        hidden: false,
      })
    );
    dispatch(set_chip_name({}));
  };

  return (
    <div className="column jc-c mh-auto">
      <GlowLEDsTextLogo />
      <nav className="jc-b nav_bar">
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
                  <NavColumn
                    columns={item.columns}
                    show_hide={show_hide}
                    chip_name={chip_name}
                    filterHandler={filterHandler}
                    chips_list={chips_list}
                  />
                  <DrawerItem columns={item.columns} show_hide_nested={show_hide_nested} />
                  <SubDrawerItem columns={item.columns} show_hide_nested={show_hide_nested} />
                  <NavColumn columns={item.otherColumns} />
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default CenterNavButtons;
