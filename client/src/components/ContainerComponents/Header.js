import React from 'react'
import { Link } from "react-router-dom";
import { Title, ButtonWord } from "../UtilityComponents/index"
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
    zIndex: "999"
  }

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;
  return (
    <header style={header_styles} id="overlay">
      <div className="brand">
        <Link to="/" ><img className="zoom" style={{ marginRight: "130px" }} height="125px" src="/images/Glow_Logo.png" alt="Glow LEDs"></img></Link>
      </div>
      <FlexContainer column h_center>
        <Link to="/" ><Title styles={{ fontSize: "67px", margin: 0, textAlign: "center", width: "100%", marginBottom: "10px", marginTop: "17px" }}>Glow LEDs</Title></Link>
        <FlexContainer row h_between >
          <Link to="/allproducts"><ButtonWord>All Products</ButtonWord></Link>
          <div className="dropdown-nav">
            <Link to="/category/Diffusers"><ButtonWord>Diffusers</ButtonWord></Link>
            <ul style={{ width: 200 }} className="dropdown-nav-content">
              <Link to="/category/Caps"><ButtonWord>Caps</ButtonWord></Link>
              <Link to="/category/Adapters"><ButtonWord>Adapters</ButtonWord></Link>
            </ul>
          </div>
          <Link to="/category/Accessories"><ButtonWord>Accessories</ButtonWord></Link>
          <Link to="/contact"><ButtonWord>Contact</ButtonWord></Link>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer>
        <Link to="/cart"><ButtonWord>Cart <i className="fas fa-shopping-cart"></i> {cartItems.reduce((a, c) => a + c.qty, 0)} </ButtonWord></Link>
        {
          props.userInfo ? <Link to="/profile"><ButtonWord >{props.userInfo.name}</ButtonWord></Link> :
            <Link to="/signin"><ButtonWord>Sign In</ButtonWord></Link>
        }
        {props.userInfo && props.userInfo.isAdmin && (
          <div className="dropdown">
            <ButtonWord>Admin</ButtonWord>
            <ul className="dropdown-content">
              <Link to="/orders"><ButtonWord>Orders</ButtonWord></Link>
              <Link to="/products"><ButtonWord>Products</ButtonWord></Link>
            </ul>
          </div>
        )}
      </FlexContainer>
    </header >
  );
}

export default Header;
