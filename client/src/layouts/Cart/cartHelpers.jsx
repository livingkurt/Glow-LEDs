import { useEffect } from "react";
import { set_success } from "../../slices/cartSlice";
import { clear_order_state } from "../../slices/orderSlice";
import { decide_warning, determineItemsTotal } from "../../utils/helper_functions";
import { setLoadingPlaceOrderPage } from "../../pages/PlaceOrderPage/placeOrderSlice";

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

export const checkoutHandler = (dispatch, navigate, current_user, closeMenu) => {
  dispatch(clear_order_state());
  // dispatch(setLoadingPlaceOrderPage(true));

  // dispatch(setLoadingPlaceOrderPage(false));
  if (current_user.hasOwnProperty("first_name")) {
    navigate("/secure/checkout/placeorder");
  } else {
    navigate("/checkout/placeorder");
  }
  closeMenu();
  // setTimeout(() => {
  // }, 2000);
};

export const determine_wholesale_proceed = (current_user, cartItems) => {
  return (
    current_user?.isWholesaler &&
    determineItemsTotal(cartItems, current_user?.isWholesaler) > current_user?.wholesaler?.minimum_order_amount
  );
};
