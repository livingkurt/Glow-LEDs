import React, { useEffect } from "react";
import { state_names } from "../../../utils/helper_functions";
import { Loading } from "../../../shared/SharedComponents";
import { ShippingChoice } from ".";
import { useDispatch, useSelector } from "react-redux";
import { validate_shipping } from "../../../utils/validations";
import useWindowDimensions from "../../../shared/Hooks/windowDimensions";
import { isMobile } from "react-device-detect";
import ReactGoogleAutocomplete from "./ReactGoogleAutocomplete";
import { GLAutocomplete, GLButton } from "../../../shared/GlowLEDsComponents";
import GLTooltip from "../../../shared/GlowLEDsComponents/GLTooltip/GLTooltip";

import { useGetAllShippingOrdersQuery } from "../placeOrderApi";
import { save_shipping, updateGoogleShipping } from "../../../slices/cartSlice";
import * as API from "../../../api";
import config from "../../../config";
import {
  set_hide_pay_button,
  set_show_shipping,
  set_shipping_completed,
  showHideSteps,
  setShippingValidation,
  set_loading_shipping,
  setFreeShipping,
  setTaxPrice,
  setModalText,
  openSaveShippingModal,
  closeSaveShippingModal,
  setShippingSaved,
  nextStep,
  setEmailValidations,
} from "../placeOrderSlice";
import { Checkbox, FormControlLabel } from "@mui/material";

import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";

