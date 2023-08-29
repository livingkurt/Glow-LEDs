import { useState, useEffect, useCallback } from "react";
import PaymentStep from "./components/PaymentStep";
import EmailStep from "./components/EmailStep";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { createPayOrder, createOrder, createOrderGuest, createPayOrderGuest, removeOrderState } from "../../actions/orderActions";
import CheckoutSteps from "../../shared/SharedComponents/CheckoutSteps";
import { Helmet } from "react-helmet";
// import { removeFromCart, saveShipping, savePayment } from "../../actions/cartActions";
// import { listPromos } from "../../actions/promoActions";
import { Loading, LoadingPayments, LoadingShipping } from "../../shared/SharedComponents";
import { validate_promo_code } from "../../utils/validations";
// import { listUsers } from "../../actions/userActions";
import { API_Emails, API_External, API_Products, API_Promos, API_Shipping } from "../../utils";
import { determine_total, state_names } from "../../utils/helper_functions";
import useWindowDimensions from "../../shared/Hooks/windowDimensions";
import { isMobile } from "react-device-detect";
import { OrderSummaryStep, ShippingStep } from "./components";

import * as API from "../../api";
import { save_shipping } from "../../slices/cartSlice";
// import { set_loading, set_loading_payment } from "../../slices/orderSlice";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping, payment } = cartPage;
  const { cartItems } = my_cart;
  const orderPage = useSelector(state => state.orders.orderPage);
  const { order, error: error_order, success_order, success_no_pay_order, success, error_pay } = orderPage;

  const userPage = useSelector(state => state.users.userPage);
  const { users, current_user, loading: user_loading, success: user_success } = userPage;

  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos } = promoPage;

  const items_price = determine_total(cartItems);

  const [shipping_rates, set_shipping_rates] = useState({});
  const [current_shipping_speed, set_current_shipping_speed] = useState("");
  const [shipment_id, set_shipment_id] = useState("");
  const [shipping_rate, set_shipping_rate] = useState({});
  const [hide_pay_button, set_hide_pay_button] = useState(true);
  const [parcel, set_parcel] = useState("");
  const [paymentMethod, set_paymentMethod] = useState("stripe");
  const [create_account, set_create_account] = useState(false);

  const [show_email, set_show_email] = useState(true);
  const [show_shipping, set_show_shipping] = useState(false);
  const [show_payment, set_show_payment] = useState(false);

  const [is_guest, set_is_guest] = useState(true);

  const [email_completed, set_email_completed] = useState(false);
  const [shipping_completed, set_shipping_completed] = useState(false);
  const [payment_completed, set_payment_completed] = useState(false);
  const [password, set_password] = useState("");
  const [new_password, set_new_password] = useState("");

  const [email_validations, setEmailValidations] = useState("");
  const [password_validations, setPasswordValidations] = useState("");

  const [shippingPrice, setShippingPrice] = useState(0);
  const [previousShippingPrice, setPreviousShippingPrice] = useState(0);
  const [promo_code, set_promo_code] = useState("");
  const [loading_payment, set_loading_payment] = useState(false);
  const [itemsPrice, setItemsPrice] = useState(items_price);
  const [tax_rate, set_tax_rate] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [show_message, set_show_message] = useState("");
  const [user, set_user] = useState(current_user);
  const [free_shipping_message, set_free_shipping_message] = useState("------");
  const [loading, set_loading] = useState(false);
  const [show_promo_code, set_show_promo_code] = useState(false);
  const [show_promo_code_input_box, set_show_promo_code_input_box] = useState(true);
  const [tip, set_tip] = useState(0);
  const [verify_shipping, set_verify_shipping] = useState(true);
  const [error_happened, set_error_happened] = useState(false);
  const [error, set_error] = useState();
  const [error_shipping, set_error_shipping] = useState();

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
      dispatch(API.listPromos({}));
      dispatch(API.listUsers({}));
    }
    return () => (clean = false);
  }, [dispatch]);

  // useEffect(() => {
  //   let clean = true;
  //   if (clean) {
  //     dispatch(savePayment({ paymentMethod }));
  //   }
  //   return () => (clean = false);
  // }, [paymentMethod]);

  useEffect(() => {
    let clean = true;
    const determine_wholesale_proceed = () => {
      return (
        current_user?.isWholesaler &&
        determine_total(cartItems, current_user?.isWholesaler) > current_user?.wholesaler?.minimum_order_amount
      );
    };

    if (clean) {
      if (current_user?.isWholesaler && !determine_wholesale_proceed()) {
        navigate("/checkout/cart");
      }
    }
    return () => (clean = false);
  }, [cartItems, current_user, navigate]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      const shipping_storage = sessionStorage.getItem("shippingAddress");

      if (shipping_storage) {
        dispatch(save_shipping(JSON.parse(shipping_storage)));
      }

      // dispatch(savePayment({ paymentMethod }));
      stable_setItemsPrice(determine_total(cartItems, current_user?.isWholesaler));
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
        const package_volume = cartItems?.reduce((a, c) => a + c.package_volume, 0);

        if (!package_volume) {
          set_loading(false);
          set_hide_pay_button(false);
          setShippingPrice(0);
          set_free_shipping_message("Free");
          set_loading_shipping(false);
          set_show_shipping_complete(true);
        } else {
          if (shipping?.hasOwnProperty("address_1") && shipping.address_1.length > 0 && shipping_completed) {
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
  const get_shipping_rates = async verify_ship => {
    const verify = shipping.international ? false : verify_ship;
    const request = await API_Shipping.get_shipping_rates(
      {
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
        promo_code: show_message && promo_code,
      },
      verify
    );

    if (request.data.message) {
      set_error_shipping(request.data);
      set_error_happened(true);
      set_loading_shipping(false);
    } else {
      set_shipping_rates(request.data.shipment);
      set_shipment_id(request.data.shipment.id);
      set_parcel(request.data.parcel._id);
      set_loading_shipping(false);
    }
  };

  const [show_shipping_complete, set_show_shipping_complete] = useState(false);

  const choose_shipping_rate = (rate, speed, name) => {
    setShippingPrice(parseFloat(rate.retail_rate || rate.rate));
    setPreviousShippingPrice(parseFloat(rate.retail_rate || rate.rate));
    console.log({ hide_pay_button });
    set_hide_pay_button(false);
    set_shipping_rate(rate);
    set_current_shipping_speed({ rate, speed, name });
    get_promo_code();
    set_show_promo_code(true);
    set_show_shipping_complete(true);
    // set_show_payment(true);
  };

  const re_choose_shipping_rate = () => {
    setShippingPrice(0);
    setPreviousShippingPrice(0);
    console.log({ hide_pay_button });
    set_hide_pay_button(true);
    set_shipping_rate({});
    set_show_payment(false);
  };

  const get_tax_rates = async () => {
    setTaxPrice(0);
    set_loading(true);
    const { data } = await API_External.get_tax_rates();
    const result = state_names.find(obj => {
      return obj?.short_name === shipping.state || obj?.long_name === shipping.state;
    });
    const tax_rate = parseFloat(data[result?.long_name || shipping.state]) / 100;
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

    if (promo_code_storage && promo_code_storage.length > 0) {
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
    if (cartItems.length > 0) {
      dispatch(
        API.createPayOrder({
          order: {
            orderItems: cartItems,
            shipping: shipment_id
              ? {
                  ...shipping,
                  shipment_id,
                  shipping_rate,
                }
              : shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            current_user,
            order_note,
            production_note,
            tip,
            promo_code: show_message && promo_code,
            parcel: parcel || null,
          },
          create_account,
          new_password,
          paymentMethod,
        })
      );
    }
  };
  const dimminish_stock = async () => {
    await API_Products.update_stock(cartItems);
  };

  const promo_code_used = async () => {
    if (promo_code) {
      await API_Promos.promo_code_used(promo_code.toLowerCase());
    }
  };
  // const data = new Date()
  const today = new Date();

  const create_order_without_paying = async ({ isPaid }) => {
    // create an order

    const order_paid = isPaid ? isPaid : paid ? paid : false;

    dispatch(
      API.saveOrder({
        orderItems: cartItems,
        shipping: {
          ...shipping,
          email: user.email,
          shipment_id: shipment_id && shipment_id,
          shipping_rate: shipping_rate && shipping_rate,
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
        isPaid: order_paid,
        paidAt: order_paid ? today : null,
      })
    );

    set_loading_payment(false);
    dispatch(API.emptyCart(my_cart._id));
    dimminish_stock();
    send_used_code_email();
    promo_code_used();
    navigate("/secure/glow/orders");
    sessionStorage.removeItem("shippingAddress");
  };

  const create_no_payment_order = async ({ isPaid }) => {
    set_loading_payment(true);
    dispatch(
      API.createNoPayOrder({
        orderItems: cartItems,
        shipping: {
          ...shipping,
          email: user.email,
          shipment_id: shipment_id && shipment_id,
          shipping_rate: shipping_rate && shipping_rate,
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
        isPaid: isPaid ? isPaid : false,
        paidAt: isPaid ? today : null,
      })
    );
  };

  const create_order_without_user = async () => {
    dispatch(
      API.saveOrder({
        orderItems: cartItems,
        shipping: shipment_id
          ? {
              ...shipping,
              shipment_id,
              shipping_rate,
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
        parcel,
      })
    );

    set_loading_payment(false);
    dispatch(API.emptyCart(my_cart._id));
    dimminish_stock();
    promo_code_used();
    navigate("/secure/glow/orders");
    sessionStorage.removeItem("shippingAddress");
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (success_no_pay_order && order && totalPrice === 0) {
        setTimeout(() => {
          navigate("/pages/complete/order/" + order._id);
          set_loading_payment(false);
          dispatch(API.emptyCart(my_cart._id));
          promo_code_used();
          dimminish_stock();
          send_used_code_email();
          sessionStorage.removeItem("shippingAddress");
          // dispatch(removeOrderState());
        }, 2000);
      } else if (error_order) {
      }
    }
    return () => (clean = false);
  }, [success_no_pay_order]);

  // const empty_cart = () => {
  //   for (let item of cartItems) {
  //     dispatch(removeFromCart(item));
  //   }
  // };

  const send_used_code_email = async () => {
    if (promo_code) {
      await API_Emails.send_code_used_emails_a(promo_code.toLowerCase());
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (success && order?.hasOwnProperty("_id")) {
        navigate("/pages/complete/order/" + order._id);
        set_loading_payment(false);
        dispatch(API.emptyCart(my_cart._id));
        promo_code_used();
        dimminish_stock();
        sessionStorage.removeItem("shippingAddress");
        send_used_code_email();
      }
    }
    return () => (clean = false);
  }, [success]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (error_pay) {
        set_loading_payment(false);

        set_error(error_pay);
      }
    }
    return () => (clean = false);
  }, [error_pay]);

  useEffect(() => {
    let clean = true;
    if (clean) {
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

    const data = {
      promo_code: promo_code,
      promos,
      current_user,
      items_price,
      cartItems,
    };
    const request = validate_promo_code(data);
    set_promo_code_validations(request.errors.promo_code);

    if (request.isValid) {
      activate_promo_code(promo_code.toLowerCase());
    } else {
      set_promo_code("");
    }
  };

  const activate_promo_code = code => {
    const promo = promos.find(promo => promo.promo_code === code.toLowerCase());

    let promo_excluded = 0;

    let promo_included = 0;
    // setPreviousShippingPrice(shippingPrice);
    if (promo) {
      // if (promo.exclude) {
      //   const category_cart_items = cartItems
      //     .filter(item => promo.excluded_categories.includes(item.category))
      //     .reduce((a, item) => a + item.price, 0);
      //   const product_cart_items = cartItems
      //     .filter(item => promo.excluded_products.includes(item._id))
      //     .reduce((a, item) => a + item.price, 0);
      //   promo_excluded = category_cart_items + product_cart_items;
      // }
      // if (promo.include) {
      //   const category_cart_items = cartItems.filter(item => promo.included_categories.includes(item.category));

      //   const product_cart_items = cartItems.filter(item => promo.included_products.includes(item.product));

      //   promo_included = category_cart_items.length > 0 || product_cart_items.length > 0;
      //   if (promo_included) {
      //     update_promo();
      //   } else {
      //     set_promo_code_validations("Promo Code Not Valid");
      //     set_show_promo_code_input_box(true);
      //   }
      // }

      if (show_message) {
        set_promo_code_validations("Can only use one promo code at a time");
      } else {
        // if (!promo.include) {
        update_promo(promo, promo_excluded);
        // }
      }
    }
  };

  const update_promo = (promo, promo_excluded) => {
    if (promo.percentage_off) {
      if (items_price === promo_excluded) {
        set_promo_code_validations("All Items Excluded from Promo");
        return;
      }
      setItemsPrice(items_price - (items_price - promo_excluded) * (promo.percentage_off / 100));
      setTaxPrice(tax_rate * (items_price - (items_price - promo_excluded) * (promo.percentage_off / 100)));
    } else if (promo.amount_off) {
      if (promo.amount_off > items_price) {
        setItemsPrice(0);
        setTaxPrice(0);
      } else {
        setItemsPrice(items_price - promo.amount_off);
        setTaxPrice(tax_rate * (items_price - promo.amount_off));
      }
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
    set_show_promo_code_input_box(false);
  };
  //  else {
  //   set_promo_code_validations("Promo Code Not Valid");
  //   set_show_promo_code_input_box(true);

  const remove_promo = () => {
    setItemsPrice(items_price);
    setTaxPrice(tax_rate * items_price);
    setShippingPrice(shippingPrice);
    setTotalPrice(
      tip === 0 || tip === "" || isNaN(tip)
        ? itemsPrice + shippingPrice + taxPrice
        : itemsPrice + shippingPrice + taxPrice + parseInt(tip)
    );
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

      set_shipping_completed(false);
      set_payment_completed(false);
      // re_choose_shipping_rate();
    }
    if (step === "shipping") {
      set_show_shipping(true);
      set_show_email(false);
      set_show_payment(false);

      // set_shipping_completed(false);
      set_payment_completed(false);
      // re_choose_shipping_rate();
    }
    if (step === "payment") {
      set_show_payment(true);
      set_show_shipping(false);
      set_show_email(false);

      set_shipping_completed(false);
      set_payment_completed(false);
      // re_choose_shipping_rate();
    }
    if (step === "review") {
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

      set_shipping_completed(true);
    }
    if (step === "shipping") {
      if (email.length > 0) {
        set_show_shipping(true);
        set_show_email(false);
        set_show_payment(false);

        set_email_completed(true);
        set_shipping_completed(true);
        // re_choose_shipping_rate();
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

      set_shipping_completed(true);
      set_show_shipping_complete(false);
      // re_choose_shipping_rate();
      isMobile && window.scrollTo({ top: 560, behavior: "smooth" });
    }
    if (step === "review") {
      set_show_payment(false);
      set_show_shipping(false);
      set_show_email(false);
      set_payment_completed(true);
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (current_user && current_user?.hasOwnProperty("first_name")) {
        set_email(current_user.email);
      }
    }
    return () => (clean = false);
  }, [current_user]);
  useEffect(() => {
    let clean = true;
    if (clean) {
      if (current_user && current_user?.hasOwnProperty("first_name") && user_success) {
        navigate("/secure/checkout/placeorder");
      }
    }
    return () => (clean = false);
  }, [user_success]);

  const decide_steps = () => {
    if (success) {
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
            <EmailStep
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
            <ShippingStep
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
              set_hide_pay_button={set_hide_pay_button}
              current_shipping_speed={current_shipping_speed}
              re_choose_shipping_rate={re_choose_shipping_rate}
              show_shipping_complete={show_shipping_complete}
              next_step={next_step}
              shipping_rates={shipping_rates}
              cartItems={cartItems}
              verify_shipping={verify_shipping}
              set_verify_shipping={set_verify_shipping}
              error_happened={error_happened}
              show_payment={show_payment}
            />
            <PaymentStep
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
              current_user={current_user}
              set_new_password={set_new_password}
              password_validations={password_validations}
              loading={loading}
              hide_pay_button={hide_pay_button}
              placeOrderHandler={placeOrderHandler}
              loading_payment={loading_payment}
              set_loading_payment={set_loading_payment}
              users={users}
              set_paid={set_paid}
              paid={paid}
              set_paymentMethod={set_paymentMethod}
              set_user={set_user}
              user={user}
              create_order_without_paying={create_order_without_paying}
              create_no_payment_order={create_no_payment_order}
              create_order_without_user={create_order_without_user}
              totalPrice={totalPrice}
            />
          </div>
        </div>

        <OrderSummaryStep
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
        product_pathname={params.pathname}
        category={"batteries"}
        title="Accessories You May Need"
        add_to_cart={true}
      />
      <Carousel title="Suggested Products" random={true} add_to_cart={true} /> */}
    </div>
  );
};

export default PlaceOrderPage;
