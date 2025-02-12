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
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
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

            <Box mt={2} mb={4}>
              {order.status === "paid" ? (
                <CheckoutSteps step1 step2 step3 step4 />
              ) : (
                <CheckoutSteps step1 step2 step3 />
              )}
            </Box>

            <Grid container spacing={3}>
              {/* Order Details Section - Moving to right side */}
              <Grid item xs={12} md={5}>
                <Grid container spacing={2}>
                  {/* Order Info Section */}
                  <Grid item xs={12}>
                    <Paper
                      elevation={3}
                      style={{
                        backgroundColor: width > 407 && determineOrderColors(order),
                        borderRadius: "10px",
                        padding: "20px",
                        color: "white",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h5" style={{ color: "white" }}>
                              {"Email"}
                            </Typography>
                            <Typography style={{ color: "white" }}>{order.shipping.email}</Typography>
                          </Box>
                          <Box my={2} borderBottom={1} borderColor="grey.300" />
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h5" style={{ color: "white" }}>
                              {"Order Status:"}
                            </Typography>
                            <Typography style={{ color: "white" }}>{toTitleCase(order.status)}</Typography>
                          </Box>
                          <Box my={2} borderBottom={1} borderColor="grey.300" />
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h5" style={{ color: "white" }}>
                              {"Order #:"}
                            </Typography>
                            <Typography style={{ color: "white" }}>{order._id}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Shipping Section */}
                  <Grid item xs={12}>
                    <Paper
                      elevation={3}
                      style={{
                        backgroundColor: width > 407 && determineOrderColors(order),
                        borderRadius: "10px",
                        padding: "20px",
                        color: "white",
                      }}
                    >
                      <Grid container spacing={2}>
                        {order.isRefunded && (
                          <Grid item xs={12}>
                            <Typography variant="h6" style={{ color: "error" }}>
                              {"Refunded: "}
                              {order.payment.refund_reason[order.payment.refund_reason.length - 1]}
                              {" on"} {format_date(order.refundedAt)}
                            </Typography>
                          </Grid>
                        )}

                        <Grid item xs={12}>
                          <Typography variant="h5" style={{ color: "white" }}>
                            {"Shipping"}
                          </Typography>
                          <Box my={2} borderBottom={1} borderColor="grey.300" />
                        </Grid>

                        {order.tracking_number &&
                          order.tracking_number.length > 0 &&
                          determine_tracking_link(order.tracking_number) && (
                            <Grid item xs={12}>
                              <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography variant="h6" style={{ color: "white" }}>
                                  {"Tracking #:"}
                                </Typography>
                                <a
                                  href={
                                    order.tracking_url
                                      ? order.tracking_url
                                      : determine_tracking_link(order.tracking_number)
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
                            </Grid>
                          )}

                        {current_user?.isAdmin && order.return_tracking_number && (
                          <Grid item xs={12}>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                              <Typography variant="h6" style={{ color: "white" }}>
                                {"Return #:"}
                              </Typography>
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
                            </Box>
                          </Grid>
                        )}

                        <Grid item xs={12}>
                          <Button
                            color="secondary"
                            variant="contained"
                            fullWidth
                            onClick={() => {
                              window.open(`/account/return_label?orderId=${order._id}`, "_blank");
                            }}
                          >
                            {"View Return Instructions"}
                          </Button>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="h5" gutterBottom style={{ color: "white" }}>
                            {"Address"}
                          </Typography>
                          <Box className="paragraph_font" lineHeight="25px">
                            <Typography style={{ color: "white" }}>
                              {order.shipping.first_name} {order.shipping.last_name}
                            </Typography>
                            <Typography style={{ color: "white" }}>
                              {order.shipping.address_1} {order.shipping.address_2}
                            </Typography>
                            <Typography style={{ color: "white" }}>
                              {order.shipping.city}
                              {", "}
                              {order.shipping.state} {order.shipping.postalCode}
                              {","} {order.shipping.country}
                            </Typography>
                            {order.shipping.international && (
                              <Typography style={{ color: "white" }}>{"International"}</Typography>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Speed Section */}
                  <Grid item xs={12}>
                    <Paper
                      elevation={3}
                      style={{
                        backgroundColor: width > 407 && determineOrderColors(order),
                        borderRadius: "10px",
                        padding: "20px",
                        color: "white",
                      }}
                    >
                      <Typography variant="h5" gutterBottom style={{ color: "white" }}>
                        {"Speed"}
                      </Typography>
                      {order.shipping.shipping_rate && (
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between">
                              <Typography style={{ color: "white" }}>{"Carrier:"}</Typography>
                              <Typography style={{ color: "white" }}>{order.shipping.shipping_rate.carrier}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between">
                              <Typography style={{ color: "white" }}>{"Speed:"}</Typography>
                              <Typography style={{ color: "white" }}>{order.shipping.shipping_rate.service}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between">
                              <Typography style={{ color: "white" }}>{"Estimated Processing Time:"}</Typography>
                              <Typography style={{ color: "white" }}>
                                {order.orderItems
                                  .filter(item => item.itemType === "product")
                                  .some(item => item.processing_time) && (
                                  <>
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
                                  </>
                                )}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between">
                              <Typography style={{ color: "white" }}>{"Estimated Delivery Time:"}</Typography>
                              <Typography style={{ color: "white" }}>
                                {order.shipping.shipping_rate.est_delivery_days}{" "}
                                {order.shipping.shipping_rate.est_delivery_days === 1
                                  ? "Business Day"
                                  : "Business Days"}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between">
                              <Typography style={{ color: "white" }}>{"Rate:"}</Typography>
                              <Typography style={{ color: "white" }}>
                                {"$"}{" "}
                                {order.shipping.international
                                  ? order.shipping.shipping_rate.rate
                                  : order.shipping.shipping_rate.list_rate || order.shipping.shipping_rate.rate}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      )}
                    </Paper>
                  </Grid>

                  {/* Payment Section */}
                  <Grid item xs={12}>
                    <Paper
                      elevation={3}
                      style={{
                        backgroundColor: width > 407 && determineOrderColors(order),
                        borderRadius: "10px",
                        padding: "20px",
                        color: "white",
                      }}
                    >
                      <Typography variant="h5" gutterBottom style={{ color: "white" }}>
                        {"Payment"}
                      </Typography>
                      <Typography style={{ color: "white" }}>
                        {order.status !== "unpaid" && order.paidAt
                          ? "Paid at " + format_date(order.paidAt)
                          : "Not Paid"}
                      </Typography>
                      {current_user?.isAdmin && (
                        <Box mt={2}>
                          <Typography style={{ color: "white" }}>
                            {"Payment Method: "}
                            {order?.payment?.paymentMethod}
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              {/* Order Summary Section */}
              <Grid item xs={12} md={7} style={{ alignSelf: "flex-start" }}>
                <Box>
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
                </Box>
              </Grid>
            </Grid>
          </div>
        )}
      </Loading>
    </Container>
  );
};

export default OrderPage;
