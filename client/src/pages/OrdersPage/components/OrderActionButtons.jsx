import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api";
import { API_Orders } from "../../../utils";
import { Loading } from "../../../shared/SharedComponents";
import { printCustomerLabel, printInvoice, printLabel } from "../ordersPageHelpers";
import { openLinkLabelModal } from "../../../slices/shippingSlice";
import { openShippingModal, set_order } from "../../../slices/orderSlice";
import { showConfirm, showError, showSuccess } from "../../../slices/snackbarSlice";
import ReturnItemsModal from "./ReturnItemsModal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useProductsQuery } from "../../../api/allRecordsApi";

const OrderActionButtons = ({ order }) => {
  const dispatch = useDispatch();
  const [returnModalOpen, setReturnModalOpen] = useState(false);

  const shippingSlice = useSelector(state => state.shipping.shippingPage);
  const { loading_label } = shippingSlice;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const handlePrintReturnLabel = () => {
    const labelUrl = order?.shipping?.return_shipping_label?.postage_label?.label_url;
    const deadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days from now
    printCustomerLabel(labelUrl, order, deadline);
  };

  const handleReturnConfirm = async returnData => {
    console.log({ returnData });
    try {
      // Create return order
      dispatch(
        API.createReturnLabel({
          orderId: order._id,
          items: returnData.returningItems,
        })
      );

      // If there are exchange items, create a new order for them
      if (returnData.exchangeItems?.length > 0) {
        dispatch(
          API.saveOrder({
            ...order,
            _id: null,
            orderItems: returnData.exchangeItems,
            status: "paid",
            originalOrderId: order._id,
            returnItems: returnData.returningItems,
            change_log: [
              ...order.change_log,
              {
                change: "Return and exchange processed successfully",
                changedAt: new Date(),
                changedBy: current_user,
              },
            ],
          })
        );
      }

      // Show success message
      dispatch(showSuccess({ message: "Return and exchange processed successfully" }));
      setReturnModalOpen(false);
      // Refresh order list or navigate to return label page
    } catch (error) {
      dispatch(showError({ message: "Error processing return and exchange" }));
    }
  };

  const productsQuery = useProductsQuery({ hidden: false });

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
            å
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
              onClick={() => setReturnModalOpen(true)}
            >
              {"Send Return Instructions"}
            </Button>
          </Grid>
        )}
        {order.shipping.return_shipping_label && (
          <>
            <Grid item xs={12}>
              <Button
                color="secondary"
                variant="contained"
                className="w-100per mv-5px"
                onClick={handlePrintReturnLabel}
              >
                {"Print Return Label"}
              </Button>
            </Grid>
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
          </>
        )}
      </Grid>
      <ReturnItemsModal
        open={returnModalOpen}
        onClose={() => setReturnModalOpen(false)}
        order={order}
        onConfirm={handleReturnConfirm}
        availableProducts={productsQuery.isLoading ? [] : productsQuery.data}
      />
    </div>
  );
};

export default OrderActionButtons;
