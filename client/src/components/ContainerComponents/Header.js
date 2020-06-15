import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import { Title, ButtonWord, ButtonSymbol } from "../UtilityComponents/index"
import { FlexContainer } from "./index"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

const Header = (props) => {

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
    zIndex: "999",
    top: "0"
  }
  const [name, setName] = useState('');
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  // console.log({ "Header": userInfo })
  // if (!userInfo === undefined) {
  //   console.log({ "Header": userInfo })
  //   setName(userInfo.name);
  // }


  useEffect(() => {
    // if (!userInfo === undefined) {
    // console.log({ "Header": userInfo })
    setName(userInfo.name);
    // }
  }, [])

  const cart = useSelector(state => state.cart);
  console.log({ "Header": userInfo })

  const { cartItems } = cart;

  const openMenu = () => {
    const sidebar = document.querySelector(".sidebar")
    console.log(sidebar.classList.value)
    if (sidebar.classList.value === "sidebar open") {
      document.querySelector(".sidebar").classList.remove("open");
    }
    else if (sidebar.classList.value === "sidebar") {
      document.querySelector(".sidebar").classList.add("open");
    }

  }
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  }

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;
  console.log({ "Profile": userUpdate.userInfo })

  useEffect(() => {
    if (userUpdate.userInfo) {
      setName(userUpdate.userInfo.name);
    }

    return () => {

    };
  }, [userUpdate.userInfo])

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
        <FlexContainer row h_between class="nav_bar">
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
      <FlexContainer class="nav_bar" styles={{ width: "270px", justifyContent: "flex-end" }}>
        <Link to="/cart"><ButtonWord class="mobile_nav_buttons cart_text">Cart <i className="fas fa-shopping-cart"></i> {cartItems.reduce((a, c) => a + c.qty, 0)} </ButtonWord></Link>
        <Link to="/cart"><ButtonWord styles={{ display: "none" }} class="mobile_nav_buttons cart_icon"><i className="fas fa-shopping-cart"></i> {cartItems.reduce((a, c) => a + c.qty, 0)} </ButtonWord></Link>
        {
          props.userInfo
            ?
            <>
              <div className="dropdown" >
                <ButtonWord class="nav_buttons" >{name}</ButtonWord>
                <ul className="dropdown-content" style={{ width: "150px" }}>
                  <Link to="/profile"><ButtonWord >Profile</ButtonWord></Link>
                  <Link to="/userorders"><ButtonWord >Orders</ButtonWord></Link>
                  <ButtonWord on_click_function={handleLogout} styles={{ marginRight: "auto" }}> Logout</ButtonWord>
                </ul>
              </div>

            </>
            :
            <>
              <Link to="/login"><ButtonWord class="nav_buttons">Login</ButtonWord></Link>
            </>
        }
        {props.userInfo && props.userInfo.isAdmin && (
          <div className="dropdown nav_buttons">
            <ButtonWord class="mobile_nav_buttons">Admin</ButtonWord>
            <ul className="dropdown-content">
              <Link to="/orders"><ButtonWord >Orders</ButtonWord></Link>
              <Link to="/products"><ButtonWord  > Products</ButtonWord></Link>
            </ul>
          </div>
        )}


      </FlexContainer>
    </header >
  );
}

export default Header;
