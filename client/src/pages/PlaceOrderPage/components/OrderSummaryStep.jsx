import React from "react";
import GLCartItem from "../../../shared/GlowLEDsComponents/GLCartItem/GLCartItem";
import { useSelector } from "react-redux";
import { determineItemsTotal } from "../../../utils/helper_functions";
import { Tooltip, Typography, useTheme } from "@mui/material";
import { getHasPreOrderItems } from "../placeOrderHelpers";
import ShippingPrice from "./ShippingPrice";

const OrderSummaryStep = () => {
  const theme = useTheme();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping } = cartPage;
  const { cartItems } = my_cart;

  const items_price = determineItemsTotal(cartItems);
  const placeOrder = useSelector(state => state.placeOrder);
  const {
    activePromoCodeIndicator,
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
  } = placeOrder;

  const hasPreOrderItems = getHasPreOrderItems(cartItems);

  // Calculate service fee for tickets
  const ticketItems = cartItems.filter(item => item.itemType === "ticket");
  const ticketTotal = ticketItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const serviceFee = ticketTotal * 0.1; // 10% service fee

  return (
    <div className="place_order-action">
      <ul>
        <li>
          <h4 style={{ marginTop: "0px", marginBottom: "0px" }}>{"Order Summary"}</h4>
          {hasPreOrderItems && (
            <Tooltip title="Pre-order items are items that are not yet available for immediate delivery. If ordered with non-pre-order items, the pre-order items will be released on their estimated release date.">
              <Typography
                component="span"
                variant="body2"
                sx={{
                  ml: 1,
                  bgcolor: "#496cba",
                  px: 0.5,
                  py: 0.5,
                  fontSize: "1.2rem",
                  borderRadius: 1,
                  fontWeight: 800,
                  color: theme.palette.getContrastText("#496cba"),
                }}
              >
                {"This order contains pre-order items."}
              </Typography>
            </Tooltip>
          )}
        </li>
        <li></li>
        <li>
          <ul className="cart-list-container w-100per">
            <li>
              <div className="">
                <label style={{ textAlign: "right" }}>{"Price"}</label>
              </div>
            </li>
            {cartItems.length === 0 ? (
              <div>{"Cart is empty"}</div>
            ) : (
              cartItems.map((item, index) => <GLCartItem item={item} index={index} showQuantity={false} />)
            )}
          </ul>
        </li>

        {!activePromoCodeIndicator && (
          <li>
            <div>{"Subtotal"}</div>
            <div>
              {"$"}
              {itemsPrice.toFixed(2)}
            </div>
          </li>
        )}

        {activePromoCodeIndicator && (
          <>
            <li>
              <del style={{ color: "red" }}>
                <div style={{ color: "white" }}>{"Subtotal"}</div>
              </del>
              <div>
                <del style={{ color: "red" }}>
                  <div style={{ color: "white" }}>
                    {"$"}
                    {items_price.toFixed(2)}
                  </div>
                </del>
              </div>
            </li>
            <li>
              <div>{"Discount"}</div>
              <div>
                {"-$"}
                {(items_price - itemsPrice).toFixed(2)}
              </div>
            </li>
            <li>
              <div>{"New Subtotal"}</div>
              <div>
                {"$"}
                {itemsPrice.toFixed(2)}
              </div>
            </li>
          </>
        )}

        <li>
          <div>{"Tax"}</div>
          <div>
            {!loading && shipping && shipping.hasOwnProperty("first_name") ? `$${taxPrice.toFixed(2)}` : "------"}
          </div>
        </li>
        {splitOrder ? (
          <>
            <ShippingPrice
              label="In-stock Items Shipping"
              originalPrice={previousNonPreOrderShippingPrice}
              newPrice={nonPreOrderShippingPrice}
            />
            <ShippingPrice
              label="Pre-order Items Shipping"
              originalPrice={previousPreOrderShippingPrice}
              newPrice={preOrderShippingPrice}
            />
          </>
        ) : (
          <ShippingPrice label="Shipping" originalPrice={previousShippingPrice} newPrice={shippingPrice} />
        )}
        {serviceFee > 0 && (
          <li className="pos-rel">
            <div>{"Service Fee (10% for tickets)"}</div>
            <div>
              {"$"}
              {serviceFee.toFixed(2)}
            </div>
          </li>
        )}
        {tip > 0 && (
          <li className="pos-rel">
            <div>{"Tip"}</div>
            <div>
              {"$"}
              {tip.toFixed(2)}
            </div>
          </li>
        )}
        <li>
          <div>{"Order Total"}</div>
          <div>
            {!loading && shipping && shipping.hasOwnProperty("first_name") ? "$" + totalPrice.toFixed(2) : "------"}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OrderSummaryStep;
