import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { set_loading_label } from "../../../slices/orderSlice";
import { API_Emails } from "../../../utils";
import { toCapitalize } from "../../../utils/helper_functions";
import { Loading } from "../../../shared/SharedComponents";

const OrderStatusButtons = ({ order }) => {
  const dispatch = useDispatch();
  const orderPage = useSelector(state => state.orders.orderPage);
  const { loading_label } = orderPage;
  const updateOrder = status => {
    switch (status) {
      case "paid":
        dispatch(API.saveOrder({ ...order, isPaid: !order.isPaid, paidAt: new Date() }));
        break;
      case "reassured":
        dispatch(API.saveOrder({ ...order, isReassured: !order.isReassured, reassuredAt: new Date() }));
        break;
      case "paused":
        dispatch(API.saveOrder({ ...order, isPaused: !order.isPaused, pausedAt: new Date() }));
        break;
      case "manufactured":
        dispatch(API.saveOrder({ ...order, isManufactured: !order.isManufactured, manufacturedAt: new Date() }));
        break;
      case "packaged":
        dispatch(API.saveOrder({ ...order, isPackaged: !order.isPackaged, packagedAt: new Date() }));
        break;
      case "shipped":
        dispatch(API.saveOrder({ ...order, isShipped: !order.isShipped, shippedAt: new Date() }));
        break;
      default:
        break;
    }
    send_order_status_email(status);
  };

  const send_order_status_email = async (status, message_to_user) => {
    await API_Emails.send_order_status_email(
      order,
      status === "manufactured" ? "Your Order has been Crafted!" : "Your Order has been " + toCapitalize(status) + "!",
      order.shipping.email,
      status,
      message_to_user
    );
    await API_Emails.send_order_status_email(
      order,
      status === "manufactured"
        ? order.shipping.first_name + "'s Order has been Crafted!"
        : order.shipping.first_name + "'s Order has been " + toCapitalize(status) + "!",
      process.env.REACT_APP_INFO_EMAIL,
      status,
      message_to_user
    );
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
      <Loading loading={loading_label} />
      {send_order_email && (
        <GLButton variant="primary" className="mv-5px w-100per" onClick={() => send_order_email()}>
          Send Order Email
        </GLButton>
      )}
      {send_order_email && (
        <GLButton variant="primary" className="mv-5px w-100per" onClick={() => send_order_status_email("updated")}>
          Send Update Order Email
        </GLButton>
      )}
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("paid")}>
        {order.isPaid ? "Unset" : "Set"} to Paid
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("reassured")}>
        {order.isReassured ? "Unset" : "Set"} to Reassured
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("paused")}>
        {order.isPaused ? "Unset" : "Set"} to Paused
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("manufactured")}>
        {order.isManufactured ? "Unset" : "Set"} to Manufactured
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("packaged")}>
        {order.isPackaged ? "Unset" : "Set"} to Packaged
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("shipped")}>
        {order.isShipped ? "Unset" : "Set"} to Shipped
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("refunded")}>
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
