import PaymentStep from "./components/PaymentStep";
import EmailStep from "./components/EmailStep";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../shared/SharedComponents/CheckoutSteps";
import { Helmet } from "react-helmet";
import { LoadingPayments, LoadingShipping } from "../../shared/SharedComponents";
import { OrderSummaryStep, ShippingStep } from "./components";
import { initializePlaceOrderPage } from "./placeOrderSlice";

import { Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { showConfirm } from "../../slices/snackbarSlice";

import { Link } from "react-router-dom";
import OrderComplete from "./components/OrderComplete";
import usePlaceOrderPage from "./usePlaceOrderPage";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    width,
    show_payment,
    shipping_completed,
    order,
    orderId,
    orderCompleted,
    preOrderReleaseDate,
    hasPreOrderItems,
    current_user,
  } = usePlaceOrderPage();

  return (
    <div>
      <Helmet>
        <title>Place Order | Glow LEDs</title>
        <meta property="og:title" content="Place Order" />
        <meta name="twitter:title" content="Place Order" />
        <link rel="canonical" href="https://www.glow-leds.com/secure/checkout/place_order" />
        <meta property="og:url" content="https://www.glow-leds.com/secure/checkout/place_order" />
      </Helmet>
      <Box display={"flex"} justifyContent={"space-between"} wrap pl={2} pr={2}>
        {!orderCompleted ? (
          <Button
            aria-label="Back"
            style={{ color: "#fff" }}
            onClick={() => {
              dispatch(
                showConfirm({
                  title: "Confirm Exit",
                  message: "Are you sure you want to exit checkout?",
                  onConfirm: () => {
                    navigate("/checkout/cart");
                    dispatch(initializePlaceOrderPage());
                  },
                })
              );
            }}
            startIcon={<ArrowBack />}
          >
            <div className="mt-3px">Back to Shopping</div>
          </Button>
        ) : (
          <Link to="/">
            <Button style={{ color: "white" }} startIcon={<ArrowBack />}>
              Back to Home
            </Button>
          </Link>
        )}
        {width > 960 && (
          <CheckoutSteps success={orderCompleted} show_payment={show_payment} shipping_completed={shipping_completed} />
        )}
        {width > 960 && (
          <Button aria-label="Back" variant="contained" startIcon={<ArrowBack />} style={{ visibility: "hidden" }}>
            {!orderCompleted ? "Back to Shopping" : "Back to Home"}
          </Button>
        )}
      </Box>

      <LoadingPayments />
      <LoadingShipping />
      {!orderId || !orderCompleted ? (
        <div className="place_order">
          <div className="w-100per" style={{ flex: width > 400 ? "1 0 34rem" : "unset" }}>
            <div className="place_order-info">
              <EmailStep />
              <ShippingStep />
              <PaymentStep hasPreOrderItems={hasPreOrderItems} preOrderShippingDate={preOrderReleaseDate} />
            </div>
          </div>
          <OrderSummaryStep hasPreOrderItems={hasPreOrderItems} />
        </div>
      ) : (
        <OrderComplete current_user={current_user} order_id={order._id || orderId} />
      )}
    </div>
  );
};

export default PlaceOrderPage;
