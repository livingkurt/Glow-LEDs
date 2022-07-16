import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { API_Promos } from "../../utils";
import { detailsAffiliate } from "../../actions/affiliateActions";
import { listMyPaychecks } from "../../actions/paycheckActions";
import { Loading } from "../../components/UtilityComponents";
import { format_date } from "../../utils/helper_functions";
import { check_authentication } from "../../utils/react_helper_functions";
import { GLButton } from "../../components/GlowLEDsComponents";

const ProfilePage = props => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  // console.log({ userInfo });

  const affiliateDetails = useSelector(state => state.affiliateDetails);
  const { affiliate, loading, error } = affiliateDetails;

  const myPaycheckList = useSelector(state => state.myPaycheckList);
  const {
    loading: loading_paychecks,
    paychecks,
    error: error_paychecks,
  } = myPaycheckList;

  // console.log({ paychecks });

  const [ number_of_uses, set_number_of_uses ] = useState(0);
  const [ revenue, set_revenue ] = useState(0);
  // const [ affiliate, set_affiliate ] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (userInfo && userInfo.is_affiliated && userInfo.affiliate) {
        console.log({ affiliate: userInfo.affiliate.pathname });
        dispatch(detailsAffiliate(userInfo.affiliate.pathname));
        dispatch(listMyPaychecks(userInfo.affiliate._id));
      }
    }
    return () => (clean = false);
  }, []);

  useEffect(
    () => {
      let clean = true;
      if (clean) {
        if (affiliate && affiliate.public_code) {
          get_code_usage(affiliate.public_code);
        }
      }
      return () => (clean = false);
    },
    [ affiliate ]
  );

  // console.log({ affiliate });

  const get_code_usage = async public_code => {
    // console.log({ pathname: affiliate.pathname });
    const {
      data: { number_of_uses, revenue },
    } = await API_Promos.get_code_usage(public_code.promo_code);
    console.log({ number_of_uses, revenue });
    set_number_of_uses(number_of_uses);
    set_revenue(revenue);
  };

  const colors = [
    { name: "Paid", color: "#3e4c6d" },
    { name: "Not Paid", color: "#6f3c3c" },
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

  return (
    <div className="p-20px inner_content">
      <Helmet>
        <title>Profile | Glow LEDs</title>
        <meta property="og:title" content="Profile" />
        <meta name="twitter:title" content="Profile" />
        <link
          rel="canonical"
          href="https://www.glow-leds.com/secure/account/profile"
        />
        <meta
          property="og:url"
          content="https://www.glow-leds.com/secure/account/profile"
        />
      </Helmet>
      <div>
        <h1 style={{ textAlign: "center", width: "100%" }}>User Profile</h1>
      </div>
      <div className="jc-b">
        <div className="jc-b wrap w-100per">
          <div>
            <Link to={"/secure/account/editprofile"}>
              <GLButton variant="primary">Edit Profile</GLButton>
            </Link>
          </div>
          <div>
            <Link to={"/account/changepassword"}>
              <GLButton variant="primary">Change Password</GLButton>
            </Link>
          </div>
          <div>
            <Link to={"/secure/account/orders"}>
              <GLButton variant="primary">View Orders</GLButton>
            </Link>
          </div>
          {userInfo.is_affiliated &&
          userInfo.affiliate &&
          userInfo.affiliate.pathname && (
            <div>
              <Link
                to={
                  "/secure/account/edit_affiliate/" +
                  userInfo.affiliate.pathname
                }
              >
                <GLButton variant="primary">Edit Affiliate Profile</GLButton>
              </Link>
            </div>
          )}{" "}
          {userInfo.is_affiliated &&
          !userInfo.affiliate && (
            <div>
              <Link to={"/secure/account/edit_affiliate"}>
                <GLButton variant="primary">Affiliate Sign Up</GLButton>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="jc-b wrap group">
        <div className="group_item">
          <h2 className="group_images">User Info</h2>
          {/* <div className="max-w-700px w-500px"> */}
          <div className="mb-20px">
            <h3>First Name</h3>
            <label>{userInfo.first_name}</label>
          </div>
          <div className="mb-20px">
            <h3>Last Name</h3>
            <label>{userInfo.last_name}</label>
          </div>
          <div className="mb-20px">
            <h3>Email</h3>
            <label>{userInfo.email}</label>
          </div>
          <div className="mb-20px">
            <h3>Password</h3>
            <label>**********</label>
          </div>
          <div className="label">
            <h3>Shipping Address</h3>
            <div>
              {userInfo.shipping.first_name} {userInfo.shipping.last_name}
            </div>
            <div>
              {userInfo.shipping.address_1} {userInfo.shipping.address_2}
            </div>
            <div>
              {userInfo.shipping.city}, {userInfo.shipping.state}{" "}
              {userInfo.shipping.postalCode} {userInfo.shipping.country}
            </div>
            <div>{userInfo.shipping.international && "International"}</div>
            <div>{userInfo.shipping.email}</div>
          </div>
          <div className="mb-20px">
            <h3>Promotional Emails</h3>
            <label>
              {userInfo.email_subscription ? "Subscribed" : "Not Subscribed"}
            </label>
          </div>
          {/* </div> */}
        </div>
        <div className="group_item">
          {userInfo.is_affiliated &&
          userInfo.affiliate &&
          affiliate &&
          affiliate.public_code &&
          revenue && (
            <div className="mb-20px max-w-700px w-500px">
              <h2 className="group_images">Affiliate Metrics</h2>
              <div className="mb-20px">
                <h3>Public Code</h3>
                <label>{affiliate.public_code.promo_code.toUpperCase()}</label>
              </div>
              <div className="mb-20px">
                <h3>Private Code</h3>
                <label>{affiliate.private_code.promo_code.toUpperCase()}</label>
              </div>
              <div className="mb-20px">
                <h3>Code Usage</h3>
                <label>
                  {affiliate.public_code.promo_code.toUpperCase()} used{" "}
                  {number_of_uses} times
                </label>
              </div>
              <div className="mb-20px">
                <h3>Total Revenue</h3>
                <label>${parseFloat(revenue).toFixed(2)}</label>
              </div>
              <div className="mb-20px">
                <h3>Total Earrned</h3>
                <label>
                  ${parseFloat(
                    affiliate.promoter ? 0.1 * revenue : 0.15 * revenue
                  ).toFixed(2)}
                </label>
              </div>
              {/* <h3>Affilate Terms</h3> */}
              <div className="mt-1rem">
                {affiliate.promoter && (
                  <div>
                    <a
                      href={
                        "https://docs.google.com/document/d/1j3Bcv2__QGiTlVf--R-BNVpvGRN_RzWvuvMFCPodqS4/edit?usp=sharing"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GLButton variant="primary">View Promoter Terms</GLButton>
                    </a>
                    <a
                      href={
                        "https://docs.google.com/spreadsheets/d/1vy1OKH0P96cDkjuq-_yBT56CA1yQRMY3XZ2kgN95Spg/edit?usp=sharing"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GLButton variant="primary">
                        View Promoter Revenue
                      </GLButton>
                    </a>
                  </div>
                )}
                {affiliate.sponsor && (
                  <div>
                    <a
                      href={
                        "https://docs.google.com/document/d/1t1HwnnPbsgE5THHLWS_-5gYyXwIRcSv8yunXK2oRxOE/edit?usp=sharing"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GLButton variant="primary">View Sponsor Terms</GLButton>
                    </a>
                    <a
                      href={
                        "https://docs.google.com/spreadsheets/d/1nxYhdgGqme0tSvOrYeb6oU9RIOLeA2aik3-K4H1dRpA/edit?usp=sharing"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GLButton variant="primary">
                        View Sponsor Revenue
                      </GLButton>
                    </a>
                  </div>
                )}
                {affiliate.team && (
                  <div>
                    <a
                      href={
                        "https://docs.google.com/document/d/1WRCW4psn0U2iRHDk9ZVJuaOYU8vj9nRbj8O2SdfUo90/edit?usp=sharing"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GLButton variant="primary">View Team Terms</GLButton>
                    </a>
                    <a
                      href={
                        "https://docs.google.com/document/d/1WRCW4psn0U2iRHDk9ZVJuaOYU8vj9nRbj8O2SdfUo90/edit?usp=sharing"
                      }
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
                  href={
                    "https://docs.google.com/document/d/1hiquje1Bw-SWlYEO2Lp8NMfVZhvMRNNrwNog4Ltr5Ac/edit"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GLButton variant="primary">
                    View Affiliate Learnings
                  </GLButton>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      {affiliate &&
      (affiliate.promoter || affiliate.sponsor) && (
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
                      borderRadius: "5px",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mb-1rem">
            Total Payout ${paychecks &&
              paychecks
                .reduce((a, paycheck) => a + paycheck.amount, 0)
                .toFixed(2)}
          </div>
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
                      {/* <th>Receipt</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {paychecks.map((paycheck, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor: determine_color(paycheck),
                          fontSize: "1.4rem",
                        }}
                      >
                        <td className="p-10px">
                          {paycheck.paid ? (
                            <i className="fas fa-check-circle" />
                          ) : (
                            <i className="fas fa-times-circle" />
                          )}
                        </td>
                        <td className="p-10px" style={{ minWidth: "15rem" }}>
                          {paycheck.paid_at && format_date(paycheck.paid_at)}
                        </td>
                        <td className="p-10px">
                          {paycheck.affiliate ? (
                            paycheck.affiliate.artist_name
                          ) : (
                            paycheck.team && paycheck.team.team_name
                          )}
                        </td>
                        <td className="p-10px">${paycheck.amount}</td>
                        <td className="p-10px">{paycheck.venmo}</td>
                        {/* <td className="p-10px">{paycheck.receipt}</td> */}
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

export default ProfilePage;
