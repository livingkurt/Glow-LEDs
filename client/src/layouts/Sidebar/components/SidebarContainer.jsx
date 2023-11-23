import React from "react";

const SidebarContainer = ({ children }) => {
  return <nav style={{ backgroundColor: "#333333", color: "white", maxWidth: "40rem" }}>{children}</nav>;
};

export default SidebarContainer;
