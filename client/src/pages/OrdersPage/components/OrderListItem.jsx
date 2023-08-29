// React
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  determine_tracking_link,
  determnine_link,
  format_date,
  getUrlParameter,
  toCapitalize,
} from "../../../utils/helper_functions";
import { LazyImage, Loading } from "../../../shared/SharedComponents";
import { determine_product_name, determine_product_name_string } from "../../../utils/react_helper_functions";

import { API_Emails, API_Orders, API_Shipping } from "../../../utils";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { OrderStatusButtons } from "../../OrderPage/components";
import useWindowDimensions from "../../../shared/Hooks/windowDimensions";
import * as API from "../../../api";
import config from "../../../config";

const OrderListItem = ({ order, determine_color, admin, send_email, send_paid_email, listOrdersFilters }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const [loading_label, set_loading_label] = useState(false);
  const [loading_email, set_loading_email] = useState("");
  const [hide_label_button, set_hide_label_button] = useState(true);
  const [loading_checkboxes, set_loading_checkboxes] = useState(true);
  const [order_items, set_order_items] = useState(order.orderItems);

  const [order_state, set_order_state] = useState(order);
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const show_hide = id => {
    const row = document.getElementById(id);
    row.classList.toggle("hide-row");
  };
  const daysBetween = (date1, date2) => {
    const diffTime = Math.abs(new Date(date2) - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays - 1;
  };

  const today = new Date();

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
          shipping_label: null,
        },
        itemsPrice: order.itemsPrice,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
        user: order.user._id,
        order_note: `Replacement Order for ${order.shipping.first_name} ${order.shipping.last_name} - Original Order Number is ${order._id}`,
        production_note: order.production_note,
      })
    );
    dispatch(API.listOrders({}));
  };

  const delete_order = () => {
    const confirm = window.confirm("Are you sure you want to DELETE this order?");
    if (confirm) {
      dispatch(API.deleteOrder(order._id));
      dispatch(API.listOrders({ limit: 10, page: 1 }));
    }
  };

  const view_label = async () => {
    // show_label(order.shipping.shipping_label.postage_label.label_url);
    print_label(order.shipping.shipping_label.postage_label.label_url);
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
    align-items: center;;">
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

  const get_invoice = async () => {
    const { data: invoice } = await API_Orders.get_invoice(order);

    print_invoice(invoice);
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

  const buy_label = async () => {
    set_loading_label(true);
    const { data: invoice } = await API_Orders.get_invoice(order);
    const { data } = await API_Shipping.buy_label(order.shipping.shipment_id, order.shipping.shipping_rate);
    setTimeout(() => {
      print_invoice(invoice);
    }, 1500);
    setTimeout(() => {
      print_label(data.postage_label.label_url);
    }, 1500);
    if (data) {
      set_loading_label(false);
    }
    await API_Shipping.add_tracking_number(order, data.tracking_code, data);
    set_hide_label_button(false);
    const query = getUrlParameter(location);
    dispatch(API.listOrders({ page: query.page, limit: query.limit }));
  };

  const create_label = async speed => {
    set_loading_label(true);
    const { data: invoice } = await API_Orders.get_invoice(order);
    const { data } = await API_Shipping.create_label(order, order.shipping.shipping_rate, speed);
    setTimeout(() => {
      print_invoice(invoice);
    }, 1500);
    setTimeout(() => {
      print_label(data.postage_label.label_url);
    }, 1500);
    if (data) {
      set_loading_label(false);
    }
    await API_Shipping.add_tracking_number(order, data.tracking_code, data);
    set_hide_label_button(false);
    const query = getUrlParameter(location);
    dispatch(API.listOrders({ page: query.page, limit: query.limit }));
  };

  const send_order_email = async () => {
    set_loading_label(true);
    await API_Emails.send_order_email(order, "Thank you for your Glow LEDs Order", order.shipping.email);
    await API_Emails.send_order_email(
      order,
      "New Order Created by " + order.shipping.first_name,
      config.REACT_APP_INFO_EMAIL
    );

    set_loading_label(false);
  };
  const send_refund_email = async () => {
    set_loading_label(true);
    await API_Emails.send_refund_email(order, "Refund Successful", order.shipping.email, true);
    await API_Emails.send_refund_email(
      order,
      "New Refunded for " + order.shipping.first_name,
      config.REACT_APP_INFO_EMAIL,
      true
    );

    set_loading_label(false);
  };

  const check_item_as_crafted = async index => {
    let new_order_items = [...order_items];
    new_order_items[index] = {
      ...new_order_items[index],
      is_crafted: order_items[index].is_crafted ? false : true,
    };

    set_order_items(new_order_items);
    set_order_state({
      ...order,
      orderItems: [...new_order_items],
    });
    dispatch(
      API.saveOrder({
        ...order,
        orderItems: [...new_order_items],
      })
    );
  };

  const update_order_state = (order, state, is_action, action_at) => {
    set_loading_email(true);
    if (state) {
      set_order_state({ ...order_state, [is_action]: false });
      dispatch(API.saveOrder({ ...order, [is_action]: false }));
    } else {
      set_order_state({ ...order_state, [is_action]: true });
      dispatch(API.saveOrder({ ...order, [is_action]: true }));
      if (is_action !== "isPaused") {
        send_email(order_state, action_at.slice(0, -2));
      }
    }
    setTimeout(() => {
      dispatch(API.listOrders(listOrdersFilters));
    }, 300);
    set_loading_email(false);
  };

  const update_order_payment_state = (order, state, is_action, action_at) => {
    set_loading_email(true);
    if (state) {
      set_order_state({ ...order_state, [is_action]: false });
      dispatch(API.saveOrder({ ...order, [is_action]: false }));
    } else {
      set_order_state({ ...order_state, [is_action]: true });
      dispatch(API.saveOrder({ ...order, [is_action]: true }));
      send_paid_email(order._id);
    }
    setTimeout(() => {
      dispatch(API.listOrders(listOrdersFilters));
    }, 1000);
    set_loading_email(false);
  };

  const { width } = useWindowDimensions();
  return (
    <div
      style={{
        backgroundColor: determine_color(order),
        boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
        borderRadius: "2rem",
        padding: "1.5rem",
        marginBottom: "25px",
      }}
    >
      <Loading loading={loading_label} />
      <div style={{ borderBottom: "1px solid white" }}>
        <div className="pb-15px mb-10px jc-b">
          <div className="w-60per jc-b ">
            <div className="fs-16px">
              <h3>Order Placed</h3>
              <div>{order.createdAt && format_date(order.createdAt)}</div>
            </div>
            <div className="fs-16px">
              <h3>Total</h3>
              {!order.isRefunded && (
                <div>
                  <div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
                </div>
              )}
              {order.isRefunded && (
                <div>
                  <del style={{ color: "red" }}>
                    <label style={{ color: "white" }}>
                      <div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
                    </label>
                  </del>
                </div>
              )}
              {order.isRefunded && (
                <div>
                  <div>-${(order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}</div>
                </div>
              )}
              {order.isRefunded && (
                <div>
                  <div>
                    ${(order.totalPrice - order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}
                  </div>
                </div>
              )}
            </div>
            {admin && width > 800 && (
              <div className="fs-16px">
                <h3>Since Order</h3>
                {daysBetween(today, order.createdAt) > 1
                  ? `${daysBetween(today, order.createdAt)} Days`
                  : `${daysBetween(today, order.createdAt)} Day`}
              </div>
            )}
            <div className="fs-16px">
              <h3>Ship To</h3>
              <Link to={`/secure/glow/userprofile/${order.user && order.user._id}`}>
                {order.shipping.first_name} {order.shipping.last_name}
              </Link>
            </div>
            {admin && width > 800 && order.isPaused ? (
              <p className="title_font ai-c fs-30px">{order.isPaused && "PAUSED"}</p>
            ) : (
              order.shipping.shipping_rate && (
                <p className="title_font ai-c fs-30px">
                  {!(
                    order.shipping.shipping_rate.service === "First" ||
                    order.shipping.shipping_rate.service === "ParcelSelect"
                  ) && order.shipping.shipping_rate.service}{" "}
                </p>
              )
            )}
          </div>
          <div className="w-40per jc-fe">
            <div className="">
              {width > 800 && (
                <div className="fs-16px">
                  <div className="row ai-c">
                    <h3 className="mr-10px">Order Number: </h3>
                    <div>{order._id}</div>
                  </div>
                  {order.tracking_number &&
                    order.tracking_number.length > 0 &&
                    determine_tracking_link(order.tracking_number) && (
                      <div className="row ai-c mb-2rem">
                        <h3 className="mr-10px  mv-0px">Tracking Number: </h3>
                        <div className="mt-0px">
                          {" "}
                          <a
                            href={
                              order.tracking_url ? order.tracking_url : determine_tracking_link(order.tracking_number)
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mv-2rem"
                            style={{
                              textDecoration: "underline",
                              color: "white",
                            }}
                          >
                            {order.tracking_number}
                          </a>
                        </div>
                      </div>
                    )}
                </div>
              )}
              <div className={`fs-16px jc-fe ai-c ${width > 600 && "mt-10px"}`}>
                <Link
                  to={"/secure/account/order/" + order._id}
                  onClick={() =>
                    navigate("/secure/account/order/" + order._id, {
                      state: { prevPath: location.pathname + location.search },
                    })
                  }
                >
                  <GLButton variant="primary">Order Details</GLButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {admin && width > 800 && (
          <div>
            {order.order_note && (
              <li className="row mv-2rem">
                <label className="title_font">Order Note: </label>
                <label className="ml-1rem">{order.order_note}</label>
              </li>
            )}
            {order.production_note && (
              <li className="row mv-2rem">
                <label className="title_font">Production Note: </label>
                <label className="ml-1rem">{order.production_note}</label>
              </li>
            )}
          </div>
        )}
      </div>

      <div className="row">
        <div className="small_screen_order jc-b ">
          <div className="wrap">
            {order.orderItems.map((item, index) => {
              return (
                <div className="row mt-15px" key={index}>
                  <div
                    className="column ai-c pos-rel"
                    data-tip={determine_product_name_string(item, true, order.createdAt)}
                  >
                    <Link to={determnine_link(item)}>
                      <div className="">
                        {!item.secondary_image && (
                          <LazyImage
                            className="order-image br-10px mr-15px w-70px h-70px"
                            alt={item.name}
                            title="Product Image"
                            effect="blur"
                            border={item.color_code}
                            src={item.display_image && item.display_image}
                          />
                        )}
                        {item.secondary_image && (
                          <div
                            className={` double-image-cart${
                              item.name && item.name.split("-")[1] === "2 Tone" ? "-vertical" : " row"
                            }`}
                          >
                            <LazyImage
                              id="expandedImg"
                              alt={item.name}
                              title={item.name}
                              border={item.color_code}
                              className={`details-image-cart-${
                                item.name && item.name.split("-")[1] === "2 Tone" ? "top" : "left"
                              } m-0px`}
                              src={item.display_image}
                            />
                            <LazyImage
                              id="expandedSecondaryImg"
                              alt={item.name}
                              title={item.name}
                              border={item.color_code}
                              className={`details-image-cart-${
                                item.name && item.name.split("-")[1] === "2 Tone" ? "bottom" : "right"
                              } mr-15px`}
                              src={item.secondary_image}
                            />
                          </div>
                        )}
                      </div>
                    </Link>
                    {item.qty > 1 && (
                      <div
                        className="pos-abs br-10px w-2rem h-2rem  ai-c ta-c jc-c bottom-0px right-5px"
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          border: "1px solid #ccc",
                        }}
                      >
                        <div className="mt-3px ml-2px">{item.qty}</div>
                      </div>
                    )}
                    {/* {admin && (
                      <div>
                        {loading_checkboxes ? (
                          <div>Loading...</div>
                        ) : (
                          <div className="mv-1rem jc-c mr-2rem">
                            <input
                              type="checkbox"
                              name="is_crafted"
                              defaultChecked={item.is_crafted}
                              style={{
                                transform: "scale(1.5)"
                              }}
                              className=""
                              id="is_crafted"
                              onChange={e => {
                                check_item_as_crafted(index);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="small_screen_order jc-b">
          <div className="mv-auto">
            {order.orderItems.map((item, index) => {
              return <div key={index}>{determine_product_name(item, true, order.createdAt)}</div>;
            })}
          </div>
        </div>
        {order.orderItems.length > 0 && width > 800 && (
          <Link to={"/collections/all/products/" + order.orderItems[0].category} className="ai-c ml-1rem">
            <GLButton variant="primary">Buy Again</GLButton>
          </Link>
        )}

        {admin && (
          <div className="jc-fe column ml-auto ">
            <GLButton variant="icon" className="h-3rem " onClick={() => show_hide(order._id)}>
              <i style={{ WebkitTransform: "rotate(-180deg)" }} className="top-8px fas fa-sort-up" />
            </GLButton>
          </div>
        )}
      </div>

      {admin && (
        <div id={order._id} className="expanded-row-content hide-row">
          <div className="w-100per jc-b pt-10px mt-10px" style={{ borderTop: "1px solid white" }}>
            <div className=" ">
              <h2>Shipping</h2>
              <div className="paragraph_font lh-25px">
                <div>
                  {order.shipping.first_name} {order.shipping.last_name}
                </div>
                <div>
                  {order.shipping.address_1} {order.shipping.address_2}
                </div>
                <div>
                  {order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}
                </div>
                <div>{order.shipping.country}</div>
                <div>{order.shipping.international && "International"}</div>
                <div>{order.shipping.email}</div>
              </div>
            </div>
            <div className="column jc-b h-10rem w-20rem ml-1rem">
              <h2>Order Status</h2>
              <div>
                <div className="row ai-c">
                  <div className="mv-5px">
                    {order.isPaid ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                  </div>
                  <div className="mh-10px">Paid</div>
                  <div>{!order.paidAt ? "" : format_date(order.paidAt)}</div>
                </div>
              </div>
              <div>
                <div className="row ai-c">
                  <div className="mv-5px">
                    {order.isCrafting ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                  </div>
                  <div className="mh-10px">Crafting</div>

                  <div>{!order.craftingAt ? "" : format_date(order.craftingAt)}</div>
                </div>
              </div>
              <div>
                <div className="row ai-c">
                  <div className="mv-5px">
                    {order.isCrafted ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                  </div>
                  <div className="mh-10px">Crafted</div>

                  <div>{!order.craftedAt ? "" : format_date(order.craftedAt)}</div>
                </div>
              </div>
              <div>
                <div className="row ai-c">
                  <div className="mv-5px">
                    {order.isPackaged ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                  </div>
                  <div className="mh-10px">Packaged</div>

                  <div>{!order.packagedAt ? "" : format_date(order.packagedAt)}</div>
                </div>
              </div>
              <div>
                <div className="row ai-c">
                  <div className="mv-5px">
                    {order.isShipped ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                  </div>
                  <div className="mh-10px">Shipped</div>

                  <div>{!order.shippedAt ? "" : format_date(order.shippedAt)}</div>
                </div>
              </div>
              <div>
                <div className="row ai-c">
                  <div className="mv-5px row">
                    {order.isDelivered ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                  </div>
                  <div className="mh-10px">Delivered</div>

                  <div>{!order.deliveredAt ? "" : format_date(order.deliveredAt)}</div>
                </div>
              </div>
            </div>
            <ul className="m-0px">
              <h2>Meta Data</h2>
              <li className="row mv-2rem">
                <label className="phrase_font">Payment Method </label>
                <label className="ml-1rem">{order.payment.paymentMethod}</label>
              </li>
              <li className="row mv-2rem">
                <label className="phrase_font">Promo Code: </label>
                <label className="ml-1rem">{order.promo_code}</label>
              </li>
              <li className="row">
                <label className="phrase_font">Tracking Number: </label>
                <a
                  href={determine_tracking_link(order.tracking_number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mv-2rem ml-1rem"
                  style={{
                    textDecoration: "underline",
                    color: "white",
                  }}
                >
                  {order.tracking_number}
                </a>
              </li>
              {order.return_tracking_number && (
                <li className="row">
                  <label className="phrase_font">Return Tracking Number: </label>

                  <a
                    href={determine_tracking_link(order.return_tracking_number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mv-2rem ml-1rem"
                    style={{
                      textDecoration: "underline",
                      color: "white",
                    }}
                  >
                    {order.return_tracking_number}
                  </a>
                </li>
              )}

              {order.guest && (
                <li className="row">
                  <label className="phrase_font">Guest Order: {order.guest ? "True" : "False"} </label>
                </li>
              )}
            </ul>

            <div className="jc-b ai-c m-auto max-w-50rem">
              <div className="">
                <div className="">
                  <GLButton variant="secondary" className="w-100per mv-10px" onClick={() => sendEmail("Hello")}>
                    Send User a Message
                  </GLButton>
                  <GLButton
                    variant="secondary"
                    className="w-100per mv-5px"
                    onClick={() => create_duplicate_order(order._id)}
                  >
                    Create Duplicate Order
                  </GLButton>
                  <GLButton variant="secondary" className="w-100per mv-5px">
                    <Link to={"/secure/glow/editorder/" + order._id}>Edit Order</Link>
                  </GLButton>
                  <GLButton variant="secondary" onClick={delete_order} className="w-100per mv-5px">
                    Delete Order
                  </GLButton>
                  {hide_label_button && !order.shipping.shipping_label && (
                    <GLButton variant="primary" onClick={buy_label} className="w-100per mv-5px">
                      Buy Label
                    </GLButton>
                  )}
                  {hide_label_button && !order.shipping.shipping_label && (
                    <GLButton variant="primary" onClick={() => create_label("first")} className="w-100per mv-5px">
                      {!order.shipping.shipping_label ? "Create First Class Label" : "Create New First Class  Label"}
                    </GLButton>
                  )}
                  {hide_label_button && !order.shipping.shipping_label && (
                    <GLButton variant="primary" onClick={() => create_label("priority")} className="w-100per mv-5px">
                      {!order.shipping.shipping_label ? "Create Priority Label" : "Create New Prioirty Label"}
                    </GLButton>
                  )}
                  {hide_label_button && !order.shipping.shipping_label && (
                    <GLButton variant="primary" onClick={() => create_label("express")} className="w-100per mv-5px">
                      {!order.shipping.shipping_label ? "Create Express Label" : "Create New Express Label"}
                    </GLButton>
                  )}
                  {order.shipping.shipping_label && (
                    <GLButton variant="primary" onClick={view_label} className="w-100per mv-5px">
                      Print Label
                    </GLButton>
                  )}
                  <GLButton variant="primary" onClick={get_invoice} className="w-100per mv-5px">
                    Print Invoice
                  </GLButton>
                </div>
              </div>
              <div className="ml-20px">
                <OrderStatusButtons
                  order={order}
                  update_order_payment_state={update_order_payment_state}
                  update_order_state={update_order_state}
                  send_order_email={send_order_email}
                  send_refund_email={send_refund_email}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderListItem;
