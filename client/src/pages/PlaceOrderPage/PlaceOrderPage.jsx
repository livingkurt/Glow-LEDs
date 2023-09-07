import { useEffect } from "react";
import PaymentStep from "./components/PaymentStep";
import EmailStep from "./components/EmailStep";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../shared/SharedComponents/CheckoutSteps";
import { Helmet } from "react-helmet";
import { Loading, LoadingPayments, LoadingShipping } from "../../shared/SharedComponents";
import { validate_promo_code } from "../../utils/validations";
import { determine_total } from "../../utils/helper_functions";
import useWindowDimensions from "../../shared/Hooks/windowDimensions";
import { isMobile } from "react-device-detect";
import { OrderSummaryStep, ShippingStep } from "./components";
import {
  setEmailValidations,
  set_promo_code,
  setItemsPrice,
  setTotalPrice,
  set_error,
  set_promo_code_validations,
  set_email,
  nextStep,
  activatePromo,
  chooseShippingRateBasic,
  chooseShippingRateWithPromo,
  finalizeShippingRate,
} from "./placeOrderSlice";

import * as API from "../../api";
import { save_shipping } from "../../slices/cartSlice";
import { set_loading_payment } from "../../slices/orderSlice";

const PlaceOrderPage = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping, payment } = cartPage;
  const { cartItems } = my_cart;
  const orderPage = useSelector(state => state.orders.orderPage);
  const { order, error: error_order, success_no_pay_order, success, error_pay } = orderPage;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user, loading: user_loading, success: user_success } = userPage;

  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos } = promoPage;

  const placeOrder = useSelector(state => state.placeOrder);
  const {
    shipment_id,
    shipping_rate,
    parcel,
    show_payment,
    shipping_completed,
    shippingPrice,
    promo_code,
    itemsPrice,
    taxPrice,
    totalPrice,
    user,
    tip,
    paid,
    order_note,
    tax_rate,
    show_message,
    production_note,
    email,
  } = placeOrder;

  const items_price = determine_total(cartItems);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listPromos({}));
      dispatch(API.listUsers({}));
    }
    return () => (clean = false);
  }, [dispatch]);

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

      dispatch(setItemsPrice(determine_total(cartItems, current_user?.isWholesaler)));
    }
    return () => (clean = false);
  }, [cartItems, dispatch]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (error_order) {
        dispatch(set_loading_payment(false));
        dispatch(set_error(error_order));
      }
    }
    return () => (clean = false);
  }, [error_order]);

  const choose_shipping_rate = (rate, speed, name) => {
    const basicPayload = { rate, speed, name };
    dispatch(chooseShippingRateBasic(basicPayload));

    const promo_code_storage = sessionStorage.getItem("promo_code");
    if (promo_code_storage && promo_code_storage.length > 0) {
      const promoPayload = { promo_code_storage };
      dispatch(chooseShippingRateWithPromo(promoPayload));
      dispatch(activatePromo(promo_code_storage));
    }

    dispatch(finalizeShippingRate());
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

    dispatch(set_loading_payment(false));
    dispatch(API.emptyCart(my_cart._id));
    dispatch(API.updateStock({ cartItems }));
    if (promo_code) {
      dispatch(API.promoCodeUsed(promo_code.toLowerCase()));
      dispatch(API.sendCodeUsedEmail(promo_code.toLowerCase()));
    }
    navigate("/secure/glow/orders");
    sessionStorage.removeItem("shippingAddress");
  };

  const create_no_payment_order = async ({ isPaid }) => {
    dispatch(set_loading_payment(true));
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

    dispatch(set_loading_payment(false));
    dispatch(API.emptyCart(my_cart._id));
    dispatch(API.updateStock({ cartItems }));
    if (promo_code) {
      dispatch(API.promoCodeUsed(promo_code.toLowerCase()));
    }
    navigate("/secure/glow/orders");
    sessionStorage.removeItem("shippingAddress");
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (success_no_pay_order && order && totalPrice === 0) {
        setTimeout(() => {
          dispatch(set_loading_payment(false));
          dispatch(API.emptyCart(my_cart._id));
          if (promo_code) {
            dispatch(API.promoCodeUsed(promo_code.toLowerCase()));
            dispatch(API.sendCodeUsedEmail(promo_code.toLowerCase()));
          }
          dispatch(API.updateStock({ cartItems }));
          sessionStorage.removeItem("shippingAddress");
          navigate("/pages/complete/order/" + order._id);
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

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (success && order?.hasOwnProperty("_id")) {
        dispatch(set_loading_payment(false));
        dispatch(API.emptyCart(my_cart._id));
        if (promo_code) {
          dispatch(API.promoCodeUsed(promo_code.toLowerCase()));
          dispatch(API.sendCodeUsedEmail(promo_code.toLowerCase()));
        }
        dispatch(API.updateStock({ cartItems }));
        sessionStorage.removeItem("shippingAddress");
        navigate("/pages/complete/order/" + order._id);
      }
    }
    return () => (clean = false);
  }, [success]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (error_pay) {
        dispatch(set_loading_payment(false));
        dispatch(set_error(error_pay));
      }
    }
    return () => (clean = false);
  }, [error_pay]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(
        setTotalPrice(
          tip === 0 || tip === "" || isNaN(tip)
            ? itemsPrice + shippingPrice + taxPrice
            : itemsPrice + shippingPrice + taxPrice + parseInt(tip)
        )
      );
    }
    return () => (clean = false);
  }, [itemsPrice, taxPrice, tip, shippingPrice]);

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
    console.log({ request });
    dispatch(set_promo_code_validations(request.errors.promo_code));

    if (request.isValid) {
      dispatch(activatePromo({ items_price, tax_rate, show_message, code: promo_code.toLowerCase(), promos }));
    } else {
      dispatch(set_promo_code(""));
    }
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

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (current_user && current_user?.hasOwnProperty("first_name")) {
        dispatch(set_email(current_user.email));
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

  return (
    <div>
      <Helmet>
        <title>Place Order | Glow LEDs</title>
        <meta property="og:title" content="Place Order" />
        <meta name="twitter:title" content="Place Order" />
        <link rel="canonical" href="https://www.glow-leds.com/secure/checkout/placeorder" />
        <meta property="og:url" content="https://www.glow-leds.com/secure/checkout/placeorder" />
      </Helmet>
      <CheckoutSteps success={success} show_payment={show_payment} shipping_completed={shipping_completed} />
      <LoadingPayments />
      <LoadingShipping />
      <Loading loading={user_loading} />
      <div className="placeorder">
        <div className="w-100per" style={{ flex: width > 400 ? "1 0 34rem" : "unset" }}>
          <div className="placeorder-info">
            <EmailStep next_step={next_step} />
            <ShippingStep choose_shipping_rate={choose_shipping_rate} next_step={next_step} />
            <PaymentStep
              check_code={check_code}
              create_order_without_paying={create_order_without_paying}
              create_no_payment_order={create_no_payment_order}
              create_order_without_user={create_order_without_user}
            />
          </div>
        </div>
        <OrderSummaryStep />
      </div>
    </div>
  );
};

export default PlaceOrderPage;
