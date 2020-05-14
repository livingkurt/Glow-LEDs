import React from 'react'
import './header.css'
import { Link } from "react-router-dom";
import { Title, ButtonWord } from "../../UtilityComponents/index"
import { FlexContainer } from "../../ContainerComponents/index"
import { useSelector } from 'react-redux';
const Header = (props) => {
  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;
  return (
    <header className="header" id="overlay">
      <div className="brand">
        <Link to="/" ><img className="zoom logo" height="125px" src="/images/Glow_Logo.png" alt="Glow LEDs"></img></Link>
        {/* <Link to="/" ><Title styles={{ fontSize: "67px", margin: 0, textAlign: "center", width: "100%", fontFamily: "logo_font", marginBottom: "10px", marginTop: "17px" }}>G</Title></Link> */}
      </div>

      <FlexContainer styles={{ flexDirection: "column", justifyContent: "center", margin: "auto" }}>
        <Link to="/" ><Title styles={{ fontSize: "67px", margin: 0, textAlign: "center", width: "100%", fontFamily: "logo_font", marginBottom: "10px", marginTop: "17px" }}>Glow LEDs</Title></Link>
        <FlexContainer styles={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Link to="/allproducts"><ButtonWord>All Products</ButtonWord></Link>
          <div className="dropdown-nav">
            <Link to="/category/Diffusers"><ButtonWord>Diffusers</ButtonWord></Link>
            <ul style={{ width: 200 }} className="dropdown-nav-content">
              {/* <Link to="/category/Domes"><ButtonWord>Domes</ButtonWord></Link> */}
              <Link to="/category/Caps"><ButtonWord>Caps</ButtonWord></Link>
              <Link to="/category/Adapters"><ButtonWord>Adapters</ButtonWord></Link>
              {/* <Link to="/category/Large"><ButtonWord>Large</ButtonWord></Link> */}
              {/* <Link to="/category/Experimental"><ButtonWord>Experimental Shapes</ButtonWord></Link> */}
            </ul>
          </div>
          <Link to="/category/Accessories"><ButtonWord>Accessories</ButtonWord></Link>
          {/* <div className="dropdown-nav">
            <Link to="/category/Accessories"><ButtonWord>Accessories</ButtonWord></Link>
            <ul style={{ width: 200 }} className="dropdown-nav-content">
              <Link to="/category/Infinity"><ButtonWord style={{ width: "100%" }}>Infinity Mirrors</ButtonWord></Link>
              <Link to="/category/Accessories"><ButtonWord style={{ width: "100%" }}>Glove Accessories</ButtonWord></Link>
              <Link to="/category/Accessories"><ButtonWord style={{ width: "100%" }}>Other Products</ButtonWord></Link>
            </ul>
          </div> */}
          {/* <Link to="/category/Infinity"><ButtonWord>Infinity LED</ButtonWord></Link> */}
          <Link to="/contact"><ButtonWord>Contact</ButtonWord></Link>
        </FlexContainer>
        {/* <Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} /> */}
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
