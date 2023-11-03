import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../../../shared/GlowLEDsComponents";
import HeaderDrawerButton from "./HeaderDrawerButton";

const HeaderDrawer = ({ columns }) => {
  // Create a normalized array
  const normalizedItems = [];

  columns.forEach(column => {
    column.rows.forEach(row => {
      if (row.sideDrawer) {
        normalizedItems.push({
          type: "sideDrawer",
          id: row.id,
          path: row.path,
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
            <div className="header-drawer hover_fade_in" id={item.id} key={item.id}>
              <Link to={item.path}>
                <GLButton variant="nav" className="ta-l">
                  {item.name}
                </GLButton>
              </Link>
              <hr className="w-95per m-0px" />
              {item.drawerItems.map((drawerItem, index) => (
                <HeaderDrawerButton key={`${item.id}-${index}`} {...drawerItem} from="headerDrawer" />
              ))}
            </div>
          );
        }

        return null;
      })}
    </>
  );
};

export default HeaderDrawer;
