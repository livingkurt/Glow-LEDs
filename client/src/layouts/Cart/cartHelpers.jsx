import { useEffect } from "react";
import { set_success } from "../../slices/cartSlice";
import { clear_order_state } from "../../slices/orderSlice";
import { determineCartTotal } from "../../utils/helper_functions";
import { showInfo } from "../../slices/snackbarSlice";

export const useOutsideAlerter = (ref, dispatch) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.className !== "qty_select_dropdown w-100per"
      ) {
        dispatch(set_success(false));
        document.querySelector(".cart_sidebar").classList.remove("open");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export const checkoutHandler = (dispatch, navigate, current_user, closeMenu, cartItems) => {
  dispatch(clear_order_state());
  if (cartItems.length === 0) {
    dispatch(showInfo({ message: "Cannot proceed to checkout without any items in cart" }));
    return;
  }
  // dispatch(setLoadingPlaceOrderPage(true));

  // dispatch(setLoadingPlaceOrderPage(false));
  if (current_user.hasOwnProperty("first_name")) {
    navigate("/secure/checkout/place_order");
  } else {
    navigate("/checkout/place_order");
  }
  closeMenu();
  // setTimeout(() => {
  // }, 2000);
};

export const determine_wholesale_proceed = (current_user, cartItems) => {
  return (
    current_user?.isWholesaler &&
    determineCartTotal(cartItems, current_user?.isWholesaler) > current_user?.wholesaler?.minimum_order_amount
  );
};
