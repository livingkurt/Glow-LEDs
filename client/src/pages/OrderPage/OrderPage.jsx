import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { determine_tracking_link, determineCartTotal, format_date, toTitleCase } from "../../utils/helper_functions";
import { Helmet } from "react-helmet";
import { Loading } from "../../shared/SharedComponents";
import useWindowDimensions from "../../shared/Hooks/useWindowDimensions";
import CheckoutSteps from "../../shared/SharedComponents/CheckoutSteps";
import * as API from "../../api";
import { determineOrderColors } from "../OrdersPage/ordersPageHelpers";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import OrderSummary from "../PlaceOrderPage/components/OrderSummary";
import { getHasPreOrderItems, hasActiveSaleItems } from "../PlaceOrderPage/placeOrderHelpers";
import { Typography } from "@mui/material";

const OrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

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

  const hasPreOrderItems = getHasPreOrderItems(order.orderItems);

  // Calculate service fee for tickets
  const ticketItems = order.orderItems.filter(item => item.itemType === "ticket");
  const ticketTotal = ticketItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const serviceFee = ticketTotal * 0.1; // 10% service fee

  // Add these new calculations
  const originalTotal = order.orderItems.reduce((total, item) => {
    const originalPrice = item.previous_price || item.price;
    return total + originalPrice * item.quantity;
  }, 0);

  const saleTotal = determineCartTotal(order.orderItems, current_user.isWholesaler);

  const hasSaleItems = hasActiveSaleItems(order.orderItems);
  const hasActiveDiscounts = hasSaleItems || order.promo || order?.giftCards?.length > 0;

  return (
    <Container maxWidth="lg">
      <Loading loading={loading} error={error}>
        {order && (
          <div>
            <Helmet>
              <title>{"Your Order | Glow LEDs"}</title>
              <meta property="og:title" content="Your Order" />
              <meta name="twitter:title" content="Your Order" />
              <link rel="canonical" href={"https://www.glow-leds.com/secure/account/order/" + params.id} />
              <meta property="og:url" content={"https://www.glow-leds.com/secure/account/order/" + params.id} />
            </Helmet>
            <Box display="flex" gap={1} ml={2} pt={2}>
              {current_user?.isAdmin && (
                <Link to={location?.state?.prevPath || "/secure/glow/orders"}>
                  <Button variant="contained" color="secondary">
                    {"Back to Admin Orders"}
                  </Button>
                </Link>
              )}
              {current_user && current_user.first_name && (
                <Link to="/secure/account/profile">
                  <Button variant="contained" color="secondary">
                    {"Back to Profile"}
                  </Button>
                </Link>
              )}
            </Box>
            <Box mt={2}>
              {order.status === "paid" ? (
                <CheckoutSteps step1 step2 step3 step4 />
              ) : (
                <CheckoutSteps step1 step2 step3 />
              )}
            </Box>
            <div className="place_order br-20px" style={{}}>
              <div className="place_order-info">
                <div
                  style={{
                    backgroundColor: width > 407 && determineOrderColors(order),
                  }}
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5">{"Email"}</Typography>
                    <div>{order.shipping.email}</div>
                  </Box>
                  <div className="jc-b w-100per mb-2rem" style={{ borderTop: ".1rem white solid" }} />
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5">{"Order Status:"}</Typography>
                    <p>{toTitleCase(order.status)}</p>
                  </Box>
                  <div className="jc-b w-100per mb-2rem" style={{ borderTop: ".1rem white solid" }} />
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5">{"Order #:"}</Typography>
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
                      {"Refunded: "}
                      {order.payment.refund_reason[order.payment.refund_reason.length - 1]}
                      {" on"} {format_date(order.refundedAt)}
                    </h1>
                  )}

                  <div className="wrap jc-b">
                    <div className="w-100per ">
                      <Typography variant="h5">{"Shipping"}</Typography>
                      <div className="jc-b w-100per mb-2rem" style={{ borderTop: ".1rem white solid" }} />
                      {order.tracking_number &&
                        order.tracking_number.length > 0 &&
                        determine_tracking_link(order.tracking_number) && (
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h5">{"Tracking #:"}</Typography>
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
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <div>
                            <Typography variant="h5">{"Return #:"}</Typography>
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
                          </div>
                        </Box>
                      )}
                      <Typography variant="h5">{"Address"}</Typography>
                      <div className="jc-b wrap w-100per">
                        <div className="paragraph_font lh-25px mb-1rem">
                          <div>
                            {order.shipping.first_name} {order.shipping.last_name}
                          </div>
                          <div>
                            {order.shipping.address_1} {order.shipping.address_2}
                          </div>
                          <div>
                            {order.shipping.city}
                            {", "}
                            {order.shipping.state} {order.shipping.postalCode}
                            {","} {order.shipping.country}
                          </div>
                          <div>{order.shipping.international && "International"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-100per ">
                    <Typography variant="h5">{"Speed"}</Typography>
                    {order.shipping.shipping_rate && (
                      <div className=" w-100per lh-25px">
                        <div className="ai-c jc-b w-100per">
                          <div className="mv-0px mr-5px">{"Carrier: "}</div>
                          <div className=" mv-0px">{order.shipping.shipping_rate.carrier} </div>
                        </div>
                        <div className="ai-c jc-b w-100per">
                          <div className="mv-0px mr-5px">{"Speed: "}</div>
                          <div className=" mv-0px">{order.shipping.shipping_rate.service} </div>
                        </div>
                        <div className="ai-c jc-b w-100per">
                          <div className="mv-0px mr-5px">{"Estimated Processing Time: "}</div>
                          <div className=" mv-0px">
                            {order.orderItems
                              .filter(item => item.itemType === "product")
                              .some(item => item.processing_time) && (
                              <div>
                                {Math.max(
                                  ...order.orderItems
                                    .filter(item => item.itemType === "product")
                                    .map(item => item.processing_time[0])
                                )}{" "}
                                {"-"}{" "}
                                {Math.max(
                                  ...order.orderItems
                                    .filter(item => item.itemType === "product")
                                    .map(item => item.processing_time[1])
                                )}{" "}
                                {"business days"}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ai-c jc-b w-100per">
                          <div className="mv-0px mr-5px">{"Estimated Delivery Time: "}</div>
                          <div className=" mv-0px">
                            {order.shipping.shipping_rate.est_delivery_days}{" "}
                            {order.shipping.shipping_rate.est_delivery_days === 1 ? "Business Day" : " Business Days"}{" "}
                          </div>
                        </div>
                        <div className="ai-c jc-b w-100per">
                          <div className="mv-0px mr-5px">{"Rate: "}</div>
                          <div className=" mv-0px">
                            {"$"}{" "}
                            {order.shipping.international
                              ? order.shipping.shipping_rate.rate
                              : order.shipping.shipping_rate.list_rate || order.shipping.shipping_rate.rate}
                          </div>
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
                  <Typography variant="h5">{"Payment"}</Typography>
                  <div style={{ borderTop: ".1rem white solid", width: "100%" }}>
                    <p style={{ marginBottom: "0px" }}>
                      {order.status !== "unpaid" && order.paidAt ? "Paid at " + format_date(order.paidAt) : "Not Paid"}
                    </p>
                  </div>
                  {current_user?.isAdmin && (
                    <div className="">
                      <div className="pt-1rem" htmlFor="payment">
                        {"Payment Method: "}
                        {order?.payment?.paymentMethod}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <OrderSummary
                backgroundColor={width > 407 && determineOrderColors(order)}
                loading={loading}
                shippingPrice={order.shippingPrice}
                previousShippingPrice={order.previousShippingPrice}
                previousNonPreOrderShippingPrice={order.previousNonPreOrderShippingPrice}
                previousPreOrderShippingPrice={order.previousPreOrderShippingPrice}
                tip={order.tip}
                itemsPrice={order.itemsPrice}
                taxPrice={order.taxPrice}
                totalPrice={order.totalPrice}
                preOrderShippingPrice={order.preOrderShippingPrice}
                nonPreOrderShippingPrice={order.nonPreOrderShippingPrice}
                splitOrder={order.splitOrder}
                show_payment={true}
                payment_completed={true}
                active_promo_codes={[order.promo]}
                active_gift_cards={order.giftCards}
                cartItems={order.orderItems}
                shipping={order.shipping}
                originalTotal={originalTotal}
                hasPreOrderItems={hasPreOrderItems}
                hasSaleItems={hasSaleItems}
                serviceFee={serviceFee}
                hasActiveDiscounts={hasActiveDiscounts}
                saleTotal={saleTotal}
              />
            </div>
          </div>
        )}
      </Loading>
    </Container>
  );
};

export default OrderPage;
