import React, { useEffect, useState } from "react";
import { state_names, toCapitalize } from "../../../utils/helper_functions";
import { Loading } from "../../../shared/SharedComponents";
import { ShippingChoice } from ".";
import { useDispatch, useSelector } from "react-redux";
import { validate_shipping } from "../../../utils/validations";
import useWindowDimensions from "../../../shared/Hooks/windowDimensions";
import { isMobile } from "react-device-detect";
import Autocomplete from "./AddressAutocomplete";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import GLTooltip from "../../../shared/GlowLEDsComponents/GLTooltip/GLTooltip";

import { useGetAllShippingOrdersQuery } from "../placeOrderApi";
import { save_shipping, set_verify_shipping, updateGoogleShipping } from "../../../slices/cartSlice";
import * as API from "../../../api";
import config from "../../../config";
import {
  set_hide_pay_button,
  set_email,
  set_show_shipping,
  set_shipping_completed,
  set_loading,
  set_save_user_shipping,
  showHideSteps,
  setShippingValidation,
  set_loading_shipping,
  setFreeShipping,
  setTaxPrice,
} from "../placeOrderSlice";
import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { isRequired, validateSection } from "../placeOrderHelpers";
import { makeStyles } from "@mui/styles";
import { fullName } from "../../UsersPage/usersHelpers";

const useStyles = makeStyles(theme => ({
  // input: {
  //   backgroundColor: "white",
  //   color: "black",
  // },
  // label: {},
  input: {
    backgroundColor: "transparent",
    color: "white",
  },

  helperText: {
    color: "white",
  },
  errorHelperText: {
    color: "red", // or any color you prefer for error state
  },
  outlinedInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
  label: {
    color: "white",
    "&.Mui-focused": {
      color: "white",
    },
  },
}));

