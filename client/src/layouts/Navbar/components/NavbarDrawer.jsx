import React from "react";
import NavbarDrawerButton from "./NavbarDrawerButton";
import ColumnTitle from "./ColumnTitle";

const NavbarDrawer = ({ columns }) => {
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
            <div className="navbar-drawer hover_fade_in" id={item.id} key={item.id}>
              <ColumnTitle>{item.name.toUpperCase()}</ColumnTitle>
              <hr className="w-95per m-0px" />
              {item.drawerItems.map((drawerItem, index) => (
                <NavbarDrawerButton key={`${item.id}-${index}`} {...drawerItem} from="navbarDrawer" />
              ))}
            </div>
          );
        }

        return null;
      })}
    </>
  );
};

export default NavbarDrawer;
