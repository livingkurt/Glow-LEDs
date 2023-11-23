import React from "react";
import { Collapse, List } from "@mui/material";
import SidebarItem from "./SidebarItem";

const NestedItems = ({ item, level, open, handleDrawerToggle, parentId }) => {
  const renderNestedItems = (nestedItems, level) => {
    return nestedItems.map((child, index) => (
      <SidebarItem
        key={`${parentId}-${child._id}-${index}`}
        item={child}
        level={level + 1}
        handleDrawerToggle={handleDrawerToggle}
      />
    ));
  };

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {!item.column && item.columns && renderNestedItems(item.columns, level)}
        {item.column && renderNestedItems(item.column, level)}
        {item.otherColumns && renderNestedItems(item.otherColumns, level)}
        {item.rows && renderNestedItems(item.rows, level)}
        {item.sideDrawer?.drawerItems && renderNestedItems(item.sideDrawer.drawerItems, level)}
        {item.subSideDrawer?.subHeaderDrawers && renderNestedItems(item.subSideDrawer?.subHeaderDrawers, level)}
      </List>
    </Collapse>
  );
};

export default NestedItems;