const ShippingStep = () => {
  const { width } = useWindowDimensions();
  const all_shipping = useGetAllShippingOrdersQuery();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping, payment } = cartPage;
  const { cartItems } = my_cart;

  const placeOrder = useSelector(state => state.placeOrder);
  const {
    hide_pay_button,
    show_shipping,
    show_payment,
    shipping_completed,
    itemsPrice,
    loading_shipping,
    show_shipping_complete,
    promo_code,
    shippingPrice,
    show_message,
    taxPrice,
    totalPrice,
    tip,
    order_note,
    production_note,
    showSaveShippingModal,
    shippingSaved,
    shippingValidations,
    modalText,
  } = placeOrder;

  const {
    first_name: first_name_validations,
    last_name: last_name_validations,
    address_1: address_validations,
    city: city_validations,
    state: state_validations,
    postal_code: postal_code_validations,
    country: country_validations,
  } = shippingValidations;

  const dispatch = useDispatch();

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  useEffect(() => {
    dispatch(set_hide_pay_button(true));
  }, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (shipping && shipping.first_name && shipping.first_name.length > 1) {
        dispatch(save_shipping(shipping));
      }
    }
    return () => (clean = false);
  }, []);

  const validateShipping = e => {
    e.preventDefault();

    const data = {
      ...shipping,
      email: shipping.email ? shipping.email : current_user.email,
    };

    const request = validate_shipping(data);
    if (Object.keys(request?.errors).length > 0) {
      dispatch(setShippingValidation({ errors: request.errors }));
      return;
    }

    if (request.isValid) {
      const normalizedCurrentUserShipping = normalizeAddress(
        { ...current_user?.shipping, email: current_user?.email } || {}
      );
      const normalizedNewShipping = normalizeAddress(shipping || {});
      if (current_user?.shipping && normalizedCurrentUserShipping !== normalizedNewShipping && !shippingSaved) {
        if (current_user?.shipping) {
          dispatch(setModalText("Your address is different from your saved one. Would you like to update it?"));
        } else {
          dispatch(setModalText("Would you like to save your address for future use?"));
        }
        dispatch(openSaveShippingModal(true)); // Open the modal
        return;
      } else {
        submitShipping();
      }
    }
  };
  const normalizeAddress = address => {
    return JSON.stringify(address).toLowerCase().replace(/\s/g, "");
  };

  const submitShipping = () => {
    if (shipping && Object.keys(shipping).length > 0) {
      dispatch(set_loading_shipping(true));
      const package_volume = cartItems?.reduce((a, c) => a + c.package_volume, 0);

      if (!package_volume) {
        dispatch(setFreeShipping());
      } else {
        if (shipping?.hasOwnProperty("address_1") && shipping.address_1.length > 0 && shipping_completed) {
          get_shipping_rates();
        }
      }
      if (shipping.international) {
        dispatch(setTaxPrice(0));
      } else {
        dispatch(API.getTaxRates({ shipping, itemsPrice }));
      }
    }
    dispatch(set_show_shipping(false));
    dispatch(set_shipping_completed(true));
    isMobile && window.scrollTo({ top: 340, behavior: "smooth" });
    dispatch(setShippingSaved(false));
  };

  const get_shipping_rates = async verify_ship => {
    const verify = shipping.international ? false : verify_ship;
    const order = {
      orderItems: cartItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      current_user,
      tip,
      order_note,
      production_note,
      promo_code: show_message && promo_code,
    };

    dispatch(API.shippingRates({ order, verify_shipping: verify }));
  };

  const next_step = step => {
    dispatch(nextStep(step));

    if (step === "shipping" && shipping.email.length === 0) {
      dispatch(setEmailValidations("Email Field Empty"));
    }

    if (isMobile) {
      const scrollTo = step === "shipping" ? 340 : 560;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="jc-b">
        <h2>2. Shipping</h2>
        {shipping_completed && !show_shipping && (
          <GLButton variant="secondary" className="mv-10px" onClick={() => dispatch(showHideSteps("shipping"))}>
            Edit
          </GLButton>
        )}
      </div>
      {shipping_completed && (
        <div>
          {show_shipping ? (
            <>
              <ul className={`shipping-container mv-0px pv-0px ${width > 400 ? "" : "p-0px"}`}>
                {current_user && current_user.shipping && current_user.shipping.hasOwnProperty("first_name") && (
                  <li>
                    <GLButton onClick={e => dispatch(save_shipping({ ...current_user.shipping }))} variant="primary">
                      Use Saved Shipping
                    </GLButton>
                  </li>
                )}
                {current_user?.isAdmin && (
                  <GLAutocomplete
                    margin="normal"
                    value={shipping}
                    variant={"filled"}
                    loading={!all_shipping.isLoading}
                    options={all_shipping.isLoading ? [] : all_shipping.data}
                    getOptionLabel={option => (option ? `${option.first_name} ${option.last_name}` : "")}
                    optionDisplay={option => (option ? `${option.first_name} ${option.last_name}` : "")}
                    getOptionSelected={(option, value) => option.uniqueKey === value.uniqueKey}
                    name={"product"}
                    label={"Choose Shipping"}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        const stateShortName = state_names.find(
                          state => state.long_name === newValue.state || state.short_name === newValue.state
                        )?.short_name;

                        dispatch(
                          save_shipping({
                            ...newValue,
                            state: stateShortName,
                          })
                        );
                      }
                    }}
                  />
                )}

                <li>
                  <div className="jc-b">
                    <div className="mr-5px w-50per">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        type="text"
                        className="w-100per"
                        value={shipping.first_name}
                        name="first_name"
                        id="first_name"
                        onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                      />

                      <label
                        className="validation_text"
                        style={{
                          justifyContent: "center",
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
                        value={shipping.last_name}
                        name="last_name"
                        id="last_name"
                        onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                      />
                      <label
                        className="validation_text"
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        {last_name_validations}
                      </label>
                    </div>
                  </div>
                </li>
                <li>
                  <label htmlFor="address_autocomplete">Address</label>
                  <ReactGoogleAutocomplete
                    apiKey={config.REACT_APP_GOOGLE_PLACES_KEY}
                    className="fs-16px"
                    name="address_1"
                    value={shipping.address_1}
                    options={{
                      types: ["address"],
                    }}
                    onPlaceSelected={place => {
                      let autocompleteElement = document.querySelector("#autocomplete");
                      const street_num = autocompleteElement ? autocompleteElement.value : "";

                      const payload = {
                        shipping: place,
                        street_num,
                      };

                      dispatch(updateGoogleShipping(payload));
                    }}
                    onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                  />
                </li>
                <label
                  className="validation_text"
                  style={{
                    justifyContent: "center",
                  }}
                >
                  {address_validations}
                </label>
                <li>
                  <label htmlFor="address_2">Apt/Suite</label>
                  <input
                    type="text"
                    value={shipping.address_2}
                    name="address_2"
                    id="address_2"
                    onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                  />
                </li>
                <li>
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    value={shipping.city}
                    name="city"
                    id="city"
                    onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                  />
                </li>
                <label
                  className="validation_text"
                  style={{
                    justifyContent: "center",
                  }}
                >
                  {city_validations}
                </label>
                {!shipping.international && (
                  <li>
                    <label className="mb-1rem" htmlFor="state">
                      State
                    </label>
                    <div className="ai-c h-25px mb-15px jc-c">
                      <div className="custom-select w-100per">
                        <select
                          className="qty_select_dropdown w-100per"
                          onChange={e => dispatch(save_shipping({ ...shipping, state: e.target.value }))}
                          value={shipping.state}
                        >
                          {/* <option key={1} defaultValue="">
                            Choose State
                          </option> */}
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
                {shipping.international && (
                  <li>
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      value={shipping.state}
                      name="state"
                      id="state"
                      onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                    />
                  </li>
                )}
                <label
                  className="validation_text"
                  style={{
                    justifyContent: "center",
                  }}
                >
                  {state_validations}
                </label>
                <li>
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    value={shipping.postalCode}
                    name="postalCode"
                    id="postalCode"
                    onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                  />
                </li>
                <label
                  className="validation_text"
                  style={{
                    justifyContent: "center",
                  }}
                >
                  {postal_code_validations}
                </label>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="large"
                        name="international"
                        defaultChecked={shipping.international}
                        onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.checked }))}
                      />
                    }
                    label="International"
                  />
                  {shipping.international && (
                    <li>
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        value={shipping.country}
                        name="country"
                        id="country"
                        onChange={e => dispatch(save_shipping({ ...shipping, [e.target.name]: e.target.value }))}
                      />
                    </li>
                  )}
                </div>
                <label
                  className="validation_text"
                  style={{
                    justifyContent: "center",
                  }}
                >
                  {country_validations}
                </label>
                <li>
                  <GLButton onClick={validateShipping} variant="primary" className="bob">
                    Continue
                  </GLButton>
                </li>
              </ul>
            </>
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

              <Loading loading={loading_shipping} />

              <ShippingChoice />
              {cartItems.some(item => item.processing_time) && (
                <h4 className="mb-0px mt-0px" style={{ webkitTextStroke: "0.5px white" }}>
                  Estimated Time to Ship {Math.max(...cartItems.map(item => item.processing_time[0]))} -{" "}
                  {Math.max(...cartItems.map(item => item.processing_time[1]))} business days
                </h4>
              )}
              {!show_payment && (
                <GLTooltip
                  tooltip={
                    !show_shipping_complete && !hide_pay_button && "You must select shipping speed before continuing"
                  }
                  className="w-100per"
                >
                  <GLButton
                    type="submit"
                    variant={!show_shipping_complete && !hide_pay_button ? "disabled" : "primary"}
                    id="open-modal"
                    className={`${show_shipping_complete && !hide_pay_button ? "bob" : "disabled"} mt-10px w-100per`}
                    onClick={() => {
                      if (show_shipping_complete && !hide_pay_button) {
                        next_step("payment");
                      }
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
      <GLActiionModal
        isOpen={showSaveShippingModal}
        onConfirm={() => {
          dispatch(
            API.saveUser({
              user: {
                ...current_user,
                shipping: {
                  ...shipping,
                  email: current_user.email,
                  country: shipping.international ? shipping.country : "US",
                },
              },
              profile: true,
            })
          );
          dispatch(closeSaveShippingModal(false));
          submitShipping();
        }}
        onCancel={() => {
          dispatch(closeSaveShippingModal(false));
          submitShipping();
        }}
        title={"Save Shipping Address"}
        confirmLabel={"Save Shipping"}
        confirmColor="primary"
        cancelLabel={"Continue without Saving Shipping"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <p>{modalText}</p>
        <p>
          <strong>Note</strong>: You can change your saved address later from your profile page
        </p>
      </GLActiionModal>
    </div>
  );
};

export default ShippingStep;
