import PaymentStep from "./components/PaymentStep";
import { useNavigate, useSearchParams } from "react-router-dom";
import CheckoutSteps from "../../shared/SharedComponents/CheckoutSteps";
import { Helmet } from "react-helmet";
import { LoadingPayments, LoadingShipping } from "../../shared/SharedComponents";
import { OrderSummaryStep, ShippingStep } from "./components";
import { initializePlaceOrderPage, setItemsPrice, setServiceFee, setTotalPrice } from "./placeOrderSlice";

import { Box, Button, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import OrderComplete from "./components/OrderComplete";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { determineItemsTotal } from "../../utils/helper_functions";

import useWindowDimensions from "../../shared/Hooks/useWindowDimensions";

import * as API from "../../api";
import { save_shipping, set_my_cart } from "../../slices/cartSlice";
import { showConfirm, showInfo } from "../../slices/snackbarSlice";
import { constructOutOfStockMessage, getHasPreOrderItems } from "./placeOrderHelpers";

import { isOrderComplete } from "./placeOrderHelpers";
import { validate_login } from "../../utils/validations";
import { GLButton, GLButtonV2 } from "../../shared/GlowLEDsComponents";
import { isMobile } from "react-device-detect";
import { openLoginModal } from "../../slices/userSlice";
import { setEmailValidations, set_is_guest, showHideSteps, nextStep } from "./placeOrderSlice";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping } = cartPage;
  const { cartItems } = my_cart;
  const orderPage = useSelector(state => state.orders.orderPage);
  const { orders } = orderPage;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const placeOrder = useSelector(state => state.placeOrder);
  const {
    show_payment,
    shipping_completed,
    shippingPrice,
    itemsPrice,
    taxPrice,
    tip,
    orderCompleted,
    loadingPayment,
    show_email,
    is_guest,
    email_completed,
    email_validations,
    email,
  } = placeOrder;

  const [searchParams, setSearchParams] = useSearchParams();
  const orderIds = searchParams.get("order_ids")?.split(",") || [];

  const hasPreOrderItems = getHasPreOrderItems(cartItems);

  useEffect(() => {
    if (hasPreOrderItems) {
      dispatch(
        showInfo({ message: "Your order contains pre-order items. Please note the estimated availability date." })
      );
    }
  }, [hasPreOrderItems, dispatch]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listPromos({}));
      dispatch(API.listUsers({}));
    }
    return () => {
      clean = false;
      dispatch(initializePlaceOrderPage());
    };
  }, [dispatch]);

  useEffect(() => {
    let clean = true;

    if (clean) {
      if (orderCompleted) {
        // Check if order is an array
        const newOrderIds = orders?.map(o => o._id).join(",");
        setSearchParams({ order_ids: newOrderIds });
      }
    }
    return () => {
      clean = false;
    };
  }, [orders, orderCompleted, setSearchParams]);
  useEffect(() => {
    let clean = true;

    const removeOutOfStockItems = async outOfStockItems => {
      // Filter the cartItems to exclude out-of-stock items
      const updatedCartItems = cartItems.filter(
        cartItem =>
          !outOfStockItems.some(
            outOfStockItem =>
              cartItem.product === outOfStockItem.id && cartItem.option_product === outOfStockItem.optionId
          )
      );

      // Construct the updated cart object
      const updatedCart = {
        ...my_cart, // Assuming `cart` is the current state of the cart including `_id` and other properties
        cartItems: updatedCartItems,
      };
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      // Save the updated cart
      await dispatch(set_my_cart(updatedCart));
      await dispatch(API.saveCart(updatedCart));
    };

    const fetchData = async () => {
      if (clean && cartItems.length !== 0) {
        const response = await dispatch(API.checkStock(cartItems));
        if (response.payload && response.payload.length !== 0) {
          // Use the new function to construct the message with option details
          const message = constructOutOfStockMessage(response.payload);

          dispatch(
            showConfirm({
              title: "Notice: Out of Stock Items",
              message: message,
              onConfirm: () => {
                removeOutOfStockItems(response.payload);
              },
              onClose: () => navigate("/checkout/cart"),
            })
          );
        }
      }
    };

    fetchData();

    return () => {
      clean = false;
    };
  }, [dispatch, cartItems, navigate, my_cart]);

  useEffect(() => {
    let clean = true;
    const determine_wholesale_proceed = () => {
      return (
        current_user?.isWholesaler &&
        determineItemsTotal(cartItems, current_user?.isWholesaler) > current_user?.wholesaler?.minimum_order_amount
      );
    };

    if (clean) {
      if (current_user?.isWholesaler && !determine_wholesale_proceed()) {
        navigate("/checkout/cart");
      }
      if (current_user && current_user?.hasOwnProperty("first_name")) {
        dispatch(save_shipping({ email: current_user.email }));
      }
    }
    return () => (clean = false);
  }, [cartItems, current_user, dispatch, navigate]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      const shipping_storage = sessionStorage.getItem("shippingAddress");

      if (shipping_storage) {
        dispatch(save_shipping(JSON.parse(shipping_storage)));
      }

      dispatch(setItemsPrice(determineItemsTotal(cartItems, current_user?.isWholesaler)));
    }
    return () => (clean = false);
  }, [cartItems, current_user?.isWholesaler, dispatch]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      // Calculate service fee
      const ticketItems = cartItems.filter(item => item.itemType === "ticket");
      const ticketTotal = ticketItems.reduce((total, item) => total + item.price * item.quantity, 0);
      const serviceFee = ticketTotal * 0.1; // 10% service fee
      dispatch(setServiceFee(serviceFee));

      dispatch(
        setTotalPrice(
          tip === 0 || tip === "" || isNaN(tip)
            ? itemsPrice + shippingPrice + taxPrice + serviceFee
            : itemsPrice + shippingPrice + taxPrice + serviceFee + parseInt(tip)
        )
      );
    }
    return () => (clean = false);
  }, [itemsPrice, taxPrice, tip, shippingPrice, cartItems, dispatch]);

  const submit_logout = e => {
    e.preventDefault();
    navigate("/checkout/place_order");
    dispatch(API.logoutUser());
  };

  const next_step = step => {
    dispatch(nextStep(step));

    if (step === "shipping" && email.length === 0) {
      dispatch(setEmailValidations("Email Field Empty"));
    }

    if (isMobile) {
      const scrollTo = step === "shipping" ? 340 : 560;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  };
  const validate_email = e => {
    const request = validate_login({ email: shipping.email });
    dispatch(setEmailValidations(request.errors.email));
    if (!request.errors.email) {
      next_step("shipping");
      dispatch(setEmailValidations(""));
    }
  };

  if (isOrderComplete({ orderIds, orderCompleted })) {
    return (
      <OrderComplete current_user={current_user} orderIds={orders.length > 0 ? orders.map(o => o._id) : orderIds} />
    );
  }

  return (
    <div>
      <Helmet>
        <title>{"Place Order | Glow LEDs"}</title>
        <meta property="og:title" content="Place Order" />
        <meta name="twitter:title" content="Place Order" />
        <link rel="canonical" href="https://www.glow-leds.com/secure/checkout/place_order" />
        <meta property="og:url" content="https://www.glow-leds.com/secure/checkout/place_order" />
      </Helmet>
      <LoadingPayments loading={loadingPayment} />
      <LoadingShipping />
      <Box>
        <Box wrap pl={2} pr={2}>
          <Button
            aria-label="Back"
            style={{ color: "#fff" }}
            onClick={() => {
              dispatch(
                showConfirm({
                  title: "Confirm Exit",
                  message: "Are you sure you want to exit checkout?",
                  onConfirm: () => {
                    navigate("/checkout/cart");
                    dispatch(initializePlaceOrderPage());
                  },
                })
              );
            }}
            startIcon={<ArrowBack />}
          >
            <div className="mt-3px">{"Back to Shopping"}</div>
          </Button>

          <CheckoutSteps success={orderCompleted} show_payment={show_payment} shipping_completed={shipping_completed} />
        </Box>

        <div className="place_order">
          <div className="w-100per" style={{ flex: width > 400 ? "1 0 34rem" : "unset" }}>
            <div className="place_order-info">
              <div>
                <div className="jc-b mv-10px">
                  <Typography variant="h4">{"1. Email"}</Typography>
                  {email_completed && !show_email && (
                    <GLButtonV2
                      variant="contained"
                      className="mv-10px"
                      color="secondary"
                      onClick={() => dispatch(showHideSteps("email"))}
                    >
                      {"Edit"}
                    </GLButtonV2>
                  )}
                </div>
                {show_email ? (
                  <div className="w-100per mt-10px">
                    {current_user && current_user.hasOwnProperty("first_name") ? (
                      <div>
                        <ul className={`shipping-container mv-0px pv-0px ${width > 400 ? "ph-2rem" : "p-0px"}`}>
                          <li>
                            <pre className={`phrase_font fs-14px mv-0px mt-10px ${width < 400 ? "ta-c" : ""}`}>
                              {"Signed in with "}
                              {current_user.email} {"\n"}
                              {"\n"}
                              {"Not you?"}
                              <GLButton variant="primary" className="title_font m-10px" onClick={e => submit_logout(e)}>
                                {"Logout"}
                              </GLButton>
                            </pre>
                          </li>
                          <li className="mv-0px">
                            <GLButton variant="primary" className="w-100per bob" onClick={() => next_step("shipping")}>
                              {"Continue"}
                            </GLButton>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <ul className={`shipping-container mv-0px pv-0px ${width > 400 ? "ph-2rem" : "p-0px"}`}>
                        <li>
                          <label htmlFor="email">{"Email"}</label>
                          <input
                            type="text"
                            value={shipping.email}
                            name="email"
                            id="email"
                            onChange={e => dispatch(save_shipping({ email: e.target.value.toLowerCase() }))}
                          />
                        </li>
                        <div
                          className="validation_text"
                          style={{
                            justifyContent: "center",
                          }}
                        >
                          {email_validations}
                        </div>
                        <pre className={`phrase_font fs-14px mv-0px mt-10px ${width < 400 ? "ta-c" : ""}`}>
                          {"You'll recieve receipts and notifications at this email address."}
                          {"\n"}
                          {"\n"}
                          {"Already have an account?"}
                          <GLButton
                            variant="primary"
                            className="title_font m-10px"
                            onClick={() => {
                              dispatch(openLoginModal());
                              dispatch(set_is_guest(is_guest ? false : true));
                            }}
                          >
                            {"Login"}
                          </GLButton>
                        </pre>

                        <GLButton variant="primary" className="bob" onClick={e => validate_email(e)}>
                          {"Continue"}
                        </GLButton>
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="wrap jc-b w-100per mt-10px">
                    <div className="paragraph_font lh-25px">
                      <div>{shipping.email.toLowerCase()}</div>
                    </div>
                  </div>
                )}
                {width < 400 && <hr />}
              </div>
              <ShippingStep />
              <PaymentStep />
            </div>
          </div>
          <OrderSummaryStep />
        </div>
      </Box>
    </div>
  );
};

export default PlaceOrderPage;
