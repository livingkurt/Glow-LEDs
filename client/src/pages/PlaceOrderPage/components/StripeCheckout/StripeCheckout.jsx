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

const stripePromise = loadStripe(config.VITE_STRIPE_KEY);

const StripeCheckout = () => {
  const dispatch = useDispatch();

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping, payment } = cartPage;
  const { cartItems } = my_cart;

  const placeOrderPage = useSelector(state => state.placeOrder);
  const {
    create_account,
    new_password,
    order_note,
    production_note,
    tip,
    active_promo_codes,
    active_gift_cards,
    unpaidOrderId,
    shipment_id,
    shipping_rate,
    parcel,
    shippingPrice,
    itemsPrice,
    taxPrice,
    taxRate,
    totalPrice,
    previousShippingPrice,
    serviceFee,
    splitOrder,
    preOrderShippingRate,
    nonPreOrderShippingRate,
  } = placeOrderPage;

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

      if (unpaidOrderId) {
        dispatch(
          API.payOrder({
            orderId: unpaidOrderId,
            paymentMethod,
          })
        );
      } else if (cartItems.length > 0) {
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
              previousShippingPrice,
              taxPrice,
              taxRate,
              totalPrice: totalPrice,
              order_note,
              production_note,
              tip,
              promo: active_promo_codes.length > 0 ? active_promo_codes[0] : null,
              promo_code: active_promo_codes.length > 0 ? active_promo_codes[0].promo_code : null,
              giftCards: active_gift_cards.map(card => ({
                code: card.code,
                amountUsed: card.amountUsed,
                source: "customer",
                giftCard: card,
              })),
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
