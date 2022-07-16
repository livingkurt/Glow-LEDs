import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { API_Products } from "../../../utils";
import {
  accurate_date,
  format_date,
  format_time,
  unformat_date,
  unformat_date_and_time,
} from "../../../utils/helper_functions";
import { GLButton } from "../../../components/GlowLEDsComponents";

const EditAllDataPage = props => {
  const date = new Date();

  function addDays(date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  const today = accurate_date(date);
  const end_date = accurate_date(addDays(date, 7));
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [ collection, set_collection ] = useState("");
  const [ search_parameter_field, set_search_parameter_field ] = useState("");
  const [ search_parameter, set_search_parameter ] = useState("");
  const [ value, set_value ] = useState("");
  const [ method, set_method ] = useState("");
  const [ property, set_property ] = useState("");
  const [ action, set_action ] = useState("");
  const [ request, set_request ] = useState("");
  const [ sale_price_request, set_sale_price_request ] = useState("");
  const [ discount_percentage, set_discount_percentage ] = useState(0);
  const [ sale_start_date, set_sale_start_date ] = useState(format_date(today));
  const [ sale_end_date, set_sale_end_date ] = useState(format_date(end_date));
  const [ sale_start_time, set_sale_start_time ] = useState(format_time(today));
  const [ sale_end_time, set_sale_end_time ] = useState("9:00 PM");
  const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);
  const history = useHistory();

  const batch_request = async e => {
    console.log({
      method,
      collection,
      search_parameter_field,
      search_parameter,
      action,
      property,
      value,
      userInfo,
    });
    e.preventDefault();
    const request = await API_Products.batch_request(
      method,
      collection,
      search_parameter_field,
      search_parameter,
      action,
      property,
      value,
      userInfo
    );

    console.log({ request });
    set_request(request);
  };

  const update_sale_price = async e => {
    e.preventDefault();
    // console.log({
    // 	start_date: unformat_date_and_time(sale_start_date, sale_start_time),
    // 	end_date: unformat_date_and_time(sale_end_date, sale_end_time)
    // });
    const start_date = new Date(
      unformat_date_and_time(sale_start_date, sale_start_time)
    );
    const end_date = new Date(
      unformat_date_and_time(sale_end_date, sale_end_time)
    );
    console.log({
      start_date: accurate_date(start_date),
      end_date: accurate_date(start_date),
    });
    const request = await API_Products.set_sale_price(
      parseInt(discount_percentage) / 100,
      accurate_date(start_date),
      accurate_date(end_date)
    );

    set_request(request);
  };
  const clear_sale = async e => {
    e.preventDefault();
    const request = await API_Products.clear_sale(
      parseInt(discount_percentage) / 100,
      unformat_date("01/01/2021"),
      unformat_date("01/01/2021")
    );
    set_request(request);
  };

  const collections = [
    "users",
    "promos",
    "products",
    "orders",
    "logs",
    "features",
    "expenses",
    "emails",
    "contents",
    "carts",
    "affiliates",
    "teams",
    "paychecks",
  ];
  const methods = [ "get", "updateMany" ];

  const actions = [ "$rename", "$set", "$unset" ];

  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>Edit All Data</h1>

      <div className="form">
        <form style={{ width: "100%" }}>
          {/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
          {/* <Loading loading={loading} error={error}> */}
          {/* {affiliate && ( */}
          <div>
            <Helmet>
              <title>Edit All Data | Glow LEDs</title>
            </Helmet>
            <ul
              className="edit-form-container"
              style={{ maxWidth: "30rem", marginBottom: "20px" }}
            >
              {/* {loading_checkboxes ? (
								<div>Loading...</div>
							) : (
								<li>
									<label htmlFor="sale_price_request">Sale Price Update</label>
									<input
										type="checkbox"
										name="sale_price_request"
										id="sale_price_request"
										onChange={(e) => {
											set_sale_price_request(e.target.checked);
										}}
									/>
								</li>
							)} */}
              <li>
                <label htmlFor="discount_percentage">Discount Percentage</label>
                <input
                  type="text"
                  name="discount_percentage"
                  value={discount_percentage}
                  id="discount_percentage"
                  onChange={e => set_discount_percentage(e.target.value)}
                />
              </li>
              <li>
                <div className="jc-b">
                  <div className="mr-5px">
                    <label htmlFor="sale_start_date">Start Date</label>
                    <input
                      type="text"
                      className="w-100per"
                      name="sale_start_date"
                      value={sale_start_date}
                      id="sale_start_date"
                      onChange={e => set_sale_start_date(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="sale_start_time">Start Time</label>
                    <input
                      type="text"
                      className="w-100per"
                      name="sale_start_time"
                      value={sale_start_time}
                      id="sale_start_time"
                      onChange={e => set_sale_start_time(e.target.value)}
                    />
                  </div>
                </div>
              </li>
              <div className="w-100per ta-c fs-20px">
                <i class="fas fa-arrow-down" />
              </div>
              <li>
                <div className="jc-b">
                  <div className="mr-5px">
                    <label htmlFor="sale_end_date">End Date</label>
                    <input
                      type="text"
                      className="w-100per"
                      name="sale_end_date"
                      value={sale_end_date}
                      id="sale_end_date"
                      onChange={e => set_sale_end_date(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="sale_end_time">End Time</label>
                    <input
                      type="text"
                      className="w-100per"
                      name="sale_end_time"
                      value={sale_end_time}
                      id="sale_end_time"
                      onChange={e => set_sale_end_time(e.target.value)}
                    />
                  </div>
                </div>
              </li>
              <li>
                <GLButton onClick={e => update_sale_price(e)} variant="primary">
                  Update Sale Price
                </GLButton>
              </li>
              <li>
                <GLButton onClick={e => clear_sale(e)} variant="primary">
                  Clear Sale
                </GLButton>
              </li>
            </ul>
            <ul
              className="edit-form-container"
              style={{ maxWidth: "30rem", marginBottom: "20px" }}
            >
              <div className="row wrap">
                <div className="w-228px m-10px">
                  <li>
                    <label htmlFor="method">Method</label>
                    <input
                      type="text"
                      name="method"
                      value={method}
                      id="method"
                      onChange={e => set_method(e.target.value)}
                    />
                  </li>
                  <div className="ai-c h-25px mv-10px mb-30px jc-c">
                    <div className="custom-select w-100per">
                      <select
                        className="qty_select_dropdown w-100per"
                        onChange={e => set_method(e.target.value)}
                      >
                        <option key={0} defaultValue="">
                          ---Choose Method---
                        </option>
                        {methods.map((method, index) => (
                          <option key={index} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                      <span className="custom-arrow" />
                    </div>
                  </div>
                  <li>
                    <label htmlFor="collection">Collection</label>
                    <input
                      type="text"
                      name="collection"
                      value={collection}
                      id="collection"
                      onChange={e => set_collection(e.target.value)}
                    />
                  </li>
                  <div className="ai-c h-25px mv-10px mb-30px jc-c">
                    <div className="custom-select w-100per">
                      <select
                        className="qty_select_dropdown w-100per"
                        onChange={e => set_collection(e.target.value)}
                      >
                        <option key={0} defaultValue="">
                          ---Choose Collection---
                        </option>
                        {collections.map((collection, index) => (
                          <option key={index} value={collection}>
                            {collection}
                          </option>
                        ))}
                      </select>
                      <span className="custom-arrow" />
                    </div>
                  </div>

                  <li>
                    <label htmlFor="action">Action</label>
                    <input
                      type="text"
                      name="action"
                      value={action}
                      id="action"
                      onChange={e => set_action(e.target.value)}
                    />
                  </li>
                  <div className="ai-c h-25px mv-10px mb-30px jc-c">
                    <div className="custom-select w-100per">
                      <select
                        className="qty_select_dropdown w-100per"
                        onChange={e => set_action(e.target.value)}
                      >
                        <option key={0} defaultValue="">
                          ---Choose Action---
                        </option>
                        {actions.map((action, index) => (
                          <option key={index} value={action}>
                            {action}
                          </option>
                        ))}
                      </select>
                      <span className="custom-arrow" />
                    </div>
                  </div>

                  <li>
                    <label htmlFor="search_parameter_field">
                      Search Parameter Field
                    </label>
                    <input
                      type="text"
                      name="search_parameter_field"
                      value={search_parameter_field}
                      id="search_parameter_field"
                      onChange={e => set_search_parameter_field(e.target.value)}
                    />
                  </li>
                  <li>
                    <label htmlFor="search_parameter">Search Parameter</label>
                    <input
                      type="text"
                      name="search_parameter"
                      value={search_parameter}
                      id="search_parameter"
                      onChange={e => set_search_parameter(e.target.value)}
                    />
                  </li>
                  <li>
                    <label htmlFor="property">Property</label>
                    <input
                      type="text"
                      name="property"
                      value={property}
                      id="property"
                      onChange={e => set_property(e.target.value)}
                    />
                  </li>
                  <li>
                    <label htmlFor="value">Value</label>

                    <textarea
                      type="text"
                      className="w-100per"
                      name="value"
                      value={value}
                      id="value"
                      onChange={e => set_value(e.target.value)}
                    />
                  </li>
                </div>
              </div>

              <li>
                <GLButton onClick={e => batch_request(e)} variant="primary">
                  Complete
                </GLButton>
              </li>
              <li>
                <GLButton variant="secondary" onClick={() => history.goBack()}>
                  Back
                </GLButton>
              </li>
              {/* <li>
								<label htmlFor="request">Results</label>
								<textarea
									type="text"
									name="request"
									value={JSON.stringify(request.data)}
									id="request"
								/>
							</li> */}
            </ul>
          </div>
        </form>
      </div>
      <div>
        <label htmlFor="request">Results</label>
        <textarea
          type="text"
          className="w-100per h-99rem"
          name="request"
          value={JSON.stringify(request.data, undefined, 4)}
          id="request"
        />
      </div>
    </div>
  );
};
export default EditAllDataPage;
