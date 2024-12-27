import { useSelector } from "react-redux";
import { determineCartTotal } from "../../../utils/helper_functions";

import { getHasPreOrderItems, hasActiveSaleItems } from "../placeOrderHelpers";
import OrderSummary from "./OrderSummary";

const OrderSummaryStep = () => {
  const { current_user } = useSelector(state => state.users.userPage);
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping } = cartPage;
  const { cartItems } = my_cart;

  const placeOrder = useSelector(state => state.placeOrder);
  const {
    loading,
    shippingPrice,
    previousShippingPrice,
    previousNonPreOrderShippingPrice,
    previousPreOrderShippingPrice,
    tip,
    itemsPrice,
    taxPrice,
    totalPrice,
    preOrderShippingPrice,
    nonPreOrderShippingPrice,
    splitOrder,
    show_payment,
    payment_completed,
    active_promo_codes,
    active_gift_cards,
  } = placeOrder;

  const hasPreOrderItems = getHasPreOrderItems(cartItems);

  // Calculate service fee for tickets
  const ticketItems = cartItems.filter(item => item.itemType === "ticket");
  const ticketTotal = ticketItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const serviceFee = ticketTotal * 0.1; // 10% service fee

  // Add these new calculations
  const originalTotal = cartItems.reduce((total, item) => {
    const originalPrice = item.previous_price || item.price;
    return total + originalPrice * item.quantity;
  }, 0);

  const saleTotal = determineCartTotal(cartItems, current_user.isWholesaler);

  const hasSaleItems = hasActiveSaleItems(cartItems);
  const hasActiveDiscounts = hasSaleItems || active_promo_codes.length > 0 || active_gift_cards.length > 0;

  return (
    <OrderSummary
      loading={loading}
      shippingPrice={shippingPrice}
      previousShippingPrice={previousShippingPrice}
      previousNonPreOrderShippingPrice={previousNonPreOrderShippingPrice}
      previousPreOrderShippingPrice={previousPreOrderShippingPrice}
      tip={tip}
      itemsPrice={itemsPrice}
      taxPrice={taxPrice}
      totalPrice={totalPrice}
      preOrderShippingPrice={preOrderShippingPrice}
      nonPreOrderShippingPrice={nonPreOrderShippingPrice}
      splitOrder={splitOrder}
      show_payment={show_payment}
      payment_completed={payment_completed}
      active_promo_codes={active_promo_codes}
      active_gift_cards={active_gift_cards}
      cartItems={cartItems}
      shipping={shipping}
      originalTotal={originalTotal}
      hasPreOrderItems={hasPreOrderItems}
      hasSaleItems={hasSaleItems}
      serviceFee={serviceFee}
      hasActiveDiscounts={hasActiveDiscounts}
      saleTotal={saleTotal}
    />
  );
};

export default OrderSummaryStep;
