import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api";
import { closeRefundModal, setRefundAmount, setRefundReason } from "../../../slices/orderSlice";

const RefundOrderModal = () => {
  const orderPage = useSelector(state => state.orders.orderPage);
  const { refundModal, refundAmount, refundReason, order } = orderPage;
  const dispatch = useDispatch();

  const refundOrder = amount => {
    const confirm = window.confirm("Are you sure you want to Refund this Order?");
    if (confirm) {
      dispatch(API.refundOrder({ orderId: order._id, refundAmount: parseFloat(amount).toFixed(2), refundReason }));
    }
  };
  return (
    <GLActionModal
      isOpen={refundModal}
      onConfirm={() => refundOrder(refundAmount)}
      onCancel={() => refundOrder(order.totalPrice)}
      onAction={() => dispatch(closeRefundModal())}
      title={"Refund Order"}
      confirmLabel={"Refund Partial Amount"}
      confirmColor="primary"
      actionLabel={"Cancel"}
      actionColor="primary"
      cancelLabel={"Refund Full Amount"}
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
