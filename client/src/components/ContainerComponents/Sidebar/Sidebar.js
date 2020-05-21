import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Title, ButtonWord } from "../../UtilityComponents/index"
import { FlexContainer } from "../index"
import { useSelector } from 'react-redux';
import "./sidebar.css"

const Sidebar = (props) => {

  const header_styles = {
    gridArea: "header",
    backgroundColor: "#333333",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "15px",
    listStyleType: "none",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    position: "fixed",
    right: "0",
    left: "0",
    zIndex: "999"
  }

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }

  return (
    <aside className="sidebar">
      <Title>Shopping Categories</Title>
      <button className="sidebar-close-button" onClick={closeMenu}><i class="fas fa-times"></i></button>
      <FlexContainer column>
        <Link to="/allproducts"><ButtonWord class="sidebar_nav_buttons">All Products</ButtonWord></Link>
        <div className="dropdown-sidebar-nav">
          <ButtonWord class="sidebar_nav_buttons">Diffusers</ButtonWord>
          <ul className="dropdown-sidebar-nav-content">
            <Link to="/category/Diffusers"><ButtonWord class="sidebar_nav_buttons sidebar_nav_dropdown_buttons">Diffusers</ButtonWord></Link>
            <Link to="/category/Caps"><ButtonWord class="sidebar_nav_buttons sidebar_nav_dropdown_buttons">Caps</ButtonWord></Link>
            <Link to="/category/Adapters"><ButtonWord class="sidebar_nav_buttons sidebar_nav_dropdown_buttons"> Adapters</ButtonWord></Link>
          </ul>
        </div>
        <Link to="/category/Accessories"><ButtonWord class="sidebar_nav_buttons">Accessories</ButtonWord></Link>
        <Link to="/contact"><ButtonWord class="sidebar_nav_buttons">Contact</ButtonWord></Link>


      </FlexContainer>
    </aside>

  );
}

export default Sidebar;
