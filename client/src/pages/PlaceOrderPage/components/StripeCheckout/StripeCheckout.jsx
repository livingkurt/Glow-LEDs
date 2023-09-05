import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";
import { isMobile } from "react-device-detect";
import * as API from "../../../../api";
import config from "../../../../config";
import { setPaymentValidations, set_loading_payment } from "../../placeOrderSlice";
import { showError } from "../../../../slices/snackbarSlice";
import { errorMessage } from "../../../../helpers/sharedHelpers";

const stripePromise = loadStripe(config.REACT_APP_STRIPE_KEY);

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const placeOrder = useSelector(state => state.placeOrder);
  const {
    shipment_id,
    shipping_rate,
    parcel,
    create_account,
    new_password,
    shippingPrice,
    promo_code,
    itemsPrice,
    taxPrice,
    totalPrice,
    show_message,
    tip,
    order_note,
    production_note,
  } = placeOrder;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping, payment } = cartPage;
  const { cartItems } = my_cart;

  const handleSubmit = async (event, stripe, elements) => {
    event.preventDefault();
    dispatch(setPaymentValidations());
    isMobile && window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(set_loading_payment(true));
    try {
      const stripePayment = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      const { paymentMethod, error } = stripePayment;
      console.log({ stripePayment });

      console.log({ error });
      if (error) {
        dispatch(setPaymentValidations(error.message));
        dispatch(showError({ message: error.message }));
        return;
      }
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
    } catch (error) {
      console.log({ error });
      dispatch(setPaymentValidations(error.message));
      dispatch(showError({ message: errorMessage(error) }));
    }
  };

  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripeForm handleSubmit={handleSubmit} />
      </Elements>
    </div>
  );
};

export default StripeCheckout;
