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

import OrderComplete from "./components/OrderComplete";
import usePlaceOrderPage from "./usePlaceOrderPage";
import { isOrderComplete } from "./placeOrderHelpers";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width, show_payment, shipping_completed, orders, orderIds, orderCompleted, current_user, loadingPayment } =
    usePlaceOrderPage();

  if (loadingPayment) {
    return <LoadingPayments />;
  }

  console.log({ orderIds, orderCompleted, isOrderComplete: isOrderComplete({ orderIds, orderCompleted }) });
  if (isOrderComplete({ orderIds, orderCompleted })) {
    return <OrderComplete current_user={current_user} order_id={orders.map(o => o._id) || orderIds} />;
  }

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

        {width > 960 && (
          <CheckoutSteps success={orderCompleted} show_payment={show_payment} shipping_completed={shipping_completed} />
        )}
        {width > 960 && (
          <Button aria-label="Back" variant="contained" startIcon={<ArrowBack />} style={{ visibility: "hidden" }}>
            {"Back to Shopping"}
          </Button>
        )}
      </Box>

      <LoadingPayments />
      <LoadingShipping />
      <div className="place_order">
        <div className="w-100per" style={{ flex: width > 400 ? "1 0 34rem" : "unset" }}>
          <div className="place_order-info">
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
