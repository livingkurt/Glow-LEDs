import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../../../shared/GlowLEDsComponents";
import DropdownButton from "./DropdownButton";

const DrawerItem = ({ columns, show_hide_nested }) => {
  // Create a normalized array
  const normalizedItems = [];

  columns.forEach(column => {
    column.rows.forEach(row => {
      if (row.sideDrawer) {
        normalizedItems.push({
          type: "sideDrawer",
          id: row.id,
          path: row.path,
          variant: row.sideDrawer,
          className: row.sideDrawer.className,
          name: row.name,
          drawerItems: row.sideDrawer.drawerItems,
        });
      }
    });
  });

  return (
    <>
      {normalizedItems.map(item => {
        if (item.type === "sideDrawer") {
          return (
            <div className="nav-dropdown-subcategory-content hover_fade_in" id={item.id} key={item.id}>
              <Link to={item.path}>
                <GLButton variant="nav" className="ta-l">
                  {item.name}
                </GLButton>
              </Link>
              <hr className="w-95per m-0px" />
              {item.drawerItems.map((drawerItem, index) => (
                <DropdownButton key={`${item.id}-${index}`} {...drawerItem} from="drawerItem" />
              ))}
            </div>
          );
        }

        return null;
      })}
    </>
  );
};

export default DrawerItem;
