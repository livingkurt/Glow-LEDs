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
import { getHasPreOrderItems, getPreOrderReleaseDate } from "../../placeOrderHelpers";

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
    taxRate,
    totalPrice,
    activePromoCodeIndicator,
    tip,
    order_note,
    production_note,
    serviceFee,
    splitOrder,
    preOrderShippingRate,
    nonPreOrderShippingRate,
  } = placeOrder;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping, payment } = cartPage;
  const { cartItems } = my_cart;

  const hasPreOrderItems = getHasPreOrderItems(cartItems);
  const preOrderReleaseDate = getPreOrderReleaseDate(cartItems);

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
      console.log({
        splitOrder: splitOrder,
        preOrderShippingRate: preOrderShippingRate,
        nonPreOrderShippingRate: nonPreOrderShippingRate,
      });
      if (cartItems.length > 0) {
        dispatch(
          API.placeOrder({
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
              taxRate,
              totalPrice: totalPrice,
              order_note,
              production_note,
              tip,
              promo_code: activePromoCodeIndicator && promo_code,
              parcel: parcel || null,
              serviceFee,
              hasPreOrderItems,
              preOrderShippingDate: preOrderReleaseDate,
            },
            splitOrder: splitOrder,
            preOrderShippingRate: preOrderShippingRate,
            nonPreOrderShippingRate: nonPreOrderShippingRate,
            cartId: my_cart._id,
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
