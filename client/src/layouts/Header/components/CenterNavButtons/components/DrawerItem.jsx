import React from "react";
import SingleDrawerItem from "./SingleDrawerItem";
import { useSelector } from "react-redux";

const DrawerItem = ({ columns, updateSubDrawerColumnId }) => {
  const settingPage = useSelector(state => state.settings);
  const { drawerColumnId } = settingPage;
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
    <div>
      {normalizedItems.map((item, index) => {
        if (item.type === "sideDrawer") {
          return (
            <SingleDrawerItem
              key={index}
              item={item}
              drawerColumnId={drawerColumnId}
              columnId={item.id}
              updateSubDrawerColumnId={updateSubDrawerColumnId}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default DrawerItem;
