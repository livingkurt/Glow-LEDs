import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sale_price_switch, determine_product_name } from "../../utils/react_helper_functions";
import { mobile_check } from "../../utils/react_helper_functions";
import { API_Content } from "../../utils";
import { LazyImage, Loading } from "../SharedComponents";
import { determine_total, humanize, decide_warning, shuffle } from "../../utils/helper_functions";
import { GLButton, GLTooltip } from "../GlowLEDsComponents";
import * as API from "../../api";
import { clear_order_state } from "../../slices/orderSlice";
import { set_success } from "../../slices/cartSlice";
import { isWholesaler } from "../../utils/helpers/user_helpers";

const Cart = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading_products, set_loading_products] = useState(false);
  const [loading_pictures, set_loading_pictures] = useState(false);
  const [category_items, set_category_items] = useState([]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /** Alert if clicked on outside of element */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(set_success(false));
          // alert('You clicked outside of me!');
          document.querySelector(".cart_sidebar").classList.remove("open");
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const closeMenu = () => {
    document.querySelector(".cart_sidebar").classList.remove("open");
  };

  const userSlice = useSelector(state => state.userSlice.userPage);
  const { current_user } = userSlice;

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

  const cartSlice = useSelector(state => state.cartSlice.cartPage);

  const { my_cart } = cartSlice;
  const { cartItems } = my_cart;

  const [no_items_in_cart, set_no_items_in_cart] = useState("");

  const checkoutHandler = () => {
    dispatch(clear_order_state());
    if (decide_warning(props.date_1, props.date_2)) {
      if (cartItems.length === 0) {
        set_no_items_in_cart("Cannot proceed to checkout without any items in cart");
      } else {
        if (current_user.hasOwnProperty("first_name")) {
          history.push("/account/login?redirect=/secure/checkout/placeorder");
        } else {
          history.push("/checkout/placeorder");
        }
      }
      closeMenu();
    }
  };

  const determine_wholesale_proceed = () => {
    return isWholesaler(current_user) && determine_total(cartItems, isWholesaler(current_user)) > current_user.minimum_order_amount;
  };

  const top_categories_grid = () => {
    return (
      <div className="pv-1rem ta-c w-100per">
        <div>
          <label className="fs-20px title_font mv-1rem">Top Categories</label>
        </div>
        <div className="jc-c">
          <div className="wrapper">
            {category_items &&
              category_items.slice(0, 4).map((item, index) => {
                return (
                  <div className={`product jc-c m-auto`} style={{ height: "unset" }} key={index}>
                    {item.label && (
                      <Link to={item.link} onClick={closeMenu} className="column jc-c ta-c">
                        <label className="mt-0px fs-14px title_font mb-10px"> {humanize(item.label)}</label>
                        {item && item.image && (
                          <LazyImage
                            className="br-20px"
                            alt={item.label}
                            title="Product Image"
                            size={{
                              height: `auto`,
                              width: `100%`,
                              objectFit: "cover"
                            }}
                            effect="blur"
                            src={item.image}
                          />
                        )}
                      </Link>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  };

  const recently_viewed_products = JSON.parse(sessionStorage.getItem("recently_viewed"))
    ? JSON.parse(sessionStorage.getItem("recently_viewed")).slice(0, 2)
    : [];

  const recently_viewed_grid = () => {
    if (recently_viewed_products && Array.isArray(recently_viewed_products) && recently_viewed_products.length !== 0) {
      return (
        <div className="p-1rem ta-c w-100per" style={{ border: "0px !important" }}>
          <div className="mv-2rem">
            <label className="title_font fs-20px lh-20px">Recently Viewed Products</label>
          </div>
          <div className="jc-c">
            <div className="jc-c wrap w-100per">
              {recently_viewed_products.map((item, index) => {
                return (
                  <Link to={`/collections/all/products/${item.pathname}`} className="w-100per mb-1rem" key={index}>
                    <li className="ph-1rem w-100per">
                      <div className=" br-5px ai-c">
                        <img src={item.images && item.images[0]} height="50px" width="50px" alt={item.name} title="Product Image" />
                      </div>
                      <div className=" ta-l w-100per">
                        <div className="mb-10px">{item.name}</div>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <aside
      ref={wrapperRef}
      className="cart_sidebar"
      style={{
        top: "-10px",
        zIndex: 4,
        borderRadius: "0px 0px 20px 20px",
        height: mobile_check() ? "100%" : cartItems.length === 0 ? "1000px" : "unset"
      }}
    >
      <Loading loading={loading_products} />
      <Loading loading={loading_pictures} />
      <ul
        className={`cart_sidebar-list-container w-100per column jc-b ${mobile_check() ? `h-100per` : `h-unset`}`}
        style={{ height: cartItems.length === 0 ? "400px" : "unset" }}
        // className={`cart_sidebar-list-container column jc-b w-100per mr-1rem ${mobile_check()
        // 	? `h-90vh`
        // 	: `h-100per`}`}
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
              {recently_viewed_grid()}
              {top_categories_grid()}
            </div>
          ) : (
            <div
              className={`${mobile_check() ? `h-90vh` : `h-unset`} mb-175px`}
              style={{
                overflowY: "scroll"
              }}
            >
              {/* <div className={mobile_check() ? 'h-40vh max-h-65vh' : ''} > */}
              {/* <h4>{no_adapters_warning()}</h4> */}
              {cartItems &&
                cartItems.map((item, index) => (
                  <li key={index} className="ph-1rem">
                    <div className="ai-c">
                      <Link to={"/collections/all/products/" + item.pathname}>
                        <div className="mb-10px">
                          {!item.secondary_image && (
                            <LazyImage src={item.display_image} alt={item.name} className="br-10px w-70px h-70px" title="Product Image" />
                          )}
                          {item.secondary_image && (
                            <div
                              className={` double-image-cart${item.name && item.name.split("-")[1] === "2 Tone" ? "-vertical" : " row"}`}
                            >
                              <LazyImage
                                id="expandedImg"
                                alt={item.name}
                                title={item.name}
                                className={`details-image-cart-${item.name && item.name.split("-")[1] === "2 Tone" ? "top" : "left"} m-0px`}
                                src={item.display_image}
                              />
                              <LazyImage
                                id="expandedSecondaryImg"
                                alt={item.name}
                                title={item.name}
                                className={`details-image-cart-${item.name && item.name.split("-")[1] === "2 Tone" ? "bottom" : "right"} `}
                                src={item.secondary_image}
                              />
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                    <div className="w-100per">
                      <div className="cart_sidebar-name jc-b ai-c">
                        <div className="mb-10px w-100per">
                          <Link to={`/collections/all/products/${item.pathname}`}>{determine_product_name(item, true)}</Link>
                        </div>
                        <div className="mb-10px">
                          <GLButton
                            variant="icon"
                            onClick={() => dispatch(API.deleteCartItem({ item_index: index, type: "add_to_cart" }))}
                            aria-label="Delete"
                          >
                            <i className="fas fa-trash-alt" />
                          </GLButton>
                        </div>
                      </div>

                      <div className="jc-b mb-10px">
                        {/* <div className="custom-select">
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
												</div> */}
                        <label aria-label="Sort" htmlFor="sort" className="select-label mr-1rem">
                          Qty:
                        </label>
                        <label>{item.qty}</label>
                        <div className="cart_sidebar-price fs-16px">
                          {sale_price_switch({
                            product: item,
                            cartItem: true,
                            background: "light",
                            wholesaler: isWholesaler(current_user)
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              {recently_viewed_grid()}
              {/* {cartItems.length === 0 && top_categories_grid()} */}
              {mobile_check() && <li className="h-175px" />}
            </div>
          )}

          {/* {no_items_in_cart && <h4 style={{ textAlign: 'center' }}>{no_items_in_cart}</h4>} */}
        </div>
      </ul>

      <div className="column w-100per pos-fix add_to_cart ph-1rem br-20px" style={{ bottom: cartItems.length === 0 ? "-10px" : "0px" }}>
        <label className="fs-17px title_font mv-1rem">
          Subtotal ( {cartItems && cartItems?.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items ) : ${" "}
          {determine_total(cartItems, isWholesaler(current_user)).toFixed(2)}
        </label>
        <Link to="/checkout/cart" className="w-100per">
          <GLButton variant="secondary" className=" w-100per mb-2rem" onClick={closeMenu} aria-label="Delete">
            View Cart
          </GLButton>
        </Link>
        {isWholesaler(current_user) ? (
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
      </div>
    </aside>
  );
};

export default Cart;
