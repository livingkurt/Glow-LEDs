import React from "react";
import NavbarDrawerButton from "./NavbarDrawerButton";
import ColumnTitle from "./ColumnTitle";

const NavbarSubDrawer = ({ columns }) => {
  // Create a normalized array
  const normalizedItems = [];

  columns.forEach(column => {
    column.rows.forEach(row => {
      if (row.sideDrawer) {
        row.sideDrawer.drawerItems.forEach((drawerItem, index) => {
          if (drawerItem.subSideDrawer) {
            normalizedItems.push({
              type: "subSideDrawer",
              id: drawerItem.id,
              path: drawerItem.path,
              name: drawerItem.name,
              subNavbarDrawers: drawerItem.subSideDrawer.subNavbarDrawers,
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
            <div className="navbar-subdrawer hover_fade_in" id={item.id} key={item.id}>
              <ColumnTitle>{item.name.toUpperCase()}</ColumnTitle>
              <hr className="w-95per m-0px" />
              {item.subNavbarDrawers.map((subNavbarDrawer, index) => (
                <NavbarDrawerButton
                  key={`${subNavbarDrawer.id}-${index}`}
                  {...subNavbarDrawer}
                  from="navbarSubDrawer"
                />
              ))}
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default NavbarSubDrawer;
