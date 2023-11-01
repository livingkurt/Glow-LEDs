import React from "react";
import Banner from "./components/Banner";
import LeftNavButtons from "./components/LeftNavButtons";
import RightNavButtons from "./components/RightNavButtons";
import SearchBar from "./components/SearchBar";
import CenterNavButtons from "./components/CenterNavButtons/CenterNavButtons";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <header>
      <Banner />
      <Box display="flex" alignItems="center" justifyContent="space-between" className="top-header">
        <LeftNavButtons />
        <CenterNavButtons />
        <RightNavButtons />
      </Box>
      <SearchBar />
    </header>
  );
};

export default Header;
