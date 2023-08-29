import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mobile_check } from "../../../utils/react_helper_functions";
import { API_Content } from "../../../utils";
import { Loading } from "../../SharedComponents";
import { determine_total, shuffle } from "../../../utils/helper_functions";
import { GLButton, GLTooltip } from "../../GlowLEDsComponents";
import { CartItem, RecentlyViewed, TopCategories } from "./components";
import { checkoutHandler, determine_wholesale_proceed, useOutsideAlerter } from "./cartHelpers";
import LoadingInside from "../../SharedComponents/LoadingInside";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category_items, set_category_items] = useState([]);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, dispatch);

  const closeMenu = () => {
    document.querySelector(".cart_sidebar").classList.remove("open");
  };

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      get_display_content();
    }
    return () => (clean = false);
  }, []);

  const get_display_content = async () => {
    const { data } = await API_Content.get_display_content();

    if (data && data[0]) {
      if (data[0].home_page && data[0].home_page.slideshow) {
        set_category_items(shuffle(data[0].home_page.slideshow));
      }
    }
  };

  const cartPage = useSelector(state => state.carts.cartPage);

  const { my_cart, loading } = cartPage;
  const { cartItems } = my_cart;

  const handleCheckout = useCallback(
    () => checkoutHandler(dispatch, navigate, current_user, closeMenu),
    [dispatch, current_user]
  );

  const wholesaleProceed = useCallback(
    () => determine_wholesale_proceed(current_user, cartItems),
    [current_user, cartItems]
  );

  return (
    <aside
      ref={wrapperRef}
      className="cart_sidebar"
      style={{
        top: "-10px",
        zIndex: 4,
        borderRadius: "0px 0px 20px 20px",
        height: mobile_check() ? "100%" : cartItems.length === 0 ? "1000px" : "unset",
      }}
    >
      <ul
        className={`cart_sidebar-list-container w-100per column jc-b ${mobile_check() ? `h-100per` : `h-unset`}`}
        style={{ height: cartItems.length === 0 ? "400px" : "unset" }}
      >
        <div>
          <li className="w-100per pb-5px">
            <div className="p-1rem w-100per">
              <GLButton className="cart_sidebar_close_button" aria-label="Close" onClick={closeMenu}>
                <i className="fas fa-times" />
              </GLButton>
              <div className="jc-b">
                <div className="logo_text ai-c">
                  <Link to="/" aria-label="Home Page">
                    <div className="h-50px w-50px">
                      <img
                        className="zoom logo_s"
                        src="/images/optimized_images/logo_images/glow_logo_optimized.png"
                        alt="Glow LEDs Logo"
                        title="Small Logo"
                      />
                    </div>
                  </Link>
                  <Link to="/" aria-label="Home Page">
                    <div className="row">
                      <label className="ml-5px fs-25px mv-0px title_font">Shopping Cart</label>
                    </div>
                  </Link>
                </div>

                <div className="column jc-fe">
                  <div className="ta-r ">Price</div>
                </div>
              </div>
            </div>
          </li>
          {cartItems && cartItems.length === 0 ? (
            <div className="p-1rem ta-c w-100per">
              <div className="ta-c w-100per">Cart is Empty</div>
              <RecentlyViewed closeMenu={closeMenu} />
              <TopCategories category_items={category_items} closeMenu={closeMenu} />
            </div>
          ) : (
            <div
              className={`${mobile_check() ? `h-90vh` : `h-unset`} mb-175px`}
              style={{
                overflowY: "scroll",
              }}
            >
              {/* <Loading loading={loading} /> */}
              {cartItems &&
                cartItems.map((item, index) => (
                  <CartItem key={index} item={item} index={index} dispatch={dispatch} current_user={current_user} />
                ))}
              <RecentlyViewed closeMenu={closeMenu} />
            </div>
          )}
        </div>
      </ul>

      <div
        className="column w-100per pos-fix add_to_cart ph-1rem br-20px"
        style={{ bottom: cartItems.length === 0 ? "-10px" : "0px" }}
      >
        <label className="fs-17px title_font mv-1rem">
          Subtotal ( {cartItems && cartItems?.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${" "}
          {determine_total(cartItems, current_user?.isWholesaler).toFixed(2)}
        </label>
        <Link to="/checkout/cart" className="w-100per">
          <GLButton variant="secondary" className=" w-100per mb-2rem" onClick={closeMenu} aria-label="Delete">
            View Cart
          </GLButton>
        </Link>
        {current_user?.isWholesaler ? (
          <GLTooltip
            tooltip={!wholesaleProceed() && "You must meet your minimum order requirment to continue"}
            className="w-100per"
          >
            <GLButton
              onClick={handleCheckout}
              variant={!wholesaleProceed() ? "disabled" : "primary"}
              className={`w-100per mb-1rem ${wholesaleProceed() ? "bob" : "disabled"}`}
            >
              Proceed to Checkout
            </GLButton>
          </GLTooltip>
        ) : (
          <GLButton onClick={handleCheckout} variant="primary" className="w-100per bob">
            Proceed to Checkout
          </GLButton>
        )}
      </div>
    </aside>
  );
};

export default Cart;
