import * as API from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { API_Emails } from "../../../utils";
import { toTitleCase } from "../../../utils/helper_functions";
import { Loading } from "../../../shared/SharedComponents";

import { orderStatusColors, nextStatus } from "../ordersPageHelpers";
import { GLAutocomplete } from "../../../shared/GlowLEDsComponents";
import { showConfirm } from "../../../slices/snackbarSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const OrderStatusButtons = ({ order }) => {
  const dispatch = useDispatch();
  const orderPage = useSelector(state => state.orders.orderPage);
  const { loading_label } = orderPage;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const updateOrder = (status, sendEmail) => {
    let updatePayload = { ...order };

    // Handling primary status changes with corresponding date fields
    if (Object.keys(orderStatusColors).includes(status)) {
      if (order.status !== status) {
        updatePayload = { ...updatePayload, status, [`${status}At`]: new Date() };
      }
    } else {
      // Handling exceptional statuses
      switch (status) {
        case "updated":
          updatePayload.isUpdated = !order.isUpdated;
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
        case "print_issue":
          updatePayload.isPrintIssue = !order.isPrintIssue;
          break;
        case "error":
          // Assuming you want to toggle or set an error state
          updatePayload.isError = !order.isError;
          updatePayload.errorAt = new Date();
          break;
        default:
          // eslint-disable-next-line no-console
          console.error("Unknown status: ", status);
          return;
      }
    }
    if (status === "print_issue") {
      dispatch(
        showConfirm({
          title: `What ${order.isPrintIssue ? "solved" : "caused"} the Print issue?`,
          inputLabel: `Describe what ${order.isPrintIssue ? "solved" : "caused"} the print issue?`,
          onConfirm: inputText => {
            dispatch(
              API.saveOrder({
                ...order,
                isPrintIssue: !order.isPrintIssue,
                change_log: [
                  ...order.change_log,
                  {
                    change: inputText,
                    changedAt: new Date(),
                    changedBy: current_user,
                  },
                ],
              })
            );
          },
        })
      );
    } else {
      dispatch(API.saveOrder(updatePayload));
    }

    if (sendEmail) {
      send_order_status_email(status);
    }
  };

  const send_order_status_email = async status => {
    // Email sending logic remains unchanged
    const emailSubject =
      status in orderStatusColors
        ? `Your Order has ${status === "crafting" ? "begun" : "been"} ${orderStatusColors[status].name}!`
        : "Order Update";
    const emailMessageToUser = ""; // Define your message to the user here

    await API_Emails.send_order_status_email(order, emailSubject, order.shipping.email, status, emailMessageToUser);
  };

  return (
    <div>
      <Loading loading={loading_label} />
      <Grid container spacing={1}>
        {order.status && (
          <>
            <Grid item xs={12}>
              <h3 className="fs-20px mv-5px">
                {"Status "}
                {toTitleCase(order.status)}
              </h3>
            </Grid>
            {order.status === "paid" && (
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid"
                  borderRadius={1}
                  p={1}
                >
                  <Typography variant="button" textAlign="center">
                    {"Buy Label to Change Status"}
                  </Typography>
                </Box>
              </Grid>
            )}
            {order.status === "packaged" && (
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid"
                  borderRadius={1}
                  p={1}
                >
                  <Typography variant="button" textAlign="center">
                    {"Will Change to Shipped"}
                  </Typography>
                </Box>
              </Grid>
            )}
            {(order.status === "label_created" || order.status === "crafted" || order.status === "crafting") && (
              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => updateOrder(nextStatus(order.status, order.orderItems), true)}
                >
                  {"Set Status to "}
                  {nextStatus(order.status, order.orderItems, true)}
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <div className="mt-n15px mb-n5px">
                <GLAutocomplete
                  value={order.status}
                  variant="filled"
                  options={Object.keys(orderStatusColors)}
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
        )}
        {order.isUpdated && (
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth onClick={() => updateOrder("updated", false)}>
              {"Update Acknowledged"}
            </Button>
          </Grid>
        )}
        {order.isPrintIssue && (
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => {
                updateOrder("print_issue", false);
              }}
            >
              {"Print Issue Acknowledged"}
            </Button>
          </Grid>
        )}
        {(order.status === "paid" ||
          order.status === "shipped" ||
          order.status === "crafted" ||
          order.status === "crafting" ||
          order.status === "shipped" ||
          order.status === "packaged") && (
          <Grid item xs={12}>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={() => send_order_status_email(order.status)}
            >
              {"Send "}
              {toTitleCase(order.status)} {"Status Email"}
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => updateOrder("updated", !order.isUpdated)}
          >
            {order.isUpdated ? "Unset" : "Set"} {"to Updated"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth onClick={() => updateOrder("print_issue", false)}>
            {order.isPrintIssue ? "Unset" : "Set"} {"to Print Issue"}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth onClick={() => updateOrder("prioritized", false)}>
            {order.isPrioritized ? "Unset" : "Set"} {"to Prioritized"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => updateOrder("reassured", !order.isReassured)}
          >
            {order.isReassured ? "Unset" : "Set"} {"to Reassured"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth onClick={() => updateOrder("paused", false)}>
            {order.isPaused ? "Unset" : "Set"} {"to Paused"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => updateOrder("refunded", !order.isRefunded)}
          >
            {order.isRefunded ? "Unset" : "Set"} {"to Refunded"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderStatusButtons;
