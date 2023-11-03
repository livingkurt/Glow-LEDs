import React from "react";
import Banner from "./components/Banner";
import LeftNavButtons from "./components/LeftNavButtons";
import RightNavButtons from "./components/RightNavButtons";
import SearchBar from "./components/SearchBar";
import CenterNavButtons from "./components/CenterNavButtons/CenterNavButtons";

const Header = () => {
  return (
    <header>
      <nav aria-label="Main navigation">
        <Banner />
        <div className="header-main">
          <LeftNavButtons />
          <CenterNavButtons />
          <RightNavButtons />
        </div>
        <SearchBar />
      </nav>
    </header>
  );
};

export default Header;
