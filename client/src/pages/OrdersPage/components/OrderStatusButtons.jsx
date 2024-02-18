import React, { useState } from "react";
import * as API from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { API_Emails } from "../../../utils";
import { toCapitalize, toTitleCase } from "../../../utils/helper_functions";
import { Loading } from "../../../shared/SharedComponents";
import config from "../../../config";
import { Box, Button, Grid, Typography } from "@mui/material";
import { OrderStatusEnum, nextStatus } from "../ordersPageHelpers";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";

const OrderStatusButtons = ({ order }) => {
  const dispatch = useDispatch();
  const orderPage = useSelector(state => state.orders.orderPage);
  const { loading_label } = orderPage;

  const updateOrder = (status, sendEmail) => {
    let updatePayload = { ...order };

    // Handling primary status changes with corresponding date fields
    if (Object.keys(OrderStatusEnum).includes(status.toUpperCase())) {
      if (order.status !== status) {
        updatePayload = { ...updatePayload, status, [`${status}At`]: new Date() };
      }
    } else {
      // Handling exceptional statuses
      switch (status) {
        case "updated":
          updatePayload.isUpdated = !order.isUpdated;
          updatePayload.updatedAt = new Date();
          break;
        case "reassured":
          updatePayload.isReassured = !order.isReassured;
          updatePayload.reassuredAt = new Date();
          break;
        case "paused":
          updatePayload.isPaused = !order.isPaused;
          updatePayload.pausedAt = new Date();
          break;
        case "prioritized":
          updatePayload.isPrioritized = !order.isPrioritized;
          updatePayload.prioritizedAt = new Date();
          break;
        case "refunded":
          updatePayload.isRefunded = !order.isRefunded;
          updatePayload.refundedAt = new Date();
          break;
        case "error":
          // Assuming you want to toggle or set an error state
          updatePayload.isError = !order.isError;
          updatePayload.errorAt = new Date();
          break;
        default:
          console.error("Unknown status: ", status);
          return;
      }
    }

    dispatch(API.saveOrder(updatePayload));

    if (sendEmail) {
      send_order_status_email(status);
    }
  };

  const send_order_status_email = async status => {
    // Email sending logic remains unchanged
    const emailSubject =
      status in OrderStatusEnum ? "Your Order has been " + toCapitalize(status) + "!" : "Order Update";
    const emailMessageToUser = ""; // Define your message to the user here

    await API_Emails.send_order_status_email(order, emailSubject, order.shipping.email, status, emailMessageToUser);
    await API_Emails.send_order_status_email(
      order,
      `${order.shipping.first_name}'s Order has been ${toCapitalize(status)}!`,
      config.REACT_APP_INFO_EMAIL,
      status,
      emailMessageToUser
    );
  };

  return (
    <div>
      <Loading loading={loading_label} />
      <Grid container spacing={1}>
        {order.status && (
          <>
            <Grid item xs={12}>
              <h3 className="fs-20px mv-5px">Status {toTitleCase(order.status)}</h3>
            </Grid>
            {order.status !== "paid" ? (
              <>
                {order.status !== "shipped" && (
                  <Grid item xs={12}>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={() => updateOrder(nextStatus(order.status), true)}
                    >
                      Set Status to {nextStatus(order.status, true)}
                    </Button>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <div className="mt-n15px mb-n5px">
                    <GLAutocomplete
                      value={order.status}
                      variant={"filled"}
                      options={Object.values(OrderStatusEnum)}
                      optionDisplay={option => toTitleCase(option)}
                      getOptionLabel={option => toTitleCase(option)}
                      fullWidth
                      isOptionEqualToValue={(option, value) => option === value}
                      name="status"
                      label="Jump To Status"
                      onChange={(e, value) => updateOrder(value, false)}
                    />
                  </div>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid"
                  borderRadius={1}
                  p={1}
                >
                  <Typography variant="h3" fontSize={16} textAlign="center">
                    Buy Label to Change Status
                  </Typography>
                </Box>
              </Grid>
            )}
          </>
        )}
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => updateOrder("updated", !order.isUpdated)}
          >
            {order.isUpdated ? "Unset" : "Set"} to Updated
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => updateOrder("updated", !order.isUpdated)}
          >
            {order.isUpdated ? "Unset" : "Set"} to Updated
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth onClick={() => updateOrder("prioritized", false)}>
            {order.isPrioritized ? "Unset" : "Set"} to Prioritized
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => updateOrder("reassured", !order.isReassured)}
          >
            {order.isReassured ? "Unset" : "Set"} to Reassured
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth onClick={() => updateOrder("paused", false)}>
            {order.isPaused ? "Unset" : "Set"} to Paused
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => updateOrder("refunded", !order.isRefunded)}
          >
            {order.isRefunded ? "Unset" : "Set"} to Refunded
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderStatusButtons;
