import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../../actions/userActions";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { API_Emails, API_Orders } from "../../utils";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { listMyPaychecks, listPaychecks } from "../../actions/paycheckActions";
import { listPromos } from "../../actions/promoActions";
import { format_date, update_products_url } from "../../utils/helper_functions";
import { detailsAffiliate } from "../../actions/affiliateActions";
import { isAdmin } from "../../utils/helpers/user_helpers";
import { OrderListItem } from "../OrdersPage/components";
import { listMyOrders } from "../../actions/orderActions";
import GLTable from "../../shared/GlowLEDsComponents/GLTable/GLTable";
import { determine_code_tier } from "../../utils/helpers/affiliate_helpers";

const ProfilePage = props => {
  const history = useHistory();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector(state => state.userDetails);
  const { loading, user, message, error } = userDetails;

  const affiliateDetails = useSelector(state => state.affiliateDetails);
  const { affiliate } = affiliateDetails;

  // const myPaycheckList = useSelector(state => state.myPaycheckList);
  // const { loading: loading_paychecks, paychecks, error: error_paychecks } = myPaycheckList;

  const paycheckList = useSelector(state => state.paycheckList);
  const { paychecks, totalPages } = paycheckList;

  const promoList = useSelector(state => state.promoList);
  const { promos, error: promo_errors, message: promo_message } = promoList;

  const myOrderList = useSelector(state => state.myOrderList);
  const { orders } = myOrderList;

  const [user_orders, set_user_orders] = useState(false);

  const [id, set_id] = useState(props.match.params.id || "");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, setEmail] = useState("");
  const [verified, set_verified] = useState();
  const [admin, set_admin] = useState();
  const [shipping, set_shipping] = useState({});
  const [email_subscription, set_email_subscription] = useState();
  const [loading_current_month, set_loading_current_month] = useState(true);
  const [loading_current_year, set_loading_current_year] = useState(true);
  // const [loading_revenue, set_loading_revenue] = useState(true);

  const [current_month_number_of_uses, set_current_month_number_of_uses] = useState(0);
  const [current_month_revenue, set_current_month_revenue] = useState(0);
  const [current_year_number_of_uses, set_current_year_number_of_uses] = useState(0);
  const [current_year_revenue, set_current_year_revenue] = useState(0);
  const [total_number_of_uses, set_total_number_of_uses] = useState(0);
  const [total_revenue, set_total_revenue] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.id) {
        set_id(props.match.params.id);
        set_user_orders(props.match.params.id ? true : false);
        dispatch(detailsUser(props.match.params.id));
        dispatch(listMyOrders(props.match.params.id));
      } else {
        set_id(userInfo._id);
        dispatch(detailsUser(userInfo._id));
        dispatch(listMyOrders(userInfo._id));
      }
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.id, userInfo._id]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (user) {
        setEmail(user.email);
        set_first_name(user.first_name);
        set_last_name(user.last_name);
        set_verified(user.isVerified);
        set_admin(user.isAdmin);
        set_shipping(user.shipping);
        set_email_subscription(user.email_subscription);
        if (user && user.is_affiliated && user.affiliate) {
          dispatch(detailsAffiliate({ id: user.affiliate._id }));
          // dispatch(listMyPaychecks(user.affiliate._id));
          dispatch(listPaychecks({ limit, page, affiliate: user.affiliate._id }));
          dispatch(listPromos({ affiliate: user.affiliate._id, active: true }));
        }
      }
    }
    return () => (clean = false);
  }, [user]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (affiliate && affiliate.public_code && affiliate.public_code.promo_code) {
        get_code_usage(affiliate.public_code.promo_code.toUpperCase());
      }
    }
    return () => (clean = false);
  }, [affiliate]);

  // useEffect(() => {
  //   let clean = true;
  //   if (clean) {
  //     if (error_paychecks) {
  //       setTimeout(() => {
  //         dispatch(listMyPaychecks(user.affiliate));
  //       }, 1000);
  //     }
  //   }
  //   return () => (clean = false);
  // }, [error_paychecks]);

  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];

  const container_styles = {
    marginBottom: "20px"
  };

  const get_code_usage = async public_code => {
    set_loading_current_month(true);
    set_loading_current_year(true);
    const date = new Date();
    const monthNumber = date.getMonth();
    const year = date.getFullYear();
    const monthName = monthNames[monthNumber];
    const { data: current_month } = await API_Orders.affiliate_code_usage_orders_a(public_code, {
      year: year,
      month: monthName
    });
    set_current_month_number_of_uses(current_month.number_of_uses);
    set_current_month_revenue(current_month.revenue);
    set_loading_current_month(false);
    const { data: current_year } = await API_Orders.affiliate_code_usage_orders_a(public_code, {
      year: year
    });
    set_current_year_number_of_uses(current_year.number_of_uses);
    set_current_year_revenue(current_year.revenue);
    // set_total_number_of_uses(total.number_of_uses);
    // set_total_revenue(total.revenue);
    set_loading_current_year(false);
  };

  const colors = [
    { name: "Paid", color: "#3e4c6d" },
    { name: "Not Paid", color: "#6f3c3c" }
  ];

  const determine_color = paycheck => {
    let result = "";
    if (paycheck.paid) {
      result = colors[0].color;
    }
    if (!paycheck.paid) {
      result = colors[1].color;
    }
    return result;
  };

  const order_colors = [
    { name: "Not Paid", color: "#6d3e3e" },
    { name: "Paid", color: "#3e4c6d" },
    { name: "Manufactured", color: "#4b7188" },
    { name: "Packaged", color: "#6f5f7d" },
    { name: "Shipped", color: "#636363" },
    { name: "Delivered", color: "#333333" }
  ];

  const determine_order_color = order => {
    let result = "";
    if (!order.isPaid) {
      result = order_colors[0].color;
    }
    if (order.isPaid) {
      result = order_colors[1].color;
    }
    if (order.isManufactured) {
      result = order_colors[2].color;
    }
    if (order.isPackaged) {
      result = order_colors[3].color;
    }
    if (order.isShipped) {
      result = order_colors[4].color;
    }
    if (order.isDelivered) {
      result = order_colors[5].color;
    }
    return result;
  };

  const column_defs = [
    { title: "Date Paid", display: paycheck => paycheck.paid_at && format_date(paycheck.paid_at) },
    { title: "Paid", display: paycheck => (paycheck.paid ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />) },
    {
      title: "Affiliate",
      display: paycheck => (paycheck.affiliate ? paycheck.affiliate.artist_name : paycheck.team && paycheck.team.team_name)
    },
    { title: "Amount", display: paycheck => `$${paycheck.amount.toFixed(2)}` }
  ];

  const send_not_verified_email = async () => {
    const request = await API_Emails.not_verified_email(user);
  };

  const [search, set_search] = useState("");
  const [sort, set_sort] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    dispatch(listPaychecks({ search, sort, affiliate: user.affiliate._id }));
  };

  const sortHandler = e => {
    set_sort(e.target.value);
    dispatch(listPaychecks({ search, sort: e.target.value, affiliate: user.affiliate._id }));
  };

  const [page, set_page] = useState(1);
  const [limit, set_limit] = useState(10);

  const update_page = (e, new_page) => {
    let search = "";
    let sort = "";
    let filter = "";
    let limit = 10;
    let option = false;

    e.preventDefault();
    const page = parseInt(new_page);
    set_page(page);
    update_products_url(history, search, "", "", page, limit);

    dispatch(listPaychecks({ limit, page, search, affiliate: user.affiliate._id }));
  };

  const sort_options = ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"];
  return (
    <div className="p-20px inner_content">
      <Helmet>
        <title>Admin User Profile | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      {user && userInfo && userInfo._id && user._id && userInfo._id !== user._id && (
        <GLButton variant="icon" onClick={() => history.goBack()}>
          <i class="fas fa-chevron-left"></i>
        </GLButton>
      )}

      <div className="row">
        <h1 style={{ textAlign: "center", width: "100%" }}>
          {userInfo.first_name === first_name ? "My Profile" : `${first_name}'s Profile`}
        </h1>
      </div>
      <Loading loading={loading} error={error}>
        {user && (
          <div className="profile_container row jc-b wrap">
            <div className="">
              {isAdmin(userInfo) && (
                <div className="" style={container_styles}>
                  <h3>ID</h3>
                  <label>{id}</label>
                </div>
              )}
              <div className="" style={container_styles}>
                <h3>First Name</h3>
                <label>{first_name}</label>
              </div>
              <div className="" style={container_styles}>
                <h3>Last Name</h3>
                <label>{last_name}</label>
              </div>
              <div className="" style={container_styles}>
                <h3>Email</h3>
                <label>{email}</label>
              </div>
              <div className="" style={container_styles}>
                <h3>Password</h3>
                <label>**********</label>
              </div>
              {shipping && shipping.first_name && shipping.last_name && (
                <div className="label">
                  <h3>Shipping Address</h3>
                  <div>
                    <div>
                      {shipping.first_name} {shipping.last_name}
                    </div>
                    <div>
                      {shipping.address_1} {shipping.address_2}
                    </div>
                    <div>
                      {shipping.city}, {shipping.state} {shipping.postalCode} {shipping.country}
                    </div>
                    <div>{shipping.international && "International"}</div>
                    <div>{shipping.email}</div>
                  </div>
                </div>
              )}
              <div className="mb-20px">
                <h3>Promotional Emails</h3>
                <label>{email_subscription ? "Subscribed" : "Not Subscribed"}</label>
              </div>
              {isAdmin(userInfo) && (
                <>
                  <div className="" style={container_styles}>
                    <h3>Verified</h3>
                    <label>{verified === true ? "Verified" : "Not Verified"}</label>
                  </div>
                  <div className="" style={container_styles}>
                    <h3>Admin</h3>
                    <label>{admin === true ? "Admin" : "Not Admin"}</label>
                  </div>
                </>
              )}
            </div>
            <div>
              <div className="row">
                <div style={{ height: 50 }}>
                  <Link to={isAdmin(userInfo) ? "/secure/glow/edituser/" + id : "/secure/account/editprofile/" + id}>
                    <GLButton style={{ marginRight: "10px", maxWidth: "225px" }} variant="primary">
                      Edit Profile
                    </GLButton>
                  </Link>
                </div>
                {isAdmin(userInfo) ? (
                  <div style={{ height: 50 }}>
                    <Link to={"/secure/glow/change_password/" + id}>
                      <GLButton style={{ marginRight: "10px", maxWidth: "210px" }} variant="primary">
                        Change Password
                      </GLButton>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link to={"/account/changepassword"}>
                      <GLButton style={{ marginRight: "10px", maxWidth: "210px" }} variant="primary">
                        Change Password
                      </GLButton>
                    </Link>
                  </div>
                )}
                <div style={{ height: 50 }}>
                  <Link to={"/secure/glow/userorders/" + id}>
                    <GLButton style={{ maxWidth: "225px", marginRight: "10px" }} variant="primary">
                      View Orders
                    </GLButton>
                  </Link>
                </div>
                {userInfo.is_affiliated && userInfo.affiliate && (
                  <div style={{ height: 50 }}>
                    <GLButton style={{ maxWidth: "225px" }} onClick={send_not_verified_email} variant="primary">
                      Still Not Verified
                    </GLButton>
                  </div>
                )}
                <div className="ml-10px">
                  {userInfo.is_affiliated && affiliate && affiliate.pathname && (
                    <div>
                      <Link to={"/secure/account/edit_affiliate/" + affiliate.pathname}>
                        <GLButton variant="primary">Edit Affiliate Profile</GLButton>
                      </Link>
                    </div>
                  )}{" "}
                  {userInfo.is_affiliated && !userInfo.affiliate && (
                    <div>
                      <Link to={"/secure/account/edit_affiliate"}>
                        <GLButton variant="primary">Affiliate Sign Up</GLButton>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="group_item w-100per">
                {user.is_affiliated && user.affiliate && affiliate && affiliate.public_code && promos && (
                  <div className="mb-20px ">
                    <h2 className="group_images">Affiliate Metrics</h2>
                    <div className="mb-20px">
                      <h3>Public Code</h3>
                      <label>{affiliate && affiliate.public_code.promo_code.toUpperCase()}</label>
                    </div>
                    <div className="mb-20px">
                      <h3>Private Code</h3>
                      <label>{affiliate && affiliate.private_code.promo_code.toUpperCase()}</label>
                    </div>
                    <div className="mb-20px">
                      <h3>Projected Private Code Discount</h3>
                      <label>{!loading_current_month && determine_code_tier(affiliate, current_month_number_of_uses)}% Off</label>
                    </div>
                    {affiliate.sponsor && (
                      <>
                        <div className="mb-20px">
                          <h3>Monthly Sponsor Code ($25 off)</h3>
                          <label>{promos && promos[0] && promos[0].promo_code.toUpperCase()}</label>
                        </div>
                        <div className="mb-20px">
                          <h3>Refresh Pack Sponsor Code</h3>
                          <label>{promos && promos[1] && promos[1].promo_code.toUpperCase()}</label>
                        </div>
                      </>
                    )}
                    {/* <div className="mb-20px">
                      <h3>Code Usage</h3>
                      <label>
                        {affiliate && affiliate.public_code.promo_code.toUpperCase()} used {total_number_of_uses} times
                      </label>
                    </div> */}
                    <h2 className="ta-c">Affiliate Earnings</h2>
                    <Loading loading={loading_current_year} error={error} />
                    <Loading loading={loading_current_month} error={error}>
                      <table className="styled-table w-100per">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Revenue</th>
                            <th>Earned</th>
                            <th>Uses</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            style={{
                              backgroundColor: "#656a87"
                            }}
                          >
                            <th>Current Month</th>
                            <th>${!loading_current_month && parseFloat(current_month_revenue).toFixed(2)}</th>
                            <th>
                              $
                              {!loading_current_month &&
                                parseFloat(
                                  affiliate && affiliate.promoter ? 0.1 * current_month_revenue : 0.15 * current_month_revenue
                                ).toFixed(2)}
                            </th>
                            <th>{!loading_current_month && current_month_number_of_uses}</th>
                          </tr>
                          <tr
                            style={{
                              backgroundColor: "#656a87"
                            }}
                          >
                            <th>Current Year</th>
                            <th>${!loading_current_year && parseFloat(current_year_revenue).toFixed(2)}</th>
                            <th>
                              $
                              {!loading_current_year &&
                                parseFloat(
                                  affiliate && affiliate.promoter ? 0.1 * current_year_revenue : 0.15 * current_year_revenue
                                ).toFixed(2)}
                            </th>
                            <th>{!loading_current_year && current_year_number_of_uses}</th>
                          </tr>
                          {/* <tr
                            style={{
                              backgroundColor: "#656a87"
                            }}
                          >
                            <th>Total</th>
                            <th>${parseFloat(total_revenue).toFixed(2)}</th>
                            <th>${parseFloat(affiliate && affiliate.promoter ? 0.1 * total_revenue : 0.15 * total_revenue).toFixed(2)}</th>
                            <th>{total_number_of_uses}</th>
                          </tr> */}
                        </tbody>
                      </table>
                      {/* <div className="mb-20px">
                        <h3>Total Revenue</h3>
                        <label>${parseFloat(total_revenue).toFixed(2)}</label>
                      </div>
                      <div className="mb-20px">
                        <h3>Total Earrned</h3>
                        <label>
                          ${parseFloat(affiliate && affiliate.promoter ? 0.1 * total_revenue : 0.15 * total_revenue).toFixed(2)}
                        </label>
                      </div>
                      <div className="mb-20px">
                        <h3>Current Month Revenue</h3>
                        <label>${parseFloat(current_month_revenue).toFixed(2)}</label>
                      </div>
                      <div className="mb-20px">
                        <h3>Current Month Earrned</h3>
                        <label>
                          $
                          {parseFloat(affiliate && affiliate.promoter ? 0.1 * current_month_revenue : 0.15 * current_month_revenue).toFixed(
                            2
                          )}
                        </label>
                      </div>
                      <div className="mb-20px">
                        <h3>Current Year Revenue</h3>
                        <label>${parseFloat(current_year_revenue).toFixed(2)}</label>
                      </div>
                      <div className="mb-20px">
                        <h3>Current Year Earrned</h3>
                        <label>
                          $
                          {parseFloat(affiliate && affiliate.promoter ? 0.1 * current_year_revenue : 0.15 * current_year_revenue).toFixed(
                            2
                          )}
                        </label>
                      </div> */}
                    </Loading>
                    <div className="mt-1rem">
                      {affiliate && affiliate.promoter && (
                        <div>
                          <a
                            href={"https://docs.google.com/document/d/1j3Bcv2__QGiTlVf--R-BNVpvGRN_RzWvuvMFCPodqS4/edit?usp=sharing"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GLButton variant="primary">View Promoter Terms</GLButton>
                          </a>
                          <a
                            href={"https://docs.google.com/spreadsheets/d/1vy1OKH0P96cDkjuq-_yBT56CA1yQRMY3XZ2kgN95Spg/edit?usp=sharing"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GLButton variant="primary">View Promoter Revenue</GLButton>
                          </a>
                        </div>
                      )}
                      {affiliate && affiliate.sponsor && (
                        <div>
                          <a
                            href={"https://docs.google.com/document/d/1t1HwnnPbsgE5THHLWS_-5gYyXwIRcSv8yunXK2oRxOE/edit?usp=sharing"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GLButton variant="primary">View Sponsor Terms</GLButton>
                          </a>
                          <a
                            href={"https://docs.google.com/spreadsheets/d/1nxYhdgGqme0tSvOrYeb6oU9RIOLeA2aik3-K4H1dRpA/edit?usp=sharing"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GLButton variant="primary">View Sponsor Revenue</GLButton>
                          </a>
                        </div>
                      )}
                      {affiliate.team && (
                        <div>
                          <a
                            href={"https://docs.google.com/document/d/1WRCW4psn0U2iRHDk9ZVJuaOYU8vj9nRbj8O2SdfUo90/edit?usp=sharing"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GLButton variant="primary">View Team Terms</GLButton>
                          </a>
                          <a
                            href={"https://docs.google.com/document/d/1WRCW4psn0U2iRHDk9ZVJuaOYU8vj9nRbj8O2SdfUo90/edit?usp=sharing"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GLButton variant="primary">View Team Revenue</GLButton>
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="mt-1rem">
                      <a
                        href={"https://docs.google.com/document/d/1hiquje1Bw-SWlYEO2Lp8NMfVZhvMRNNrwNog4Ltr5Ac/edit"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GLButton variant="primary">View Affiliate Learnings</GLButton>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Loading>
      {user && user.is_affiliated && user.affiliate && affiliate && (affiliate.promoter || affiliate.sponsor) && (
        <GLTable
          title="My Paychecks"
          rows={paychecks}
          column_defs={column_defs}
          determine_color={determine_color}
          colors={colors}
          // search={search}
          // sort_options={sort_options}
          // set_search={set_search}
          // submitHandler={submitHandler}
          // sortHandler={sortHandler}
          totalPages={totalPages}
          page={page}
          limit={limit}
          update_page={update_page}
        />
      )}
      <h1
        style={{
          textAlign: "center",
          width: "100%",
          justifyContent: "center"
        }}
      >
        {userInfo.first_name === first_name ? "My Orders" : `${first_name}'s Orders`}
      </h1>
      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <OrderListItem key={index} determine_color={determine_order_color} order={order} admin={isAdmin(userInfo)} />
        ))
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3>No Orders</h3>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
