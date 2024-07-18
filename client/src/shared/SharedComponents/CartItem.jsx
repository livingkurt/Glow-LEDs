import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { LazyImage } from ".";
import { sale_price_switch } from "../../utils/react_helper_functions";
import { determineProductLink } from "../../helpers/sharedHelpers";

const CartItem = ({ index, item }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  return (
    <li key={index} className="">
      <div className="cart-image m-auto ai-c">
        <Link to={determineProductLink(item)}>
          <div className="">
            {!item.secondary_image && (
              <LazyImage
                className="order-image br-10px mr-15px w-100px h-100px"
                alt={item.name}
                title="Product Image"
                effect="blur"
                src={item.display_image?.link}
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
                  src={item.display_image?.link}
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
        <div className="">
          {item.selectedOptions.map((option, index) => (
            <div key={index} className="ai-c mb-20px jc-b w-100per">
              <label className="mv-0px mr-5px">{item.currentOptions[index].name}: </label>
              <div className="ai-c">
                <label className="mv-0px">{option.name}</label>
                {option.colorCode && (
                  <canvas className="ml-5px w-60px h-20px br-7px" style={{ backgroundColor: option.colorCode }} />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="ai-c h-25px  w-100per jc-b mb-10px">
          <label aria-label="Sort" htmlFor="sort" className="select-label mr-1rem">
            Quantity:
          </label>
          <label>{item.quantity}</label>
          <div className="cart-price fs-16px">
            {sale_price_switch({ product: item, isWholesaler: current_user?.isWholesaler })}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
