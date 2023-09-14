import React from "react";
import { product_page_sale_price_switch } from "../../../utils/react_helper_functions";
import { ProductFacts } from ".";
import Rating from "../../../shared/GlowLEDsComponents/GLRating/Rating";
import { useSelector } from "react-redux";

const ProductSelection = () => {
  const productsPage = useSelector(state => state.products.productsPage);
  const { product } = productsPage;

  const productPage = useSelector(state => state.products.productPage);
  const { price, wholesale_price, previous_price, sale_price, name, facts } = productPage;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
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
          current_user?.isWholesaler,
          wholesale_price
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
