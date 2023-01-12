import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveUser, detailsUser } from "../../actions/userActions";
import { useHistory } from "react-router-dom";
import { Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { listAffiliates } from "../../actions/affiliateActions";
import { GLButton } from "../../shared/GlowLEDsComponents";

const EditUserPage = props => {
  const [id, set_id] = useState("");
  const [first_name, set_first_name] = useState("");
  const [affiliate, set_affiliate] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, set_email] = useState("");
  const [is_affiliated, set_is_affiliated] = useState(false);
  const [is_employee, set_is_employee] = useState(false);
  const [isVerified, set_isVerified] = useState(false);
  const [isAdmin, set_isAdmin] = useState(false);
  const [loading_checkboxes, set_loading_checkboxes] = useState(true);
  const [shipping, set_shipping] = useState({});
  const [email_subscription, set_email_subscription] = useState("");
  const [international, setInternational] = useState(false);
  const [stripe_connect_id, set_stripe_connect_id] = useState("");
  const [weekly_wage, set_weekly_wage] = useState("");

  const history = useHistory();

  const userDetails = useSelector(state => state.userDetails);
  const { user, loading, error } = userDetails;

  const affiliateList = useSelector(state => state.affiliateList);
  const { affiliates } = affiliateList;

  const dispatch = useDispatch();

  const set_state = () => {
    set_id(user._id);
    set_first_name(user.first_name);
    set_last_name(user.last_name);
    set_email(user.email);
    set_is_affiliated(user.is_affiliated);
    set_is_employee(user.is_employee);
    set_affiliate(user.affiliate && user.affiliate._id);
    set_isVerified(user.isVerified);
    set_isAdmin(user.isAdmin);
    set_shipping(user.shipping);
    set_email_subscription(user.email_subscription);
    setInternational(user.international);
    set_stripe_connect_id(user.stripe_connect_id);
    set_weekly_wage(user.weekly_wage);
  };
  const unset_state = () => {
    set_id("");
    set_first_name("");
    set_last_name("");
    set_email("");
    set_is_affiliated("");
    set_is_employee("");
    set_affiliate("");
    set_isVerified("");
    set_isAdmin("");
    set_shipping("");
    set_email_subscription("");
    setInternational("");
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.id) {
        dispatch(detailsUser(props.match.params.id));
        dispatch(detailsUser(props.match.params.id));
      } else {
        dispatch(detailsUser(""));
      }
      dispatch(listAffiliates({}));
      set_state();
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (user) {
        set_state();
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [user]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();

    dispatch(
      saveUser({
        _id: id,
        first_name,
        last_name,
        email,
        affiliate,
        is_affiliated,
        is_employee,
        isVerified,
        isAdmin,
        email_subscription,
        shipping,
        stripe_connect_id,
        weekly_wage
      })
    );
    e.target.reset();
    unset_state();
    // history.push("/secure/glow/users");
    history.goBack();
  };

  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit User" : "Create User"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Loading loading={loading} error={error}>
            {user && (
              <div>
                <Helmet>
                  <title>Edit User | Glow LEDs</title>
                </Helmet>

                <ul className="edit-form-container" style={{ maxWidth: "30rem", marginBottom: "20px" }}>
                  <div className="row wrap">
                    <div className="w-228px m-10px">
                      <li>
                        <label htmlFor="first_name">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          value={first_name}
                          id="first_name"
                          onChange={e => set_first_name(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="last_name">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          value={last_name}
                          id="last_name"
                          onChange={e => set_last_name(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" value={email} id="email" onChange={e => set_email(e.target.value)} />
                      </li>

                      <li>
                        <label htmlFor="affiliate">Affiliate</label>
                        <input
                          type="text"
                          name="affiliate"
                          value={affiliate}
                          id="affiliate"
                          onChange={e => set_affiliate(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="stripe_connect_id">Stripe Connect ID</label>
                        <input
                          type="text"
                          name="stripe_connect_id"
                          value={stripe_connect_id}
                          id="stripe_connect_id"
                          onChange={e => set_stripe_connect_id(e.target.value)}
                        />
                      </li>
                      <li>
                        <label htmlFor="weekly_wage">Weekly Wage</label>
                        <input
                          type="text"
                          name="weekly_wage"
                          value={weekly_wage}
                          id="weekly_wage"
                          onChange={e => set_weekly_wage(e.target.value)}
                        />
                      </li>
                      {affiliates && (
                        <div className="ai-c h-25px mv-10px mb-30px jc-c">
                          <div className="custom-select w-100per">
                            <select
                              className="qty_select_dropdown w-100per"
                              // defaultValue={{
                              // 	label: user.first_name + ' ' + user.last_name,
                              // 	value: user._id
                              // }}
                              onChange={e => set_affiliate(e.target.value)}
                            >
                              <option key={1} defaultValue="">
                                ---Choose Affiliate---
                              </option>
                              {affiliates.map((affiliate, index) => (
                                <option key={index} value={affiliate._id}>
                                  {affiliate.artist_name}
                                </option>
                              ))}
                            </select>
                            <span className="custom-arrow" />
                          </div>
                        </div>
                      )}
                      <li>
                        <h2 style={{ textAlign: "center" }}>Shipping</h2>
                      </li>
                      {shipping && (
                        <div>
                          <li>
                            <label htmlFor="first_name">First Name</label>
                            <input
                              defaultValue={shipping.first_name}
                              type="first_name"
                              name="first_name"
                              id="first_name"
                              onChange={e =>
                                set_shipping({
                                  ...shipping,
                                  first_name: e.target.value
                                })
                              }
                            />
                          </li>
                          {/* <label className="validation_text" style={{ fontSize: 16, justifyContent: 'center' }}>
								{first_name_validations}
							</label> */}
                          <li>
                            <label htmlFor="last_name">Last Name</label>
                            <input
                              defaultValue={shipping.last_name}
                              type="last_name"
                              name="last_name"
                              id="last_name"
                              onChange={e =>
                                set_shipping({
                                  ...shipping,
                                  last_name: e.target.value
                                })
                              }
                            />
                          </li>
                          {/* <label className="validation_text" style={{ fontSize: 16, justifyContent: 'center' }}>
								{last_name_validations}
							</label> */}
                          <li>
                            <label htmlFor="address_1">Address</label>
                            <input
                              type="text"
                              value={shipping.address_1}
                              name="address_1"
                              id="address_1"
                              onChange={e =>
                                set_shipping({
                                  ...shipping,
                                  address_1: e.target.value
                                })
                              }
                            />
                          </li>
                          <li>
                            <label htmlFor="address_2">Apt/Suite</label>
                            <input
                              type="text"
                              value={shipping.address_2}
                              name="address_2"
                              id="address_2"
                              onChange={e =>
                                set_shipping({
                                  ...shipping,
                                  address_2: e.target.value
                                })
                              }
                            />
                          </li>
                          {/* <label className="validation_text" style={{ justifyContent: 'center' }}>
							{address_validations
						</label> */}
                          <li>
                            <label htmlFor="city">City</label>
                            <input
                              type="text"
                              value={shipping.city}
                              name="city"
                              id="city"
                              onChange={e =>
                                set_shipping({
                                  ...shipping,
                                  city: e.target.value
                                })
                              }
                            />
                          </li>
                          {/* <label className="validation_text" style={{ justifyContent: 'center' }}>
							{city_validations}
						</label> */}
                          <li>
                            <label htmlFor="state">State</label>
                            <input
                              type="text"
                              value={shipping.state}
                              name="state"
                              id="state"
                              onChange={e =>
                                set_shipping({
                                  ...shipping,
                                  state: e.target.value
                                })
                              }
                            />
                          </li>
                          {/* <label className="validation_text" style={{ justifyContent: 'center' }}>
							{state_validations}
						</label> */}
                          <li>
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                              type="text"
                              value={shipping.postalCode}
                              name="postalCode"
                              id="postalCode"
                              onChange={e =>
                                set_shipping({
                                  ...shipping,
                                  postalCode: e.target.value
                                })
                              }
                            />
                          </li>
                          {/* <label className="validation_text" style={{ justifyContent: 'center' }}>
							{postal_code_validations}
						</label> */}
                          {loading ? (
                            <div>Loading...</div>
                          ) : (
                            <div>
                              <li>
                                <label htmlFor="international">International</label>
                                <input
                                  type="checkbox"
                                  name="international"
                                  // defaultChecked={international ? 'checked' : 'unchecked'}
                                  defaultValue={international}
                                  defaultChecked={international}
                                  value={shipping.international}
                                  id="international"
                                  onChange={e => {
                                    setInternational(e.target.checked);
                                  }}
                                />
                              </li>
                              {international && (
                                <li>
                                  <label htmlFor="country">Country</label>
                                  <input
                                    type="text"
                                    value={shipping.country}
                                    name="country"
                                    id="country"
                                    onChange={e =>
                                      set_shipping({
                                        ...shipping,
                                        country: e.target.value
                                      })
                                    }
                                  />
                                </li>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="email_subscription">Promotional Emails</label>
                          <input
                            type="checkbox"
                            name="email_subscription"
                            defaultChecked={email_subscription}
                            id="email_subscription"
                            onChange={e => {
                              set_email_subscription(e.target.checked);
                            }}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="is_affiliated">Affiliated</label>
                          <input
                            type="checkbox"
                            name="is_affiliated"
                            defaultChecked={is_affiliated}
                            id="is_affiliated"
                            onChange={e => {
                              set_is_affiliated(e.target.checked);
                            }}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="is_employee">Employee</label>
                          <input
                            type="checkbox"
                            name="is_employee"
                            defaultChecked={is_employee}
                            id="is_employee"
                            onChange={e => {
                              set_is_employee(e.target.checked);
                            }}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="isVerified">Verified</label>
                          <input
                            type="checkbox"
                            name="isVerified"
                            defaultChecked={isVerified}
                            id="isVerified"
                            onChange={e => {
                              set_isVerified(e.target.checked);
                            }}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="isAdmin">Admin</label>
                          <input
                            type="checkbox"
                            name="isAdmin"
                            defaultChecked={isAdmin}
                            id="isAdmin"
                            onChange={e => {
                              set_isAdmin(e.target.checked);
                            }}
                          />
                        </li>
                      )}
                    </div>
                  </div>
                  <li>
                    <GLButton type="submit" variant="primary">
                      {id ? "Update" : "Create"}
                    </GLButton>
                  </li>
                  <li>
                    <GLButton variant="secondary" onClick={() => history.goBack()}>
                      Back
                    </GLButton>
                  </li>
                </ul>
              </div>
            )}
          </Loading>
          {/* )} */}
        </form>
      </div>
    </div>
  );
};
export default EditUserPage;
