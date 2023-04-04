import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DropdownDisplay, Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { API_Products } from "../../utils";
import { format_date, unformat_date } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";
import { set_promo } from "../../slices/promoSlice";

const EditPromoPage = props => {
  const [categories, set_categories] = useState([]);

  const [loading_checkboxes, set_loading_checkboxes] = useState(true);
  const history = useHistory();

  const promoSlice = useSelector(state => state.promoSlice);
  const { promo, loading, error } = promoSlice;

  const {
    id,
    affiliate,
    user,
    promo_code,
    admin_only,
    affiliate_only,
    sponsor_only,
    single_use,
    used_once,
    excluded_categories,
    excluded_products,
    included_categories,
    included_products,
    exclude,
    include,
    percentage_off,
    amount_off,
    minimum_total,
    free_shipping,
    time_limit,
    active,
    start_date,
    end_date
  } = promo;

  const userSlice = useSelector(state => state.userSlice);
  const { users } = userSlice;

  const affiliateSlice = useSelector(state => state.affiliateSlice.affiliatePage);
  const { affiliates } = affiliateSlice;

  const productSlice = useSelector(state => state.productSlice);
  const { products } = productSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsPromo(props.match.params.id));
      dispatch(API.listProducts({ option: false, hidden: false }));
      get_categories();
      dispatch(API.listUsers({}));
      dispatch(API.listAffiliates({}));
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.id]);

  const get_categories = async () => {
    const { data } = await API_Products.findAll_products_a({
      limit: 0,
      page: 1
    });

    set_categories(data);
  };

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      API.savePromo({
        _id: id,
        affiliate,
        user,
        promo_code,
        admin_only,
        affiliate_only,
        sponsor_only,
        single_use,
        used_once,
        exclude,
        excluded_categories,
        excluded_products,
        include,
        included_categories,
        included_products,
        percentage_off,
        amount_off,
        minimum_total,
        free_shipping,
        time_limit,
        start_date: unformat_date(start_date),
        end_date: unformat_date(end_date),
        active
      })
    );
    history.push("/secure/glow/promos");
  };

  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit Promo" : "Create Promo"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Loading loading={loading} error={error}>
            {promo && (
              <div>
                <Helmet>
                  <title>Edit Promo | Glow LEDs</title>
                </Helmet>

                <ul className="edit-form-container" style={{ maxWidth: "48rem", marginBottom: "20px" }}>
                  <div className="row wrap">
                    <div className=" m-10px">
                      <li>
                        <label htmlFor="affiliate">Affiliate</label>
                        <input
                          type="text"
                          name="affiliate"
                          value={affiliate}
                          id="affiliate"
                          Change={e => dispatch(set_promo({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      {affiliates && (
                        <div className="ai-c h-25px mv-10px mb-30px jc-c">
                          <div className="custom-select w-100per">
                            <select
                              className="qty_select_dropdown w-100per"
                              onChange={e => dispatch(set_promo({ [e.target.name]: e.target.value }))}
                            >
                              <option key={1} defaultValue={""}>
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
                        <label htmlFor="user">For User</label>
                        <input
                          type="text"
                          name="user"
                          value={user}
                          id="user"
                          onChange={e => dispatch(set_promo({ [e.target.name]: e.target.value }))}
                        />
                      </li>

                      {users && (
                        <div className="ai-c h-25px mv-10px mb-30px jc-c">
                          <div className="custom-select w-100per">
                            <select
                              className="qty_select_dropdown w-100per"
                              onChange={e => dispatch(set_promo({ [e.target.name]: e.target.value }))}
                            >
                              <option key={1} defaultValue={""}>
                                ---Choose User---
                              </option>
                              {users.map((user, index) => (
                                <option key={index} value={user._id}>
                                  {user.first_name} {user.last_name}
                                </option>
                              ))}
                            </select>
                            <span className="custom-arrow" />
                          </div>
                        </div>
                      )}
                      <li>
                        <label htmlFor="promo_code">Promo Code</label>
                        <input
                          type="text"
                          name="promo_code"
                          value={promo_code}
                          id="promo_code"
                          onChange={e => dispatch(set_promo({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="affiliate_only">Affiliate Only</label>
                          <input
                            type="checkbox"
                            name="affiliate_only"
                            defaultChecked={affiliate_only}
                            id="affiliate_only"
                            onChange={e => dispatch(set_promo({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="sponsor_only">Sponsor Only</label>
                          <input
                            type="checkbox"
                            name="sponsor_only"
                            defaultChecked={sponsor_only}
                            id="sponsor_only"
                            onChange={e => dispatch(set_promo({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="admin_only">Admin Only</label>
                          <input
                            type="checkbox"
                            name="admin_only"
                            defaultChecked={admin_only}
                            id="admin_only"
                            onChange={e => dispatch(set_promo({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="single_use">Single Use</label>
                          <input
                            type="checkbox"
                            name="single_use"
                            defaultChecked={single_use}
                            id="single_use"
                            onChange={e => dispatch(set_promo({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}

                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="used_once">Used Once</label>
                          <input
                            type="checkbox"
                            name="used_once"
                            defaultChecked={used_once}
                            id="used_once"
                            onChange={e => dispatch(set_promo({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="time_limit">Time Limit</label>
                          <input
                            type="checkbox"
                            name="time_limit"
                            defaultChecked={time_limit}
                            id="time_limit"
                            onChange={e => dispatch(set_promo({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      {time_limit && (
                        <li>
                          <div className="jc-b">
                            <div>
                              <label htmlFor="start_date">Start Date</label>
                              <input
                                type="text"
                                className="w-100per"
                                name="start_date"
                                value={start_date}
                                id="start_date"
                                onChange={e => dispatch(set_promo({ [e.target.name]: e.target.value }))}
                              />
                            </div>
                            <div className="m-7px pt-22px">
                              <i className="fas fa-minus" />
                            </div>
                            <div>
                              <label htmlFor="end_date">End Date</label>
                              <input
                                type="text"
                                className="w-100per"
                                name="end_date"
                                value={end_date}
                                id="end_date"
                                onChange={e => dispatch(set_promo({ [e.target.name]: e.target.value }))}
                              />
                            </div>
                          </div>
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="exclude">Exclude Items</label>
                          <input
                            type="checkbox"
                            name="exclude"
                            defaultChecked={exclude}
                            checked={exclude}
                            id="exclude"
                            onChange={e => dispatch(set_promo({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      {exclude && (
                        <li>
                          <DropdownDisplay
                            display_key={"name"}
                            item_list={
                              categories &&
                              categories &&
                              categories.length > 0 &&
                              categories?.map(category => ({
                                name: category
                              }))
                            }
                            list_items={excluded_categories}
                            set_items={value => dispatch(set_promo({ excluded_categories: value }))}
                            list_name={"Excluded Categorys"}
                          />
                        </li>
                      )}
                      {exclude && (
                        <li>
                          <DropdownDisplay
                            display_key={"name"}
                            item_list={products}
                            list_items={excluded_products}
                            set_items={value => dispatch(set_promo({ excluded_products: value }))}
                            list_name={"Excluded Products"}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="include">Include Items</label>
                          <input
                            type="checkbox"
                            name="include"
                            defaultChecked={include}
                            checked={include}
                            id="include"
                            onChange={e => dispatch(set_promo({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      {include && (
                        <li>
                          <DropdownDisplay
                            display_key={"name"}
                            item_list={
                              categories &&
                              categories.length > 0 &&
                              categories.map(category => ({
                                name: category
                              }))
                            }
                            list_items={included_categories}
                            set_items={value => dispatch(set_promo({ included_categories: value }))}
                            list_name={"Included Categorys"}
                          />
                        </li>
                      )}
                      {include && (
                        <li>
                          <DropdownDisplay
                            display_key={"name"}
                            item_list={products}
                            list_items={included_products}
                            set_items={value => dispatch(set_promo({ included_products: value }))}
                            list_name={"Included Products"}
                          />
                        </li>
                      )}

                      <li>
                        <label htmlFor="percentage_off">Percentage Off</label>
                        <input
                          type="text"
                          name="percentage_off"
                          value={percentage_off}
                          id="percentage_off"
                          onChange={e => dispatch(set_promo({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="amount_off">Amount Off</label>
                        <input
                          type="text"
                          name="amount_off"
                          value={amount_off}
                          id="amount_off"
                          onChange={e => dispatch(set_promo({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="minimum_total">Order Total Minimum</label>
                        <input
                          type="text"
                          name="minimum_total"
                          value={minimum_total}
                          id="minimum_total"
                          onChange={e => dispatch(set_promo({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="free_shipping">Free Shipping</label>
                          <input
                            type="checkbox"
                            name="free_shipping"
                            defaultChecked={free_shipping}
                            id="free_shipping"
                            onChange={e => dispatch(set_promo({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="active">Active</label>
                          <input
                            type="checkbox"
                            name="active"
                            defaultChecked={active}
                            id="active"
                            onChange={e => dispatch(set_promo({ [e.target.name]: e.target.checked }))}
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
                      Back to Promos
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
export default EditPromoPage;
