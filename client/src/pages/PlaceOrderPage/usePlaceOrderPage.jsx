import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { determineItemsTotal } from "../../utils/helper_functions";

import useWindowDimensions from "../../shared/Hooks/useWindowDimensions";
import { initializePlaceOrderPage, setItemsPrice, setServiceFee, setTotalPrice } from "./placeOrderSlice";

import * as API from "../../api";
import { save_shipping, set_my_cart } from "../../slices/cartSlice";
import { showConfirm, showInfo } from "../../slices/snackbarSlice";
import { constructOutOfStockMessage } from "./placeOrderHelpers";

const usePlaceOrderPage = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;
  const orderPage = useSelector(state => state.orders.orderPage);
  const { order } = orderPage;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const placeOrder = useSelector(state => state.placeOrder);
  const { show_payment, shipping_completed, shippingPrice, itemsPrice, taxPrice, tip, orderCompleted, splitOrder } =
    placeOrder;

  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  const hasPreOrderItems = cartItems.some(item => item.isPreOrder);
  const hasNonPreOrderItems = cartItems.some(item => !item.isPreOrder);
  const preOrderReleaseDate = cartItems.find(item => item.isPreOrder)?.preOrderReleaseDate;

  useEffect(() => {
    if (hasPreOrderItems) {
      dispatch(
        showInfo({ message: "Your order contains pre-order items. Please note the estimated availability date." })
      );
    }
  }, [hasPreOrderItems, dispatch]);

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

    if (clean) {
      if (orderCompleted) {
        setSearchParams({ order_id: order._id });
      }
    }
    return () => {
      clean = false;
    };
  }, [order._id, orderCompleted, setSearchParams]);

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

  return {
    width,
    show_payment,
    shipping_completed,
    order,
    orderId,
    orderCompleted,
    preOrderReleaseDate,
    hasPreOrderItems,
    current_user,
    splitOrder,
    hasNonPreOrderItems,
  };
};

export default usePlaceOrderPage;
