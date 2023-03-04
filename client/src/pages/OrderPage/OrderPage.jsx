import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { determine_total, determine_tracking_link, format_date, toCapitalize } from "../../utils/helper_functions";
import { Helmet } from "react-helmet";
import { Loading, LoadingPayments } from "../../shared/SharedComponents";
import { API_Emails, API_Orders, API_Shipping } from "../../utils";
import useClipboard from "react-hook-clipboard";
import useWindowDimensions from "../../shared/Hooks/windowDimensions";
import { determine_color } from "../../utils/helpers/order_helpers";
import { isAdmin } from "../../utils/helpers/user_helpers";
import CartItem from "../../shared/SharedComponents/CartItem";
import CheckoutSteps from "../../shared/SharedComponents/CheckoutSteps";
import { Stripe } from "../../shared/SharedComponents/Stripe";
import { OrderStatusButtons } from "./components";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { validate_promo_code } from "../../utils/validations";
import * as API from "../../api";
import { payOrder, refundOrder, update_payment } from "../../actions/orderActions";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { deleteCartItem } from "../../api";

require("dotenv").config();

const OrderPage = props => {
  const { height, width } = useWindowDimensions();

  const userSlice = useSelector(state => state.userSlice);
  const { current_user } = userSlice;
  const cartSlice = useSelector(state => state.cartSlice);
  const { my_cart } = cartSlice;
  const { cartItems } = my_cart;

  const orderPay = useSelector(state => state.orderPay);
  const { success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const [loading_label, set_loading_label] = useState(false);
  const [product, set_product] = useState("");
  const [secondary_product, set_secondary_product] = useState("");
  const [product_object, set_product_object] = useState("");
  const [payment_loading, set_payment_loading] = useState(false);
  const [payment_method, set_payment_method] = useState("");
  const [loading_email, set_loading_email] = useState("");

  const [order_state, set_order_state] = useState({});
  const [clipboard, copyToClipboard] = useClipboard();

  const [refund_state, set_refund_state] = useState({});
  const [refund_amount, set_refund_amount] = useState();
  const [refund_reason, set_refund_reason] = useState("");
  const [all_orders, set_all_orders] = useState("");
  const [loading_shipping_rates, set_loading_shipping_rates] = useState("");
  const [shipping_rate, set_shipping_rate] = useState({});
  const [shipment_id, set_shipment_id] = useState("");
  const [shipping_rates, set_shipping_rates] = useState([]);
  const [package_dimensions, set_package_dimensions] = useState({});
  const [hide_label_button, set_hide_label_button] = useState(true);
  const [rate, set_rate] = useState("");
  const [order_items, set_order_items] = useState([]);

  const [message_to_user, set_message_to_user] = useState("");

  const parcelSlice = useSelector(state => state.parcelSlice);
  const { parcels } = parcelSlice;

  const orderRefund = useSelector(state => state.orderRefund);
  const { order: refund } = orderRefund;

  const orderSlice = useSelector(state => state.orderSlice);
  const { orders } = orderSlice;

  const update_refund_state = amount => {
    set_loading_label(true);
    const confirm = window.confirm("Are you sure you want to Refund this Order?");
    if (confirm) {
      dispatch(refundOrder(order, true, parseFloat(amount).toFixed(2), refund_reason));
      set_refund_state(true);
    }

    set_loading_label(false);
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (refund) {
        set_refund_state(refund.isRefunded);
        dispatch(API.detailsOrder(props.match.params.id));
      }
    }
    return () => (clean = false);
  }, [refund]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsOrder(props.match.params.id));
      dispatch(API.listPromos({}));
    }
    return () => (clean = false);
  }, [props.match.params.id]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (order) {
        set_order_state(order);
        set_order_items(order.orderItems);
      }
    }
    return () => (clean = false);
  }, [order]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (product_object) {
        set_product(product_object._id);
      }
    }
    return () => (clean = false);
  }, [product_object]);

  const empty_cart = () => {
    cartItems.forEach((item, index) => {
      deleteCartItem({ item_index: index, type: "add_to_cart" });
    });
  };
  const pay_order = paymentMethod => {
    set_payment_loading(true);
    dispatch(payOrder(order, paymentMethod));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (successPay && order) {
        // history.push('/secure/checkout/paymentcomplete/' + order._id);
        history.push("/secure/checkout/order/receipt/" + order._id + "/order/true");
        dispatch(API.detailsOrder(props.match.params.id));
        set_payment_loading(false);
        empty_cart();
      } else if (errorPay) {
      }
    }
    return () => (clean = false);
  }, [successPay]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (errorPay) {
        set_payment_loading(false);
      }
    }
    return () => (clean = false);
  }, [errorPay]);

  const history = useHistory();

  const [show_color, set_show_color] = useState(false);

  const update_order_state = (order, state, is_action, action_at) => {
    set_loading_email(true);
    if (state) {
      set_order_state({ ...order_state, [is_action]: false });
      dispatch(API.updateOrder(order, false, is_action, action_at));
    } else {
      set_order_state({ ...order_state, [is_action]: true });
      dispatch(API.updateOrder(order, true, is_action, action_at));
      send_email(action_at.slice(0, -2));
    }
    setTimeout(() => {
      dispatch(API.detailsOrder(props.match.params.id));
    }, 200);
    set_loading_email(false);
  };

  const send_email = async (status, message_to_user) => {
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

  const send_paid_email = async () => {
    const { data: order } = await API_Orders.findById_orders_a(props.match.params.id);
    await API_Emails.send_order_email(order, "Thank you for your Glow LEDs Order!", order.shipping.email);
    await API_Emails.send_order_email(order, "New Order Created by " + order.shipping.first_name, process.env.REACT_APP_INFO_EMAIL);
  };
  const update_order_payment_state = (order, state, is_action) => {
    if (state) {
      set_order_state({ ...order_state, [is_action]: false });
      dispatch(API.updateOrder(order, false, payment_method));
    } else {
      set_order_state({ ...order_state, [is_action]: true });
      dispatch(API.updateOrder(order, true, payment_method));
      send_paid_email();
    }
    setTimeout(() => {
      dispatch(API.detailsOrder(props.match.params.id));
    }, 200);
  };

  const create_label = async speed => {
    set_loading_label(true);
    const { data } = await API_Shipping.create_label(order, order.shipping.shipping_rate, speed);
    const { data: invoice } = await API_Orders.get_invoice(order);
    setTimeout(() => {
      print_invoice(invoice);
    }, 1500);
    setTimeout(() => {
      print_label(data.postage_label.label_url);
    }, 1000);

    if (data) {
      set_loading_label(false);
    }

    const request = await API_Shipping.add_tracking_number(order, data.tracking_code, data);

    dispatch(API.detailsOrder(props.match.params.id));
  };

  const create_return_label = async () => {
    set_loading_label(true);
    const { data } = await API_Shipping.create_return_label(order, order.shipping.shipping_rate);
    print_label(data.postage_label.label_url);

    if (data) {
      set_loading_label(false);
    }

    const request = await API_Shipping.add_return_tracking_number(order, data.tracking_code, data);

    dispatch(API.detailsOrder(props.match.params.id));
  };

  const buy_label = async () => {
    set_loading_label(true);

    const { data } = await API_Shipping.buy_label(order.shipping.shipment_id, order.shipping.shipping_rate);
    const { data: invoice } = await API_Orders.get_invoice(order);
    // show_label(data.postage_label.label_url);
    setTimeout(() => {
      print_invoice(invoice);
    }, 1500);
    setTimeout(() => {
      print_label(data.postage_label.label_url);
    }, 1000);

    if (data) {
      set_loading_label(false);
    }

    const request = await API_Shipping.add_(order, data.tracking_code, data);

    dispatch(API.detailsOrder(props.match.params.id));
    // history.push('/secure/glow/emails/invoice/' + order._id);
    // history.push({
    // 	pathname: '/secure/glow/emails/invoice/' + order._id,
    // 	previous_path: props.location.previous_path
    // });
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

  const view_label = async () => {
    // show_label(order.shipping.shipping_label.postage_label.label_url);
    print_label(order.shipping.shipping_label.postage_label.label_url);
  };
  const view_return_label = async () => {
    // show_label(order.shipping.shipping_label.postage_label.label_url);
    print_label(order.shipping.return_shipping_label.postage_label.label_url);
  };

  const [fetching, setFetching] = useState(false);
  const [error_img, set_error_img] = useState(false);

  const download_return_label = (url, name, e) => {
    e.preventDefault();
    if (!url) {
      throw new Error("Resource URL not provided! You need to provide one");
    }
    setFetching(true);
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        setFetching(false);
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.style = "display: none";

        if (name && name.length) a.download = name;
        document.body.appendChild(a);
        a.click();
      })
      .catch(() => set_error_img(true));
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

  const create_duplicate_order = () => {
    dispatch(
      API.createOrder({
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

  const move_left = e => {
    e.preventDefault();

    if (all_orders) {
      let current_order_index = all_orders.map(item => item._id).indexOf(order._id);
      let left_order_index = current_order_index + 1;
      if (left_order_index >= all_orders.length) {
        left_order_index = 0;
      }
      history.push("/secure/account/order/" + all_orders[left_order_index]._id);
    }
  };
  const move_right = e => {
    e.preventDefault();
    if (all_orders) {
      let current_order_index = all_orders.map(item => item._id).indexOf(order._id);
      let right_order_index = current_order_index - 1;
      if (right_order_index === -1) {
        right_order_index = all_orders.length - 1;
      }
      history.push("/secure/account/order/" + all_orders[right_order_index]._id);
    }
  };

  const get_shipping_rates = async e => {
    e.preventDefault();
    set_loading_shipping_rates(true);

    const { data } = await API_Shipping.get_different_shipping_rates({
      shipment_id: order.shipping.shipment_id,
      current_user,
      order
    });

    set_shipping_rates(data.shipment.rates);
    set_shipment_id(data.shipment.id);
    set_loading_shipping_rates(false);
  };

  const buy_new_speed_label = async () => {
    set_loading_label(true);
    const { data } = await API_Shipping.buy_label(order.shipping.shipment_id, shipping_rate);
    print_label(data.postage_label.label_url);
    if (data) {
      set_loading_label(false);
    }
    dispatch(
      API.updateOrder({
        ...order,
        shipping: { ...order.shipping, shipment_id, shipping_rate }
      })
    );
    const request = await API_Shipping.add_tracking_number(order, data.tracking_code, data);
    dispatch(API.detailsOrder(props.match.params.id));
    history.push("/secure/glow/emails/invoice/" + order._id);
  };

  const address = {
    first_name: "Kurt",
    last_name: "LaVacque",
    address_1: process.env.REACT_APP_RETURN_ADDRESS,
    city: process.env.REACT_APP_RETURN_CITY,
    state: process.env.REACT_APP_RETURN_STATE,
    postalCode: process.env.REACT_APP_RETURN_POSTAL_CODE,
    country: process.env.REACT_APP_RETURN_COUNTRY,
    phone: "906-284-2208",
    email: process.env.REACT_APP_INFO_EMAIL,
    company: "Glow LEDs"
  };

  const update_parcel = (e, parcel) => {
    e.preventDefault();
    parcel = JSON.parse(parcel);

    set_package_dimensions({
      ...package_dimensions,
      package_length: parcel.length || 0,
      package_width: parcel.width || 0,
      package_height: parcel.height || 0
    });
  };

  const choose_shipping_rate = (e, rate, speed) => {
    e.preventDefault();
    // setShippingPrice(parseFloat(rate.retail_rate) + packaging_cost);
    // setPreviousShippingPrice(parseFloat(rate.retail_rate) + packaging_cost);

    set_hide_label_button(false);
    set_shipping_rate(rate);
    set_rate({ rate, speed });
  };

  const re_choose_shipping_rate = e => {
    e.preventDefault();
    // setShippingPrice(0);
    // setPreviousShippingPrice(0);
    set_hide_label_button(true);
    set_shipping_rate({});
  };

  const add_items_to_cart = () => {
    order.orderItems.map(item => dispatch(addToCart(item)));
  };

  const send_order_email = async () => {
    set_loading_label(true);
    await API_Emails.send_order_email(order, "Thank you for your Glow LEDs Order", order.shipping.email);
    await API_Emails.send_order_email(order, "New Order Created by " + order.shipping.first_name, process.env.REACT_APP_INFO_EMAIL);

    set_loading_label(false);
  };

  const send_refund_email = async () => {
    set_loading_label(true);
    await API_Emails.send_refund_email(order, "Refund Successful", order.shipping.email, true);
    await API_Emails.send_refund_email(order, "New Refunded for " + order.shipping.first_name, process.env.REACT_APP_INFO_EMAIL, true);

    set_loading_label(false);
  };

  const check_item_as_manufactured = async index => {
    let new_order_items = [...order_items];
    new_order_items[index] = {
      ...new_order_items[index],
      is_manufactured: order_items[index].is_manufactured ? false : true
    };
    set_order_items(new_order_items);
    dispatch(
      API.updateOrder({
        ...order,
        orderItems: [...new_order_items]
      })
    );
  };

  const [promo_code, set_promo_code] = useState("");
  const promoSlice = useSelector(state => state.promoSlice);
  const { promos } = promoSlice;

  const [promo_code_validations, set_promo_code_validations] = useState("");
  const items_price = determine_total(order_items);
  const [show_message, set_show_message] = useState("");
  const [itemsPrice, setItemsPrice] = useState(items_price);
  const [tax_rate, set_tax_rate] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [free_shipping_message, set_free_shipping_message] = useState("------");
  const [show_promo_code_input_box, set_show_promo_code_input_box] = useState(true);

  const check_code = e => {
    e.preventDefault();

    const data = {
      promo_code: promo_code,
      promos,
      current_user,
      items_price,
      cartItems
    };
    //
    const request = validate_promo_code(data);

    set_promo_code_validations(request.errors.promo_code);

    if (request.isValid) {
      activate_promo_code(promo_code.toLowerCase());
    } else {
      set_promo_code("");
    }
  };

  const activate_promo_code = code => {
    const promo = promos.find(promo => promo.promo_code === code.toLowerCase());

    let promo_excluded = 0;

    let promo_included = 0;
    // setPreviousShippingPrice(shippingPrice);
    if (promo) {
      // if (promo.exclude) {
      //   const category_cart_items = cartItems
      //     .filter(item => promo.excluded_categories.includes(item.category))
      //     .reduce((a, item) => a + item.price, 0);
      //   const product_cart_items = cartItems
      //     .filter(item => promo.excluded_products.includes(item._id))
      //     .reduce((a, item) => a + item.price, 0);
      //   promo_excluded = category_cart_items + product_cart_items;
      // }
      // if (promo.include) {
      //   const category_cart_items = cartItems.filter(item => promo.included_categories.includes(item.category));

      //   const product_cart_items = cartItems.filter(item => promo.included_products.includes(item.product));

      //   promo_included = category_cart_items.length > 0 || product_cart_items.length > 0;
      //   if (promo_included) {
      //     update_promo();
      //   } else {
      //     set_promo_code_validations("Promo Code Not Valid");
      //     set_show_promo_code_input_box(true);
      //   }
      // }

      if (show_message) {
        set_promo_code_validations("Can only use one promo code at a time");
      } else {
        // if (!promo.include) {
        update_promo(promo, promo_excluded);
        // }
      }
    }
  };

  const update_promo = (promo, promo_excluded) => {
    if (promo.percentage_off) {
      if (items_price === promo_excluded) {
        set_promo_code_validations("All Items Excluded from Promo");
        return;
      }
      setItemsPrice(items_price - (items_price - promo_excluded) * (promo.percentage_off / 100));
      setTaxPrice(tax_rate * (items_price - (items_price - promo_excluded) * (promo.percentage_off / 100)));
    } else if (promo.amount_off) {
      if (promo.amount_off > items_price) {
        setItemsPrice(0);
        setTaxPrice(0);
      } else {
        setItemsPrice(items_price - promo.amount_off);
        setTaxPrice(tax_rate * (items_price - promo.amount_off));
      }
      // setItemsPrice(items_price - (items_price - promo_excluded) - promo.amount_off);
      // setTaxPrice(tax_rate * (items_price - (items_price - promo_excluded) - promo.amount_off));
    }
    if (promo.free_shipping) {
      setShippingPrice(0);
      set_free_shipping_message("Free");
      set_show_message(`${promo.promo_code.toUpperCase()} Free Shipping`);
    }
    if (promo.percentage_off) {
      set_show_message(`${promo.promo_code.toUpperCase()} ${promo.percentage_off}% Off`);
    } else if (promo.amount_off) {
      set_show_message(`${promo.promo_code.toUpperCase()} $${promo.amount_off} Off`);
    }
    // else  {
    // 	set_show_message(`${promo.promo_code.toUpperCase()} $${previousShippingPrice.toFixed(2)} Off`);
    // }
    // set_show_message(
    // 	`${promo.promo_code.toUpperCase()} ${promo.percentage_off > 0
    // 		? `${promo.percentage_off}% Off`
    // 		: `$${promo.amount_off} Off`}`
    // );
    set_show_promo_code_input_box(false);
  };

  return (
    <Loading loading={loading} error={error}>
      {order && (
        <div>
          <Helmet>
            <title>Your Order | Glow LEDs</title>
            <meta property="og:title" content="Your Order" />
            <meta name="twitter:title" content="Your Order" />
            <link rel="canonical" href={"https://www.glow-leds.com/secure/account/order/" + props.match.params.id} />
            <meta property="og:url" content={"https://www.glow-leds.com/secure/account/order/" + props.match.params.id} />
          </Helmet>
          <Loading loading={loading_shipping_rates} />
          {order.isPaid ? <CheckoutSteps step1 step2 step3 step4 /> : <CheckoutSteps step1 step2 step3 />}
          <div className="mb-10px ml-20px jc-b">
            <div>
              {isAdmin(current_user) && (
                <Link to={props.location.previous_path || "/secure/glow/orders?page=1?limit=10"}>
                  <GLButton variant="secondary">Back to Admin Orders</GLButton>
                </Link>
              )}
              {current_user && current_user.first_name && (
                <Link to={"/secure/account/profile"}>
                  <GLButton variant="secondary">Back to Orders</GLButton>
                </Link>
              )}
            </div>
            {isAdmin(current_user) && (
              <GLButton variant="secondary" onClick={() => add_items_to_cart()}>
                Add Items to Cart
              </GLButton>
            )}
          </div>

          {isAdmin(current_user) && (
            <div className="row">
              <div className="ai-c">
                <GLButton
                  style={{ borderRadius: "50%" }}
                  variant="icon"
                  className="h-59px"
                  onClick={e => move_left(e)}
                  aria-label="Previous"
                >
                  <i className="fas fa-arrow-circle-left fs-40px" />
                </GLButton>
              </div>
              <h2
                style={{
                  textAlign: "center",
                  width: "100%",
                  marginRight: "auto",
                  justifyContent: "center"
                }}
                className="ta-c "
              >
                <Link
                  to={{
                    pathname: "/collections/all/products/" + product.pathname,
                    previous_path: history.location.pathname
                  }}
                >
                  {loading ? "Product" : product.name}
                </Link>
              </h2>
              <div className="ai-c">
                <GLButton style={{ borderRadius: "50%" }} variant="icon" className="h-59px" onClick={e => move_right(e)} aria-label="Next">
                  <i className="fas fa-arrow-circle-right fs-40px" />
                </GLButton>
              </div>
            </div>
          )}
          <Loading loading={loading_label} />
          <Loading loading={loading_email} />
          <LoadingPayments loading={payment_loading} error={errorPay} />
          <div className="placeorder br-20px" style={{}}>
            <div className="placeorder-info">
              <div
                style={{
                  backgroundColor: width > 407 && determine_color(order)
                }}
              >
                <div className="column jc-b h-22rem w-25remm mb-1rem">
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
                        {order.isManufactured ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                      </div>
                      <div className="mh-10px">Manufactured</div>

                      <div>{!order.manufacturedAt ? "" : format_date(order.manufacturedAt)}</div>
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
              </div>
              <div
                style={{
                  backgroundColor: width > 407 && determine_color(order)
                }}
              >
                <div className="mb-1rem">Order #: {order._id}</div>
                {order.tracking_number && order.tracking_number.length > 0 && determine_tracking_link(order.tracking_number) && (
                  <div>
                    Tracking #:{" "}
                    <a
                      href={order.tracking_url ? order.tracking_url : determine_tracking_link(order.tracking_number)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mv-2rem"
                      style={{
                        textDecoration: "underline",
                        color: "white"
                      }}
                    >
                      {order.tracking_number}
                    </a>
                  </div>
                )}

                {isAdmin(current_user) && order.return_tracking_number && (
                  <div className="w-100per column mt-1rem">
                    <label>
                      Return Tracking #:{" "}
                      <a
                        href={determine_tracking_link(order.return_tracking_number)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mv-2rem"
                        style={{
                          textDecoration: "underline",
                          color: "white"
                        }}
                      >
                        {order.return_tracking_number}
                      </a>
                    </label>
                  </div>
                )}

                <h2>Email</h2>
                <div className="jc-b w-100per mb-1rem" style={{ borderTop: ".1rem white solid" }} />
                <div className="jc-b wrap w-100per">
                  <div className="paragraph_font lh-25px mb-1rem">
                    <div>{order.shipping.email}</div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: width > 407 && determine_color(order)
                }}
              >
                {order.isRefunded && (
                  <h1>
                    Refunded: {order.payment.refund_reason[order.payment.refund_reason.length - 1]} on {format_date(order.refundedAt)}
                  </h1>
                )}

                <div className="wrap jc-b">
                  <div className="w-100per ">
                    <h2>Shipping</h2>
                    <div className="jc-b w-100per mb-1rem" style={{ borderTop: ".1rem white solid" }} />
                    <div className="jc-b wrap w-100per">
                      <div className="paragraph_font lh-25px mb-1rem">
                        <div>
                          {order.shipping.first_name} {order.shipping.last_name}
                        </div>
                        <div>
                          {order.shipping.address_1} {order.shipping.address_2}
                        </div>
                        <div>
                          {order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}, {order.shipping.country}
                        </div>
                        <div>{order.shipping.international && "International"}</div>
                      </div>
                      {order.shipping.shipping_rate && (
                        <div className="max-w-300px w-100per lh-25px">
                          <div className="ai-c jc-b w-100per">
                            <label className="mv-0px mr-5px">Carrier: </label>
                            <label className=" mv-0px">{order.shipping.shipping_rate.carrier} </label>
                          </div>
                          <div className="ai-c jc-b w-100per">
                            <label className="mv-0px mr-5px">Speed: </label>
                            <label className=" mv-0px">{order.shipping.shipping_rate.service} </label>
                          </div>
                          <div className="ai-c jc-b w-100per">
                            <label className="mv-0px mr-5px">Delivery Time: </label>
                            <label className=" mv-0px">
                              {order.shipping.shipping_rate.est_delivery_days}{" "}
                              {order.shipping.shipping_rate.est_delivery_days === 1 ? "Day" : "Days"}{" "}
                            </label>
                          </div>
                          <div className="ai-c jc-b w-100per">
                            <label className="mv-0px mr-5px">Rate: </label>
                            <label className=" mv-0px">${order.shipping.shipping_rate.retail_rate}</label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {isAdmin(current_user) && (
                      <GLButton
                        variant="secondary"
                        className="w-200px mv-10px mr-1rem"
                        onClick={() =>
                          copyToClipboard(`
${order.shipping.first_name} ${order.shipping.last_name}
${order.shipping.address_1} ${order.shipping.address_2}
${order.shipping.city}, ${order.shipping.state}
${order.shipping.postalCode} ${order.shipping.country}
${order.shipping.email}`)
                        }
                      >
                        Copy to clipboard
                      </GLButton>
                    )}
                    {isAdmin(current_user) && (
                      <Link to={`/secure/glow/userprofile/${order.user && order.user._id}`}>
                        <GLButton variant="secondary">View User</GLButton>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: width > 407 && determine_color(order)
                }}
              >
                <h2>Payment</h2>
                <div style={{ borderTop: ".1rem white solid", width: "100%" }}>
                  <p style={{ marginBottom: "0px" }}>{order.isPaid ? "Paid at " + format_date(order.paidAt) : "Not Paid"}</p>
                </div>
                {isAdmin(current_user) && (
                  <div className="">
                    <div className="pt-1rem" htmlFor="payment">
                      Payment Method: {order.payment.paymentMethod}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="placeorder-action" style={{ backgroundColor: width > 407 && determine_color(order) }}>
              <ul>
                <li>
                  <h2 style={{ marginTop: 0 }}>Order Summary</h2>
                </li>
                <div
                  style={{
                    backgroundColor: width > 407 && determine_color(order)
                  }}
                >
                  <ul className="cart-list-container mt-0px">
                    <li>
                      <div>Price</div>
                    </li>
                    {order.orderItems.length === 0 ? (
                      <div>Cart is empty</div>
                    ) : (
                      order.orderItems.map((item, index) => (
                        <CartItem check_item_as_manufactured={check_item_as_manufactured} item={item} index={index} show_qty={false} />
                      ))
                    )}
                  </ul>
                </div>
                {!order.promo_code && (
                  <li>
                    <div>Subtotal</div>
                    <div>${order.itemsPrice && order.itemsPrice.toFixed(2)}</div>
                  </li>
                )}

                {order.promo_code && (
                  <li>
                    <del style={{ color: "red" }}>
                      <div style={{ color: "white" }}>Subtotal</div>
                    </del>
                    <div>
                      <del style={{ color: "red" }}>
                        <label style={{ color: "white" }}>
                          ${order.orderItems && order.orderItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
                        </label>
                      </del>
                    </div>
                  </li>
                )}
                {order.promo_code && (
                  <li>
                    <div>Discount</div>
                    <div>-${(order.orderItems.reduce((a, c) => a + c.price * c.qty, 0) - order.itemsPrice).toFixed(2)}</div>
                  </li>
                )}
                {order.promo_code && (
                  <li>
                    <div>New Subtotal</div>
                    <div>${order.itemsPrice.toFixed(2)}</div>
                  </li>
                )}
                <li>
                  <div>Tax</div>
                  <div>${order.taxPrice ? order.taxPrice.toFixed(2) : order.taxPrice}</div>
                </li>
                <li>
                  <div>Shipping</div>
                  <div>${order.shippingPrice ? order.shippingPrice.toFixed(2) : order.shippingPrice}</div>
                </li>

                {order.tip > 0 && (
                  <li>
                    <div>Tip</div>
                    <div>${order.tip ? order.tip.toFixed(2) : order.tip}</div>
                  </li>
                )}
                {!order.isRefunded && (
                  <li>
                    <div>Order Total</div>
                    <div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
                  </li>
                )}
                {order.isRefunded && (
                  <li>
                    <div>Order Total</div>
                    <del style={{ color: "red" }}>
                      <label style={{ color: "white" }}>
                        <div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
                      </label>
                    </del>
                  </li>
                )}
                {order.isRefunded && (
                  <li>
                    <div>Refund Amount</div>
                    <div>${(order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}</div>
                  </li>
                )}
                {order.isRefunded && (
                  <li>
                    <div>New Order Total</div>
                    <div>${(order.totalPrice - order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100).toFixed(2)}</div>
                  </li>
                )}

                <li className="placeorder-actions-payment" style={{ display: "flex", justifyContent: "center" }} />
                {!order.isPaid && <Stripe pay_order={pay_order} />}

                {order.promo_code && (
                  <div className="">
                    <div style={{ borderTop: ".1rem white solid" }} className="pt-1rem" htmlFor="promo_code">
                      Promo Code: {order.promo_code}
                    </div>
                  </div>
                )}
                {order.order_note && (
                  <div className="">
                    <div style={{ borderTop: ".1rem white solid" }} className="pt-1rem" htmlFor="order_note">
                      Order Note: {order.order_note}
                    </div>
                  </div>
                )}
                {order.production_note && (
                  <div className="">
                    <div style={{ borderTop: ".1rem white solid" }} className="pt-1rem" htmlFor="production_note">
                      Production Note: {order.production_note}
                    </div>
                  </div>
                )}
              </ul>

              {isAdmin(current_user) && (
                <div className="column">
                  <label htmlFor="message_to_user">Message to User</label>
                  <input
                    type="text"
                    // value={message_to_user}
                    name="message_to_user"
                    id="message_to_user"
                    onChange={e => localStorage.setItem("message_to_user", e.target.value)}
                  />
                </div>
              )}

              {isAdmin(current_user) && (
                <div>
                  <div className="jc-b">
                    <div className="column jc-b w-100per mr-1rem">
                      <OrderStatusButtons
                        order={order}
                        update_order_payment_state={update_order_payment_state}
                        update_order_state={update_order_state}
                        send_order_email={send_order_email}
                        send_refund_email={send_refund_email}
                      />
                    </div>
                    <div className="column jc-b w-100per">
                      {order.shipping.shipping_label && (
                        <GLButton variant="secondary" className="mv-5px" onClick={() => view_label()}>
                          Print Label
                        </GLButton>
                      )}
                      {isAdmin(current_user) && (
                        <GLButton variant="secondary" className="w-100per mv-5px " onClick={get_invoice}>
                          Print Invoice
                        </GLButton>
                      )}
                      {hide_label_button && !order.shipping.shipping_label && (
                        <GLButton variant="primary" className="mv-5px" onClick={() => buy_label()}>
                          Buy Label
                        </GLButton>
                      )}
                      <GLButton variant="secondary" className="mv-5px">
                        <Link to={"/secure/glow/editorder/" + order._id}>Edit Order</Link>
                      </GLButton>
                      <GLButton variant="secondary" className="mv-5px" onClick={() => dispatch(API.deleteOrder(order._id))}>
                        Delete Order
                      </GLButton>
                      {hide_label_button && (
                        <GLButton variant="secondary" className="mv-5px" onClick={e => get_shipping_rates(e)}>
                          Change Shipping Speed
                        </GLButton>
                      )}
                      {hide_label_button &&
                        shipping_rates &&
                        shipping_rates.map((rate, index) => {
                          return (
                            <div className=" mv-1rem jc-b  ai-c" key={index}>
                              <div className="shipping_rates jc-b w-100per wrap ">
                                <div className="service">{rate.carrier}</div>
                                <div className="service">{rate.service}</div>

                                <div>${parseFloat(rate.rate).toFixed(2)}</div>
                                <div>
                                  {rate.delivery_days} {rate.delivery_days === 1 ? "Day" : "Days"}
                                </div>
                              </div>
                              <GLButton className="rates" onClick={e => choose_shipping_rate(e, rate, rate.service)}>
                                Select
                              </GLButton>
                            </div>
                          );
                        })}
                      {!hide_label_button && rate && (
                        <div className=" mv-1rem jc-b ai-c w-100per">
                          <div className="shipping_rates jc-b w-100per ">
                            <div>
                              {rate.speed} ${parseFloat(rate.rate.rate)}
                              {rate.rate.delivery_days} {rate.rate.delivery_days === 1 ? "Day" : "Days"}
                            </div>
                          </div>
                          <GLButton className="rates w-10rem" onClick={e => re_choose_shipping_rate(e)}>
                            Change
                          </GLButton>
                        </div>
                      )}
                      {!hide_label_button && (
                        <GLButton variant="primary" className="mv-5px" onClick={() => buy_new_speed_label()}>
                          Buy New Speed Label
                        </GLButton>
                      )}

                      <GLButton variant="secondary" className="mv-5px" onClick={() => create_label("first")}>
                        {!order.shipping.shipping_label ? "Create First Class Label" : "Create First Class New Label"}
                      </GLButton>
                      <GLButton variant="secondary" className="mv-5px" onClick={() => create_label("priority")}>
                        {!order.shipping.shipping_label ? "Create Priority Label" : "Create New Prioirty Label"}
                      </GLButton>
                      <GLButton variant="secondary" className="mv-5px" onClick={() => create_label("express")}>
                        {!order.shipping.shipping_label ? "Create Express Label" : "Create New Express Label"}
                      </GLButton>

                      {!order.shipping.return_shipping_label && (
                        <GLButton variant="secondary" className="mv-5px" onClick={() => create_return_label()}>
                          Create Return Label
                        </GLButton>
                      )}
                      {order.shipping.return_shipping_label && (
                        <GLButton variant="secondary" className="mv-5px" onClick={() => view_return_label()}>
                          View Return Label
                        </GLButton>
                      )}
                      {/* {order.shipping.return_shipping_label && (
												<GLButton
													variant="secondary" className="mv-5px w-100per"
													onClick={(e) =>
														download_return_label(
															order.shipping.return_shipping_label.postage_label
																.label_url,
															'Return Label',
															e
														)}
												>
													Download Return Label
												</GLButton>
											)} */}
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
                      <GLButton variant="secondary" className="mv-5px" onClick={() => create_duplicate_order(order._id)}>
                        Create Duplicate Order
                      </GLButton>

                      {/* <GLButton
										variant="primary" className="mv-5px "
										onClick={() =>
											update_order_state(
												order,
												order.isManufactured,
												'isManufactured',
												'manufacturedAt'
											)}
									>
										{order.isManufactured ? 'Unset to Manufactured' : 'Set to Manufactured'}
									</GLButton>
									<GLButton
										variant="primary" className="mv-5px "
										onClick={() =>
											update_order_state(order, order.isPackaged, 'isPackaged', 'packagedAt')}
									>
										{order.isPackaged ? 'Unset to Packaged' : 'Set to Packaged'}
									</GLButton>
									<GLButton
										variant="primary" className="mv-5px "
										onClick={() =>
											update_order_state(order, order.isShipped, 'isShipped', 'shippedAt')}
									>
										{order.isShipped ? 'Unset to Shipped' : 'Set to Shipped'}
									</GLButton>
									<GLButton
										variant="primary" className="mv-5px "
										onClick={() =>
											update_order_state(order, order.isDelivered, 'isDelivered', 'deliveredAt')}
									>
										{order.isDelivered ? 'Unset to Delivered' : 'Set to Delivered'}
									</GLButton>
									<GLButton variant="primary">
										<Link to={'/secure/glow/editorder/' + order._id}>Edit Order</Link>
									</GLButton> */}
                    </div>
                  </div>
                  {/* {isAdmin(current_user) && (
                    <div className="mv-10px">
                      <label htmlFor="promo_code">Promo Code</label>
                      <form onSubmit={e => check_code(e)} className="row">
                        <input
                          type="text"
                          name="promo_code"
                          id="promo_code"
                          className="w-100per"
                          style={{
                            textTransform: "uppercase"
                          }}
                          onChange={e => {
                            set_promo_code(e.target.value.toUpperCase());
                          }}
                        />
                        <GLButton
                          type="submit"
                          variant="primary"
                          style={{
                            curser: "pointer"
                          }}
                        >
                          Apply
                        </GLButton>
                      </form>
                    </div>
                  )} */}
                  <div className="mv-10px">
                    <label htmlFor="refund_amount">Refund Amount</label>
                    <div className="row">
                      <input
                        type="text"
                        value={refund_amount}
                        name="refund_amount"
                        id="refund_amount"
                        className="w-100per"
                        onChange={e => set_refund_amount(e.target.value)}
                      />
                    </div>
                    <div className="mv-10px">
                      <label htmlFor="refund_reason">Refund Reason</label>
                      <div className="row">
                        <input
                          type="text"
                          value={refund_reason}
                          name="refund_reason"
                          id="refund_reason"
                          className="w-100per"
                          onChange={e => set_refund_reason(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="">
                      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => update_refund_state(refund_amount)}>
                        Refund Partial Amount
                      </GLButton>
                      <GLButton variant="primary" className="mv-5px w-100per" onClick={() => update_refund_state(order.totalPrice)}>
                        Refund Full Amount
                      </GLButton>

                      <GLButton variant="secondary" className="mv-5px w-100per">
                        <Link to={"/secure/glow/emails/order/" + order._id + "/order/false"}>View Email</Link>
                      </GLButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Loading>
  );
};

export default OrderPage;
