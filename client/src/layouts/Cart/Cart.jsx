import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { determine_total } from "../../utils/helper_functions";
import { GLButton, GLTooltip } from "../../shared/GlowLEDsComponents";
import { CartItem, RecentlyViewed, TopCategories } from "./components";
import { checkoutHandler, determine_wholesale_proceed } from "./cartHelpers";
import { Drawer, IconButton } from "@mui/material";
import { setCartDrawer } from "../../slices/cartSlice";
import CloseIcon from "@mui/icons-material/Close";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, cartDrawer } = cartPage;
  const { cartItems } = my_cart;

  const contentPage = useSelector(state => state.contents.contentPage);
  const { contents } = contentPage;

  const closeMenu = () => {
    dispatch(setCartDrawer(false));
  };

  const handleCheckout = useCallback(
    () => checkoutHandler(dispatch, navigate, current_user, closeMenu),
    [dispatch, current_user]
  );

  const wholesaleProceed = useCallback(
    () => determine_wholesale_proceed(current_user, cartItems),
    [current_user, cartItems]
  );

  return (
    <Drawer
      anchor="right"
      open={cartDrawer}
      onClose={event => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
          return;
        }
        dispatch(setCartDrawer(false));
      }}
      transitionDuration={{ enter: 700, exit: 700 }}
    >
      <div style={{ backgroundColor: "#333333", height: "100%", color: "white" }}>
        <div
          className={`column jc-b `}
          style={{ minHeight: "100vh", padding: 0, listStyleType: "none", marginRight: "10px", margin: 0 }}
        >
          <div>
            <li
              style={{
                display: "flex",
                paddingBottom: "1rem",
                marginBottom: "1rem",
                borderBottom: "0.1rem #c0c0c0 solid",
              }}
            >
              <div className="p-1rem w-100per">
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

                  <div>
                    <IconButton aria-label="Close" onClick={closeMenu}>
                      <CloseIcon color="white" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </li>
            {cartItems && cartItems.length === 0 ? (
              <div className="p-1rem ta-c w-100per max-w-500px">
                <div className="ta-c w-100per">Cart is Empty</div>
                <RecentlyViewed closeMenu={closeMenu} />
                <TopCategories
                  category_items={contents.length > 0 && contents[0].home_page?.slideshow}
                  closeMenu={closeMenu}
                />
              </div>
            ) : (
              <div
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
          <div
            className="column w-100per add_to_cart ph-1rem br-20px"
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
        </div>
      </div>
    </Drawer>
  );
};

export default Cart;
