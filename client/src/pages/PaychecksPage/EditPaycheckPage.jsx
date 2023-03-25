import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { format_date } from "../../utils/helper_functions";
import * as API from "../../api";
import { set_affiliate } from "../../slices/affiliateSlice";
import { set_team } from "../../slices/teamSlice";
import { set_paycheck } from "../../slices/paycheckSlice";

const EditPaycheckPage = props => {
  // const [id, set_id] = useState("");
  // const [affiliate, set_affiliate] = useState("");
  // const [team, set_team] = useState("");
  // const [amount, set_amount] = useState("");
  // const [venmo, set_venmo] = useState("");
  // const [paid, set_paid] = useState("");
  // const [reciept, set_reciept] = useState("");
  // const [paid_at, set_paid_at] = useState("");

  const [loading_checkboxes, set_loading_checkboxes] = useState(true);

  const history = useHistory();

  const paycheckSlice = useSelector(state => state.paycheckSlice);
  const { paycheck, loading, error } = paycheckSlice;

  const { id, affiliate, team, amount, venmo, paid, reciept, paid_at } = paycheck;

  const affiliateSlice = useSelector(state => state.affiliateSlice);
  const { affiliates } = affiliateSlice;

  const teamSlice = useSelector(state => state.teamSlice);
  const { teams } = teamSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsPaycheck(props.match.params.id));
      dispatch(API.listAffiliates({}));
      dispatch(API.listTeams({}));
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.id]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const submitHandler = e => {
    e.preventDefault();

    dispatch(
      API.savePaycheck({
        _id: id,
        affiliate: affiliate?._id,
        team: team?._id,
        amount,
        venmo,
        paid,
        reciept,
        paid_at: paid_at ? paid_at : paid && format_date(today)
      })
    );
    e.target.reset();
    history.push("/secure/glow/paychecks?page=1?limit=10");
  };

  const update_affiliate = e => {
    e.preventDefault();
    const data = JSON.parse(e.target.value);
    dispatch(set_affiliate(data));
  };
  const update_team = e => {
    e.preventDefault();
    const data = JSON.parse(e.target.value);
    dispatch(set_team(data));
  };
  const date = new Date();

  const today = date.toISOString();
  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.id ? "Edit Paycheck" : "Create Paycheck"}</h1>

      <div className="form">
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          {/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
          <Loading loading={loading} error={error}>
            {/* {paycheck && ( */}
            <div>
              <Helmet>
                <title>Edit Paycheck | Glow LEDs</title>
              </Helmet>

              <ul className="edit-form-container" style={{ maxWidth: "30rem", marginBottom: "20px" }}>
                <div className="row wrap">
                  <div className="w-228px m-10px">
                    {affiliates && (
                      <div className="ai-c h-25px mv-10px mb-30px jc-c">
                        <div className="custom-select w-100per">
                          <select
                            className="qty_select_dropdown w-100per"
                            // defaultValue={{
                            // 	label: user.first_name + ' ' + user.last_name,
                            // 	value: user._id
                            // }}
                            onChange={e => update_affiliate(e)}
                          >
                            <option key={1} defaultValue="">
                              ---Choose Affiliate---
                            </option>
                            {affiliates.map((affiliate, index) => (
                              <option key={index} value={JSON.stringify(affiliate)}>
                                {affiliate.artist_name}
                              </option>
                            ))}
                          </select>
                          <span className="custom-arrow" />
                        </div>
                      </div>
                    )}
                    <li>
                      <label htmlFor="affiliate">Affiliate</label>
                      <input
                        type="text"
                        name="affiliate"
                        value={affiliate?._id}
                        id="affiliate"
                        onChange={e => dispatch(set_paycheck({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    {teams && (
                      <div className="ai-c h-25px mv-10px mb-30px jc-c">
                        <div className="custom-select w-100per">
                          <select
                            className="qty_select_dropdown w-100per"
                            // defaultValue={{
                            // 	label: user.first_name + ' ' + user.last_name,
                            // 	value: user._id
                            // }}
                            onChange={e => update_team(e)}
                          >
                            <option key={1} defaultValue="">
                              ---Choose Team---
                            </option>
                            {teams.map((team, index) => (
                              <option key={index} value={JSON.stringify(team)}>
                                {team.team_name}
                              </option>
                            ))}
                          </select>
                          <span className="custom-arrow" />
                        </div>
                      </div>
                    )}
                    <li>
                      <label htmlFor="team">Team</label>
                      <input
                        type="text"
                        name="team"
                        value={team?._id}
                        id="team"
                        onChange={e => dispatch(set_paycheck({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="amount">Amount</label>
                      <input
                        type="text"
                        name="amount"
                        value={amount}
                        id="amount"
                        onChange={e => dispatch(set_paycheck({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="venmo">Venmo</label>
                      <input
                        type="text"
                        name="venmo"
                        value={venmo}
                        id="venmo"
                        onChange={e => dispatch(set_paycheck({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    {loading_checkboxes ? (
                      <div>Loading...</div>
                    ) : (
                      <li>
                        <label htmlFor="paid">Paid</label>
                        <input
                          type="checkbox"
                          name="paid"
                          defaultChecked={paid}
                          id="paid"
                          onChange={e => dispatch(set_paycheck({ [e.target.name]: e.target.checked }))}
                        />
                      </li>
                    )}
                    <li>
                      <label htmlFor="paid_at">Paid At</label>
                      <input
                        type="text"
                        name="paid_at"
                        value={paid_at ? paid_at : paid ? format_date(today) : ""}
                        id="paid_at"
                        onChange={e => dispatch(set_paycheck({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                    <li>
                      <label htmlFor="reciept">Receipt</label>
                      <input
                        type="text"
                        name="reciept"
                        defaultValue={reciept}
                        id="reciept"
                        onChange={e => dispatch(set_paycheck({ [e.target.name]: e.target.value }))}
                      />
                    </li>
                  </div>
                </div>
                <li>
                  <GLButton type="submit" variant="primary">
                    {id ? "Update" : "Create"}
                  </GLButton>
                </li>
                <li>
                  <GLButton variant="secondary" onClick={e => e.preventDefault()}>
                    <Link to="/secure/glow/paychecks?page=1?limit=10">Back to Paychecks</Link>
                  </GLButton>
                </li>
              </ul>
            </div>
            {/* )} */}
          </Loading>
          {/* )} */}
        </form>
      </div>
    </div>
  );
};
export default EditPaycheckPage;
