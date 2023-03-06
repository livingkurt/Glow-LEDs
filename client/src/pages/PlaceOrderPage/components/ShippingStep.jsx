import React, { useState, useEffect } from "react";
import { state_names } from "../../../utils/helper_functions";
import { Loading } from "../../../shared/SharedComponents";
import { ShippingChoice } from ".";
// import { usePlacesWidget } from "react-google-autocomplete";
// import Autocomplete from "react-google-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { API_Shipping } from "../../../utils";
import { validate_shipping } from "../../../utils/validations";
import { savePayment, saveShipping } from "../../../actions/cartActions";
import { update } from "../../../actions/userActions";
import useWindowDimensions from "../../../shared/Hooks/windowDimensions";
import { isMobile } from "react-device-detect";
import Autocomplete from "./AddressAutocomplete";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import GLTooltip from "../../../shared/GlowLEDsComponents/GLTooltip/GLTooltip";
import GLModal from "../../../shared/GlowLEDsComponents/GLModal/GLModal";
import GLCheckbox from "../../../shared/GlowLEDsComponents/GLCheckbox/GLCheckbox";
import { isAdmin } from "../../../utils/helpers/user_helpers";
import { useGetAllShippingOrdersQuery } from "../placeOrderApi";
import { save_payment_method, save_shipping } from "../../../slices/cartSlice";
import * as API from "../../../api";

