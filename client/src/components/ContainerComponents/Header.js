import React from 'react'
import { Link } from "react-router-dom";
import { Title, ButtonWord, ButtonSymbol } from "../UtilityComponents/index"
import { FlexContainer } from "./index"
import { useSelector } from 'react-redux';

const Header = (props) => {

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
    zIndex: "999",
    top: "0"
  }

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  function openLeftMenu() {
    document.getElementById("sidebar").setAttribute("style", "display: flex;")
    // document.querySelector(".sidebar").classList.add("open");

  }


  function openRightMenu() {
    document.getElementById("rightMenu").setAttribute("style", "display: block;")
  }

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }



  return (
    <header style={header_styles} id="overlay">
      <div className="brand" >
        <Link to="/" ><img className="zoom logo" style={{ marginRight: "130px" }} height="125px" src="/images/Glow_Logo.png" alt="Glow LEDs"></img></Link>
        <ButtonSymbol class="mobile_buttons" on_click_function={openMenu} styles={{ display: "none", fontSize: "30px", height: "50px", width: "50px" }}><i class="fas fa-bars"></i></ButtonSymbol>
      </div>
      <FlexContainer column h_center >
        <FlexContainer h_center v_i_center class="logo_text">
          <Link to="/" ><img className="logo_2" style={{ display: "none", height: "80px" }} src="/images/Glow_Logo.png" alt="Glow LEDs"></img></Link>
          <Link to="/" ><Title class="glow_leds_text" styles={{ fontSize: "67px", margin: 0, textAlign: "center", justifyContent: "center", width: "100%", marginBottom: "10px", marginTop: "17px" }}>Glow LEDs</Title></Link>

        </FlexContainer>
        <FlexContainer row h_between class="nav_bar" >
          <Link to="/allproducts"><ButtonWord class="nav_buttons">All Products</ButtonWord></Link>
          <div className="dropdown-nav">
            <Link to="/category/Diffusers"><ButtonWord class="nav_buttons">Diffusers</ButtonWord></Link>
            <ul style={{ width: 200 }} className="dropdown-nav-content">
              <Link to="/category/Caps"><ButtonWord class="nav_buttons">Caps</ButtonWord></Link>
              <Link to="/category/Adapters"><ButtonWord class="nav_buttons"> Adapters</ButtonWord></Link>
            </ul>
          </div>
          <Link to="/category/Accessories"><ButtonWord class="nav_buttons">Accessories</ButtonWord></Link>
          <Link to="/contact"><ButtonWord class="nav_buttons">Contact</ButtonWord></Link>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer class="nav_bar">
        <Link to="/cart"><ButtonWord class="nav_buttons">Cart <i className="fas fa-shopping-cart"></i> {cartItems.reduce((a, c) => a + c.qty, 0)} </ButtonWord></Link>
        {
          props.userInfo
            ?
            <>
              <Link to="/profile"><ButtonWord class="nav_buttons">{props.userInfo.name}</ButtonWord></Link>
              <ButtonSymbol class="mobile_buttons" styles={{ display: "none", fontFamily: "button_font", height: "50px", width: "50px" }}>{props.userInfo.name}</ButtonSymbol>
            </>
            :
            <>
              <Link to="/signin"><ButtonWord class="nav_buttons">Sign In</ButtonWord></Link>
              <ButtonSymbol class="mobile_buttons" styles={{ display: "none", fontFamily: "button_font", height: "50px", width: "50px" }}>Sign In</ButtonSymbol>
            </>
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
    </header >
  );
}

export default Header;
