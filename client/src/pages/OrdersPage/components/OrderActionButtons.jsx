import { useEffect } from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api";
import { API_Emails, API_Orders } from "../../../utils";
import { Loading } from "../../../shared/SharedComponents";
import { printInvoice, printLabel, sendEmail } from "../ordersPageHelpers";
import { clearPrints } from "../../../slices/shippingSlice";
import { toCapitalize } from "../../../utils/helper_functions";
import { openShippingModal, set_loading_label } from "../../../slices/orderSlice";

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
      <h3 className="fs-20px mv-5px">Actions</h3>
      <Loading loading={loading_label} />
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
      {/* {hide_label_button && !order.shipping.shipping_label && ( */}
      <GLButton variant="primary" onClick={() => dispatch(API.buyLabel({ orderId: order._id }))} className="w-100per mv-5px">
        Buy Label
      </GLButton>
      {/* )} */}
      {order.shipping.shipping_label && (
        <GLButton
          variant="secondary"
          className="w-100per mv-5px"
          onClick={() => dispatch(API.createLabel({ orderId: order._id, speed: "first" }))}
        >
          Replace Shipping Label
        </GLButton>
      )}
      {order.shipping.shipping_label && (
        <GLButton
          variant="secondary"
          onClick={() => {
            const confirm = window.confirm("Are you sure you want REFUND the LABEL for this order?");
            if (confirm) {
              dispatch(API.refundLabel({ orderId: order._id, isReturnTracking: false }));
            }
          }}
          className="w-100per mv-5px"
        >
          Refund Label
        </GLButton>
      )}

      <GLButton variant="secondary" className="w-100per mv-5px" onClick={() => dispatch(openShippingModal(order))}>
        Choose New Shipping Rate
      </GLButton>

      <GLButton
        variant="secondary"
        className="w-100per mv-5px"
        onClick={() =>
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
                return_shipping_label: null
              }
            })
          )
        }
      >
        Clear Shipping Label
      </GLButton>
      {!order.shipping.shipment_tracker && order.tracking_number && (
        <GLButton variant="secondary" className="w-100per mv-5px" onClick={() => dispatch(API.createTracker({ orderId: order._id }))}>
          Add Shipment Tracker
        </GLButton>
      )}
      {!order.shipping.return_shipping_label && (
        <GLButton variant="secondary" className="w-100per mv-5px" onClick={() => dispatch(API.createReturnLabel({ orderId: order._id }))}>
          Buy Return Label
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
        <GLButton
          variant="secondary"
          className="w-100per mv-5px"
          onClick={() => {
            const confirm = window.confirm("Are you sure you want REFUND the RETURN LABEL for this order?");
            if (confirm) {
              dispatch(API.refundLabel({ orderId: order._id, isReturnTracking: true }));
            }
          }}
        >
          Refund Return Label
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
    </div>
  );
};

export default OrderActionButtons;
