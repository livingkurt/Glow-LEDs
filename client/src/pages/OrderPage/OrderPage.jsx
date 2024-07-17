import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { determine_tracking_link, format_date, toTitleCase } from "../../utils/helper_functions";
import { Helmet } from "react-helmet";
import { Loading } from "../../shared/SharedComponents";
import useWindowDimensions from "../../shared/Hooks/useWindowDimensions";
import CartItem from "../../shared/SharedComponents/CartItem";
import CheckoutSteps from "../../shared/SharedComponents/CheckoutSteps";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";
import { determineOrderColors } from "../OrdersPage/ordersPageHelpers";
import { Box } from "@mui/material";
import { getItemsTotal } from "../../helpers/sharedHelpers";

const OrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const orderPage = useSelector(state => state.orders.orderPage);
  const { loading, order, error } = orderPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsOrder(params.id));
    }
    return () => (clean = false);
  }, [dispatch, params.id]);

  return (
    <Loading loading={loading} error={error}>
      {order && (
        <div>
          <Helmet>
            <title>Your Order | Glow LEDs</title>
            <meta property="og:title" content="Your Order" />
            <meta name="twitter:title" content="Your Order" />
            <link rel="canonical" href={"https://www.glow-leds.com/secure/account/order/" + params.id} />
            <meta property="og:url" content={"https://www.glow-leds.com/secure/account/order/" + params.id} />
          </Helmet>
          {order.status === "paid" ? <CheckoutSteps step1 step2 step3 step4 /> : <CheckoutSteps step1 step2 step3 />}
          <div className="mb-10px ml-20px jc-b">
            <div>
              {current_user?.isAdmin && (
                <Link to={location?.state?.prevPath || "/secure/glow/orders"}>
                  <GLButton variant="secondary">Back to Admin Orders</GLButton>
                </Link>
              )}
              {current_user && current_user.first_name && (
                <Link to={"/secure/account/profile"}>
                  <GLButton variant="secondary">Back to Profile</GLButton>
                </Link>
              )}
            </div>
          </div>
          <div className="placeorder br-20px" style={{}}>
            <div className="placeorder-info">
              <div
                style={{
                  backgroundColor: width > 407 && determineOrderColors(order),
                }}
              >
                <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                  <h2>Email</h2>
                  <div>{order.shipping.email}</div>
                </Box>
                <div className="jc-b w-100per mb-2rem" style={{ borderTop: ".1rem white solid" }} />
                <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                  <h2>Order Status:</h2>
                  <p>{toTitleCase(order.status)}</p>
                </Box>
                <div className="jc-b w-100per mb-2rem" style={{ borderTop: ".1rem white solid" }} />
                <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                  <h2>Order #:</h2>
                  {order._id}
                </Box>
              </div>
              <div
                style={{
                  backgroundColor: width > 407 && determineOrderColors(order),
                }}
              >
                {order.isRefunded && (
                  <h1>
                    Refunded: {order.payment.refund_reason[order.payment.refund_reason.length - 1]} on{" "}
                    {format_date(order.refundedAt)}
                  </h1>
                )}

                <div className="wrap jc-b">
                  <div className="w-100per ">
                    <h2>Shipping</h2>
                    <div className="jc-b w-100per mb-2rem" style={{ borderTop: ".1rem white solid" }} />
                    {order.tracking_number &&
                      order.tracking_number.length > 0 &&
                      determine_tracking_link(order.tracking_number) && (
                        <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                          <h3>Tracking #:</h3>
                          <a
                            href={
                              order.tracking_url ? order.tracking_url : determine_tracking_link(order.tracking_number)
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "underline",
                              color: "white",
                            }}
                          >
                            {order.tracking_number}
                          </a>
                        </Box>
                      )}

                    {current_user?.isAdmin && order.return_tracking_number && (
                      <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                        <label>
                          <h3>Return #:</h3>
                          <a
                            href={determine_tracking_link(order.return_tracking_number)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "underline",
                              color: "white",
                            }}
                          >
                            {order.return_tracking_number}
                          </a>
                        </label>
                      </Box>
                    )}
                    <h3>Address</h3>
                    <div className="jc-b wrap w-100per">
                      <div className="paragraph_font lh-25px mb-1rem">
                        <div>
                          {order.shipping.first_name} {order.shipping.last_name}
                        </div>
                        <div>
                          {order.shipping.address_1} {order.shipping.address_2}
                        </div>
                        <div>
                          {order.shipping.city}, {order.shipping.state} {order.shipping.postalCode},{" "}
                          {order.shipping.country}
                        </div>
                        <div>{order.shipping.international && "International"}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-100per ">
                  <h3>Speed</h3>
                  {order.shipping.shipping_rate && (
                    <div className=" w-100per lh-25px">
                      <div className="ai-c jc-b w-100per">
                        <label className="mv-0px mr-5px">Carrier: </label>
                        <label className=" mv-0px">{order.shipping.shipping_rate.carrier} </label>
                      </div>
                      <div className="ai-c jc-b w-100per">
                        <label className="mv-0px mr-5px">Speed: </label>
                        <label className=" mv-0px">{order.shipping.shipping_rate.service} </label>
                      </div>
                      <div className="ai-c jc-b w-100per">
                        <label className="mv-0px mr-5px">Estimated Processing Time: </label>
                        <label className=" mv-0px">
                          {cartItems.some(item => item.processing_time) && (
                            <div>
                              {Math.max(...cartItems.map(item => item.processing_time[0]))} -{" "}
                              {Math.max(...cartItems.map(item => item.processing_time[1]))} business days
                            </div>
                          )}
                        </label>
                      </div>
                      <div className="ai-c jc-b w-100per">
                        <label className="mv-0px mr-5px">Estimated Delivery Time: </label>
                        <label className=" mv-0px">
                          {order.shipping.shipping_rate.est_delivery_days}{" "}
                          {order.shipping.shipping_rate.est_delivery_days === 1 ? "Business Day" : " Business Days"}{" "}
                        </label>
                      </div>
                      <div className="ai-c jc-b w-100per">
                        <label className="mv-0px mr-5px">Rate: </label>
                        <label className=" mv-0px">${order.shipping.shipping_rate.retail_rate}</label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: width > 407 && determineOrderColors(order),
                }}
              >
                <h2>Payment</h2>
                <div style={{ borderTop: ".1rem white solid", width: "100%" }}>
                  <p style={{ marginBottom: "0px" }}>
                    {order.status !== "unpaid" && order.paidAt ? "Paid at " + format_date(order.paidAt) : "Not Paid"}
                  </p>
                </div>
                {current_user?.isAdmin && (
                  <div className="">
                    <div className="pt-1rem" htmlFor="payment">
                      Payment Method: {order?.payment?.paymentMethod}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="placeorder-action" style={{ backgroundColor: width > 407 && determineOrderColors(order) }}>
              <ul>
                <li>
                  <h2 style={{ marginTop: 0 }}>Order Summary</h2>
                </li>
                <div
                  style={{
                    backgroundColor: width > 407 && determineOrderColors(order),
                  }}
                >
                  <ul className="cart-list-container mt-0px">
                    <li>
                      <div>Price</div>
                    </li>
                    {order.orderItems.length === 0 ? (
                      <div>Cart is empty</div>
                    ) : (
                      order.orderItems.map((item, index) => (
                        <CartItem item={item} index={index} show_quantity={false} />
                      ))
                    )}
                  </ul>
                </div>
                {!order.promo_code && (
                  <li>
                    <div>Subtotal</div>
                    <div>${order.itemsPrice && order.itemsPrice.toFixed(2)}</div>
                  </li>
                )}

                {order.promo_code && (
                  <li>
                    <del style={{ color: "red" }}>
                      <div style={{ color: "white" }}>Subtotal</div>
                    </del>
                    <div>
                      <del style={{ color: "red" }}>
                        <label style={{ color: "white" }}>
                          ${order.orderItems && getItemsTotal(order.orderItems).toFixed(2)}
                        </label>
                      </del>
                    </div>
                  </li>
                )}
                {order.promo_code && (
                  <li>
                    <div>Discount</div>
                    <div>-${(getItemsTotal(order.orderItems) - order.itemsPrice).toFixed(2)}</div>
                  </li>
                )}
                {order.promo_code && (
                  <li>
                    <div>New Subtotal</div>
                    <div>${order.itemsPrice.toFixed(2)}</div>
                  </li>
                )}
                <li>
                  <div>Tax</div>
                  <div>${order.taxPrice ? order.taxPrice.toFixed(2) : order.taxPrice}</div>
                </li>
                <li>
                  <div>Shipping</div>
                  <div>${order.shippingPrice ? order.shippingPrice.toFixed(2) : order.shippingPrice}</div>
                </li>

                {order.tip > 0 && (
                  <li>
                    <div>Tip</div>
                    <div>${order.tip ? order.tip.toFixed(2) : order.tip}</div>
                  </li>
                )}
                {!order.isRefunded && (
                  <li>
                    <div>Order Total</div>
                    <div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
                  </li>
                )}
                {order.isRefunded && (
                  <li>
                    <div>Order Total</div>
                    <del style={{ color: "red" }}>
                      <label style={{ color: "white" }}>
                        <div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
                      </label>
                    </del>
                  </li>
                )}
                {order.isRefunded && (
                  <li>
                    <div>Refund Amount</div>
                    <div>${(order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}</div>
                  </li>
                )}
                {order.isRefunded && (
                  <li>
                    <div>New Order Total</div>
                    <div>
                      ${(order.totalPrice - order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}
                    </div>
                  </li>
                )}

                {order.promo_code && (
                  <div className="">
                    <div style={{ borderTop: ".1rem white solid" }} className="pt-1rem" htmlFor="promo_code">
                      Promo Code: {order.promo_code}
                    </div>
                  </div>
                )}
                {order.order_note && (
                  <div className="">
                    <div style={{ borderTop: ".1rem white solid" }} className="pt-1rem" htmlFor="order_note">
                      Order Note: {order.order_note}
                    </div>
                  </div>
                )}
                {order.production_note && (
                  <div className="">
                    <div style={{ borderTop: ".1rem white solid" }} className="pt-1rem" htmlFor="production_note">
                      Production Note: {order.production_note}
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Loading>
  );
};

export default OrderPage;
