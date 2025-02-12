
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import Typography from "@mui/material/Typography";
import Info from "@mui/icons-material/Info";

import GLBold from "../../../shared/GlowLEDsComponents/GLBold/GLBold";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOpen } from "../placeOrderSlice";

const ProcessingConfirmModal = ({ choose_shipping_rate, rate }) => {
  const dispatch = useDispatch();
  const placeOrder = useSelector(state => state.placeOrder);
  const { open } = placeOrder;
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const handleConfirm = rate => {
    choose_shipping_rate(rate);
    dispatch(setOpen(false));
  };
  return (
    <GLActionModal
      isOpen={open}
      onConfirm={() => handleConfirm(rate)}
      onCancel={handleClose}
      title="Confirm Shipping Process Time"
      confirmLabel="I Agree"
      confirmColor="primary"
      cancelLabel="Choose Different Speed"
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <Typography>
        <Info color="error" />
        {" The items in your order require at least"}{" "}
        <GLBold color="black">
          {cartItems.some(item => item.processing_time) && Math.max(...cartItems.map(item => item.processing_time[1]))}{" "}
          {"BUSINESS DAYS"}
        </GLBold>{" "}
        {"for processing, which does not include shipping time. Larger orders may need more time. Remember, faster"}
        {"shipping doesn't speed up processing time. Please adjust your expectations accordingly."}
      </Typography>
    </GLActionModal>
  );
};

export default ProcessingConfirmModal;