const ShippingStep = ({
  shipping_completed,
  set_shipping_completed,
  show_shipping,
  set_show_shipping,
  show_hide_steps,
  loading,
  set_loading,
  shipping,
  email,
  set_email,
  loading_shipping,
  choose_shipping_rate,
  hide_pay_button,
  current_shipping_speed,
  re_choose_shipping_rate,
  show_shipping_complete,
  next_step,
  shipping_rates,
  cartItems,
  set_verify_shipping,
  verify_shipping,
  error_happened,
  show_payment
}) => {
  const all_shipping = useGetAllShippingOrdersQuery();
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [address_1, set_address_1] = useState("");
  const [address_2, set_address_2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [international, setInternational] = useState(false);
  const [save_user_shipping, set_save_user_shipping] = useState(false);
  const [loading_checkboxes, set_loading_checkboxes] = useState(true);
  const [show_modal, set_show_modal] = useState(false);

  const dispatch = useDispatch();

  const userSlice = useSelector(state => state.userSlice);
  const { current_user } = userSlice;

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (shipping && shipping.first_name && shipping.first_name.length > 1) {
        set_email(shipping.email);
        set_first_name(shipping.first_name);
        set_last_name(shipping.last_name);
        set_address_1(shipping.address_1);
        set_address_2(shipping.address_2);
        setCity(shipping.city);
        setState(shipping.state);
        setPostalCode(shipping.postalCode);
        setCountry(shipping.country);
        setInternational(shipping.international);
        if (shipping.international) {
          set_verify_shipping(false);
        }
      }
    }
    return () => (clean = false);
  }, [set_email, shipping]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  // useEffect(() => {
  //   let clean = true;
  //   if (clean) {
  //     if (isAdmin(current_user)) {
  //       get_all_shipping();
  //     }
  //   }
  //   return () => (clean = false);
  // }, []);

  // const get_all_shipping = async () => {
  //   const { data } = await API_Shipping.get_all_shipping();
  //   set_all_shipping(data);
  // };

  // const [ email_validations, set_email_validations ] = useState('');
  const [first_name_validations, set_first_name_validations] = useState("");
  const [last_name_validations, set_last_name_validations] = useState("");
  const [address_validations, set_address_validations] = useState("");
  const [city_validations, set_city_validations] = useState("");
  const [state_validations, set_state_validations] = useState("");
  const [postal_code_validations, set_postal_code_validations] = useState("");
  const [country_validations, set_country_validations] = useState("");
  const [international_validations, set_international_validations] = useState("");
  const [agree, set_agree] = useState(false);
  // const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    const data = {
      email: email ? email : current_user.email,
      first_name,
      last_name,
      address_1,
      address_2,
      city,
      state,
      postalCode,
      country,
      international
    };

    const request = validate_shipping(data);
    // set_email_validations(request.errors.email);
    set_first_name_validations(request.errors.first_name);
    set_last_name_validations(request.errors.last_name);
    set_address_validations(request.errors.address_1);
    set_city_validations(request.errors.city);
    set_state_validations(request.errors.state);
    set_postal_code_validations(request.errors.postalCode);
    set_country_validations(request.errors.country);
    set_international_validations(request.errors.international);

    if (request.isValid) {
      dispatch(
        save_shipping({
          first_name,
          last_name,
          email: email ? email : current_user.email,
          address_1,
          address_2,
          city,
          state,
          postalCode,
          country: international ? country : "US",
          international
        })
      );
      save_user_shipping_to_user();
      set_show_shipping(false);
      set_shipping_completed(true);
      isMobile && window.scrollTo({ top: 340, behavior: "smooth" });
    }
  };
  setTimeout(() => {
    set_loading(false);
  }, 500);

  const save_user_shipping_to_user = () => {
    if (save_user_shipping) {
      dispatch(
        API.updateUser({
          ...current_user,
          shipping: {
            first_name,
            last_name,
            email: current_user.email,
            address_1,
            address_2,
            city,
            state,
            postalCode,
            country: international ? country : "US",
            international
          }
        })
      );
    }
  };

  const update_shipping = shipping => {
    shipping = JSON.parse(shipping);
    set_email(shipping.email);
    set_first_name(shipping.first_name);
    set_last_name(shipping.last_name);
    set_address_1(shipping.address_1);
    set_address_2(shipping.address_2);
    setCity(shipping.city);
    setState(shipping.state);
    setPostalCode(shipping.postalCode);
    setCountry(shipping.country);
    setInternational(shipping.international);
  };

  const use_saved_shipping = (e, shipping, user) => {
    e.preventDefault();
    set_email(user.email);
    set_first_name(shipping.first_name);
    set_last_name(shipping.last_name);
    set_address_1(shipping.address_1);
    set_address_2(shipping.address_2);
    setCity(shipping.city);
    setState(shipping.state);
    setPostalCode(shipping.postalCode);
    setCountry(shipping.country);
    setInternational(shipping.international);
  };

  const update_google_shipping = shipping => {
    const street_num = document.querySelector("#autocomplete").value;
    const street_number = shipping.address_components.filter(comp => comp.types.includes("street_number"))[0];
    if (!street_number) {
      set_verify_shipping(false);
    }
    const address = shipping.address_components.filter(comp => comp.types.includes("route"))[0];
    const street_1 = `${(street_number && street_number.long_name) || street_num.split(" ")[0]} ${address.short_name}`;
    const city = shipping.address_components.filter(comp => comp.types.includes("locality"))[0];
    const state = shipping.address_components.filter(comp => comp.types.includes("administrative_area_level_1"))[0];
    const country = shipping.address_components.filter(comp => comp.types.includes("country"))[0];
    const postal_code = shipping.address_components.filter(comp => comp.types.includes("postal_code"))[0];
    set_address_1(street_1);
    setCity(city.long_name || city.short_name);
    setState(state.short_name);
    setPostalCode(postal_code.long_name);

    setCountry(country.short_name);
    if (country.short_name !== "US") {
      setInternational(true);
      set_verify_shipping(false);
      setState(state.short_name);
      setCountry(country.long_name);
    }
  };

  const { width } = useWindowDimensions();

  return (
    <div>
      <div className="jc-b">
        <h2>2. Shipping</h2>
        {shipping_completed && !show_shipping && (
          <GLButton variant="secondary" className="mv-10px" onClick={() => show_hide_steps("shipping")}>
            Edit
          </GLButton>
        )}
      </div>
      {shipping_completed && (
        <div>
          {show_shipping ? (
            <form onSubmit={submitHandler}>
              <ul className={`shipping-container mv-0px pv-0px ${width > 400 ? "ph-2rem" : "p-0px"}`}>
                {current_user && current_user.shipping && current_user.shipping.hasOwnProperty("first_name") && (
                  <li>
                    <GLButton onClick={e => use_saved_shipping(e, current_user.shipping, current_user)} variant="primary">
                      Use Saved Shipping
                    </GLButton>
                  </li>
                )}
                {isAdmin(current_user) && (
                  <li className="w-100per">
                    <div className="ai-c h-25px mv-10px mb-30px jc-c w-100per">
                      <div className="custom-select w-100per">
                        <select
                          className="qty_select_dropdown w-100per"
                          style={{
                            width: "100%"
                          }}
                          onChange={e => update_shipping(e.target.value)}
                        >
                          <option key={1} defaultValue="">
                            ---Choose Shipping for Order---
                          </option>
                          {!all_shipping.isLoading &&
                            all_shipping.data.map((shipping, index) => (
                              <option key={index} value={JSON.stringify(shipping)}>
                                {shipping.first_name} {shipping.last_name}
                              </option>
                            ))}
                        </select>
                        <span className="custom-arrow" />
                      </div>
                    </div>
                  </li>
                )}
                {isAdmin(current_user) &&
                  (loading_checkboxes ? (
                    <div>Loading...</div>
                  ) : (
                    <div>
                      <li>
                        <div>
                          <input
                            type="checkbox"
                            name="verify_shipping"
                            defaultValue={verify_shipping}
                            defaultChecked={verify_shipping}
                            id="verify_shipping"
                            style={{
                              transform: "scale(1.5)"
                            }}
                            className="mr-1rem"
                            onChange={e => {
                              set_verify_shipping(e.target.checked);
                            }}
                          />
                          <label htmlFor="international">Verify Shipping</label>
                        </div>
                      </li>
                    </div>
                  ))}
                <li>
                  <div className="jc-b">
                    <div className="mr-5px w-50per">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        type="text"
                        className="w-100per"
                        value={first_name}
                        name="first_name"
                        id="first_name"
                        onChange={e => set_first_name(e.target.value)}
                      />

                      <label
                        className="validation_text"
                        style={{
                          justifyContent: "center"
                        }}
                      >
                        {first_name_validations}
                      </label>
                    </div>
                    <div className="ml-5px w-50per">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        type="text"
                        className="w-100per"
                        value={last_name}
                        name="last_name"
                        id="last_name"
                        onChange={e => set_last_name(e.target.value)}
                      />
                      <label
                        className="validation_text"
                        style={{
                          justifyContent: "center"
                        }}
                      >
                        {last_name_validations}
                      </label>
                    </div>
                  </div>
                </li>

                <li>
                  <label htmlFor="address_autocomplete">Address</label>
                  <Autocomplete
                    apiKey={process.env.REACT_APP_GOOGLE_PLACES_KEY}
                    className="fs-16px"
                    value={address_1}
                    options={{
                      types: ["address"]
                    }}
                    onPlaceSelected={place => {
                      update_google_shipping(place);
                    }}
                    onChange={e => set_address_1(e.target.value)}
                  />
                  {/* <input
                    ref={ref}
                    type="text"
                    value={autocompleteRef}
                    name="address_1"
                    id="address_1"
                    onChange={e => set_address_1(e.target.value)}
                  /> */}
                </li>
                <label
                  className="validation_text"
                  style={{
                    justifyContent: "center"
                  }}
                >
                  {address_validations}
                </label>
                <li>
                  <label htmlFor="address_2">Apt/Suite</label>
                  <input type="text" value={address_2} name="address_2" id="address_2" onChange={e => set_address_2(e.target.value)} />
                </li>
                <li>
                  <label htmlFor="city">City</label>
                  <input type="text" value={city} name="city" id="city" onChange={e => setCity(e.target.value)} />
                </li>
                <label
                  className="validation_text"
                  style={{
                    justifyContent: "center"
                  }}
                >
                  {city_validations}
                </label>
                {!international && (
                  <li>
                    <label className="mb-1rem" htmlFor="state">
                      State
                    </label>
                    <div className="ai-c h-25px mb-15px jc-c">
                      <div className="custom-select w-100per">
                        <select className="qty_select_dropdown w-100per" onChange={e => setState(e.target.value)} value={state && state}>
                          {state_names.map((state, index) => (
                            <option key={index} value={state.short_name}>
                              {state.long_name}
                            </option>
                          ))}
                        </select>
                        <span className="custom-arrow" />
                      </div>
                    </div>
                  </li>
                )}
                {international && (
                  <li>
                    <label htmlFor="state">State</label>
                    <input type="text" value={state} name="state" id="state" onChange={e => setState(e.target.value)} />
                  </li>
                )}
                <label
                  className="validation_text"
                  style={{
                    justifyContent: "center"
                  }}
                >
                  {state_validations}
                </label>
                <li>
                  <label htmlFor="postalCode">Postal Code</label>
                  <input type="text" value={postalCode} name="postalCode" id="postalCode" onChange={e => setPostalCode(e.target.value)} />
                </li>
                <label
                  className="validation_text"
                  style={{
                    justifyContent: "center"
                  }}
                >
                  {postal_code_validations}
                </label>
                {loading_checkboxes ? (
                  <div>Loading...</div>
                ) : (
                  <div>
                    <li>
                      <div>
                        <input
                          type="checkbox"
                          name="international"
                          defaultValue={international}
                          defaultChecked={international}
                          value={international}
                          id="international"
                          style={{
                            transform: "scale(1.5)"
                          }}
                          className="mr-1rem"
                          onChange={e => {
                            setInternational(e.target.checked);
                          }}
                        />
                        <label htmlFor="international">International</label>
                      </div>
                    </li>
                    {international && (
                      <li>
                        <label htmlFor="country">Country</label>
                        <input type="text" value={country} name="country" id="country" onChange={e => setCountry(e.target.value)} />
                      </li>
                    )}
                  </div>
                )}
                <label
                  className="validation_text"
                  style={{
                    justifyContent: "center"
                  }}
                >
                  {country_validations}
                </label>
                <li>
                  <GLButton type="submit" variant="primary" className="bob">
                    Continue
                  </GLButton>
                </li>

                {current_user && current_user.first_name && (
                  <div>
                    {loading_checkboxes ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="mv-2rem">
                        <input
                          type="checkbox"
                          name="save_user_shipping"
                          defaultChecked={save_user_shipping}
                          style={{
                            transform: "scale(1.5)"
                          }}
                          className="mr-1rem"
                          id="save_user_shipping"
                          onChange={e => {
                            set_save_user_shipping(e.target.checked);
                          }}
                        />
                        <label htmlFor="save_user_shipping mb-20px">Save Shipping</label>
                      </div>
                    )}
                  </div>
                )}
              </ul>
            </form>
          ) : (
            <div className="wrap jc-b w-100per pos-rel">
              {shipping && shipping.hasOwnProperty("first_name") && (
                <div className="paragraph_font lh-25px mb-10px">
                  <div>
                    {shipping.first_name} {shipping.last_name}
                  </div>
                  <div>
                    {shipping.address_1} {shipping.address_2}
                  </div>
                  <div>
                    {shipping.city}, {shipping.state} {shipping.postalCode}, {shipping.country}
                  </div>
                  <div>{shipping.international && "International"}</div>
                </div>
              )}

              {/* <div className="pos-abs "> */}
              <Loading loading={loading_shipping} />
              {/* </div> */}

              <ShippingChoice
                rates={shipping_rates.rates}
                choose_shipping_rate={choose_shipping_rate}
                hide_pay_button={hide_pay_button}
                shipping={shipping}
                current_shipping_speed={current_shipping_speed}
                re_choose_shipping_rate={re_choose_shipping_rate}
              />
              {cartItems.some(item => item.processing_time) && (
                <h4 className="mb-0px mt-0px" style={{ webkitTextStroke: "0.5px white" }}>
                  Estimated Time to Ship {Math.max(...cartItems.map(item => item.processing_time[0]))} -{" "}
                  {Math.max(...cartItems.map(item => item.processing_time[1]))} business days
                </h4>
              )}

              {/* <GLModal
                show_modal={show_modal}
                set_show_modal={set_show_modal}
                title={"Processing Time Explained"}
                onClose={() => set_show_modal(false)}
                showClose={false}
                confirmLabel="I Agree"
                confirmVariant={agree ? "primary" : "disabled"}
                confirmDisabled={!agree}
                onConfirm={() => {
                  set_show_modal(false);
                  next_step("payment");
                }}
              >
                <p> Processing time is independent of the selected shipping speed. </p>
                <p style={{ webkitTextStroke: "1px black !important" }}>
                  Add this processing time to your shipping speed to get the most accurate delivery date.
                </p>
                <p> Many of our products are hand-made and made to order which means they are not made until your order is placed. </p>
                <p> There may be many orders in front of you that need just as much love and care as yours. </p>
                <p>
                  We are a small company, not an Amazon, and always appriciate your understanding and support as we continue to grow!
                </p>{" "}
                <GLCheckbox onChecked={set_agree} value={agree}>
                  <h3 style={{ color: "red", fontSize: "20px", margin: "5px 0px" }}>
                    Estimated Time to Ship {Math.max(...cartItems.map(item => item.processing_time[0]))} -{" "}
                    {Math.max(...cartItems.map(item => item.processing_time[1]))} business days
                  </h3>
                </GLCheckbox>
              </GLModal> */}
              {!show_payment && (
                <GLTooltip tooltip={!show_shipping_complete && "You must select shipping speed before continuing"} className="w-100per">
                  <GLButton
                    type="submit"
                    variant={!show_shipping_complete ? "disabled" : "primary"}
                    id="open-modal"
                    className={`${show_shipping_complete ? "bob" : "disabled"} mt-10px w-100per`}
                    onClick={() => {
                      // set_show_modal(true);
                      next_step("payment");
                    }}
                  >
                    Continue
                  </GLButton>
                </GLTooltip>
              )}
            </div>
          )}
        </div>
      )}
      {width < 400 && <hr />}
    </div>
  );
};

export default ShippingStep;
