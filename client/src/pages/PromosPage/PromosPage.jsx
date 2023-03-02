import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../shared/GlowLEDsComponents/GLTable/Sort";
import { format_date } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { API_Emails, API_Promos } from "../../utils";
import * as API from "../../api";

const PromosPage = props => {
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");
  const category = props.match.params.category ? props.match.params.category : "";
  const promoSlice = useSelector(state => state.promoSlice);
  const { loading, promos, message, error, success } = promoSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listPromos({}));
    }
    return () => (clean = false);
  }, [success, dispatch]);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(API.listPromos({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(API.listPromos({ category, search, sort: e.target.value }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listPromos({ category, search, sort }));
    }
    return () => (clean = false);
  }, [dispatch, category, search, sort]);
  const deleteHandler = promo => {
    dispatch(API.deletePromo(promo._id));
  };

  const colors = [
    // { name: 'Percentage Off', color: '#6d3e3e' },
    // { name: 'Amount Off', color: '#6d3e5c' },
    // { name: 'Free Shipping', color: '#3e4c6d' },
    { name: "Admin Only", color: "#525252" },
    { name: "Affiliate Only", color: "#7d5555" },
    { name: "No Restrictions", color: "#3e4c6d" },
    { name: "Single Use", color: "#5f557d" },
    { name: "Used", color: "#303030" },
    { name: "Deactivated", color: "#466475" }
    // { name: 'Specific User', color: '#3d7f79' }
    // { name: 'Active', color: '#3f6561' }
  ];

  const determine_color = promo => {
    let result = "";

    // if (promo.percentage_off > 0) {
    // 	result = colors[4].color;
    // }
    // if (promo.amount_off > 0) {
    // 	result = colors[3].color;
    // }
    // if (promo.free_shipping) {
    // 	result = colors[0].color;
    // }

    if (promo.admin_only) {
      result = colors[0].color;
    }
    if (promo.affiliate_only) {
      result = colors[1].color;
    }

    if (!promo.affiliate_only && !promo.admin_only) {
      result = colors[2].color;
    }

    if (promo.single_use) {
      result = colors[3].color;
    }
    if (promo.used_once) {
      result = colors[4].color;
    }
    if (!promo.active) {
      result = colors[5].color;
    }
    //  else {
    // 	result = colors[2].color;
    // }
    // if (promo.single_use && promo.used) {
    // 	result = colors[4].color;
    // } else {
    // 	result = colors[2].color;
    // }

    // if (promo.used) {
    // 	result = colors[4].color;
    // } else if (promo.admin_only) {
    // 	result = colors[0].color;
    // } else if (promo.affiliate_only) {
    // 	result = colors[1].color;
    // } else if (!promo.affiliate_only && !promo.admin_only) {
    // 	if (promo.single_use) {
    // 		if (promo.single_use && promo.used) {
    // 			result = colors[4].color;
    // 		} else {
    // 			result = colors[3].color;
    // 		}
    // 	}
    // } else {
    // 	result = colors[2].color;
    // }

    // if (promo.user) {
    // 	result = colors[3].color;
    // }
    return result;
  };
  const sort_options = ["Newest", "Admin Only", "Affiliate Only", "Active"];

  const change_promo_status = promo => {
    dispatch(
      API.updatePromo({
        ...promo,
        active: promo.active ? false : true
      })
    );
    dispatch(API.listPromos({}));
    dispatch(API.listPromos({}));
  };

  const refresh_sponsor_codes = async () => {
    await API_Promos.refresh_sponsor_codes();
    dispatch(API.listPromos({}));
  };

  const send_code_used_email = async () => {
    await API_Emails.send_code_used_emails_a("cosmo");
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Promos | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <div className="wrap jc-b">
        <div className="wrap jc-b">
          {colors.map((color, index) => {
            return (
              <div className="wrap jc-b  m-1rem" key={index}>
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
        <Link to="/secure/glow/editpromo">
          <GLButton variant="primary" style={{ width: "160px" }}>
            Create Promo
          </GLButton>
        </Link>
        <GLButton variant="primary" className="h-40px" onClick={refresh_sponsor_codes}>
          Create Sponsor Codes
        </GLButton>
        <GLButton variant="primary" className="h-40px" onClick={send_code_used_email}>
          Send Code Used Email
        </GLButton>
      </div>

      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Promos</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={submitHandler} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>
      <Loading loading={loading} error={error}>
        {promos && (
          <div className="promo-list responsive_table">
            <table className="table">
              <thead>
                <tr>
                  <th>Active</th>
                  {/* <th>User</th> */}
                  {/* <th>affiliate</th> */}
                  <th>Promo Code</th>
                  <th>Affiliate</th>

                  <th>Percentage Off</th>
                  <th>Amount Off</th>
                  <th>Free Shipping</th>
                  <th>Affiliate Only</th>
                  <th>Sponsor Only</th>
                  <th>Admin Only</th>
                  <th>Single Use</th>
                  <th>Used Once</th>
                  <th>Time Limit</th>
                  <th className="min-w-200px">Active Dates</th>
                  {/* <th>Excluded Categories</th>
									<th>Excluded Products</th> */}
                </tr>
              </thead>
              <tbody>
                {promos.map((promo, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determine_color(promo),
                      fontSize: "16px"
                    }}
                  >
                    <td className="p-10px">
                      <GLButton
                        variant="icon"
                        onClick={() => change_promo_status(promo)}
                        aria-label={promo.active ? "deactive" : "activate"}
                      >
                        {promo.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                      </GLButton>
                    </td>
                    {/* <td className="p-10px">{promo.user}</td> */}
                    {/* <td className="p-10px">{promo.affiliate}</td> */}
                    <td className="p-10px">{promo.promo_code}</td>
                    <td className="p-10px">{promo?.affiliate?.artist_name}</td>

                    <td className="p-10px">{promo.percentage_off && promo.percentage_off + "%"}</td>
                    <td className="p-10px">{promo.amount_off && "$" + promo.amount_off}</td>

                    <td className="p-10px">
                      {promo.free_shipping ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      {promo.affiliate_only ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      {promo.sponsor_only ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      {promo.admin_only ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      {promo.single_use ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      {promo.used_once ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      {promo.time_limit ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      {promo.time_limit &&
                        promo.start_date &&
                        promo.end_date &&
                        format_date(promo.start_date) + " - " + format_date(promo.end_date)}
                    </td>
                    {/* <td className="p-10px">
											{promo.excluded_categories.map((item) => <div>{item}</div>)}
										</td>
										<td className="p-10px">
											{promo.excluded_products.map((item) => <div>{item}</div>)}
										</td> */}

                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editpromo/" + promo._id}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <GLButton variant="icon" onClick={() => deleteHandler(promo)} aria-label="Delete">
                          <i className="fas fa-trash-alt" />
                        </GLButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Loading>
    </div>
  );
};
export default PromosPage;
