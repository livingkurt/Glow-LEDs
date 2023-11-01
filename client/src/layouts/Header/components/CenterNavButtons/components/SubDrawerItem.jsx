import { Collapse } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { GLButton } from "../../../../../shared/GlowLEDsComponents";
import DropdownButton from "./DropdownButton";
import { useSelector } from "react-redux";

const SubDrawerItem = ({ columns, updateSubDrawerColumnId }) => {
  const settingPage = useSelector(state => state.settings);
  const { subDrawerColumnId } = settingPage;

  // Create a normalized array
  const normalizedItems = [];

  columns.forEach(column => {
    column.rows.forEach(row => {
      if (row.sideDrawer) {
        row.sideDrawer.drawerItems.forEach((drawerItem, index) => {
          if (drawerItem.subSideDrawer) {
            normalizedItems.push({
              type: "subSideDrawer",
              id: drawerItem.subSideDrawer.id,
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
    <div>
      {normalizedItems.map((item, index) => {
        const shouldDisplay = subDrawerColumnId === item.id;
        return (
          <div style={{ height: shouldDisplay ? "auto" : "0", overflow: "hidden" }} key={item.id}>
            <Collapse orientation="horizontal" in={subDrawerColumnId === item.id}>
              <div className="" id={item.id} style={{ width: 233 }}>
                <Link to={item.path}>
                  <GLButton variant="nav" className="ta-l">
                    {item.name}
                  </GLButton>
                </Link>
                <hr className="w-95per m-0px" />
                {item.subDrawerItems.map((subDrawerItem, index) => (
                  <DropdownButton
                    key={`${subDrawerItem.id}-${index}`}
                    {...subDrawerItem}
                    id={subDrawerItem.id}
                    updateDrawerColumnId={updateSubDrawerColumnId}
                  />
                ))}
              </div>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};

export default SubDrawerItem;
