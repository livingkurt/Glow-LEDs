import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { Title, ButtonWord } from "../../UtilityComponents/index"
import { FlexContainer } from "../index"
import { useDispatch, useSelector } from 'react-redux';
import "./sidebar.css"
import { logout } from '../../../actions/userActions';

const Sidebar = (props) => {

  const history = useHistory()

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
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    closeMenu()
    history.push("/signin");

  }

  return (
    <aside className="sidebar">
      <Title class="h2_title">Shopping Categories</Title>
      <button className="sidebar-close-button" onClick={closeMenu}><i class="fas fa-times"></i></button>
      <FlexContainer column>
        {
          props.userInfo
            ?
            // <Link to="/profile"><ButtonWord class="sidebar_nav_buttons">{props.userInfo.name}</ButtonWord></Link>
            <div className="dropdown-sidebar-nav">
              <ButtonWord class="sidebar_nav_buttons">{props.userInfo.name}</ButtonWord>
              <ul className="dropdown-sidebar-nav-content">
                <Link to="/profile"><ButtonWord class="sidebar_nav_buttons sidebar_nav_dropdown_buttons" on_click_function={closeMenu}>Profile</ButtonWord></Link>
                <Link to="/userorders"><ButtonWord class="sidebar_nav_buttons sidebar_nav_dropdown_buttons" on_click_function={closeMenu}>Orders</ButtonWord></Link>
                {/* <Link to="/products"><ButtonWord class="sidebar_nav_buttons sidebar_nav_dropdown_buttons">Orders</ButtonWord></Link> */}
                <ButtonWord on_click_function={handleLogout} class="sidebar_nav_buttons sidebar_nav_dropdown_buttons"> Logout</ButtonWord>
              </ul>
            </div>

            :
            <Link to="/signin"><ButtonWord class="sidebar_nav_buttons" on_click_function={closeMenu}>Sign In</ButtonWord></Link>
        }
        {props.userInfo && props.userInfo.isAdmin && (
          <div className="dropdown-sidebar-nav">
            <ButtonWord class="sidebar_nav_buttons">Admin</ButtonWord>
            <ul className="dropdown-sidebar-nav-content">
              <Link to="/orders"><ButtonWord class="sidebar_nav_buttons sidebar_nav_dropdown_buttons" on_click_function={closeMenu}>Orders</ButtonWord></Link>
              <Link to="/products"><ButtonWord class="sidebar_nav_buttons sidebar_nav_dropdown_buttons" on_click_function={closeMenu}>Products</ButtonWord></Link>
            </ul>
          </div>
        )}
        <Link to="/allproducts"><ButtonWord class="sidebar_nav_buttons" on_click_function={closeMenu}>All Products</ButtonWord></Link>
        <div className="dropdown-sidebar-nav">
          <ButtonWord class="sidebar_nav_buttons">Diffusers</ButtonWord>
          <ul className="dropdown-sidebar-nav-content">
            <Link to="/category/Diffusers"><ButtonWord class="sidebar_nav_buttons sidebar_nav_dropdown_buttons" on_click_function={closeMenu}>Diffusers</ButtonWord></Link>
            <Link to="/category/Caps"><ButtonWord class="sidebar_nav_buttons sidebar_nav_dropdown_buttons" on_click_function={closeMenu}>Caps</ButtonWord></Link>
            <Link to="/category/Adapters"><ButtonWord class="sidebar_nav_buttons sidebar_nav_dropdown_buttons" on_click_function={closeMenu}> Adapters</ButtonWord></Link>
          </ul>
        </div>
        <Link to="/category/Accessories"><ButtonWord class="sidebar_nav_buttons" on_click_function={closeMenu}>Accessories</ButtonWord></Link>
        <Link to="/contact"><ButtonWord class="sidebar_nav_buttons" on_click_function={closeMenu}>Contact</ButtonWord></Link>
        {/* {
          props.userInfo
            ?
            <Link to="/profile"><ButtonWord >{props.userInfo.name}</ButtonWord></Link>

            :
            <Link to="/signin"><ButtonWord >Sign In</ButtonWord></Link>
        } */}


      </FlexContainer>
    </aside>

  );
}

export default Sidebar;
