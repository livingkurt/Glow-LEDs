import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";
import { set_user } from "../../slices/userSlice";

const EditUserPage = props => {
  const [loading_checkboxes, set_loading_checkboxes] = useState(true);

  const history = useHistory();

  const userSlice = useSelector(state => state.userSlice.userPage);
  const { current_user, user, loading, error } = userSlice;

  const affiliateSlice = useSelector(state => state.affiliateSlice.affiliatePage);
  const { affiliates } = affiliateSlice;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsUser(props.match.params.id));
      dispatch(API.listAffiliates({}));
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.id]);

  const {
    _id,
    first_name,
    last_name,
    email,
    is_affiliated,
    is_employee,
    affiliate,
    isVerified,
    isAdmin,
    shipping,
    email_subscription,
    stripe_connect_id,
    weekly_wage,
    isWholesaler,
    guest,
    international
  } = user;

  const dispatch = useDispatch();

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      API.saveUser({
        _id,
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
        weekly_wage,
        isWholesaler,
        international,
        guest
      })
    );
    e.target.reset();
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
                          onChange={e => dispatch(set_user({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="last_name">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          value={last_name}
                          id="last_name"
                          onChange={e => dispatch(set_user({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          name="email"
                          value={email}
                          id="email"
                          onChange={e => dispatch(set_user({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      {current_user?.isAdmin && (
                        <>
                          <li>
                            <label htmlFor="affiliate">Affiliate</label>
                            <input
                              type="text"
                              name="affiliate"
                              value={affiliate}
                              id="affiliate"
                              onChange={e => dispatch(set_user({ [e.target.name]: e.target.value }))}
                            />
                          </li>
                          <li>
                            <label htmlFor="stripe_connect_id">Stripe Connect ID</label>
                            <input
                              type="text"
                              name="stripe_connect_id"
                              value={stripe_connect_id}
                              id="stripe_connect_id"
                              onChange={e => dispatch(set_user({ [e.target.name]: e.target.value }))}
                            />
                          </li>
                          <li>
                            <label htmlFor="weekly_wage">Weekly Wage</label>
                            <input
                              type="text"
                              name="weekly_wage"
                              value={weekly_wage}
                              id="weekly_wage"
                              onChange={e => dispatch(set_user({ [e.target.name]: e.target.value }))}
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
                                  onChange={e => dispatch(set_user({ [e.target.name]: e.target.value }))}
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
                        </>
                      )}

                      <li>
                        <h2 style={{ textAlign: "center" }}>Shipping</h2>
                      </li>

                      <div>
                        <li>
                          <label htmlFor="first_name">First Name</label>
                          <input
                            type="text"
                            value={shipping?.first_name}
                            name="first_name"
                            id="first_name"
                            onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.value } }))}
                          />
                        </li>
                        <li>
                          <label htmlFor="last_name">Last Name</label>
                          <input
                            value={shipping?.last_name}
                            type="text"
                            name="last_name"
                            id="last_name"
                            onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.value } }))}
                          />
                        </li>
                        <li>
                          <label htmlFor="address_1">Address</label>
                          <input
                            type="text"
                            value={shipping?.address_1}
                            name="address_1"
                            id="address_1"
                            onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.value } }))}
                          />
                        </li>
                        <li>
                          <label htmlFor="address_2">Apt/Suite</label>
                          <input
                            type="text"
                            value={shipping?.address_2}
                            name="address_2"
                            id="address_2"
                            onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.value } }))}
                          />
                        </li>
                        <li>
                          <label htmlFor="city">City</label>
                          <input
                            type="text"
                            value={shipping?.city}
                            name="city"
                            id="city"
                            onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.value } }))}
                          />
                        </li>
                        <li>
                          <label htmlFor="state">State</label>
                          <input
                            type="text"
                            value={shipping?.state}
                            name="state"
                            id="state"
                            onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.value } }))}
                          />
                        </li>
                        <li>
                          <label htmlFor="postalCode">Postal Code</label>
                          <input
                            type="text"
                            value={shipping?.postalCode}
                            name="postalCode"
                            id="postalCode"
                            onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.value } }))}
                          />
                        </li>
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
                                value={shipping?.international}
                                id="international"
                                onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.checked } }))}
                              />
                            </li>
                            {international && (
                              <li>
                                <label htmlFor="country">Country</label>
                                <input
                                  type="text"
                                  value={shipping?.country}
                                  name="country"
                                  id="country"
                                  onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.checked } }))}
                                />
                              </li>
                            )}
                          </div>
                        )}
                      </div>
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
                            onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.checked } }))}
                          />
                        </li>
                      )}

                      {current_user?.isAdmin && (
                        <>
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
                                onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.checked } }))}
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
                                onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.checked } }))}
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
                                onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.checked } }))}
                              />
                            </li>
                          )}
                          {loading_checkboxes ? (
                            <div>Loading...</div>
                          ) : (
                            <li>
                              <label htmlFor="isWholesaler">Is Wholesaler</label>
                              <input
                                type="checkbox"
                                name="isWholesaler"
                                defaultChecked={isWholesaler}
                                id="isWholesaler"
                                onChange={e => dispatch(set_user({ [e.target.name]: e.target.checked }))}
                              />
                            </li>
                          )}

                          {loading_checkboxes ? (
                            <div>Loading...</div>
                          ) : (
                            <li>
                              <label htmlFor="guest">Guest</label>
                              <input
                                type="checkbox"
                                name="guest"
                                defaultChecked={guest}
                                id="guest"
                                onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.checked } }))}
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
                                onChange={e => dispatch(set_user({ shipping: { ...shipping, [e.target.name]: e.target.checked } }))}
                              />
                            </li>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <li>
                    <GLButton type="submit" variant="primary">
                      {_id ? "Update" : "Create"}
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
