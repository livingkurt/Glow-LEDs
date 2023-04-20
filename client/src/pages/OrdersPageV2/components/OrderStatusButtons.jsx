import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";
import { useDispatch } from "react-redux";
import { set_loading_label } from "../../../slices/orderSlice";
import { API_Emails } from "../../../utils";

const OrderStatusButtons = ({ order }) => {
  const dispatch = useDispatch();
  const updateOrder = status => {
    switch (status) {
      case "isPaid":
        dispatch(API.saveOrder({ ...order, isPaid: !order.isPaid, paidAt: new Date() }));
        break;
      case "isReassured":
        dispatch(API.saveOrder({ ...order, isReassured: !order.isReassured, reassuredAt: new Date() }));
        break;
      case "isPaused":
        dispatch(API.saveOrder({ ...order, isPaused: !order.isPaused, pausedAt: new Date() }));
        break;
      case "isManufactured":
        dispatch(API.saveOrder({ ...order, isManufactured: !order.isManufactured, manufacturedAt: new Date() }));
        break;
      case "isPackaged":
        dispatch(API.saveOrder({ ...order, isPackaged: !order.isPackaged, packagedAt: new Date() }));
        break;
      case "isShipped":
        dispatch(API.saveOrder({ ...order, isShipped: !order.isShipped, shippedAt: new Date() }));
        break;
      default:
        break;
    }
  };

  const send_order_email = async () => {
    dispatch(set_loading_label(true));
    await API_Emails.send_order_email(order, "Thank you for your Glow LEDs Order", order.shipping.email);
    await API_Emails.send_order_email(order, "New Order Created by " + order.shipping.first_name, process.env.REACT_APP_INFO_EMAIL);

    dispatch(set_loading_label(false));
  };
  const send_refund_email = async () => {
    dispatch(set_loading_label(true));
    await API_Emails.send_refund_email(order, "Refund Successful", order.shipping.email, true);
    await API_Emails.send_refund_email(order, "New Refunded for " + order.shipping.first_name, process.env.REACT_APP_INFO_EMAIL, true);

    dispatch(set_loading_label(false));
  };
  return (
    <div>
      {send_order_email && (
        <GLButton variant="primary" className="mv-5px w-100per" onClick={() => send_order_email()}>
          Send Order Email
        </GLButton>
      )}

      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("isPaid")}>
        {order.isPaid ? "Unset" : "Set"} to Paid
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("isReassured")}>
        {order.isReassured ? "Unset" : "Set"} to Reassured
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("isPaused")}>
        {order.isPaused ? "Unset" : "Set"} to Paused
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("isManufactured")}>
        {order.isManufactured ? "Unset" : "Set"} to Manufactured
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("isPackaged")}>
        {order.isPackaged ? "Unset" : "Set"} to Packaged
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("isShipped")}>
        {order.isShipped ? "Unset" : "Set"} to Shipped
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("isRefunded")}>
        {order.isRefunded ? "Unset" : "Set"} to Refunded
      </GLButton>

      {send_refund_email && (
        <GLButton variant="primary" className="mv-5px w-100per" onClick={() => send_refund_email()}>
          Send Refund Email
        </GLButton>
      )}
    </div>
  );
};

export default OrderStatusButtons;
