import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";
import { isMobile } from "react-device-detect";
import * as API from "../../../../api";
import config from "../../../../config";
import { setPaymentValidations, setLoadingPayment } from "../../placeOrderSlice";
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
    activePromoCodeIndicator,
    tip,
    order_note,
    production_note,
    serviceFee,
  } = placeOrder;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping, payment } = cartPage;
  const { cartItems } = my_cart;

  const handleSubmit = async (event, stripe, elements) => {
    event.preventDefault();
    dispatch(setPaymentValidations());
    isMobile && window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(setLoadingPayment(true));
    try {
      const stripePayment = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      const { paymentMethod, error } = stripePayment;
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
              promo_code: activePromoCodeIndicator && promo_code,
              parcel: parcel || null,
              serviceFee,
            },
            create_account,
            new_password,
            paymentMethod,
          })
        );
      }
    } catch (error) {
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
