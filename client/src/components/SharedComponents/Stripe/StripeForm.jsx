// React
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { isMobile } from "react-device-detect";
import { GLButton } from "../GlowLEDsComponents";

const StripeForm = ({ pay_order, loading_payment, set_loading_payment, guest, date_1, date_2, stripePromise }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [remove_button, set_remove_button] = useState(false);
  const [payment_validations, set_payment_validations] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    isMobile && window.scrollTo({ top: 0, behavior: "smooth" });
    set_loading_payment(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (error) {
      set_loading_payment(false);
      set_payment_validations(error.message);

      return;
    } else if (!error) {
      set_remove_button(true);

      pay_order(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          iconStyle: "solid",
          style: {
            base: {
              iconColor: "#c4f0ff",
              color: "#fff",
              fontWeight: 500,
              fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
              fontSize: "1.2rem",
              fontSmoothing: "antialiased",
              ":-webkit-autofill": { color: "white" },
              "::placeholder": { color: "white" }
            },
            invalid: {
              iconColor: "#ffc7ee",
              color: "#ffc7ee"
            }
          }
        }}
      />
      {payment_validations && (
        <label className="validation_text" style={{ textAlign: "center" }}>
          {payment_validations}
        </label>
      )}
      {new Date() > new Date(date_1) && new Date() < new Date(date_2) && (
        <li>
          <p style={{ color: "#ffca00" }}>Your Order will ship after 12/02/2021 🚚</p>
        </li>
      )}
      {!remove_button && (
        <GLButton type="submit" variant="primary" className="w-100per mt-1rem bob" disabled={!stripe}>
          Complete Order
        </GLButton>
      )}
    </form>
  );
};

export default StripeForm;

// // React
// import React, { useState } from "react";
// import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
// import { PromosPage } from "../../pages";
// import { decide_warning } from "../../utils/helper_functions";
// import { isMobile } from "react-device-detect";
// import { GLButton } from "../GlowLEDsComponents";
// import { loadStripe } from "@stripe/stripe-js";

// const StripeForm = ({ pay_order, loading_payment, set_loading_payment, guest, date_1, date_2, stripePromise }) => {
//   const [stripePromise, setStripePromise] = useState(() => loadStripe(process.env.REACT_APP_STRIPE_KEY));
//   const stripe = useStripe();
//   const elements = useElements();
//   const [remove_button, set_remove_button] = useState(false);
//   const [payment_validations, set_payment_validations] = useState("");

//   const handleSubmit = async event => {
//     event.preventDefault();
//     isMobile && window.scrollTo({ top: 0, behavior: "smooth" });
//     set_loading_payment(true);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement)
//     });

//     if (error) {
//       set_loading_payment(false);
//       set_payment_validations(error.message);

//       return;
//     } else if (!error) {
//       set_remove_button(true);

//       pay_order(paymentMethod);
//     }
//   };

//   const handlePaymentRequest = async event => {
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.createPaymentIntent({
//       amount: 10000,
//       currency: "usd"
//     });

//     // Call the `confirm` method on the PaymentIntent to initiate the payment flow
//     const result = await stripe.confirmPaymentIntent(paymentIntent.client_secret, {
//       payment_method: {
//         type: "apple_pay",
//         apple_pay: {
//           country: "US",
//           currency: "usd",
//           payment_mode: "payment"
//         }
//       }
//     });

//     if (result.error) {
//       // Payment failed
//     } else {
//       // Payment succeeded
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           iconStyle: "solid",
//           style: {
//             base: {
//               iconColor: "#c4f0ff",
//               color: "#fff",
//               fontWeight: 500,
//               fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//               fontSize: "1.2rem",
//               fontSmoothing: "antialiased",
//               ":-webkit-autofill": { color: "white" },
//               "::placeholder": { color: "white" }
//             },
//             invalid: {
//               iconColor: "#ffc7ee",
//               color: "#ffc7ee"
//             }
//           }
//         }}
//       />
//       {payment_validations && (
//         <label className="validation_text" style={{ textAlign: "center" }}>
//           {payment_validations}
//         </label>
//       )}
//       {new Date() > new Date(date_1) && new Date() < new Date(date_2) && (
//         <li>
//           <p style={{ color: "#ffca00" }}>Your Order will ship after 12/02/2021 🚚</p>
//         </li>
//       )}
//       {!remove_button && (
//         <GLButton type="submit" variant="primary" className="w-100per mt-1rem bob" disabled={!stripe}>
//           Complete Order
//         </GLButton>
//       )}
//       <PaymentRequestButtonElement
//         options={{
//           paymentRequest: {
//             country: "US",
//             currency: "usd",
//             total: {
//               label: "Total",
//               amount: 10000
//             }
//           }
//         }}
//         onClick={handlePaymentRequest}
//       />
//     </form>
//   );
// };

// export default StripeForm;
