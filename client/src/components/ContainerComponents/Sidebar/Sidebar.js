import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Title, ButtonWord } from "../../UtilityComponents/index"
import { FlexContainer } from "../index"
import { useSelector } from 'react-redux';

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

  const [sidebar_state, set_sidebar_state] = useState(false)

  const [show_hide_notes_state, set_show_hide_notes_state] = useState({
    name: "Show Notes",
    display: "block"
  })

  const show_hide_notes = () => {
    if (sidebar_state) {
      document.querySelector(".sidebar").classList.remove("open");
      set_sidebar_state(false)
      set_show_hide_notes_state({ ...show_hide_notes_state, name: "Show Notes", display: "none" })

    }
    else {
      document.querySelector(".sidebar").classList.add("open");
      set_sidebar_state(true)
      set_show_hide_notes_state({ ...show_hide_notes_state, name: "Hide Notes", display: "block" })
    }
  }


  return (
    <aside className="mySidebar" id="overlay">
      <div class="w3-sidebar w3-bar-block w3-card w3-animate-left" style="display:none" id="leftMenu">
        <button onclick="closeLeftMenu()" class="w3-bar-item w3-button w3-large">Close &times;</button>
        <a href="#" class="w3-bar-item w3-button">Link 1</a>
        <a href="#" class="w3-bar-item w3-button">Link 2</a>
        <a href="#" class="w3-bar-item w3-button">Link 3</a>
      </div>

      <div class="w3-sidebar w3-bar-block w3-card w3-animate-right" style="display:none;right:0;" id="rightMenu">
        <button onclick="closeRightMenu()" class="w3-bar-item w3-button w3-large">Close &times;</button>
        <a href="#" class="w3-bar-item w3-button">Link 1</a>
        <a href="#" class="w3-bar-item w3-button">Link 2</a>
        <a href="#" class="w3-bar-item w3-button">Link 3</a>
      </div>

      <div class="w3-teal">
        <button class="w3-button w3-teal w3-xlarge w3-left" onclick="openLeftMenu()">&#9776;</button>
        <button class="w3-button w3-teal w3-xlarge w3-right" onclick="openRightMenu()">&#9776;</button>
        <div class="w3-container">
          <h1>My Page</h1>
        </div>
      </div>

      <div class="w3-container">
        <p>In this example, we demonstrate how to use two side navigations.</p>
        <p>We have created two "menu" buttons: one to open the side navigation from the left and one to open it from the right.</p>
      </div>
    </aside >
  );
}

export default Sidebar;

{/* <aside style={header_styles} id="overlay">
<div className="brand" >
  <Link to="/" ><img className="zoom" style={{ marginRight: "130px" }} height="125px" src="/images/Glow_Logo.png" alt="Glow LEDs"></img></Link>
</div>
<FlexContainer column h_center>
  <FlexContainer row h_between class="nav_bar" >
    <Link to="/allproducts"><ButtonWord class="nav_buttons">All Products</ButtonWord></Link>
    <div className="dropdown-nav">
      <Link to="/category/Diffusers"><ButtonWord class="nav_buttons">Diffusers</ButtonWord></Link>
      <ul style={{ width: 200 }} className="dropdown-nav-content">
        <Link to="/category/Caps"><ButtonWord class="nav_buttons">Caps</ButtonWord></Link>
        <Link to="/category/Adapters"><ButtonWord> class="nav_buttons"Adapters</ButtonWord></Link>
      </ul>
    </div>
    <Link to="/category/Accessories"><ButtonWord class="nav_buttons">Accessories</ButtonWord></Link>
    <Link to="/contact"><ButtonWord class="nav_buttons">Contact</ButtonWord></Link>
  </FlexContainer>
</FlexContainer>
<FlexContainer class="nav_bar">
  <Link to="/cart"><ButtonWord class="nav_buttons">Cart <i className="fas fa-shopping-cart"></i> {cartItems.reduce((a, c) => a + c.qty, 0)} </ButtonWord></Link>
  {
    props.userInfo ? <Link to="/profile"><ButtonWord class="nav_buttons">{props.userInfo.name}</ButtonWord></Link> :
      <Link to="/signin"><ButtonWord class="nav_buttons">Sign In</ButtonWord></Link>
  }
  {props.userInfo && props.userInfo.isAdmin && (
    <div className="dropdown">
      <ButtonWord class="nav_buttons">Admin</ButtonWord>
      <ul className="dropdown-content">
        <Link to="/orders"><ButtonWord class="nav_buttons">Orders</ButtonWord></Link>
        <Link to="/products"><ButtonWord class="nav_buttons" > Products</ButtonWord></Link>
      </ul>
    </div>
  )}
</FlexContainer>
</aside > */}
