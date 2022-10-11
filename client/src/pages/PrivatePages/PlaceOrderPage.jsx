import { OrderSummary } from "./../../components/SpecialtyComponents/PlaceOrderPageComponents/OrderSummary";
import { Payment } from "./../../components/SpecialtyComponents/PlaceOrderPageComponents/Payment";
import { Shipping } from "./../../components/SpecialtyComponents/PlaceOrderPageComponents/Shipping";
import { Email } from "./../../components/SpecialtyComponents/PlaceOrderPageComponents/Email";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createPayOrder, createOrder, createOrderGuest, createPayOrderGuest } from "../../actions/orderActions";
import { CartItem, CheckoutSteps, Stripe } from "../../components/SpecialtyComponents";
import { Helmet } from "react-helmet";
import { removeFromCart, saveShipping, savePayment } from "../../actions/cartActions";
import { listPromos } from "../../actions/promoActions";
import { Loading, LoadingPayments, LoadingShipping } from "../../components/UtilityComponents";
import { validate_login, validate_passwords, validate_promo_code, validate_shipping } from "../../utils/validations";
import { Carousel } from "../../components/SpecialtyComponents";
import { listUsers, login, logout, update } from "../../actions/userActions";
import { API_External, API_Products, API_Promos, API_Shipping } from "../../utils";
import { ShippingChoice, ShippingSpeed } from "../../components/SpecialtyComponents/ShippingComponents";
import Autocomplete from "react-google-autocomplete";
import { determine_total, prnt, state_names } from "../../utils/helper_functions";
import { check_authentication } from "../../utils/react_helper_functions";
import useWindowDimensions from "../../components/Hooks/windowDimensions";
import { userWindowDimensions } from "../../components/Hooks";
import { isMobile } from "react-device-detect";
// import { Shipping } from '../../components/SpecialtyComponents/PlaceOrderPageComponents';

