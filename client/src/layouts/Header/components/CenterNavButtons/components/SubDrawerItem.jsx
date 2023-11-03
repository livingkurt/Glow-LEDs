import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../../../shared/GlowLEDsComponents";
import DropdownButton from "./DropdownButton";

const SubDrawerItem = ({ columns, show_hide_nested }) => {
  // Create a normalized array
  const normalizedItems = [];

  columns.forEach(column => {
    column.rows.forEach(row => {
      if (row.sideDrawer) {
        row.sideDrawer.drawerItems.forEach((drawerItem, index) => {
          if (drawerItem.subSideDrawer) {
            normalizedItems.push({
              type: "subSideDrawer",
              id: `${drawerItem._id}-drawerItem-${index}`,
              path: drawerItem.path,
              variant: drawerItem.subSideDrawer.variant,
              className: drawerItem.subSideDrawer.className,
              name: drawerItem.name,
              subDrawerItems: drawerItem.subSideDrawer.subDrawerItems,
            });
          }
        });
      }
    });
  });

  return (
    <>
      {normalizedItems.map(item => {
        if (item.type === "subSideDrawer") {
          return (
            <div className="nav-dropdown-nested-content hover_fade_in" id={item.id} key={item.id}>
              <Link to={item.path}>
                <GLButton variant="nav" className="ta-l">
                  {item.name}
                </GLButton>
              </Link>
              <hr className="w-95per m-0px" />
              {item.subDrawerItems.map((subDrawerItem, index) => (
                <DropdownButton key={`${subDrawerItem.id}-${index}`} {...subDrawerItem} from="drawerItem" />
              ))}
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default SubDrawerItem;
