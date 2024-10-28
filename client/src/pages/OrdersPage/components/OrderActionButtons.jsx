import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api";
import { API_Orders } from "../../../utils";
import { Loading } from "../../../shared/SharedComponents";
import { printInvoice, printLabel } from "../ordersPageHelpers";
import { openLinkLabelModal } from "../../../slices/shippingSlice";
import { openShippingModal, set_order } from "../../../slices/orderSlice";
import { showConfirm, showSuccess } from "../../../slices/snackbarSlice";
import { Button, Grid } from "@mui/material";

const OrderActionButtons = ({ order }) => {
  const dispatch = useDispatch();

  const shippingSlice = useSelector(state => state.shipping.shippingPage);
  const { loading_label } = shippingSlice;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  return (
    <div>
      <Loading loading={loading_label} />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3 className="fs-20px mv-5px">{"Actions"}</h3>
        </Grid>
        {order.shipping.shipping_label && (
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => printLabel(order.shipping.shipping_label.postage_label.label_url)}
              className="w-100per mv-5px"
            >
              {"Print Label"}
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            onClick={async () => {
              const { data: invoice } = await API_Orders.get_invoice(order._id);
              printInvoice(invoice);
            }}
            className="w-100per mv-5px"
          >
            {"Print Invoice"}
          </Button>
        </Grid>
        {order.shipping.shipment_id !== null && !order.shipping.shipping_label && (
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => dispatch(API.buyLabel({ orderId: order._id }))}
              className="w-100per mv-5px"
            >
              {"Buy Label"}
            </Button>
          </Grid>
        )}
        {order.shipping.shipping_label && (
          <Grid item xs={12}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                const confirm = window.confirm("Are you sure you want REFUND the LABEL for this order?");
                if (confirm) {
                  dispatch(API.refundLabel({ orderId: order._id, isReturnTracking: false }));
                }
              }}
              className="w-100per mv-5px"
            >
              {"Refund Label"}
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            color={order.shipping.shipment_id === null ? "primary" : "secondary"}
            variant="contained"
            className="w-100per mv-5px"
            onClick={() => dispatch(openShippingModal(order))}
          >
            {"Choose New Shipping Rate"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            className="w-100per mv-5px"
            onClick={() => {
              dispatch(
                showConfirm({
                  title: "Are you sure you want CLEAR the LABEL for this order?",
                  inputLabel: "Describe the why you made this change to the order",
                  onConfirm: inputText => {
                    dispatch(
                      API.saveOrder({
                        ...order,
                        shipping: {
                          ...order.shipping,
                          shipment_id: null,
                          shipping_rate: null,
                          shipment_tracker: null,
                          shipping_label: null,
                          return_shipment_id: null,
                          return_shipping_rate: null,
                          return_shipment_tracker: null,
                          return_shipping_label: null,
                        },
                        isUpdated: true,
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

                    dispatch(showSuccess({ message: `Label and Tracking Cleared for Order` }));
                  },
                })
              );
            }}
          >
            {"Clear Shipping Label"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            className="w-100per mv-5px"
            onClick={() => {
              dispatch(API.getShipments());
              dispatch(set_order(order));
              dispatch(openLinkLabelModal());
            }}
          >
            {"Link Order to Label"}
          </Button>
        </Grid>
        {!order.shipping.return_shipping_label && (
          <Grid item xs={12}>
            <Button
              color="secondary"
              variant="contained"
              className="w-100per mv-5px"
              onClick={() =>
                dispatch(
                  showConfirm({
                    title: "Are you sure you want to Buy a RETURN Label for this Order?",
                    inputLabel: "Describe the why you made this change to the order",
                    onConfirm: inputText => {
                      dispatch(API.createReturnLabel({ orderId: order._id }));
                      dispatch(
                        API.saveOrder({
                          ...order,
                          isUpdated: true,
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
                )
              }
            >
              {"Buy Return Label Production"}
            </Button>
          </Grid>
        )}
        {!order.shipping.return_shipping_label && (
          <Grid item xs={12}>
            <Button
              color="secondary"
              variant="contained"
              className="w-100per mv-5px"
              onClick={() => dispatch(API.createReturnLabel({ orderId: order._id, returnToHeadquarters: true }))}
            >
              {"Buy Return Label To HQ"}
            </Button>
          </Grid>
        )}
        {order.shipping.return_shipping_label && (
          <Grid item xs={12}>
            <Button
              color="secondary"
              variant="contained"
              className="w-100per mv-5px"
              onClick={() => printLabel(order.shipping.return_shipping_label.postage_label.label_url)}
            >
              {"Print Return Label"}
            </Button>
          </Grid>
        )}
        {order.shipping.return_shipping_label && (
          <Grid item xs={12}>
            <Button
              color="secondary"
              variant="contained"
              className="w-100per mv-5px"
              onClick={() => {
                const confirm = window.confirm("Are you sure you want REFUND the RETURN LABEL for this order?");
                if (confirm) {
                  dispatch(API.refundLabel({ orderId: order._id, isReturnTracking: true }));
                }
              }}
            >
              {"Refund Return Label"}
            </Button>
          </Grid>
        )}
        {order.shipping.return_shipping_label && (
          <Grid item xs={12}>
            <a
              href={order.shipping.return_shipping_label.postage_label.label_url}
              style={{ width: "100%" }}
              target="_blank"
              rel="noreferrer"
              download={order.shipping.return_shipping_label.postage_label.label_url}
            >
              <Button color="secondary" variant="contained" className="mv-5px w-100per">
                {"Download Return Label"}
              </Button>
            </a>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default OrderActionButtons;