const ShippingStep = ({ choose_shipping_rate, next_step }) => {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const all_shipping = useGetAllShippingOrdersQuery();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping, payment, verify_shipping } = cartPage;
  const { cartItems } = my_cart;

  const placeOrder = useSelector(state => state.placeOrder);
  const {
    shipping_rates,
    hide_pay_button,
    show_shipping,
    show_payment,
    shipping_completed,
    itemsPrice,
    loading_shipping,
    show_shipping_complete,
    save_user_shipping,
    email,
    promo_code,
    shippingPrice,
    show_message,
    taxPrice,
    totalPrice,
    tip,
    order_note,
    production_note,
    shippingValidations,
  } = placeOrder;

  // const {
  //   first_name: first_name_validations,
  //   last_name: last_name_validations,
  //   address_1: address_validations,
  //   city: city_validations,
  //   state: state_validations,
  //   postal_code: postal_code_validations,
  //   country: country_validations,
  // } = shippingValidations;

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
        if (shipping.international) {
          dispatch(set_verify_shipping(false));
        }
      }
    }
    return () => (clean = false);
  }, []);

  const submitHandler = e => {
    e.preventDefault();

    const result = validateForm();

    if (result.isValid) {
      if (shipping && Object.keys(shipping).length > 0) {
        dispatch(set_loading_shipping(true));
        const package_volume = cartItems?.reduce((a, c) => a + c.package_volume, 0);

        if (!package_volume) {
          dispatch(setFreeShipping());
        } else {
          if (shipping?.hasOwnProperty("address_1") && shipping.address_1.length > 0 && shipping_completed) {
            get_shipping_rates(verify_shipping);
          }
        }
        if (shipping.international) {
          dispatch(setTaxPrice(0));
        } else {
          dispatch(API.getTaxRates({ shipping, itemsPrice }));
        }
      }
      if (save_user_shipping) {
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
            profile: false,
          })
        );
      }
      dispatch(set_show_shipping(false));
      dispatch(set_shipping_completed(true));
      isMobile && window.scrollTo({ top: 340, behavior: "smooth" });
    }
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

  const setGeneratedAddress = place => {
    let autocompleteElement = document.querySelector("#autocomplete");
    const street_num = autocompleteElement ? autocompleteElement.value : "";

    const payload = {
      shipping: place,
      street_num,
    };

    dispatch(updateGoogleShipping(payload));
  };

  const [formErrors, setFormErrors] = useState({});

  const shippingFormFields = {
    type: "object",
    title: "To Shipping Address",
    fields: {
      first_name: {
        type: "text",
        label: "First Name",
        validate: value => isRequired(value, "First Name"),
      },
      last_name: {
        type: "text",
        label: "Last Name",
        validate: value => isRequired(value, "Last Name"),
      },
      address_1: {
        type: "autocomplete_address",
        label: "Address Line 1",
        validate: value => isRequired(value, "Address"),
        setGeneratedAddress: place => setGeneratedAddress(place, "to"),
      },
      address_2: {
        type: "text",
        label: "Address Line 2",
      },
      city: {
        type: "text",
        label: "City",
        validate: value => isRequired(value, "City"),
      },
      state: {
        type: shipping.international ? "text" : "autocomplete_single",
        label: "State",
        validate: value => isRequired(value, "State"),
        getOptionLabel: option => option.long_name,
        getOptionSelected: (option, value) => option.short_name === value,
        getOptionValue: option => option.short_name,
        valueAttribute: "short_name",
        options: state_names,
      },
      postalCode: {
        type: "text",
        label: "Postal Code",
        validate: value => isRequired(value, "Postal Code"),
      },
      international: {
        type: "checkbox",
        label: "International",
      },
      country: {
        type: shipping.international ? "text" : "",
        label: "Country",
        validate: value => isRequired(value, "Country"),
      },
    },
  };
  console.log({ all_shipping });

  const allShippingFormFields = {
    type: "object",
    title: "To Shipping Address",
    fields: {
      shippingChoice: {
        type: "autocomplete_single",
        label: "Choose Shipping",
        options: all_shipping.data,
        labelProp: "shipping",
        getOptionValue: option => option,
        getOptionLabel: shipping => {
          if (!shipping) {
            return "";
          }

          return fullName(shipping);
        },
      },
    },
  };

  const validateForm = () => {
    const validationResult = { isValid: true, errorMessages: {} };

    validateSection(shippingFormFields.fields, shipping, validationResult);

    setFormErrors(validationResult.errorMessages);
    return validationResult;
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
              <div className={`shipping-container mv-0px pv-0px ${width > 400 ? "" : "p-0px"}`}>
                {current_user && current_user.shipping && current_user.shipping.hasOwnProperty("first_name") && (
                  <li>
                    <GLButton onClick={e => dispatch(save_shipping({ ...current_user.shipping }))} variant="primary">
                      Use Saved Shipping
                    </GLButton>
                  </li>
                )}
                {current_user?.isAdmin && (
                  <GLForm
                    formData={allShippingFormFields.fields}
                    state={shipping}
                    onChange={value =>
                      dispatch(save_shipping({ ...value.shippingChoice, shippingChoice: value.shippingChoice }))
                    }
                    formErrors={formErrors} // Pass the errors here
                    setFormErrors={setFormErrors}
                    classes={classes}
                  />
                  // <li className="w-100per">
                  //   <div className="ai-c h-25px mv-10px mb-30px jc-c w-100per">
                  //     <div className="custom-select w-100per">
                  //       <select
                  //         className="qty_select_dropdown w-100per"
                  //         style={{
                  //           width: "100%",
                  //         }}
                  //         onChange={e => {
                  //           const newShipping = JSON.parse(e.target.value);
                  //           dispatch(save_shipping(newShipping));
                  //         }}
                  //       >
                  //         <option key={1} defaultValue="">
                  //           ---Choose Shipping for Order---
                  //         </option>
                  //         {!all_shipping.isLoading &&
                  //           all_shipping.data.map((shipping, index) => (
                  //             <option key={index} value={JSON.stringify(shipping)}>
                  //               {shipping.first_name} {shipping.last_name}
                  //             </option>
                  //           ))}
                  //       </select>
                  //       <span className="custom-arrow" />
                  //     </div>
                  //   </div>
                  // </li>
                )}
                {current_user?.isAdmin && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="large"
                        name="verify_shipping"
                        defaultChecked={verify_shipping}
                        onChange={e => {
                          dispatch(set_verify_shipping(e.target.checked));
                        }}
                      />
                    }
                    label="Verify Shipping"
                  />
                )}
                {/* <Paper className="p-10px"> */}
                <GLForm
                  formData={shippingFormFields.fields}
                  state={shipping}
                  onChange={value => dispatch(save_shipping(value))}
                  formErrors={formErrors} // Pass the errors here
                  setFormErrors={setFormErrors}
                  classes={classes}
                />

                <li>
                  <GLButton onClick={submitHandler} variant="primary" className="bob">
                    Continue
                  </GLButton>
                </li>
                {current_user && current_user.first_name && (
                  <div className="mv-2rem">
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="large"
                          name="save_user_shipping"
                          defaultChecked={save_user_shipping}
                          onChange={e => {
                            dispatch(set_save_user_shipping(e.target.checked));
                          }}
                        />
                      }
                      label="Save Shipping"
                    />
                  </div>
                )}
              </div>
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

              {/* <div className="pos-abs "> */}
              <Loading loading={loading_shipping} />
              {/* </div> */}

              <ShippingChoice rates={shipping_rates.rates} choose_shipping_rate={choose_shipping_rate} />
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
    </div>
  );
};

export default ShippingStep;
