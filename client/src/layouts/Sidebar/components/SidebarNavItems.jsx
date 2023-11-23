import React from "react";
import SidebarNavItem from "./SidebarNavItem";
import { sidebarItems } from "../../Header/headerHelpers";
import { useDispatch } from "react-redux";

const SidebarNavItems = ({ closeMenu }) => {
  const dispatch = useDispatch();
  return (
    <div aria-label="Sidebar naviation">
      {sidebarItems(dispatch).map(item => (
        <SidebarNavItem key={item._id} item={item} closeMenu={closeMenu} />
      ))}
    </div>
  );
};

export default SidebarNavItems;
