import PaymentStep from "./components/PaymentStep";
import { useNavigate, useSearchParams } from "react-router-dom";
import CheckoutSteps from "../../shared/SharedComponents/CheckoutSteps";
import { Helmet } from "react-helmet";
import { LoadingPayments, LoadingShipping } from "../../shared/SharedComponents";
import { OrderSummaryStep, ShippingChoice } from "./components";
import {
  initializePlaceOrderPage,
  setItemsPrice,
  setServiceFee,
  setTotalPrice,
  setEmailValidations,
  set_is_guest,
  showHideSteps,
  nextStep,
  set_hide_pay_button,
  set_show_shipping,
  set_shipping_completed,
  setShippingValidation,
  setLoadingShipping,
  setFreeShipping,
  setTaxPrice,
  setModalText,
  openSaveShippingModal,
  closeSaveShippingModal,
  setShippingSaved,
  clearShippingRates,
  activatePromo,
  set_promo_code,
  set_promo_code_validations,
  set_shipping_choice,
  setSplitOrder,
  closeSplitOrderModal,
  openSplitOrderModal,
} from "./placeOrderSlice";

import { Box, Button, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import OrderComplete from "./components/OrderComplete";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { determineItemsTotal } from "../../utils/helper_functions";

import useWindowDimensions from "../../shared/Hooks/useWindowDimensions";

import * as API from "../../api";
import { showConfirm, showInfo } from "../../slices/snackbarSlice";
import { constructOutOfStockMessage, getHasNonPreOrderItems, getHasPreOrderItems } from "./placeOrderHelpers";

import { isOrderComplete } from "./placeOrderHelpers";
import { validate_login } from "../../utils/validations";
import { isMobile } from "react-device-detect";
import { openLoginModal } from "../../slices/userSlice";
import { state_names } from "../../utils/helper_functions";
import { Loading } from "../../shared/SharedComponents";
import { validate_shipping } from "../../utils/validations";
import ReactGoogleAutocomplete from "./components/ReactGoogleAutocomplete";
import { GLAutocomplete } from "../../shared/GlowLEDsComponents";
import GLTooltip from "../../shared/GlowLEDsComponents/GLTooltip/GLTooltip";

import { save_shipping, updateGoogleShipping, set_my_cart } from "../../slices/cartSlice";
import config from "../../config";

import GLActionModal from "../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const all_shipping = API.useGetAllShippingOrdersQuery();
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
    shippingValidations,
    shippingSaved,
    activePromoCodeIndicator,
    promo_code,
    tax_rate,
    order_note,
    production_note,
    totalPrice,
    payment,
    show_shipping,
    shipping_choice,
    show_shipping_complete,
    loadingShipping,
    hide_pay_button,
    showSaveShippingModal,
    modalText,
    showSplitOrderModal,
  } = placeOrder;

  const [searchParams, setSearchParams] = useSearchParams();
  const orderIds = searchParams.get("order_ids")?.split(",") || [];

  const hasPreOrderItems = getHasPreOrderItems(cartItems);
  const hasNonPreOrderItems = getHasNonPreOrderItems(cartItems);

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

  const next_step_shipping = step => {
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
      next_step_shipping("shipping");
      dispatch(setEmailValidations(""));
    }
  };

  const {
    first_name: first_name_validations,
    last_name: last_name_validations,
    address_1: address_validations,
    city: city_validations,
    state: state_validations,
    postal_code: postal_code_validations,
    phone_number: phone_number_validations,
    country: country_validations,
  } = shippingValidations;

  useEffect(() => {
    dispatch(set_hide_pay_button(true));
  }, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (shipping && shipping.first_name && shipping.first_name.length > 1) {
        dispatch(save_shipping(shipping));
      }
    }
    return () => (clean = false);
  }, []);

  const validateShipping = e => {
    e.preventDefault();

    const data = {
      ...shipping,
      email: shipping.email ? shipping.email : current_user.email,
    };

    const request = validate_shipping(data);
    if (Object.keys(request?.errors).length > 0) {
      dispatch(setShippingValidation({ errors: request.errors }));
      return;
    }

    if (request.isValid) {
      const normalizedCurrentUserShipping = normalizeAddress(
        { ...current_user?.shipping, email: current_user?.email } || {}
      );
      const normalizedNewShipping = normalizeAddress(shipping || {});
      if (current_user?.shipping && normalizedCurrentUserShipping !== normalizedNewShipping && !shippingSaved) {
        if (current_user?.shipping) {
          dispatch(setModalText("Your address is different from your saved one. Would you like to update it?"));
        } else {
          dispatch(setModalText("Would you like to save your address for future use?"));
        }
        dispatch(openSaveShippingModal(true)); // Open the modal
        return;
      } else {
        if (hasPreOrderItems && hasNonPreOrderItems) {
          dispatch(openSplitOrderModal());
        } else {
          submitShipping();
        }
      }
    }
  };
  const normalizeAddress = address => {
    return JSON.stringify(address).toLowerCase().replace(/\s/g, "");
  };

  const submitShipping = (splitOrder = false) => {
    dispatch(clearShippingRates());

    if (shipping && Object.keys(shipping).length > 0) {
      dispatch(setLoadingShipping(true));
      const hasItemsWithDimensions = cartItems.some(item => item.dimensions && item.dimensions.package_volume > 0);

      if (!hasItemsWithDimensions) {
        dispatch(setFreeShipping());
        dispatch(set_show_shipping(false));
        dispatch(set_shipping_choice(false));
        dispatch(set_shipping_completed(true));
        dispatch(nextStep("payment"));
      } else {
        if (shipping?.hasOwnProperty("address_1") && shipping.address_1.length > 0 && shipping_completed) {
          get_shipping_rates(splitOrder);
        }
      }
      if (shipping.international) {
        dispatch(setTaxPrice(0));
      } else {
        dispatch(API.getTaxRates({ shipping, itemsPrice }));
      }
    }
    dispatch(set_show_shipping(false));
    dispatch(set_shipping_completed(true));
    isMobile && window.scrollTo({ top: 340, behavior: "smooth" });
    dispatch(setShippingSaved(false));
  };

  const get_shipping_rates = async splitOrder => {
    const order = {
      orderItems: cartItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      current_user,
      tip,
      order_note,
      production_note,
      promo_code: activePromoCodeIndicator && promo_code,
    };

    dispatch(API.shippingRates({ order, splitOrder }));
  };

  const next_step_payment = async step => {
    dispatch(nextStep(step));
    const promo_code_storage = sessionStorage.getItem("promo_code");
    if (promo_code_storage && promo_code_storage.length > 0) {
      dispatch(set_promo_code(promo_code_storage.toUpperCase()));

      const request = await dispatch(
        API.validatePromoCode({ promo_code: promo_code_storage.toUpperCase(), current_user, cartItems, shipping })
      );

      if (request.payload.isValid) {
        dispatch(
          activatePromo({
            cartItems,
            tax_rate,
            activePromoCodeIndicator,
            current_user,
            validPromo: request.payload.promo,
          })
        );
      } else {
        dispatch(set_promo_code_validations(request.payload.errors.promo_code));
        dispatch(set_promo_code(""));
      }
    }

    if (step === "shipping" && shipping.email.length === 0) {
      dispatch(setEmailValidations("Email Field Empty"));
    }

    if (isMobile) {
      const scrollTo = step === "shipping" ? 340 : 560;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  };

  const calculateEstimatedShippingTime = () => {
    const today = new Date();

    if (placeOrder.splitOrder) {
      const inStockItems = cartItems.filter(item => !item.isPreOrder && item.itemType === "product");
      const preOrderItems = cartItems.filter(item => item.isPreOrder && item.itemType === "product");

      const inStockEstimate = Math.max(...inStockItems.map(item => item.processing_time[1]));

      const preOrderReleaseDate = new Date(Math.max(...preOrderItems.map(item => new Date(item.preOrderReleaseDate))));
      const daysUntilRelease = Math.ceil((preOrderReleaseDate - today) / (1000 * 60 * 60 * 24));
      const preOrderEstimate =
        Math.max(0, daysUntilRelease) + Math.max(...preOrderItems.map(item => item.processing_time[1]));

      return {
        inStock: inStockEstimate,
        preOrder: preOrderEstimate,
      };
    } else {
      const maxProcessingTime = Math.max(
        ...cartItems.filter(item => item.itemType === "product").map(item => item.processing_time[1])
      );

      // Only calculate preorder release date if there are preorder items
      const preOrderItems = cartItems.filter(item => item.isPreOrder);
      if (preOrderItems.length === 0) {
        return maxProcessingTime;
      }

      const preOrderReleaseDate = new Date(Math.max(...preOrderItems.map(item => new Date(item.preOrderReleaseDate))));

      const daysUntilRelease = Math.ceil((preOrderReleaseDate - today) / (1000 * 60 * 60 * 24));
      return Math.max(0, daysUntilRelease) + maxProcessingTime;
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
                              <GLButtonV2
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={e => submit_logout(e)}
                              >
                                {"Logout"}
                              </GLButtonV2>
                            </pre>
                          </li>
                          <li className="mv-0px">
                            <GLButtonV2
                              variant="contained"
                              color="primary"
                              fullWidth
                              className="w-100per bob"
                              onClick={() => next_step_shipping("shipping")}
                            >
                              {"Continue"}
                            </GLButtonV2>
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
                          <GLButtonV2
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="title_font m-10px"
                            onClick={() => {
                              dispatch(openLoginModal());
                              dispatch(set_is_guest(is_guest ? false : true));
                            }}
                          >
                            {"Login"}
                          </GLButtonV2>
                        </pre>

                        <GLButtonV2
                          variant="contained"
                          color="primary"
                          fullWidth
                          className="bob"
                          onClick={e => validate_email(e)}
                        >
                          {"Continue"}
                        </GLButtonV2>
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
              <div>
                <div className="jc-b mt-10px">
                  <Typography variant="h4">{"2. Shipping"}</Typography>
                  {shipping_completed && !show_shipping && (
                    <GLButtonV2
                      variant="contained"
                      className="mv-10px"
                      color="secondary"
                      onClick={() => dispatch(showHideSteps("shipping"))}
                    >
                      {"Edit"}
                    </GLButtonV2>
                  )}
                </div>
                {shipping_completed && (
                  <div className="mt-20px">
                    {show_shipping ? (
                      <>
                        <ul className={`shipping-container mv-0px pv-0px ${width > 400 ? "" : "p-0px"}`}>
                          {current_user &&
                            current_user.shipping &&
                            current_user.shipping.hasOwnProperty("first_name") && (
                              <li>
                                <GLButtonV2
                                  onClick={e => dispatch(save_shipping({ ...current_user.shipping }))}
                                  variant="contained"
                                  color="primary"
                                  fullWidth
                                >
                                  {"Use Saved Shipping"}
                                </GLButtonV2>
                              </li>
                            )}
                          {current_user?.isAdmin && (
                            <GLAutocomplete
                              margin="normal"
                              value={shipping}
                              variant="filled"
                              loading={!all_shipping.isLoading}
                              options={all_shipping.isLoading ? [] : all_shipping.data}
                              getOptionLabel={option => (option ? `${option.first_name} ${option.last_name}` : "")}
                              optionDisplay={option => (option ? `${option.first_name} ${option.last_name}` : "")}
                              isOptionEqualToValue={(option, value) => option.uniqueKey === value.uniqueKey}
                              name="product"
                              label="Choose Shipping"
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  const stateShortName = state_names.find(
                                    state => state.long_name === newValue.state || state.short_name === newValue.state
                                  )?.short_name;

                                  dispatch(
                                    save_shipping({
                                      ...newValue,
                                      state: stateShortName,
                                    })
                                  );
                                }
                              }}
                            />
                          )}

                          <li>
                            <div className="jc-b">
                              <div className="mr-5px w-50per">
                                <label htmlFor="first_name">{"First Name"}</label>
                                <input
                                  type="text"
                                  className="w-100per"
                                  value={shipping.first_name}
                                  name="first_name"
                                  id="first_name"
                                  onChange={e =>
                                    dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))
                                  }
                                />

                                <div
                                  className="validation_text"
                                  style={{
                                    justifyContent: "center",
                                  }}
                                >
                                  {first_name_validations}
                                </div>
                              </div>
                              <div className="ml-5px w-50per">
                                <label htmlFor="last_name">{"Last Name"}</label>
                                <input
                                  type="text"
                                  className="w-100per"
                                  value={shipping.last_name}
                                  name="last_name"
                                  id="last_name"
                                  onChange={e =>
                                    dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))
                                  }
                                />
                                <div
                                  className="validation_text"
                                  style={{
                                    justifyContent: "center",
                                  }}
                                >
                                  {last_name_validations}
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <label htmlFor="address_autocomplete">{"Address"}</label>
                            <ReactGoogleAutocomplete
                              apiKey={config.VITE_GOOGLE_PLACES_KEY}
                              className="fs-16px"
                              name="address_1"
                              value={shipping.address_1}
                              options={{
                                types: ["address"],
                              }}
                              onPlaceSelected={place => {
                                let autocompleteElement = document.querySelector("#autocomplete");
                                const street_num = autocompleteElement ? autocompleteElement.value : "";

                                const payload = {
                                  shipping: place,
                                  street_num,
                                };

                                dispatch(updateGoogleShipping(payload));
                              }}
                              onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                            />
                          </li>
                          <div
                            className="validation_text"
                            style={{
                              justifyContent: "center",
                            }}
                          >
                            {address_validations}
                          </div>
                          <li>
                            <label htmlFor="address_2">{"Apt/Suite"}</label>
                            <input
                              type="text"
                              value={shipping.address_2}
                              name="address_2"
                              id="address_2"
                              onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                            />
                          </li>
                          <li>
                            <label htmlFor="city">{"City"}</label>
                            <input
                              type="text"
                              value={shipping.city}
                              name="city"
                              id="city"
                              onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                            />
                          </li>
                          <div
                            className="validation_text"
                            style={{
                              justifyContent: "center",
                            }}
                          >
                            {city_validations}
                          </div>
                          {!shipping.international && (
                            <li>
                              <label className="mb-1rem" htmlFor="state">
                                {"State"}
                              </label>
                              <div className="ai-c h-25px mb-15px jc-c">
                                <div className="custom-select w-100per">
                                  <select
                                    className="qty_select_dropdown w-100per"
                                    onChange={e => dispatch(save_shipping({ ...shipping, state: e.target.value }))}
                                    value={shipping.state}
                                  >
                                    {state_names.map((state, index) => (
                                      <option key={index} value={state.short_name}>
                                        {state.long_name}
                                      </option>
                                    ))}
                                  </select>
                                  <span className="custom-arrow" />
                                </div>
                              </div>
                            </li>
                          )}
                          {shipping.international && (
                            <li>
                              <label htmlFor="state">{"State"}</label>
                              <input
                                type="text"
                                value={shipping.state}
                                name="state"
                                id="state"
                                onChange={e =>
                                  dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))
                                }
                              />
                            </li>
                          )}
                          <div
                            className="validation_text"
                            style={{
                              justifyContent: "center",
                            }}
                          >
                            {state_validations}
                          </div>
                          <li>
                            <label htmlFor="postalCode">{"Postal Code"}</label>
                            <input
                              type="text"
                              value={shipping.postalCode}
                              name="postalCode"
                              id="postalCode"
                              onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                            />
                          </li>
                          <div
                            className="validation_text"
                            style={{
                              justifyContent: "center",
                            }}
                          >
                            {postal_code_validations}
                          </div>
                          <div>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="large"
                                  name="international"
                                  defaultChecked={shipping.international}
                                  onChange={e =>
                                    dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.checked }))
                                  }
                                />
                              }
                              label="International"
                            />
                            {shipping.international && (
                              <>
                                <li>
                                  <label htmlFor="country">{"Country"}</label>
                                  <input
                                    type="text"
                                    value={shipping.country}
                                    name="country"
                                    id="country"
                                    onChange={e =>
                                      dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))
                                    }
                                  />
                                </li>
                                <div
                                  className="validation_text"
                                  style={{
                                    justifyContent: "center",
                                  }}
                                >
                                  {country_validations}
                                </div>
                              </>
                            )}
                            {shipping.international && (
                              <>
                                <li>
                                  <label htmlFor="phone_number">{"Phone Number"}</label>
                                  <input
                                    type="text"
                                    value={shipping.phone_number}
                                    name="phone_number"
                                    id="phone_number"
                                    onChange={e =>
                                      dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))
                                    }
                                  />
                                </li>
                                <div
                                  className="validation_text"
                                  style={{
                                    justifyContent: "center",
                                  }}
                                >
                                  {phone_number_validations}
                                </div>
                              </>
                            )}
                          </div>

                          <li>
                            <GLButtonV2
                              onClick={validateShipping}
                              variant="contained"
                              color="primary"
                              fullWidth
                              className="bob"
                            >
                              {"Continue"}
                            </GLButtonV2>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <div className="wrap jc-b w-100per pos-rel mt-20px">
                        {shipping && shipping.hasOwnProperty("first_name") && (
                          <div className="paragraph_font lh-25px mb-10px">
                            <div>
                              {shipping.first_name} {shipping.last_name}
                            </div>
                            <div>
                              {shipping.address_1} {shipping.address_2}
                            </div>
                            <div>
                              {shipping.city}
                              {", "}
                              {shipping.state} {shipping.postalCode}
                              {", "}
                              {shipping.country}
                            </div>
                            <div>{shipping?.phone_number}</div>
                            <div>{shipping.international && "International"}</div>
                          </div>
                        )}

                        <Loading loading={loadingShipping} />

                        {shipping_choice && (
                          <>
                            <ShippingChoice />
                            {cartItems.some(item => item.processing_time) && (
                              <>
                                {placeOrder.splitOrder ? (
                                  <>
                                    <Typography variant="subtitle2" className="mb-0px mt-0px">
                                      {"Estimated Time to Ship (In-Stock Items): "}
                                      {calculateEstimatedShippingTime().inStock} {"business"}
                                      {"days"}
                                    </Typography>
                                    <Typography variant="subtitle2" className="mb-0px mt-0px">
                                      {"Estimated Time to Ship (Pre-Order Items): "}
                                      {calculateEstimatedShippingTime().preOrder} {"business days"}
                                    </Typography>
                                  </>
                                ) : (
                                  <Typography variant="subtitle2" className="mb-0px mt-0px">
                                    {"Estimated Time to Ship: "}
                                    {calculateEstimatedShippingTime()} {"business days"}
                                  </Typography>
                                )}
                              </>
                            )}
                          </>
                        )}
                        {!show_payment && (
                          <GLTooltip
                            tooltip={
                              !show_shipping_complete &&
                              !hide_pay_button &&
                              "You must select shipping speed before continuing"
                            }
                            className="w-100per"
                          >
                            <GLButtonV2
                              type="submit"
                              variant="contained"
                              disabled={!show_shipping_complete && !hide_pay_button}
                              id="open-modal"
                              className={`${show_shipping_complete && !hide_pay_button ? "bob" : "disabled"} mt-10px w-100per`}
                              onClick={() => {
                                if (show_shipping_complete && !hide_pay_button) {
                                  next_step_payment("payment");
                                }
                              }}
                            >
                              {"Continue"}
                            </GLButtonV2>
                          </GLTooltip>
                        )}
                      </div>
                    )}
                  </div>
                )}
                {width < 400 && <hr />}
                <GLActionModal
                  isOpen={showSaveShippingModal}
                  onConfirm={() => {
                    dispatch(
                      API.saveUser({
                        user: {
                          ...current_user,
                          shipping: {
                            ...shipping,
                            email: current_user.email,
                            country: shipping.international ? shipping.country : "US",
                          },
                        },
                        profile: true,
                      })
                    );
                    dispatch(closeSaveShippingModal(false));
                    if (hasPreOrderItems && hasNonPreOrderItems) {
                      dispatch(openSplitOrderModal());
                    } else {
                      submitShipping();
                    }
                  }}
                  onCancel={() => {
                    submitShipping();
                    dispatch(closeSaveShippingModal(false));
                  }}
                  title="Save Shipping Address"
                  confirmLabel="Save Shipping"
                  confirmColor="primary"
                  cancelLabel="Continue without Saving Shipping"
                  cancelColor="secondary"
                  disableEscapeKeyDown
                >
                  <p>{modalText}</p>
                  <p>
                    <strong>{"Note"}</strong>
                    {": You can change your saved address later from your profile page"}
                  </p>
                </GLActionModal>
                <GLActionModal
                  isOpen={showSplitOrderModal}
                  onConfirm={() => {
                    dispatch(setSplitOrder(true));
                    dispatch(closeSplitOrderModal(false));
                    submitShipping(true);
                  }}
                  onCancel={() => {
                    dispatch(setSplitOrder(false));
                    dispatch(closeSplitOrderModal(false));
                    submitShipping();
                  }}
                  title="Your order contains both pre-order and in-stock items."
                  confirmLabel="Yes, split my order"
                  confirmColor="primary"
                  cancelLabel="No, ship everything together"
                  cancelColor="secondary"
                  disableEscapeKeyDown
                >
                  <p>{"Would you like to receive your in-stock items first and pre-order items later?"}</p>
                  <p>
                    <strong>{"Note"}</strong>
                    {": If you split your order, you must pay for shipping twice."}
                  </p>
                </GLActionModal>
              </div>
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
