import React, { useEffect } from "react";
import Banner from "./components/Banner";
import LeftNavButtons from "./components/LeftNavButtons";
import RightNavButtons from "./components/RightNavButtons";
import SearchBar from "./components/SearchBar";
import CenterNavButtons from "./components/CenterNavButtons/CenterNavButtons";
import { listContents } from "../../api";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(listContents({ active: true }));
    }
    return () => {
      clean = false;
    };
  }, [dispatch]);

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
