import React, { useState, useEffect } from 'react'
import './header.css'
import { Link } from "react-router-dom";
import { Title, Label, ButtonWord } from "../../UtilityComponents/index"
import { FlexContainer } from "../../ContainerComponents/index"
import { Search } from "../../SpecialtyComponents/index"
import { listProducts } from '../../../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";


const Header = (props) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  // const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector(state => state.productList);
  const history = useHistory()
  // const params = useParams()
  const dispatch = useDispatch();
  // const search_key = history.location.search
  // setSearchKeyword(params.id)
  // console.log(search_key.slice(3))
  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const submitHandler = (e) => {
    e.preventDefault();
    // history.push("/allproducts/" + searchKeyword);
    dispatch(listProducts("", searchKeyword, ""))
  }



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
          <Link to="/category/Diffusers"><ButtonWord>Diffusers</ButtonWord></Link>
          <Link to="/category/Accessories"><ButtonWord>Accessories</ButtonWord></Link>
          <Link to="/category/Infinity"><ButtonWord>Infinity LED</ButtonWord></Link>
          <Link to="/contact"><ButtonWord>Contact</ButtonWord></Link>
        </FlexContainer>
        {/* <Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} /> */}
      </FlexContainer>
      <FlexContainer styles={{ marginTop: "18px" }}>
        <Link to="/cart"><ButtonWord>Cart <i class="fas fa-shopping-cart"></i> {cartItems.reduce((a, c) => a + c.qty, 0)} </ButtonWord></Link>
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
