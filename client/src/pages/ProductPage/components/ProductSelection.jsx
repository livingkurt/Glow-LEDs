// React
import React from "react";
import "react-tabs/style/react-tabs.css";
import { product_page_sale_price_switch } from "../../../utils/react_helper_functions";
import { ProductFacts } from ".";
import Rating from "../../../shared/GlowLEDsComponents/GLRating/Rating";
import { isWholesaler } from "../../../utils/helpers/user_helpers";
import { useSelector } from "react-redux";

const ProductSelection = ({ product, name, price, sale_price, previous_price, facts }) => {
  const user = useSelector(state => state.userSlice);
  const { current_user } = user;
  return (
    <div>
      <h1 className="product_title_side lh-50px fs-25px mv-0px">{name}</h1>

      <div className="mb-15px mt-n9px">
        <a href="#reviews">
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </a>
      </div>
      <div className="row ai-c mv-20px">
        <h3 className="mv-0px mr-5px">Price: </h3>
        {product_page_sale_price_switch(
          price,
          sale_price,
          previous_price,
          product.sale_start_date,
          product.sale_end_date,
          false,
          "light",
          isWholesaler(current_user)
        )}
      </div>
      <ProductFacts
        facts={facts}
        category={product.category}
        subcategory={product.subcategory}
        pathname={product.pathname}
        name={product.name}
      />
    </div>
  );
};

export default ProductSelection;
