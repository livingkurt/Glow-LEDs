// React
import React from "react";
import { Link } from 'react-router-dom'
// Styles
import './product.css'
// Components
import { Label } from '../../UtilityComponents/index'


function Product(props) {

  return (
    <li key={props.product._id}>
      <div className="product">
        <Link to={'/product/' + props.product._id}>
          <img className="product-image" src={props.product.image} alt="product" />
        </Link>
        <Label styles={{ fontSize: "13px" }}>{props.product.brand}</Label>
        <Link to={'/product/' + props.product._id}><Label styles={{ fontSize: "16px" }}>{props.product.name}</Label></Link>
        {/* <div className="product-name">
          <Link to={'/product/' + props.product._id}>{props.product.name}</Link>
        </div> */}

        <Label className="product-price">${props.product.price}</Label>
        {/* <Label className="product-rating">{props.product.rating} Stars ({props.product.numReiews} Reviews)</Label> */}
      </div>
    </li >
  );
}

export default Product;
