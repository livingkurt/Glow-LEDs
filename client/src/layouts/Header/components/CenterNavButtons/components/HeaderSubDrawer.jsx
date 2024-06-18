import React from "react";
import { Link } from "react-router-dom";
import HeaderDrawerButton from "./HeaderDrawerButton";
import HeaderButton from "./HeaderButton";

const HeaderSubDrawer = ({ columns }) => {
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
              subHeaderDrawers: drawerItem.subSideDrawer.subHeaderDrawers,
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
            <div className="header-subdrawer hover_fade_in" id={item.id} key={item.id}>
              <Link to={item.path}>
                <HeaderButton to={item.path} ariaLabel={item.ariaLabel}>
                  {item.name}
                </HeaderButton>
              </Link>
              <hr className="w-95per m-0px" />
              {item.subHeaderDrawers.map((subHeaderDrawer, index) => (
                <HeaderDrawerButton
                  key={`${subHeaderDrawer.id}-${index}`}
                  {...subHeaderDrawer}
                  from="headerSubDrawer"
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

export default HeaderSubDrawer;
