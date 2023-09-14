import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";

const OrderStatusButtons = ({
  order,
  update_order_payment_state,
  update_order_state,
  send_order_email,
  send_refund_email,
}) => {
  return (
    <div>
      {send_order_email && (
        <GLButton variant="primary" className="mv-5px w-100per" onClick={() => send_order_email()}>
          Send Order Email
        </GLButton>
      )}
      <GLButton
        variant="primary"
        className="mv-5px w-100per"
        onClick={() => update_order_payment_state(order, order.isPaid, "isPaid", "paidAt")}
      >
        {order.isPaid ? "Unset to Paid" : "Set to Paid"}
      </GLButton>
      <GLButton
        variant="primary"
        className="mv-5px w-100per"
        onClick={() => update_order_state(order, order.isReassured, "isReassured", "reassuredAt")}
      >
        {order.isReassured ? "Unset to Reassured" : "Set to Reassured"}
      </GLButton>
      <GLButton
        variant="primary"
        className="mv-5px w-100per"
        onClick={() => update_order_state(order, order.isPaused, "isPaused", "pausedAt")}
      >
        {order.isPaused ? "Unset to Paused" : "Set to Paused"}
      </GLButton>
      <GLButton
        variant="primary"
        className="mv-5px w-100per"
        onClick={() => update_order_state(order, order.isCrafting, "isCrafting", "craftingAt")}
      >
        {order.isCrafting ? "Unset to Crafting" : "Set to Crafting"}
      </GLButton>
      <GLButton
        variant="primary"
        className="mv-5px w-100per"
        onClick={() => update_order_state(order, order.isCrafted, "isCrafted", "craftedAt")}
      >
        {order.isCrafted ? "Unset to Crafted" : "Set to Crafted"}
      </GLButton>
      <GLButton
        variant="primary"
        className="mv-5px w-100per"
        onClick={() => update_order_state(order, order.isPackaged, "isPackaged", "packagedAt")}
      >
        {order.isPackaged ? "Unset to Packaged" : "Set to Packaged"}
      </GLButton>
      <GLButton
        variant="primary"
        className="mv-5px w-100per"
        onClick={() => update_order_state(order, order.isShipped, "isShipped", "shippedAt")}
      >
        {order.isShipped ? "Unset to Shipped" : "Set to Shipped"}
      </GLButton>
      <GLButton
        variant="primary"
        className="mv-5px w-100per"
        onClick={() => update_order_state(order, order.isRefunded, "isRefunded", "refundedAt")}
      >
        {order.isRefunded ? "Unset to Refunded" : "Set to Refunded"}
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
