// React
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { determnine_link } from "../../utils/helper_functions";
import { LazyImage } from ".";
import { cart_item_name, sale_price_switch } from "../../utils/react_helper_functions";
import { removeFromCart } from "../../actions/cartActions";
import { GLButton } from "../GlowLEDsComponents";
import { isAdmin } from "../../utils/helpers/user_helpers";

const CartItem = ({ index, item, check_item_as_manufactured }) => {
  const [loading_checkboxes, set_loading_checkboxes] = useState(true);
  const removeFromCartHandler = product => {
    dispatch(removeFromCart(product));
  };
  const dispatch = useDispatch();

  const userSlice = useSelector(state => state.userSlice);
  const { current_user } = userSlice;

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  return (
    <li key={index} className="">
      <div className="cart-image m-auto ai-c">
        {check_item_as_manufactured && isAdmin(current_user) && (
          <div>
            {loading_checkboxes ? (
              <div>Loading...</div>
            ) : (
              <div className="mv-1rem jc-c mr-2rem">
                <input
                  type="checkbox"
                  name="is_manufactured"
                  defaultChecked={item.is_manufactured}
                  style={{
                    transform: "scale(1.5)"
                  }}
                  className=""
                  id="is_manufactured"
                  onChange={e => {
                    check_item_as_manufactured(index);
                  }}
                />
              </div>
            )}
          </div>
        )}
        <Link to={determnine_link(item)}>
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
              <div className={` double-image-cart${item.name && item.name.split("-")[1] === "2 Tone" ? "-vertical" : " row"}`}>
                <LazyImage
                  id="expandedImg"
                  alt={item.name}
                  title={item.name}
                  className={`details-image-cart-page-${item.name && item.name.split("-")[1] === "2 Tone" ? "top" : "left"} m-0px`}
                  src={item.display_image}
                />
                <LazyImage
                  id="expandedSecondaryImg"
                  alt={item.name}
                  title={item.name}
                  className={`details-image-cart-page-${item.name && item.name.split("-")[1] === "2 Tone" ? "bottom" : "right"} `}
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
          {isAdmin(current_user) && (
            <div className="ai-c">
              <GLButton variant="icon" onClick={() => removeFromCartHandler(item)} aria-label="Delete">
                <i className="fas fa-trash-alt" />
              </GLButton>
            </div>
          )}
        </div>
        {cart_item_name(item)}

        <div className="ai-c h-25px  w-100per jc-b mb-10px">
          <label aria-label="Sort" htmlFor="sort" className="select-label mr-1rem">
            Qty:
          </label>
          <label>{item.qty}</label>
          {/* {show_qty ? (
						<div className="custom-select">
							<select
								defaultValue={parseInt(item.qty)}
								value={parseInt(item.qty)}
								className="qty_select_dropdown"
								onChange={(e) => {
									dispatch(
										addToCart({
											...item,
											pathname: item.pathname,
											qty: parseInt(e.target.value)
										})
									);
								}}
							>
								{[ ...Array(item.quantity).keys() ].map((x, index) => (
									<option key={index} defaultValue={parseInt(x + 1)}>
										{parseInt(x + 1)}
									</option>
								))}
							</select>
							<span className="custom-arrow" />
						</div>
					) : (
						<label>{item.qty}</label>
					)} */}
          <div className="cart-price fs-16px">{sale_price_switch(item)}</div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
