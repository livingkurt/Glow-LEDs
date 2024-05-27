import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../../shared/SharedComponents/CartItem";
import { Helmet } from "react-helmet";
import { decide_warning, determine_total } from "../../utils/helper_functions";

import { GLButton, GLTooltip } from "../../shared/GlowLEDsComponents";
import { API_Products } from "../../utils";
import RelatedProductsSlideshow from "../../shared/GlowLEDsComponents/GLCarousel/RelatedProductsSlideshow";
import { useNavigate, useParams } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const cartPage = useSelector(state => state.carts.cartPage);

  const { my_cart } = cartPage;
  const { cartItems } = my_cart;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const [no_items_in_cart, set_no_items_in_cart] = useState("");

  const checkoutHandler = () => {
    if (cartItems.length === 0) {
      set_no_items_in_cart("Cannot proceed to checkout without any items in cart");
    } else {
      if (current_user.hasOwnProperty("first_name")) {
        navigate("/secure/checkout/placeorder");
      } else {
        navigate("/checkout/placeorder");
      }
    }
  };

  const diminish_stock = async () => {
    const request = await API_Products.update_stock(cartItems);
  };

  const determine_wholesale_proceed = () => {
    return (
      current_user?.isWholesaler &&
      determine_total(cartItems, current_user?.isWholesaler) > current_user?.wholesaler?.minimum_order_amount
    );
  };

  return (
    <div className="">
      <Helmet>
        <title>Cart | Glow LEDs </title>
        <meta property="og:title" content="Cart" />
        <meta name="twitter:title" content="Cart" />
        <link rel="canonical" href="https://www.glow-leds.com/checkout/cart " />
        <meta property="og:url" content="https://www.glow-leds.com/checkout/cart" />
      </Helmet>
      <div className="cart">
        <div className="cart-list">
          <ul className="cart-list-container" style={{ marginRight: "10px" }}>
            <li className="ai-fe">
              <h2>Shopping Cart</h2>
              <div>Price</div>
            </li>
            {cartItems.length === 0 ? (
              <div className="column ai-b">
                <div>Cart is empty</div>
              </div>
            ) : (
              <div>
                {cartItems.map((item, index) => (
                  <CartItem orderItems={cartItems} item={item} index={index} show_qty={true} />
                ))}
              </div>
            )}
          </ul>
        </div>

        <div className="cart-action-container jc-c">
          <div className="cart-action">
            <h3 className="fs-17px">
              Subtotal ( {cartItems?.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${" "}
              {determine_total(cartItems, current_user?.isWholesaler).toFixed(2)}
            </h3>

            {current_user?.isWholesaler ? (
              <GLTooltip
                tooltip={!determine_wholesale_proceed() && "You must meet your minimum order requirment to continue"}
                className="w-100per"
              >
                <GLButton
                  onClick={() => checkoutHandler()}
                  variant={!determine_wholesale_proceed() ? "disabled" : "primary"}
                  className={`w-100per mb-1rem ${determine_wholesale_proceed() ? "bob" : "disabled"}`}
                >
                  Proceed to Checkout
                </GLButton>
              </GLTooltip>
            ) : (
              <GLButton onClick={() => checkoutHandler()} variant="primary" className="w-100per bob">
                Proceed to Checkout
              </GLButton>
            )}
            {current_user?.isAdmin && (
              <GLButton onClick={() => diminish_stock()} variant="primary" className="w-100per bob">
                Dimmish Stock
              </GLButton>
            )}
          </div>
        </div>
      </div>
      <h4 style={{ textAlign: "center" }}>{no_items_in_cart}</h4>

      <RelatedProductsSlideshow
        className=""
        product_pathname={params.pathname}
        title="Accessories You May Need"
        category="batteries"
        add_to_cart={true}
      />
      <RelatedProductsSlideshow
        random={true}
        className=""
        product_pathname={params.pathname}
        title="Suggested Products"
        category="all"
        add_to_cart={true}
      />
    </div>
  );
};

export default CartPage;
