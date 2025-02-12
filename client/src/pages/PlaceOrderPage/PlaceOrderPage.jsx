import PaymentStep from "./components/PaymentStep";
import EmailStep from "./components/EmailStep";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../shared/SharedComponents/CheckoutSteps";
import { Helmet } from "react-helmet";
import { LoadingPayments, LoadingShipping } from "../../shared/SharedComponents";
import { OrderSummaryStep, ShippingStep } from "./components";
import { initializePlaceOrderPage } from "./placeOrderSlice";

import { showConfirm } from "../../slices/snackbarSlice";

import OrderComplete from "./components/OrderComplete";
import usePlaceOrderPage from "./usePlaceOrderPage";
import { isOrderComplete } from "./placeOrderHelpers";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width, show_payment, shipping_completed, orders, orderIds, orderCompleted, current_user, loadingPayment } =
    usePlaceOrderPage();

  if (isOrderComplete({ orderIds, orderCompleted })) {
    return (
      <OrderComplete current_user={current_user} orderIds={orders.length > 0 ? orders.map(o => o._id) : orderIds} />
    );
  }

  return (
    <div>
      <Helmet>
        <title>{"Place Order | Glow LEDs"}</title>
        <meta property="og:title" content="Place Order" />
        <meta name="twitter:title" content="Place Order" />
        <link rel="canonical" href="https://www.glow-leds.com/secure/checkout/place_order" />
        <meta property="og:url" content="https://www.glow-leds.com/secure/checkout/place_order" />
      </Helmet>
      <LoadingPayments loading={loadingPayment} />
      <LoadingShipping />
      <Box>
        <Box wrap pl={2} pr={2}>
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
            <div className="mt-3px">{"Back to Shopping"}</div>
          </Button>

          <CheckoutSteps success={orderCompleted} show_payment={show_payment} shipping_completed={shipping_completed} />
        </Box>

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
      </Box>
    </div>
  );
};

export default PlaceOrderPage;
