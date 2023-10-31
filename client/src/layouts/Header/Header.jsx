import React from "react";
import Banner from "./components/Banner";
import LeftNavButtons from "./components/LeftNavButtons";
import RightNavButtons from "./components/RightNavButtons";
import SearchBar from "./components/SearchBar";
import CenterNavButtons from "./components/CenterNavButtons/CenterNavButtons";

const Header = () => {
  return (
    <div>
      <div>
        <Banner />
        <header>
          <div className="header">
            <LeftNavButtons />
            <CenterNavButtons />
            <RightNavButtons />
          </div>
          <SearchBar />
        </header>
      </div>
    </div>
  );
};

export default Header;