const PlaceOrderPage = props => {
  // const promo_code_ref = useRef(null);
  // const order_note_ref = useRef(null);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo, loading: user_loading, success: user_success } = userLogin;
  console.log({ user_loading });
  const cart = useSelector(state => state.cart);
  const { cartItems, shipping, payment } = cart;
  const orderCreate = useSelector(state => state.orderCreate);
  const { order, error: error_order } = orderCreate;

  const orderPay = useSelector(state => state.orderPay);
  const { success: successPay, error: error_pay } = orderPay;

  const userList = useSelector(state => state.userList);
  const { users } = userList;

  const promoList = useSelector(state => state.promoList);
  const { promos } = promoList;
  const items_price = determine_total(cartItems);

  const [shipping_rates, set_shipping_rates] = useState({});
  const [current_shipping_speed, set_current_shipping_speed] = useState("");
  const [handling_costs, set_handling_costs] = useState((5 / 60) * 20);
  const [packaging_cost, set_packaging_cost] = useState(0);
  const [shipment_id, set_shipment_id] = useState("");
  const [shipping_rate, set_shipping_rate] = useState({});
  const [hide_pay_button, set_hide_pay_button] = useState(true);
  const [parcel, set_parcel] = useState("");
  const [paymentMethod, set_paymentMethod] = useState("stripe");
  const [create_account, set_create_account] = useState(false);

  const [show_email, set_show_email] = useState(true);
  const [show_shipping, set_show_shipping] = useState(false);
  const [show_payment, set_show_payment] = useState(false);
  const [show_review, set_show_review] = useState(false);

  const [is_guest, set_is_guest] = useState(true);

  const [email_completed, set_email_completed] = useState(false);
  const [shipping_completed, set_shipping_completed] = useState(false);
  const [payment_completed, set_payment_completed] = useState(false);
  const [password, set_password] = useState("");
  const [new_password, set_new_password] = useState("");

  const [email_validations, setEmailValidations] = useState("");
  const [password_validations, setPasswordValidations] = useState("");
  const [loading_login, set_loading_login] = useState(false);

  const [shippingPrice, setShippingPrice] = useState(0);
  const [previousShippingPrice, setPreviousShippingPrice] = useState(0);
  const [promo_code, set_promo_code] = useState("");
  const [loading_payment, set_loading_payment] = useState(false);
  const [itemsPrice, setItemsPrice] = useState(items_price);
  const [tax_rate, set_tax_rate] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [show_message, set_show_message] = useState("");
  const [user, set_user] = useState(userInfo);
  const [free_shipping_message, set_free_shipping_message] = useState("------");
  const [loading, set_loading] = useState(false);
  const [show_promo_code, set_show_promo_code] = useState(false);
  const [show_promo_code_input_box, set_show_promo_code_input_box] = useState(true);
  const [tip, set_tip] = useState(0);
  const [verify_shipping, set_verify_shipping] = useState(true);
  const [error_happened, set_error_happened] = useState(false);
  const [error, set_error] = useState();
  const [error_shipping, set_error_shipping] = useState();

  const [no_user, set_no_user] = useState(false);
  const [paid, set_paid] = useState(false);

  const [loading_checkboxes, set_loading_checkboxes] = useState(true);
  const dispatch = useDispatch();

  const [order_note, set_order_note] = useState("");
  const [production_note, set_production_note] = useState("");
  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const stable_setItemsPrice = useCallback(setItemsPrice, []);
  const stable_set_loading_payment = useCallback(set_loading_payment, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(listPromos({}));
      dispatch(listUsers({}));
    }
    return () => (clean = false);
  }, [dispatch]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(savePayment({ paymentMethod }));
    }
    return () => (clean = false);
  }, [paymentMethod]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      const shipping_storage = sessionStorage.getItem("shippingAddress");
      console.log({ shipping_storage });
      if (shipping_storage) {
        dispatch(saveShipping(JSON.parse(shipping_storage)));
      }

      dispatch(savePayment({ paymentMethod }));
      stable_setItemsPrice(determine_total(cartItems));
      // if (!show_message && promo_code) {
      // 	activate_promo_code(promo_code.toLowerCase());
      // }
    }
    return () => (clean = false);
  }, [cartItems, dispatch, stable_setItemsPrice]);
  useEffect(() => {
    let clean = true;
    if (clean) {
      if (error_order) {
        stable_set_loading_payment(false);
        set_error(error_order);
      }
    }
    return () => (clean = false);
  }, [error_order, stable_set_loading_payment]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (shipping && Object.keys(shipping).length > 0) {
        set_loading_shipping(true);
        const package_volume = cartItems.reduce((a, c) => a + c.package_volume, 0);
        console.log({ package_volume });
        if (!package_volume) {
          set_loading(false);
          set_hide_pay_button(false);
          setShippingPrice(0);
          set_free_shipping_message("Free");
          set_loading_shipping(false);
          set_show_shipping_complete(true);
        } else {
          console.log({ shipping });
          if (shipping.hasOwnProperty("address_1") && shipping.address_1.length > 0 && shipping_completed) {
            get_shipping_rates(verify_shipping);
          }
        }
        if (shipping.international) {
          setTaxPrice(0);
        } else {
          get_tax_rates();
        }
      }
      // if (!show_message && promo_code) {
      // 	activate_promo_code(promo_code.toLowerCase());
      // }
    }
    return () => (clean = false);
  }, [shipping]);

  const [loading_shipping, set_loading_shipping] = useState();

  //   39 Red Admiral Ct Apartment 39
  // Little Paxton, England PE19 6BU
  // United Kingdom
  const get_shipping_rates = async verfify_ship => {
    const verify = shipping.international ? false : verfify_ship;
    const request = await API_Shipping.get_shipping_rates(
      {
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        userInfo,
        tip,
        order_note,
        production_note,
        promo_code: show_message && promo_code
      },
      verify
    );
    console.log({ get_shipping_rates: request });
    if (request.data.message) {
      set_error_shipping(request.data);
      set_error_happened(true);
      set_loading_shipping(false);
    } else {
      console.log("Shipment Ran");
      set_shipping_rates(request.data.shipment);
      set_shipment_id(request.data.shipment.id);
      set_parcel(request.data.parcel._id);
      set_loading_shipping(false);
    }
  };

  const [show_shipping_complete, set_show_shipping_complete] = useState();

  const choose_shipping_rate = (rate, speed) => {
    setShippingPrice(parseFloat(rate.retail_rate || rate.rate) + packaging_cost);
    setPreviousShippingPrice(parseFloat(rate.retail_rate || rate.rate) + packaging_cost);
    set_hide_pay_button(false);
    set_shipping_rate(rate);
    set_current_shipping_speed({ rate, speed });
    get_promo_code();
    set_show_promo_code(true);
    set_show_shipping_complete(true);
    // set_show_payment(true);
  };

  const re_choose_shipping_rate = () => {
    setShippingPrice(0);
    setPreviousShippingPrice(0);
    set_hide_pay_button(true);
    set_shipping_rate({});
    set_show_payment(false);
  };

  const get_tax_rates = async () => {
    setTaxPrice(0);
    set_loading(true);
    const { data } = await API_External.get_tax_rates();
    const result = state_names.find(obj => {
      return obj.short_name === shipping.state || obj.long_name === shipping.state;
    });
    const tax_rate = parseFloat(data[result.long_name || shipping.state]) / 100;
    if (!isNaN(tax_rate)) {
      set_tax_rate(tax_rate);
      if (shipping.international) {
        setTaxPrice(0);
        return;
      }
      setTaxPrice(tax_rate * itemsPrice);
    }
    set_loading(false);
  };

  const get_promo_code = () => {
    const promo_code_storage = sessionStorage.getItem("promo_code");
    console.log({ promo_code_storage });
    if (promo_code_storage && promo_code_storage.length > 0) {
      console.log({ promo_code_storage });
      set_promo_code(promo_code_storage.toLowerCase());
      set_show_promo_code(true);
      set_show_message(promo_code_storage);
      set_show_promo_code_input_box(false);
      activate_promo_code(promo_code_storage);
    }
    // if (itemsPrice >= 39.99) {
    // 	set_promo_code("SHIP40");
    // 	set_show_promo_code(true);
    // 	// set_show_message(`"SHIP40" Free Shipping`);
    // 	set_show_promo_code_input_box(false);
    // 	activate_promo_code("SHIP40");
    // }
  };

  const placeOrderHandler = async paymentMethod => {
    check_authentication();
    if (cartItems.length > 0) {
      if (userInfo && userInfo.first_name) {
        dispatch(
          createPayOrder(
            {
              orderItems: cartItems,
              shipping: shipment_id
                ? {
                    ...shipping,
                    shipment_id,
                    shipping_rate
                  }
                : shipping,
              payment,
              itemsPrice,
              shippingPrice,
              taxPrice,
              totalPrice,
              userInfo,
              order_note,
              production_note,
              tip,
              promo_code: show_message && promo_code,
              parcel: parcel || null
            },
            paymentMethod
          )
        );
      } else {
        dispatch(
          createPayOrderGuest(
            {
              orderItems: cartItems,
              shipping: shipment_id
                ? {
                    ...shipping,
                    shipment_id,
                    shipping_rate
                  }
                : shipping,
              payment,
              itemsPrice,
              shippingPrice,
              taxPrice,
              totalPrice,
              order_note,
              production_note,
              tip,
              promo_code: show_message && promo_code,
              parcel: parcel || null,
              guest: true
            },
            create_account,
            new_password,
            paymentMethod
          )
        );
      }
    }
  };
  const dimminish_stock = async () => {
    const request = await API_Products.update_stock(cartItems);
    console.log({ dimminish_stock: request });
  };

  const promo_code_used = async () => {
    if (promo_code) {
      await API_Promos.promo_code_used(promo_code.toLowerCase());
    }
  };
  // const data = new Date()
  const today = new Date();
  const create_order_without_paying = async () => {
    // create an order
    console.log({ user });
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping: {
          ...shipping,
          email: user.email,
          shipment_id: shipment_id && shipment_id,
          shipping_rate: shipping_rate && shipping_rate
        },
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: user._id,
        order_note,
        production_note,
        tip,
        promo_code,
        parcel: parcel ? parcel : null,
        isPaid: paid ? paid : false,
        paidAt: paid ? today : null
      })
    );

    set_loading_payment(false);
    empty_cart();
    // dimminish_stock();
    promo_code_used();
    props.history.push("/secure/glow/orders?page=1?limit=10");
    sessionStorage.removeItem("shippingAddress");
  };

  const create_order_without_user = async () => {
    dispatch(
      createOrderGuest({
        orderItems: cartItems,
        shipping: shipment_id
          ? {
              ...shipping,
              shipment_id,
              shipping_rate
            }
          : shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        order_note,
        production_note,
        tip,
        promo_code,
        parcel
      })
    );

    set_loading_payment(false);
    empty_cart();
    // dimminish_stock();
    promo_code_used();
    props.history.push("/secure/glow/orders?page=1?limit=10");
    sessionStorage.removeItem("shippingAddress");
  };

  const empty_cart = () => {
    console.log(cartItems);
    for (let item of cartItems) {
      dispatch(removeFromCart(item));
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (successPay && order) {
        props.history.push("/pages/complete/order/" + order._id);
        set_loading_payment(false);
        empty_cart();
        promo_code_used();
        // dimminish_stock();
        sessionStorage.removeItem("shippingAddress");
      } else if (error_pay) {
      }
    }
    return () => (clean = false);
  }, [successPay]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (error_pay) {
        set_loading_payment(false);
        console.log({ error_pay });
        set_error(error_pay);
      }
    }
    return () => (clean = false);
  }, [error_pay]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      console.log({ tip });

      setTotalPrice(
        tip === 0 || tip === "" || isNaN(tip)
          ? itemsPrice + shippingPrice + taxPrice
          : itemsPrice + shippingPrice + taxPrice + parseInt(tip)
      );
      // if (!show_message && promo_code) {
      // 	activate_promo_code(promo_code.toLowerCase());
      // }
    }
    return () => (clean = false);
  }, [itemsPrice, taxPrice, tip, shippingPrice]);

  const [promo_code_validations, set_promo_code_validations] = useState("");

  const check_code = e => {
    e.preventDefault();
    console.log({ userInfo });
    console.log({ cartItems });
    const data = {
      promo_code: promo_code,
      promos,
      userInfo,
      items_price,
      cartItems
    };
    // console.log({ data });
    const request = validate_promo_code(data);

    set_promo_code_validations(request.errors.promo_code);
    console.log(request);
    console.log({ promo_code });

    if (request.isValid) {
      activate_promo_code(promo_code.toLowerCase());
    } else {
      set_promo_code("");
    }
  };

  const activate_promo_code = code => {
    console.log({ code });
    console.log({ promos });
    const promo = promos.find(promo => promo.promo_code === code.toLowerCase());
    console.log({ isValid: promo, promo_code: code.toLowerCase() });
    let promo_excluded = 0;

    let promo_included = 0;
    // setPreviousShippingPrice(shippingPrice);
    if (promo) {
      if (promo.exclude) {
        const category_cart_items = cartItems
          .filter(item => promo.excluded_categories.includes(item.category))
          .reduce((a, item) => a + item.price, 0);
        const product_cart_items = cartItems
          .filter(item => promo.excluded_products.includes(item.pathname))
          .reduce((a, item) => a + item.price, 0);
        promo_excluded = category_cart_items + product_cart_items;
      }
      // if (promo.include) {
      // 	const category_cart_items = cartItems.filter((item) =>
      // 		promo.included_categories.includes(item.category)
      // 	);
      // 	console.log({ category_cart_items });
      // 	const product_cart_items = cartItems.filter((item) => promo.included_products.includes(item.pathname));
      // 	console.log({ product_cart_items });
      // 	// promo_included = category_cart_items + product_cart_items;
      // }

      console.log({ promo_excluded });
      console.log({ promo_included });
      if (show_message) {
        set_promo_code_validations("Can only use one promo code at a time");
      } else {
        if (promo.percentage_off) {
          if (items_price === promo_excluded) {
            set_promo_code_validations("All Items Excluded from Promo");
            return;
          }
          setItemsPrice(items_price - (items_price - promo_excluded) * (promo.percentage_off / 100));
          setTaxPrice(tax_rate * (items_price - (items_price - promo_excluded) * (promo.percentage_off / 100)));
        } else if (promo.amount_off) {
          setItemsPrice(items_price - promo.amount_off);
          setTaxPrice(tax_rate * (items_price - promo.amount_off));
          // setItemsPrice(items_price - (items_price - promo_excluded) - promo.amount_off);
          // setTaxPrice(tax_rate * (items_price - (items_price - promo_excluded) - promo.amount_off));
        }
        if (promo.free_shipping) {
          setShippingPrice(0);
          set_free_shipping_message("Free");
          set_show_message(`${promo.promo_code.toUpperCase()} Free Shipping`);
        }
        if (promo.percentage_off) {
          set_show_message(`${promo.promo_code.toUpperCase()} ${promo.percentage_off}% Off`);
        } else if (promo.amount_off) {
          set_show_message(`${promo.promo_code.toUpperCase()} $${promo.amount_off} Off`);
        }
        // else  {
        // 	set_show_message(`${promo.promo_code.toUpperCase()} $${previousShippingPrice.toFixed(2)} Off`);
        // }
        // set_show_message(
        // 	`${promo.promo_code.toUpperCase()} ${promo.percentage_off > 0
        // 		? `${promo.percentage_off}% Off`
        // 		: `$${promo.amount_off} Off`}`
        // );
      }
    }
    set_show_promo_code_input_box(false);
  };

  const remove_promo = () => {
    setItemsPrice(items_price);
    setTaxPrice(tax_rate * items_price);
    setShippingPrice(shippingPrice);
    set_free_shipping_message("");
    set_show_message("");
    if (shipping) {
      setShippingPrice(previousShippingPrice);
    }
    set_show_promo_code_input_box(true);
  };

  const [email, set_email] = useState("");

  const show_hide_steps = step => {
    if (step === "email") {
      set_show_email(true);
      set_show_shipping(false);
      set_show_payment(false);
      set_show_review(false);
      set_shipping_completed(false);
      set_payment_completed(false);
      re_choose_shipping_rate();
    }
    if (step === "shipping") {
      set_show_shipping(true);
      set_show_email(false);
      set_show_payment(false);
      set_show_review(false);
      // set_shipping_completed(false);
      set_payment_completed(false);
      re_choose_shipping_rate();
    }
    if (step === "payment") {
      set_show_payment(true);
      set_show_shipping(false);
      set_show_email(false);
      set_show_review(false);
      set_shipping_completed(false);
      set_payment_completed(false);
      re_choose_shipping_rate();
    }
    if (step === "review") {
      set_show_review(true);
      set_show_payment(false);
      set_show_shipping(false);
      set_show_email(false);
    }
  };

  const next_step = step => {
    if (step === "email") {
      set_show_email(true);
      set_show_shipping(false);
      set_show_payment(false);
      set_show_review(false);
      set_shipping_completed(true);
    }
    if (step === "shipping") {
      if (email.length > 0) {
        set_show_shipping(true);
        set_show_email(false);
        set_show_payment(false);
        set_show_review(false);
        set_email_completed(true);
        set_shipping_completed(true);
        re_choose_shipping_rate();
        setEmailValidations("");
      } else {
        setEmailValidations("Email Field Empty");
      }
      isMobile && window.scrollTo({ top: 340, behavior: "smooth" });
    }
    if (step === "payment") {
      set_show_payment(true);
      set_show_shipping(false);
      set_show_email(false);
      set_show_review(false);
      set_shipping_completed(true);
      set_show_shipping_complete(false);
      // re_choose_shipping_rate();
      isMobile && window.scrollTo({ top: 560, behavior: "smooth" });
    }
    if (step === "review") {
      set_show_review(true);
      set_show_payment(false);
      set_show_shipping(false);
      set_show_email(false);
      set_payment_completed(true);
    }
  };
  const history = useHistory();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (userInfo && userInfo.hasOwnProperty("first_name")) {
        set_email(userInfo.email);
      }
    }
    return () => (clean = false);
  }, [userInfo]);
  useEffect(() => {
    let clean = true;
    if (clean) {
      if (userInfo && userInfo.hasOwnProperty("first_name") && user_success) {
        history.push("/secure/checkout/placeorder");
      }
    }
    return () => (clean = false);
  }, [user_success]);

  setTimeout(() => {
    set_loading_login(false);
  }, 3000);

  const decide_steps = () => {
    if (successPay) {
      return <CheckoutSteps step1 step2 step3 step4 />;
    } else if (show_payment) {
      return <CheckoutSteps step1 step2 step3 />;
    } else if (shipping_completed) {
      return <CheckoutSteps step1 step2 />;
    } else {
      return <CheckoutSteps step1 />;
    }
  };

  const { width } = useWindowDimensions();
  return (
    <div>
      <Helmet>
        <title>Place Order | Glow LEDs</title>
        <meta property="og:title" content="Place Order" />
        <meta name="twitter:title" content="Place Order" />
        <link rel="canonical" href="https://www.glow-leds.com/secure/checkout/placeorder" />
        <meta property="og:url" content="https://www.glow-leds.com/secure/checkout/placeorder" />
      </Helmet>
      {decide_steps()}
      <LoadingPayments loading={loading_payment} error={error} set_error={set_error} />
      <LoadingShipping
        error={error_shipping}
        set_error={set_error_shipping}
        get_shipping_rates={get_shipping_rates}
        set_loading_shipping={set_loading_shipping}
        loading_shipping={loading_shipping}
        set_verify_shipping={set_verify_shipping}
      />
      {/* <Loading error={error} /> */}
      <Loading loading={user_loading} />
      <div className="placeorder">
        <div className="w-100per" style={{ flex: width > 400 ? "1 0 34rem" : "unset" }}>
          <div className="placeorder-info">
            <Email
              email_completed={email_completed}
              show_email={show_email}
              show_hide_steps={show_hide_steps}
              next_step={next_step}
              is_guest={is_guest}
              email={email}
              set_email={set_email}
              email_validations={email_validations}
              setEmailValidations={setEmailValidations}
              setPasswordValidations={setPasswordValidations}
              set_is_guest={set_is_guest}
              password={password}
              set_password={set_password}
            />
            <Shipping
              shipping_completed={shipping_completed}
              set_shipping_completed={set_shipping_completed}
              show_shipping={show_shipping}
              set_show_shipping={set_show_shipping}
              show_hide_steps={show_hide_steps}
              loading={loading}
              set_loading={set_loading}
              email={email}
              set_email={set_email}
              shipping={shipping}
              loading_shipping={loading_shipping}
              choose_shipping_rate={choose_shipping_rate}
              hide_pay_button={hide_pay_button}
              current_shipping_speed={current_shipping_speed}
              re_choose_shipping_rate={re_choose_shipping_rate}
              show_shipping_complete={show_shipping_complete}
              next_step={next_step}
              shipping_rates={shipping_rates}
              cartItems={cartItems}
              verify_shipping={verify_shipping}
              set_verify_shipping={set_verify_shipping}
              error_happened={error_happened}
            />
            <Payment
              payment_completed={payment_completed}
              show_payment={show_payment}
              cartItems={cartItems}
              show_hide_steps={show_hide_steps}
              set_order_note={set_order_note}
              set_production_note={set_production_note}
              show_promo_code={show_promo_code}
              show_promo_code_input_box={show_promo_code_input_box}
              check_code={check_code}
              set_promo_code={set_promo_code}
              promo_code_validations={promo_code_validations}
              show_message={show_message}
              remove_promo={remove_promo}
              tip={tip}
              set_tip={set_tip}
              parseFloat={parseFloat}
              loading_checkboxes={loading_checkboxes}
              create_account={create_account}
              set_create_account={set_create_account}
              userInfo={userInfo}
              set_new_password={set_new_password}
              password_validations={password_validations}
              loading={loading}
              hide_pay_button={hide_pay_button}
              placeOrderHandler={placeOrderHandler}
              loading_payment={loading_payment}
              set_loading_payment={set_loading_payment}
              users={users}
              no_user={no_user}
              set_paid={set_paid}
              paid={paid}
              set_paymentMethod={set_paymentMethod}
              set_user={set_user}
              user={user}
              create_order_without_paying={create_order_without_paying}
              create_order_without_user={create_order_without_user}
            />
          </div>
        </div>

        <OrderSummary
          show_message={show_message}
          loading={loading}
          shipping={shipping}
          shippingPrice={shippingPrice}
          free_shipping_message={free_shipping_message}
          tip={tip}
          cartItems={cartItems}
          itemsPrice={itemsPrice}
          items_price={items_price}
          taxPrice={taxPrice}
          totalPrice={totalPrice}
        />
      </div>
      {/* <Carousel
        product_pathname={props.match.params.pathname}
        category={"batteries"}
        title="Accessories You May Need"
        add_to_cart={true}
      />
      <Carousel title="Suggested Products" random={true} add_to_cart={true} /> */}
    </div>
  );
};

export default PlaceOrderPage;
