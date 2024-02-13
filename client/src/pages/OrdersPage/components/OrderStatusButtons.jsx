import React from "react";
import * as API from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { API_Emails } from "../../../utils";
import { toCapitalize } from "../../../utils/helper_functions";
import { Loading } from "../../../shared/SharedComponents";
import config from "../../../config";
import { Button, Grid } from "@mui/material";

const OrderStatusButtons = ({ order }) => {
  const dispatch = useDispatch();
  const orderPage = useSelector(state => state.orders.orderPage);
  const { loading_label } = orderPage;

  const updateOrder = status => {
    let shouldSendEmail = false;
    switch (status) {
      case "paid":
        if (!order.isPaid) {
          shouldSendEmail = true;
        }
        dispatch(API.saveOrder({ ...order, isPaid: !order.isPaid, paidAt: new Date() }));
        break;
      case "reassured":
        if (!order.isReassured) {
          shouldSendEmail = true;
        }
        dispatch(API.saveOrder({ ...order, isReassured: !order.isReassured, reassuredAt: new Date() }));
        break;
      case "paused":
        if (!order.isPaused) {
          shouldSendEmail = true;
        }
        dispatch(API.saveOrder({ ...order, isPaused: !order.isPaused, pausedAt: new Date() }));
        break;
      case "crafting":
        if (!order.isCrafting) {
          shouldSendEmail = true;
        }
        dispatch(API.saveOrder({ ...order, isCrafting: !order.isCrafting, craftingAt: new Date() }));
        break;
      case "crafted":
        if (!order.isCrafted) {
          shouldSendEmail = true;
        }
        dispatch(API.saveOrder({ ...order, isCrafted: !order.isCrafted, craftedAt: new Date() }));
        break;
      case "packaged":
        if (!order.isPackaged) {
          shouldSendEmail = true;
        }
        dispatch(
          API.saveOrder({
            ...order,
            isCrafting: !order.isCrafting,
            craftingAt: new Date(),
            isCrafted: !order.isCrafted,
            craftedAt: new Date(),
            isPackaged: !order.isPackaged,
            packagedAt: new Date(),
          })
        );
        break;
      case "shipped":
        if (!order.isShipped) {
          shouldSendEmail = true;
        }
        dispatch(API.saveOrder({ ...order, isShipped: !order.isShipped, shippedAt: new Date() }));
        break;
      case "delivered":
        if (!order.isDelivered) {
          shouldSendEmail = true;
        }
        dispatch(API.saveOrder({ ...order, isDelivered: !order.isDelivered, deliveredAt: new Date() }));
        break;
      default:
        break;
    }
    if (status !== "paused" && shouldSendEmail) {
      send_order_status_email(status);
    }
  };

  const send_order_status_email = async (status, message_to_user) => {
    await API_Emails.send_order_status_email(
      order,
      "Your Order has been " + toCapitalize(status) + "!",
      order.shipping.email,
      status,
      message_to_user
    );
    await API_Emails.send_order_status_email(
      order,
      order.shipping.first_name + "'s Order has been " + toCapitalize(status) + "!",
      config.REACT_APP_INFO_EMAIL,
      status,
      message_to_user
    );
  };

  return (
    <div>
      <Loading loading={loading_label} />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3 className="fs-20px mv-5px">Order Status</h3>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disabled={!order.shipping.shipping_label}
            onClick={() => updateOrder("crafting")}
          >
            {order.isCrafting ? "Unset" : "Set"} to Crafting
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disabled={!order.shipping.shipping_label}
            onClick={() => updateOrder("crafted")}
          >
            {order.isCrafted ? "Unset" : "Set"} to Crafted
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disabled={!order.shipping.shipping_label}
            onClick={() => updateOrder("packaged")}
          >
            {order.isPackaged ? "Unset" : "Set"} to Packaged
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            disabled={!order.shipping.shipping_label}
            onClick={() => updateOrder("shipped")}
          >
            {order.isShipped ? "Unset" : "Set"} to Shipped
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            disabled={!order.shipping.shipping_label}
            onClick={() => updateOrder("delivered")}
          >
            {order.isShipped ? "Unset" : "Set"} to Delivered
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth onClick={() => updateOrder("updated")}>
            {order.isUpdated ? "Unset" : "Set"} to Updated
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth onClick={() => updateOrder("paid")}>
            {order.isPaid ? "Unset" : "Set"} to Paid
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth onClick={() => updateOrder("reassured")}>
            {order.isReassured ? "Unset" : "Set"} to Reassured
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth onClick={() => updateOrder("paused")}>
            {order.isPaused ? "Unset" : "Set"} to Paused
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth onClick={() => updateOrder("refunded")}>
            {order.isRefunded ? "Unset" : "Set"} to Refunded
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderStatusButtons;
