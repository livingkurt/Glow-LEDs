import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { determine_link } from "../../utils/helper_functions";
import { LazyImage } from ".";
import { cart_item_name, sale_price_switch } from "../../utils/react_helper_functions";

const CartItem = ({ index, item }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  return (
    <li key={index} className="">
      <div className="cart-image m-auto ai-c">
        <Link to={determine_link(item)}>
          <div className="">
            {!item.secondary_image && (
              <LazyImage
                className="order-image br-10px mr-15px w-100px h-100px"
                alt={item.name}
                title="Product Image"
                effect="blur"
                src={item.display_image && item.display_image}
              />
            )}
            {item.secondary_image && (
              <div
                className={` double-image-cart${
                  item.name && item.name.split("-")[1] === "2 Tone" ? "-vertical" : " row"
                }`}
              >
                <LazyImage
                  id="expandedImg"
                  alt={item.name}
                  title={item.name}
                  className={`details-image-cart-page-${
                    item.name && item.name.split("-")[1] === "2 Tone" ? "top" : "left"
                  } m-0px`}
                  src={item.display_image}
                />
                <LazyImage
                  id="expandedSecondaryImg"
                  alt={item.name}
                  title={item.name}
                  className={`details-image-cart-page-${
                    item.name && item.name.split("-")[1] === "2 Tone" ? "bottom" : "right"
                  } `}
                  src={item.secondary_image}
                />
              </div>
            )}
          </div>
        </Link>
      </div>
      <div className="cart-name">
        <div className="jc-b ai-c mb-20px">
          <Link to={"/collections/all/products/" + item.pathname} className="m-0px">
            <label className="paragraph_font lh-0px mv-0px fs-18px">{item.name}</label>
          </Link>
        </div>
        {cart_item_name(item)}

        <div className="ai-c h-25px  w-100per jc-b mb-10px">
          <label aria-label="Sort" htmlFor="sort" className="select-label mr-1rem">
            Qty:
          </label>
          <label>{item.qty}</label>
          <div className="cart-price fs-16px">
            {sale_price_switch({ product: item, isWholesaler: current_user?.isWholesaler })}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
