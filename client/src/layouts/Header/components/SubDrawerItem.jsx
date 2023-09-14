import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import DropdownButton from "./DropdownButton";

const SubDrawerItem = ({ columns, show_hide_nested }) => (
  <>
    {columns.map(column => (
      <>
        {column.rows.map(row => (
          <>
            {row.sideDrawer && (
              <>
                {row.sideDrawer.drawerItems.map((drawerItem, index) => (
                  <>
                    {drawerItem.subSideDrawer && (
                      <div
                        className="nav-dropdown-subcategory-content hover_fade_in"
                        key={`${drawerItem._id}-drawerItem-${index}`}
                        id={drawerItem.id}
                      >
                        <Link to={drawerItem.path}>
                          <GLButton
                            variant={drawerItem.subSideDrawer.variant}
                            className={drawerItem.subSideDrawer.className}
                          >
                            {drawerItem.name}
                          </GLButton>
                        </Link>
                        <hr className="w-95per m-0px" />
                        {drawerItem.subSideDrawer.subDrawerItems.map(subDrawerItem => (
                          <DropdownButton {...subDrawerItem} show_hide={show_hide_nested} />
                        ))}
                      </div>
                    )}
                  </>
                ))}
              </>
            )}
          </>
        ))}
      </>
    ))}
  </>
);

export default SubDrawerItem;
