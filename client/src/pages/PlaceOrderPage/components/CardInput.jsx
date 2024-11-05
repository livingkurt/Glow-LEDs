import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const CardInput = ({ handleSubmit, paymentValidations, cardElementOptions }) => {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <form onSubmit={e => handleSubmit(e, stripe, elements)}>
      <CardElement options={cardElementOptions} />
      {paymentValidations && (
        <div className="validation_text" style={{ textAlign: "center" }}>
          {paymentValidations}
        </div>
      )}
      <Button type="submit" variant="contained" color="primary" className="w-100per mt-1rem bob" disabled={!stripe}>
        {"Complete Order"}
      </Button>
    </form>
  );
};

CardInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  paymentValidations: PropTypes.string.isRequired,
  cardElementOptions: PropTypes.object.isRequired,
};

export default CardInput;
