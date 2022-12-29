import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listMyOrders } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/UtilityComponents";
import { Helmet } from "react-helmet";
import { Order, OrderListItem, OrderSmallScreen } from "../../components/SpecialtyComponents";
import { check_authentication } from "../../utils/react_helper_functions";
import { GLButton } from "../../components/GlowLEDsComponents";

const MyOrdersPage = props => {
  const dispatch = useDispatch();

  const [block_list_view, set_block_list_view] = useState(false);
  const [user_orders, set_user_orders] = useState(false);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading, orders, error } = myOrderList;

  useEffect(() => {
    let clean = true;
    if (clean) {
      set_user_orders(props.match.params.id ? true : false);
      dispatch(listMyOrders(props.match.params.id || userInfo._id));
    }
    return () => (clean = false);
  }, []);

  const change_view = e => {
    if (e.target.value === "Block View") {
      set_block_list_view(true);
    } else {
      set_block_list_view(false);
    }
  };

  const colors = [
    { name: "Not Paid", color: "#6d3e3e" },
    { name: "Paid", color: "#3e4c6d" },
    { name: "Manufactured", color: "#4b7188" },
    { name: "Packaged", color: "#6f5f7d" },
    { name: "Shipped", color: "#636363" },
    { name: "Delivered", color: "#333333" }
  ];

  const determine_color = order => {
    let result = "";
    if (!order.isPaid) {
      result = colors[0].color;
    }
    if (order.isPaid) {
      result = colors[1].color;
    }
    if (order.isManufactured) {
      result = colors[2].color;
    }
    if (order.isPackaged) {
      result = colors[3].color;
    }
    if (order.isShipped) {
      result = colors[4].color;
    }
    if (order.isDelivered) {
      result = colors[5].color;
    }
    return result;
  };

  return (
    <div className="profile_container wrap column p-20px">
      <Helmet>
        <title>My Orders | Glow LEDs</title>
        <meta property="og:title" content="My Orders" />
        <meta name="twitter:title" content="My Orders" />
        <link rel="canonical" href="https://www.glow-leds.com/secure/account/orders" />
        <meta property="og:url" content="https://www.glow-leds.com/secure/account/orders" />
      </Helmet>
      <div className="wrap jc-b">
        <Link to={`/secure/account/profile/${userInfo._id}`}>
          <GLButton variant="secondary">Back to Profile</GLButton>
        </Link>
        {colors.map((color, index) => {
          return (
            <div className="wrap jc-b w-16rem m-1rem" key={index}>
              <label style={{ marginRight: "1rem" }}>{color.name}</label>
              <div
                style={{
                  backgroundColor: color.color,
                  height: "20px",
                  width: "60px",
                  borderRadius: "5px"
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="profile-orders profile_orders_container" style={{ width: "100%" }}>
        {/* <GLButton type="button" onClick={handleLogout} variant="secondary" className="w-100per">Logout</GLButton> */}

        <h1
          style={{
            textAlign: "center",
            width: "100%",
            justifyContent: "center"
          }}
        >
          {" "}
          {user_orders ? orders && orders[0] && orders[0].shipping.first_name + "'s Orders" : "My Orders"}
        </h1>
        {/* <h1 style={{ textAlign: 'center', width: '100%', justifyContent: 'center' }}>My Orders</h1> */}
        <div className="search_and_sort product_big_screen row jc-c ai-c" style={{ overflowX: "scroll" }}>
          <div className="mb-1rem">
            <div className="custom-select w-100per">
              <select className="qty_select_dropdown w-100per" onChange={e => change_view(e)}>
                {["List View", "Block View"].map((view, index) => (
                  <option key={index} value={view}>
                    {view}
                  </option>
                ))}
              </select>
              <span className="custom-arrow" />
            </div>
          </div>
        </div>
        <Loading loading={loading} error={error}>
          <div className="product_big_screen">
            {!block_list_view &&
              orders &&
              orders.map((order, index) => <OrderListItem key={index} determine_color={determine_color} order={order} />)}
          </div>
          <div className="product_big_screen">
            {block_list_view &&
              orders &&
              orders.map((order, index) => <Order key={index} determine_color={determine_color} order={order} />)}
          </div>
          <div className="product_small_screen none column">
            {orders && orders.map((order, index) => <OrderSmallScreen key={index} determine_color={determine_color} order={order} />)}
          </div>
        </Loading>
      </div>
    </div>
  );
};

export default MyOrdersPage;
