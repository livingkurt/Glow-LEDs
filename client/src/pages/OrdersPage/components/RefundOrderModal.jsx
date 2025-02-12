import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";

import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api";
import { closeRefundModal, setRefundAmount, setRefundReason } from "../../../slices/orderSlice";
import { showConfirm } from "../../../slices/snackbarSlice";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const RefundOrderModal = () => {
  const orderPage = useSelector(state => state.orders.orderPage);
  const { refundModal, refundAmount, refundReason, order } = orderPage;
  const dispatch = useDispatch();

  const refundOrder = amount => {
    dispatch(
      showConfirm({
        title: "Are you sure you want to REFUND this Order?",
        onConfirm: () => {
          dispatch(API.refundOrder({ orderId: order._id, refundAmount: parseFloat(amount).toFixed(2), refundReason }));
        },
      })
    );
  };
  return (
    <GLActionModal
      isOpen={refundModal}
      onConfirm={() => refundOrder(refundAmount)}
      onCancel={() => refundOrder(order.totalPrice)}
      onAction={() => dispatch(closeRefundModal())}
      title="Refund Order"
      confirmLabel="Refund Partial Amount"
      confirmColor="primary"
      actionLabel="Cancel"
      actionColor="primary"
      cancelLabel="Refund Full Amount"
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Refund Amount"
            value={refundAmount}
            name="refund_amount"
            id="refund_amount"
            fullWidth
            onChange={e => dispatch(setRefundAmount(e.target.value))}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Refund Reason"
            value={refundReason}
            name="refund_reason"
            id="refund_reason"
            fullWidth
            onChange={e => dispatch(setRefundReason(e.target.value))}
          />
        </Grid>
      </Grid>
    </GLActionModal>
  );
};

export default RefundOrderModal;
