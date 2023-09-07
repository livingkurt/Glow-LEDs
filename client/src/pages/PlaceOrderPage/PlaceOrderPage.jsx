import { useEffect } from "react";
import PaymentStep from "./components/PaymentStep";
import EmailStep from "./components/EmailStep";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../shared/SharedComponents/CheckoutSteps";
import { Helmet } from "react-helmet";
import { Loading, LoadingPayments, LoadingShipping } from "../../shared/SharedComponents";
import { determine_total } from "../../utils/helper_functions";
import useWindowDimensions from "../../shared/Hooks/windowDimensions";
import { OrderSummaryStep, ShippingStep } from "./components";
import { setItemsPrice, setTotalPrice, set_error } from "./placeOrderSlice";

import * as API from "../../api";
import { save_shipping } from "../../slices/cartSlice";
import { set_loading_payment } from "../../slices/orderSlice";

const PlaceOrderPage = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;
  const orderPage = useSelector(state => state.orders.orderPage);
  const { order, error: error_order, success_no_pay_order, success, error_pay } = orderPage;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user, loading: user_loading, success: user_success } = userPage;

  const placeOrder = useSelector(state => state.placeOrder);
  const { show_payment, shipping_completed, shippingPrice, promo_code, itemsPrice, taxPrice, totalPrice, tip } =
    placeOrder;

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

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (current_user && current_user?.hasOwnProperty("first_name")) {
        dispatch(save_shipping({ email: current_user.email }));
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
            <EmailStep />
            <ShippingStep />
            <PaymentStep />
          </div>
        </div>
        <OrderSummaryStep />
      </div>
    </div>
  );
};

export default PlaceOrderPage;
