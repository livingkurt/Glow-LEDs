import { useEffect } from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api";
import { API_Orders } from "../../../utils";
import { Loading } from "../../../shared/SharedComponents";
import { printInvoice, printLabel, sendEmail } from "../ordersPageHelpers";
import { clearPrints } from "../../../slices/shippingSlice";

const OrderActionButtons = ({ order }) => {
  const dispatch = useDispatch();

  const orderPage = useSelector(state => state.orders.orderPage);
  const { hide_label_button } = orderPage;

  const shippingSlice = useSelector(state => state.shipping);
  const { invoice, label, loading_label } = shippingSlice;

  useEffect(() => {
    if (invoice.length > 0 && label.length > 0) {
      printInvoice(invoice);
      setTimeout(() => {
        printLabel(label);
      }, 1000);
      dispatch(clearPrints());
    } else if (label.length > 0) {
      printLabel(label);
      dispatch(clearPrints());
    }
  }, [invoice, label]);

  return (
    <div className="">
      <Loading loading={loading_label} />
      <GLButton variant="secondary" className="w-100per mv-10px" onClick={() => sendEmail("Hello", order)}>
        Send User a Message
      </GLButton>
      {hide_label_button && !order.shipping.shipping_label && (
        <GLButton variant="primary" onClick={() => dispatch(API.buyLabel({ orderId: order._id }))} className="w-100per mv-5px">
          Buy Label
        </GLButton>
      )}
      {order.shipping.shipping_label && (
        <GLButton
          variant="secondary"
          className="w-100per mv-5px"
          onClick={() => dispatch(API.createLabel({ orderId: order._id, speed: "first" }))}
        >
          Replace Shipping Label
        </GLButton>
      )}
      {!order.shipping.return_shipping_label && (
        <GLButton variant="secondary" className="w-100per mv-5px" onClick={() => dispatch(API.createReturnLabel({ orderId: order._id }))}>
          Create Return Label
        </GLButton>
      )}
      {order.shipping.return_shipping_label && (
        <GLButton
          variant="secondary"
          className="w-100per mv-5px"
          onClick={() => printLabel(order.shipping.return_shipping_label.postage_label.label_url)}
        >
          Print Return Label
        </GLButton>
      )}
      {order.shipping.return_shipping_label && (
        <a
          href={order.shipping.return_shipping_label.postage_label.label_url}
          style={{ width: "100%" }}
          target="_blank"
          rel="noreferrer"
          download={order.shipping.return_shipping_label.postage_label.label_url}
        >
          <GLButton variant="secondary" className="mv-5px w-100per">
            Download Return Label
          </GLButton>
        </a>
      )}
      {order.shipping.shipping_label && (
        <GLButton
          variant="primary"
          onClick={() => printLabel(order.shipping.shipping_label.postage_label.label_url)}
          className="w-100per mv-5px"
        >
          Print Label
        </GLButton>
      )}

      <GLButton
        variant="primary"
        onClick={async () => {
          const { data: invoice } = await API_Orders.get_invoice(order._id);
          printInvoice(invoice);
        }}
        className="w-100per mv-5px"
      >
        Print Invoice
      </GLButton>
    </div>
  );
};

export default OrderActionButtons;
