import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../../api";
import { setRemoteVersionRequirement, set_hide_label_button, set_loading_label } from "../../../slices/orderSlice";
import { API_Orders, API_Shipping } from "../../../utils";

const OrderActionButtons = ({ order }) => {
  const dispatch = useDispatch();

  const orderPage = useSelector(state => state.orders.orderPage);
  const { hide_label_button } = orderPage;
  const sendEmail = message => {
    const email = order.shipping.email;
    const subject = "About Your Glow LEDs Order";
    const emailBody = "Hi " + order.user.first_name + ",";
    document.location = "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
  };

  const create_duplicate_order = () => {
    //
    dispatch(
      API.saveOrder({
        orderItems: order.orderItems,
        shipping: {
          ...order.shipping,
          shipment_id: null,
          shipping_rate: null,
          shipping_label: null
        },
        itemsPrice: order.itemsPrice,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
        user: order.user._id,
        order_note: `Replacement Order for ${order.shipping.first_name} ${order.shipping.last_name} - Original Order Number is ${order._id}`,
        production_note: order.production_note
      })
    );
    dispatch(API.listOrders({}));
  };

  const buy_label = async () => {
    dispatch(set_loading_label(true));
    const { data: invoice } = await API_Orders.get_invoice(order);
    const { data } = await API_Shipping.buy_label(order.shipping.shipment_id, order.shipping.shipping_rate);
    setTimeout(() => {
      print_invoice(invoice);
    }, 1500);
    setTimeout(() => {
      print_label(data.postage_label.label_url);
    }, 1500);
    if (data) {
      dispatch(set_loading_label(false));
    }
    await API_Shipping.add_tracking_number(order, data.tracking_code, data);
    dispatch(set_hide_label_button(false));
    dispatch(setRemoteVersionRequirement());
  };

  const create_label = async speed => {
    dispatch(set_loading_label(true));
    const { data: invoice } = await API_Orders.get_invoice(order);
    console.log({ invoice });
    const { data } = await API_Shipping.create_label(order, order.shipping.shipping_rate, speed);
    setTimeout(() => {
      print_invoice(invoice);
    }, 1500);
    setTimeout(() => {
      print_label(data.postage_label.label_url);
    }, 1500);
    if (data) {
      dispatch(set_loading_label(false));
    }
    await API_Shipping.add_tracking_number(order, data.tracking_code, data);
    dispatch(set_hide_label_button(false));
    dispatch(setRemoteVersionRequirement());
  };

  const create_return_label = async () => {
    set_loading_label(true);
    const { data } = await API_Shipping.create_return_label(order, order.shipping.shipping_rate);
    print_label(data.postage_label.label_url);

    if (data) {
      set_loading_label(false);
    }

    const request = await API_Shipping.add_return_tracking_number(order, data.tracking_code, data);

    dispatch(API.detailsOrder(order._id));
  };

  const view_return_label = async () => {
    // show_label(order.shipping.shipping_label.postage_label.label_url);
    print_label(order.shipping.return_shipping_label.postage_label.label_url);
  };

  const print_invoice = contents => {
    // const contents = document.getElementById(id).innerHTML;
    const frame1 = document.createElement("iframe");
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    const frameDoc = frame1.contentWindow
      ? frame1.contentWindow
      : frame1.contentDocument.document
      ? frame1.contentDocument.document
      : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write("</head><body>");
    frameDoc.document.write(contents);
    frameDoc.document.write("</body></html>");
    frameDoc.document.close();
    setTimeout(function () {
      window.frames["frame1"].focus();
      window.frames["frame1"].print();
      document.body.removeChild(frame1);
    }, 500);
    return false;
  };
  const print_label = content => {
    // const content = document.getElementById(id).innerHTML;
    const frame1 = document.createElement("iframe");
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    const frameDoc = frame1.contentWindow
      ? frame1.contentWindow
      : frame1.contentDocument.document
      ? frame1.contentDocument.document
      : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write("</head><body>");
    frameDoc.document.write(`<div style="width: 100%;
    display: flex;
    height: 100%;
    align-items: center;">
        <img style="margin: auto; text-align: center;" src="${content}" alt="label" />
    </div>`);
    frameDoc.document.write("</body></html>");
    frameDoc.document.close();
    setTimeout(function () {
      window.frames["frame1"].focus();
      window.frames["frame1"].print();
      document.body.removeChild(frame1);
    }, 500);
    return false;
  };
  return (
    <div className="">
      <GLButton variant="secondary" className="w-100per mv-10px" onClick={() => sendEmail("Hello")}>
        Send User a Message
      </GLButton>
      <GLButton variant="secondary" className="w-100per mv-5px" onClick={() => create_duplicate_order(order._id)}>
        Create Duplicate Order
      </GLButton>
      <GLButton variant="secondary" className="w-100per mv-5px">
        <Link to={"/secure/glow/editorder/" + order._id}>Edit Order</Link>
      </GLButton>
      <GLButton
        variant="secondary"
        onClick={() => {
          const confirm = window.confirm("Are you sure you want to DELETE this order?");
          if (confirm) {
            dispatch(API.deleteOrder(order._id));
          }
        }}
        className="w-100per mv-5px"
      >
        Delete Order
      </GLButton>
      {hide_label_button && !order.shipping.shipping_label && (
        <GLButton variant="primary" onClick={buy_label} className="w-100per mv-5px">
          Buy Label
        </GLButton>
      )}
      <GLButton variant="secondary" className="w-100per mv-5px" onClick={() => create_label("first")}>
        {!order.shipping.shipping_label ? "Create First Class Label" : "Create New First Class Label"}
      </GLButton>
      {/* <GLButton variant="secondary" className="w-100per mv-5px" onClick={() => create_label("priority")}>
        {!order.shipping.shipping_label ? "Create Priority Label" : "Create New Prioirty Label"}
      </GLButton>
      <GLButton variant="secondary" className="w-100per mv-5px" onClick={() => create_label("express")}>
        {!order.shipping.shipping_label ? "Create Express Label" : "Create New Express Label"}
      </GLButton> */}
      {!order.shipping.return_shipping_label && (
        <GLButton variant="secondary" className="w-100per mv-5px" onClick={() => create_return_label()}>
          Create Return Label
        </GLButton>
      )}
      {order.shipping.return_shipping_label && (
        <GLButton variant="secondary" className="w-100px mv-5px" onClick={() => view_return_label()}>
          View Return Label
        </GLButton>
      )}
      {order.shipping.shipping_label && (
        <GLButton
          variant="primary"
          onClick={() => print_label(order.shipping.shipping_label.postage_label.label_url)}
          className="w-100per mv-5px"
        >
          Print Label
        </GLButton>
      )}
      <GLButton
        variant="primary"
        onClick={async () => {
          const { data: invoice } = await API_Orders.get_invoice(order);
          console.log({ invoice });
          print_invoice(invoice);
        }}
        className="w-100per mv-5px"
      >
        Print Invoice
      </GLButton>
    </div>
  );
};

export default OrderActionButtons;
