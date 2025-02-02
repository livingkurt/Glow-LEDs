import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import ReturnItemsModal from "./ReturnItemsModal";
import ReturnHistory from "./ReturnHistory";
import * as API from "../../../api";
import { Loading } from "../../../shared/SharedComponents";
import { printCustomerLabel, printInvoice, printLabel } from "../ordersPageHelpers";
import { openLinkLabelModal } from "../../../slices/shippingSlice";
import { openShippingModal, set_order } from "../../../slices/orderSlice";
import { showConfirm, showSuccess } from "../../../slices/snackbarSlice";
import { useProductsQuery } from "../../../api/allRecordsApi";
import { API_Orders } from "../../../utils";

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

  const productsQuery = useProductsQuery({ hidden: false });
  // Only show return button if order is delivered and has items that can be returned
  const canReturn =
    order.status === "delivered" &&
    order.orderItems?.some(item => {
      const returnedQty = (order.returns || []).reduce((total, returnRecord) => {
        const returnItem = returnRecord.returnItems.find(ri => ri.product === item.product);
        return total + (returnItem?.returnQuantity || 0);
      }, 0);
      return returnedQty < item.quantity;
    });

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
                dispatch(
                  showConfirm({
                    title: "Are you sure you want REFUND the LABEL for this order?",
                    inputLabel: "Describe the why you made this change to the order",
                    onConfirm: inputText => {
                      dispatch(
                        API.refundLabel({
                          orderId: order._id,
                          isReturnTracking: false,
                          reason: inputText,
                        })
                      );
                    },
                  })
                );
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
                          shipping_tracker: null,
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
        {canReturn && (
          <Grid item xs={12}>
            <Button
              color="secondary"
              variant="contained"
              className="w-100per mv-5px"
              onClick={() => setReturnModalOpen(true)}
            >
              {"Return/Exchange Items"}
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
                  dispatch(
                    showConfirm({
                      title: "Are you sure you want REFUND the RETURN LABEL for this order?",
                      inputLabel: "Describe the why you made this change to the order",
                      onConfirm: inputText => {
                        dispatch(
                          API.refundLabel({
                            orderId: order._id,
                            isReturnTracking: true,
                            reason: inputText,
                          })
                        );
                      },
                    })
                  );
                }}
              >
                {"Refund Return Label"}
              </Button>
            </Grid>
          </>
        )}
      </Grid>

      <ReturnHistory returns={order.returns} />

      <ReturnItemsModal
        open={returnModalOpen}
        onClose={() => setReturnModalOpen(false)}
        order={order}
        onConfirm={returnData => {
          dispatch(
            API.initiateReturnExchange({
              orderId: order._id,
              returnItems: returnData.returningItems.map(item => ({
                ...item,
                quantity: item.returnQuantity,
                reason: item.returnReason,
                isPartialReturn: item.isPartialReturn,
                partialReturnDetails: item.partialReturnDetails,
              })),
              exchangeItems: returnData.exchangeItems,
            })
          );
          setReturnModalOpen(false);
        }}
        availableProducts={productsQuery.isLoading ? [] : productsQuery.data}
      />
    </div>
  );
};

export default OrderActionButtons;
