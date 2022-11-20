import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../../actions/userActions";
import { Loading, Notification } from "../../components/UtilityComponents";
import { Helmet } from "react-helmet";
import { API_Emails, API_Promos } from "../../utils";
import { GLButton } from "../../components/GlowLEDsComponents";
import { listMyPaychecks } from "../../actions/paycheckActions";
import { listPromos } from "../../actions/promoActions";
import { format_date } from "../../utils/helper_functions";
import { detailsAffiliate } from "../../actions/affiliateActions";

const UserProfilePage = props => {
  const history = useHistory();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector(state => state.userDetails);
  const { loading, user, message, error } = userDetails;

  const affiliateDetails = useSelector(state => state.affiliateDetails);
  const { affiliate } = affiliateDetails;

  const myPaycheckList = useSelector(state => state.myPaycheckList);
  const { loading: loading_paychecks, paychecks, error: error_paychecks } = myPaycheckList;

  const promoList = useSelector(state => state.promoList);
  const { promos, error: promo_errors, message: promo_message } = promoList;

  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, setEmail] = useState("");
  const [verified, set_verified] = useState();
  const [admin, set_admin] = useState();
  const [shipping, set_shipping] = useState({});
  const [email_subscription, set_email_subscription] = useState();

  const [number_of_uses, set_number_of_uses] = useState(0);
  const [revenue, set_revenue] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(detailsUser(props.match.params.id));
      console.log({ user });
    }
    return () => (clean = false);
  }, [dispatch]);

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
          dispatch(listMyPaychecks(user.affiliate._id));
          dispatch(listPromos({ affiliate: user.affiliate._id }));
        }
      }
    }
    return () => (clean = false);
  }, [user]);

  // console.log({ promoList });
  // useEffect(() => {
  //   let clean = true;
  //   if (clean) {
  //     if (promo_message) {
  //       setTimeout(() => {
  //         dispatch(listPromos({ affiliate: user.affiliate }));
  //       }, 2000);
  //     }
  //   }
  //   return () => (clean = false);
  // }, [promo_message]);

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

  const container_styles = {
    marginBottom: "20px"
  };

  const get_code_usage = async public_code => {
    //
    const {
      data: { number_of_uses, revenue }
    } = await API_Promos.get_code_usage(public_code.promo_code);

    set_number_of_uses(number_of_uses);
    set_revenue(revenue);
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

  const send_not_verified_email = async () => {
    const request = await API_Emails.not_verified_email(user);
  };
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
        <h1 style={{ textAlign: "center", width: "100%" }}>{first_name}'s Profile</h1>
      </div>
      <Loading loading={loading} error={error}>
        {user && (
          <div className="profile_container row jc-b wrap">
            <div className="">
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
              <div className="label">
                <h3>Shipping Address</h3>
                {shipping && (
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
                )}
              </div>
              <div className="mb-20px">
                <h3>Promotional Emails</h3>
                <label>{email_subscription ? "Subscribed" : "Not Subscribed"}</label>
              </div>
              <div className="" style={container_styles}>
                <h3>Verified</h3>
                <label>{verified === true ? "Verified" : "Not Verified"}</label>
              </div>
              <div className="" style={container_styles}>
                <h3>Admin</h3>
                <label>{admin === true ? "Admin" : "Not Admin"}</label>
              </div>
            </div>
            <div>
              <div className="row">
                <div style={{ height: 50 }}>
                  <Link to={"/secure/glow/edituser/" + props.match.params.id}>
                    <GLButton style={{ marginRight: "10px", maxWidth: "225px" }} variant="primary">
                      Edit Profile
                    </GLButton>
                  </Link>
                </div>
                {userInfo && userInfo.isAdmin ? (
                  <div style={{ height: 50 }}>
                    <Link to={"/secure/glow/change_password/" + props.match.params.id}>
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
                  <Link to={"/secure/glow/userorders/" + props.match.params.id}>
                    <GLButton style={{ maxWidth: "225px", marginRight: "10px" }} variant="primary">
                      View Orders
                    </GLButton>
                  </Link>
                </div>
                {userInfo.is_affiliated && userInfo.affiliate && (
                  <div style={{ height: 50 }}>
                    {/* <Link to={'/secure/account/orders'}> */}
                    <GLButton style={{ maxWidth: "225px" }} onClick={send_not_verified_email} variant="primary">
                      Still Not Verified
                    </GLButton>
                    {/* </Link> */}
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
              <div className="group_item">
                {user.is_affiliated && user.affiliate && affiliate && affiliate.public_code && promos && (
                  <div className="mb-20px max-w-700px w-500px">
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
                      <h3>Monthly Sponsor Code ($25 off)</h3>
                      <label>{promos && promos[0] && promos[0].promo_code.toUpperCase()}</label>
                    </div>
                    <div className="mb-20px">
                      <h3>Refresh Pack Sponsor Code</h3>
                      <label>{promos && promos[1] && promos[1].promo_code.toUpperCase()}</label>
                    </div>
                    <div className="mb-20px">
                      <h3>Code Usage</h3>
                      <label>
                        {affiliate && affiliate.public_code.promo_code.toUpperCase()} used {number_of_uses} times
                      </label>
                    </div>
                    <div className="mb-20px">
                      <h3>Total Revenue</h3>
                      <label>${parseFloat(revenue).toFixed(2)}</label>
                    </div>
                    <div className="mb-20px">
                      <h3>Total Earrned</h3>
                      <label>${parseFloat(affiliate && affiliate.promoter ? 0.1 * revenue : 0.15 * revenue).toFixed(2)}</label>
                    </div>
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
        <div>
          <div className="jc-c">
            <h1 style={{ textAlign: "center" }}>Paychecks</h1>
          </div>
          <div className="wrap mv-1rem">
            {colors.map((color, index) => {
              return (
                <div className="wrap  mr-1rem" key={index}>
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
          {console.log({ paychecks })}
          <div className="mb-1rem">Total Payout ${paychecks && paychecks.reduce((a, paycheck) => a + paycheck.amount, 0).toFixed(2)}</div>
          <Loading loading={loading_paychecks} error={error_paychecks}>
            {paychecks && (
              <div className="paycheck-list responsive_table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Paid</th>
                      <th>Date Paid</th>
                      <th>Affiliate</th>
                      <th>Amount</th>
                      <th>Venmo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paychecks.map((paycheck, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor: determine_color(paycheck),
                          fontSize: "1.4rem"
                        }}
                      >
                        <td className="p-10px">
                          {paycheck.paid ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                        </td>
                        <td className="p-10px" style={{ minWidth: "15rem" }}>
                          {paycheck.paid_at && format_date(paycheck.paid_at)}
                        </td>
                        <td className="p-10px">
                          {paycheck.affiliate ? paycheck.affiliate.artist_name : paycheck.team && paycheck.team.team_name}
                        </td>
                        <td className="p-10px">${paycheck.amount}</td>
                        <td className="p-10px">{paycheck.venmo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Loading>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
