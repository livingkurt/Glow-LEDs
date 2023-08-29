import { useEffect } from "react";
import { set_success } from "../../../slices/cartSlice";
import { clear_order_state } from "../../../slices/orderSlice";
import { decide_warning, determine_total } from "../../../utils/helper_functions";

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

export const checkoutHandler = (dispatch, navigate, props, cartItems, current_user, closeMenu) => {
  dispatch(clear_order_state());
  if (decide_warning(props.date_1, props.date_2)) {
    if (cartItems.length === 0) {
      // set_no_items_in_cart("Cannot proceed to checkout without any items in cart");
    } else {
      if (current_user.hasOwnProperty("first_name")) {
        navigate("/secure/checkout/placeorder");
      } else {
        navigate("/checkout/placeorder");
      }
    }
    closeMenu();
  }
};

export const determine_wholesale_proceed = (current_user, cartItems) => {
  return (
    current_user?.isWholesaler &&
    determine_total(cartItems, current_user?.isWholesaler) > current_user?.wholesaler?.minimum_order_amount
  );
};
