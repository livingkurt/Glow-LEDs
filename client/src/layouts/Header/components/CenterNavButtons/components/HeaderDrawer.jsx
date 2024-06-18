import React from "react";
import HeaderDrawerButton from "./HeaderDrawerButton";
import ColumnTitle from "./ColumnTitle";

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
              <ColumnTitle>{item.name.toUpperCase()}</ColumnTitle>
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
