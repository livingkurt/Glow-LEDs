import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { set_loading_label } from "../../../slices/orderSlice";
import { API_Emails } from "../../../utils";
import { toCapitalize } from "../../../utils/helper_functions";
import { Loading } from "../../../shared/SharedComponents";
import config from "../../../config";

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
      case "crafting":
        dispatch(API.saveOrder({ ...order, isCrafting: !order.isCrafting, craftingAt: new Date() }));
        break;
      case "crafted":
        dispatch(API.saveOrder({ ...order, isCrafted: !order.isCrafted, craftedAt: new Date() }));
        break;
      case "packaged":
        dispatch(
          API.saveOrder({
            ...order,
            isCrafting: !order.isCrafting,
            craftingAt: new Date(),
            isCrafted: !order.isCrafted,
            craftedAt: new Date(),
            isPackaged: !order.isPackaged,
            packagedAt: new Date()
          })
        );
        break;
      case "shipped":
        dispatch(API.saveOrder({ ...order, isShipped: !order.isShipped, shippedAt: new Date() }));
        break;
      default:
        break;
    }
    if (status !== "paused") {
      send_order_status_email(status);
    }
  };

  const send_order_status_email = async (status, message_to_user) => {
    await API_Emails.send_order_status_email(
      order,
      "Your Order has been " + toCapitalize(status) + "!",
      order.shipping.email,
      status,
      message_to_user
    );
    await API_Emails.send_order_status_email(
      order,
      order.shipping.first_name + "'s Order has been " + toCapitalize(status) + "!",
      config.REACT_APP_INFO_EMAIL,
      status,
      message_to_user
    );
  };

  return (
    <div>
      <h3 className="fs-20px mv-5px">Order Status</h3>
      <Loading loading={loading_label} />

      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("crafting")}>
        {order.isCrafting ? "Unset" : "Set"} to Crafting
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("crafted")}>
        {order.isCrafted ? "Unset" : "Set"} to Crafted
      </GLButton>
      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => updateOrder("packaged")}>
        {order.isPackaged ? "Unset" : "Set"} to Packaged
      </GLButton>
      <GLButton variant="secondary" className="mv-5px w-100per" onClick={() => updateOrder("shipped")}>
        {order.isShipped ? "Unset" : "Set"} to Shipped
      </GLButton>
      <GLButton variant="secondary" className="mv-5px w-100per" onClick={() => updateOrder("updated")}>
        {order.isUpdated ? "Unset" : "Set"} to Updated
      </GLButton>

      <GLButton variant="secondary" className="mv-5px w-100per" onClick={() => updateOrder("paid")}>
        {order.isPaid ? "Unset" : "Set"} to Paid
      </GLButton>

      <GLButton variant="secondary" className="mv-5px w-100per" onClick={() => updateOrder("reassured")}>
        {order.isReassured ? "Unset" : "Set"} to Reassured
      </GLButton>
      <GLButton variant="secondary" className="mv-5px w-100per" onClick={() => updateOrder("paused")}>
        {order.isPaused ? "Unset" : "Set"} to Paused
      </GLButton>

      <GLButton variant="secondary" className="mv-5px w-100per" onClick={() => updateOrder("refunded")}>
        {order.isRefunded ? "Unset" : "Set"} to Refunded
      </GLButton>
    </div>
  );
};

export default OrderStatusButtons;
