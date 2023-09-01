import * as React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../GlowLEDsComponents";
import DropdownButton from "./DropdownButton";

const SubDrawerItem = ({ columns, show_hide_nested }) => (
  <>
    {columns.map((column, columnIndex) => (
      <React.Fragment key={`column-${columnIndex}`}>
        {column.rows.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.sideDrawer && (
              <React.Fragment key={`sideDrawer-${rowIndex}`}>
                {row.sideDrawer.drawerItems.map((drawerItem, drawerItemIndex) => (
                  <React.Fragment key={`drawerItem-${drawerItemIndex}`}>
                    {drawerItem.subSideDrawer && (
                      <div
                        className="nav-dropdown-subcategory-content hover_fade_in"
                        key={`${drawerItem._id}-drawerItem-${drawerItemIndex}`}
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
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    ))}
);

export default SubDrawerItem;
