import { useEffect } from "react";
import PaymentStep from "./components/PaymentStep";
import EmailStep from "./components/EmailStep";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../shared/SharedComponents/CheckoutSteps";
import { Helmet } from "react-helmet";
import { LoadingPayments, LoadingShipping } from "../../shared/SharedComponents";
import { determineItemsTotal } from "../../utils/helper_functions";

import useWindowDimensions from "../../shared/Hooks/useWindowDimensions";
import { OrderSummaryStep, ShippingStep } from "./components";
import { initializePlaceOrderPage, setItemsPrice, setServiceFee, setTotalPrice } from "./placeOrderSlice";

import * as API from "../../api";
import { save_shipping, set_my_cart } from "../../slices/cartSlice";
import { setLoadingPayment } from "../../slices/orderSlice";
import { Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { showConfirm } from "../../slices/snackbarSlice";
import { constructOutOfStockMessage } from "./placeOrderHelpers";

const PlaceOrderPage = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;
  const orderPage = useSelector(state => state.orders.orderPage);
  const { order, success_no_pay_order, success } = orderPage;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user, success: user_success } = userPage;

  const placeOrder = useSelector(state => state.placeOrder);
  const { show_payment, shipping_completed, shippingPrice, promo_code, itemsPrice, taxPrice, totalPrice, tip } =
    placeOrder;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listPromos({}));
      dispatch(API.listUsers({}));
    }
    return () => {
      clean = false;
      dispatch(initializePlaceOrderPage());
    };
  }, [dispatch]);

  useEffect(() => {
    let clean = true;

    const removeOutOfStockItems = async outOfStockItems => {
      // Filter the cartItems to exclude out-of-stock items
      const updatedCartItems = cartItems.filter(
        cartItem =>
          !outOfStockItems.some(
            outOfStockItem =>
              cartItem.product === outOfStockItem.id && cartItem.option_product === outOfStockItem.optionId
          )
      );

      // Construct the updated cart object
      const updatedCart = {
        ...my_cart, // Assuming `cart` is the current state of the cart including `_id` and other properties
        cartItems: updatedCartItems,
      };
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      // Save the updated cart
      await dispatch(set_my_cart(updatedCart));
      await dispatch(API.saveCart(updatedCart));
    };

    const fetchData = async () => {
      if (clean && cartItems.length !== 0) {
        const response = await dispatch(API.checkStock(cartItems));
        if (response.payload && response.payload.length !== 0) {
          // Use the new function to construct the message with option details
          const message = constructOutOfStockMessage(response.payload);

          dispatch(
            showConfirm({
              title: "Notice: Out of Stock Items",
              message: message,
              onConfirm: () => {
                removeOutOfStockItems(response.payload);
              },
              onClose: () => navigate("/checkout/cart"),
            })
          );
        }
      }
    };

    fetchData();

    return () => {
      clean = false;
    };
  }, [dispatch, cartItems, navigate, my_cart]);

  useEffect(() => {
    let clean = true;
    const determine_wholesale_proceed = () => {
      return (
        current_user?.isWholesaler &&
        determineItemsTotal(cartItems, current_user?.isWholesaler) > current_user?.wholesaler?.minimum_order_amount
      );
    };

    if (clean) {
      if (current_user?.isWholesaler && !determine_wholesale_proceed()) {
        navigate("/checkout/cart");
      }
      if (current_user && current_user?.hasOwnProperty("first_name")) {
        dispatch(save_shipping({ email: current_user.email }));
      }
    }
    return () => (clean = false);
  }, [cartItems, current_user, dispatch, navigate]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      const shipping_storage = sessionStorage.getItem("shippingAddress");

      if (shipping_storage) {
        dispatch(save_shipping(JSON.parse(shipping_storage)));
      }

      dispatch(setItemsPrice(determineItemsTotal(cartItems, current_user?.isWholesaler)));
    }
    return () => (clean = false);
  }, [cartItems, current_user?.isWholesaler, dispatch]);

  const finishOrder = () => {
    dispatch(setLoadingPayment(false));
    dispatch(API.updateStock({ cartItems }));
    dispatch(API.emptyCart(my_cart._id));
    if (promo_code) {
      dispatch(API.promoCodeUsed(promo_code.toLowerCase()));
      dispatch(API.sendCodeUsedEmail(promo_code.toLowerCase()));
    }
    sessionStorage.removeItem("shippingAddress");
    sessionStorage.setItem("manualNavigation", "true");
    navigate("/pages/complete/order/" + order._id);
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (success_no_pay_order && order && totalPrice === 0) {
        setTimeout(() => {
          finishOrder();
        }, 2000);
      }
    }
    return () => (clean = false);
  }, [success_no_pay_order]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (success && order?.hasOwnProperty("_id")) {
        finishOrder();
      }
    }
    return () => (clean = false);
  }, [success]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      // Calculate service fee
      const ticketItems = cartItems.filter(item => item.itemType === "ticket");
      const ticketTotal = ticketItems.reduce((total, item) => total + item.price * item.quantity, 0);
      const serviceFee = ticketTotal * 0.1; // 10% service fee
      dispatch(setServiceFee(serviceFee));

      dispatch(
        setTotalPrice(
          tip === 0 || tip === "" || isNaN(tip)
            ? itemsPrice + shippingPrice + taxPrice
            : itemsPrice + shippingPrice + taxPrice + parseInt(tip)
        )
      );
    }
    return () => (clean = false);
  }, [itemsPrice, taxPrice, tip, shippingPrice, cartItems, dispatch]);

  return (
    <div>
      <Helmet>
        <title>Place Order | Glow LEDs</title>
        <meta property="og:title" content="Place Order" />
        <meta name="twitter:title" content="Place Order" />
        <link rel="canonical" href="https://www.glow-leds.com/secure/checkout/placeorder" />
        <meta property="og:url" content="https://www.glow-leds.com/secure/checkout/placeorder" />
      </Helmet>
      <Box display={"flex"} justifyContent={"space-between"} wrap pl={2} pr={2}>
        <div>
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
        </div>
        {width > 960 && (
          <CheckoutSteps success={success} show_payment={show_payment} shipping_completed={shipping_completed} />
        )}
        {width > 960 && (
          <Button aria-label="Back" variant="contained" startIcon={<ArrowBack />} style={{ visibility: "hidden" }}>
            Back to Shopping
          </Button>
        )}
      </Box>

      <LoadingPayments />
      <LoadingShipping />
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
