import React from 'react'
import './header.css'
import { Link } from "react-router-dom";
import { Title } from "../../UtilityComponents/index"


const Header = (props) => {

  return (
    <header className="header">

      <div className="brand">
        <Link to="/" ><img className="zoom logo" height="100px" src="/images/Glow_Logo.png" alt="Glow LEDs"></img></Link>
      </div>
      <div >
        <Link to="/" ><Title styles={{ fontSize: "50px" }}>Glow LEDs</Title></Link>
      </div>
      <div className="header-links">
        <Link to="/cart">Cart</Link>
        {
          props.userInfo ? <Link to="/profile">{props.userInfo.name}</Link> :
            <Link to="/signin">Sign In</Link>
        }
        {props.userInfo && props.userInfo.isAdmin && (
          <div className="dropdown">
            <a href="#"  >Admin</a>
            <ul className="dropdown-content">
              <Link to="/orders">Orders</Link>
              <Link to="/products">Products</Link>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
