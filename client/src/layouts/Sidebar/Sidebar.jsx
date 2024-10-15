import React from "react";
import { Drawer, List, useMediaQuery, useTheme } from "@mui/material";
import { sidebarItems } from "../Navbar/navbarHelpers";
import { useDispatch, useSelector } from "react-redux";
import { setSideNavDrawer } from "../../slices/cartSlice";
import SidebarCloseButton from "./components/SidebarCloseButton";
import SidebarItem from "./components/SidebarItem";

const Sidebar = () => {
  const dispatch = useDispatch();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { sideNavDrawer } = cartPage;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleDrawerToggle = () => {
    dispatch(setSideNavDrawer(!sideNavDrawer));
  };

  return (
    <Drawer
      anchor="left"
      open={sideNavDrawer}
      onClose={handleDrawerToggle}
      transitionDuration={{ enter: 500, exit: 400 }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: isMobile ? "100%" : "40rem",
          maxWidth: "100vw",
          backgroundColor: "#333333",
        },
      }}
    >
      <SidebarCloseButton />
      <List>
        {sidebarItems(dispatch).map((item, index) => (
          <SidebarItem key={`${item._id}-${index}`} item={item} level={0} handleDrawerToggle={handleDrawerToggle} />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
