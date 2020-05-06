import React from 'react'
import './header.css'
import { Link } from "react-router-dom";
import { Title, Label, ButtonWord } from "../../UtilityComponents/index"
import { FlexContainer } from "../../ContainerComponents/index"
import { listProducts } from '../../../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';


const Header = (props) => {

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(e.target.id))
  }


  return (
    <header className="header" id="overlay">
      <div className="brand">
        <Link to="/" ><img className="zoom logo" height="100px" src="/images/Glow_Logo.png" alt="Glow LEDs"></img></Link>
      </div>
      <div >
        <FlexContainer styles={{ flexDirection: "column", justifyContent: "center" }}>
          <Link to="/" ><Title styles={{ fontSize: "50px", margin: 0, textAlign: "center", width: "100%" }}>Glow LEDs</Title></Link>
          <FlexContainer styles={{ flexDirection: "row", justifyContent: "space-between", width: "515px" }}>
            <Link to="/allproducts"><ButtonWord>All Products</ButtonWord></Link>
            <Link to="/category/Diffusers"><ButtonWord>Diffusers</ButtonWord></Link>
            <Link to="/category/Accessories"><ButtonWord>Accessories</ButtonWord></Link>
            <Link to="/category/Infinity"><ButtonWord>Infinity LED</ButtonWord></Link>
            {/* <ButtonWord id="Diffusers" on_click_function={submitHandler}>Diffusers</ButtonWord>
            <ButtonWord id="Accessories" on_click_function={submitHandler}>Accessories</ButtonWord>
            <ButtonWord id="Infinity" on_click_function={submitHandler}>Infinity LEDs</ButtonWord> */}
          </FlexContainer>
        </FlexContainer>
      </div>
      <FlexContainer>
        <Link to="/cart"><ButtonWord>Cart</ButtonWord></Link>
        {
          props.userInfo ? <Link to="/profile"><ButtonWord >{props.userInfo.name}</ButtonWord></Link> :
            <Link to="/signin"><ButtonWord>Sign In</ButtonWord></Link>
        }
        {props.userInfo && props.userInfo.isAdmin && (
          <div className="dropdown">
            <a href="#"  ><ButtonWord>Admin</ButtonWord></a>
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
