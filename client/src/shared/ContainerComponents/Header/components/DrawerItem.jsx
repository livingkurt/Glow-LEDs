import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../GlowLEDsComponents";
import DropdownButton from "./DropdownButton";

const DrawerItem = ({ columns, show_hide_nested }) => (
  <>
    {columns.map(column => (
      <>
        {column.rows.map(row => (
          <>
            {row.sideDrawer && (
              <div className="nav-dropdown-subcategory-content hover_fade_in" id={row.id}>
                <Link to={row.path}>
                  <GLButton variant={row.sideDrawer} className={row.sideDrawer.className}>
                    {row.name}
                  </GLButton>
                </Link>
                <hr className="w-95per m-0px" />
                {row.sideDrawer.drawerItems.map(drawerItem => (
                  <DropdownButton {...drawerItem} show_hide={show_hide_nested} />
                ))}
              </div>
            )}
          </>
        ))}
      </>
    ))}
  </>
);

export default DrawerItem;
