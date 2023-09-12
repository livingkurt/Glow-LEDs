import * as React from "react";

import { GLAutocomplete, GLButton } from "../../../shared/GlowLEDsComponents";
import useWindowDimensions from "../../../shared/Hooks/windowDimensions";
import {
  set_order_note,
  set_production_note,
  set_promo_code,
  set_tip,
  set_create_account,
  set_new_password,
  set_paid,
  set_paymentMethod,
  showHideSteps,
  removePromo,
  activatePromo,
  set_loading_payment,
  set_user,
} from "../placeOrderSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";
import StripeCheckout from "./StripeCheckout/StripeCheckout";
import { determine_total } from "../../../utils/helper_functions";
import * as API from "../../../api";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../shared/SharedComponents";

const PaymentStep = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping, payment } = cartPage;
  const { cartItems } = my_cart;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user, users } = userPage;

  const items_price = determine_total(cartItems);

  const placeOrder = useSelector(state => state.placeOrder);
  const {
    payment_completed,
    show_promo_code,
    show_promo_code_input_box,
    promo_code_validations,
    create_account,
    password_validations,

    previousShippingPrice,
    shipment_id,
    shipping_rate,
    parcel,
    show_payment,
    shippingPrice,
    promo_code,
    itemsPrice,
    taxPrice,
    totalPrice,
    user,
    tip,
    paid,
    loading_tax_rates,
    order_note,
    tax_rate,
    activePromoCodeIndicator,
    production_note,
  } = placeOrder;

  const check_code = async e => {
    e.preventDefault();

    const request = await dispatch(API.validatePromoCode({ promo_code, current_user, cartItems }));
    console.log({ request });

    if (request.payload.isValid) {
      dispatch(
        activatePromo({
          cartItems,
          tax_rate,
          activePromoCodeIndicator,
          current_user,
          validPromo: request.payload.promo,
        })
      );
    } else {
      dispatch(set_promo_code(""));
    }
  };

  // const data = new Date()
  const today = new Date();

  const create_order_without_paying = async ({ isPaid }) => {
    // create an order

    const order_paid = isPaid ? isPaid : paid ? paid : false;

    dispatch(
      API.saveOrder({
        orderItems: cartItems,
        shipping: {
          ...shipping,
          email: user.email,
          shipment_id: shipment_id && shipment_id,
          shipping_rate: shipping_rate && shipping_rate,
        },
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: user._id,
        order_note,
        production_note,
        tip,
        promo_code,
        parcel: parcel ? parcel : null,
        isPaid: order_paid,
        paidAt: order_paid ? today : null,
      })
    );

    dispatch(set_loading_payment(false));
    dispatch(API.emptyCart(my_cart._id));
    dispatch(API.updateStock({ cartItems }));
    if (promo_code) {
      dispatch(API.promoCodeUsed(promo_code.toLowerCase()));
      dispatch(API.sendCodeUsedEmail(promo_code.toLowerCase()));
    }
    navigate("/secure/glow/orders");
    sessionStorage.removeItem("shippingAddress");
  };

  const create_no_payment_order = async ({ isPaid }) => {
    dispatch(set_loading_payment(true));
    dispatch(
      API.createNoPayOrder({
        orderItems: cartItems,
        shipping: {
          ...shipping,
          email: user.email,
          shipment_id: shipment_id && shipment_id,
          shipping_rate: shipping_rate && shipping_rate,
        },
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: user._id,
        order_note,
        production_note,
        tip,
        promo_code,
        parcel: parcel ? parcel : null,
        isPaid: isPaid ? isPaid : false,
        paidAt: isPaid ? today : null,
      })
    );
  };

  const create_order_without_user = async () => {
    dispatch(
      API.saveOrder({
        orderItems: cartItems,
        shipping: shipment_id
          ? {
              ...shipping,
              shipment_id,
              shipping_rate,
            }
          : shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        order_note,
        production_note,
        tip,
        promo_code,
        parcel,
      })
    );

    dispatch(set_loading_payment(false));
    dispatch(API.emptyCart(my_cart._id));
    dispatch(API.updateStock({ cartItems }));
    if (promo_code) {
      dispatch(API.promoCodeUsed(promo_code.toLowerCase()));
    }
    navigate("/secure/glow/orders");
    sessionStorage.removeItem("shippingAddress");
  };

  return (
    <div>
      <ul className="mv-0px">
        <div className="jc-b">
          <h2>3. Payment & Review</h2>
          {payment_completed && !show_payment && (
            <GLButton variant="secondary" className="mv-10px" onClick={() => dispatch(showHideSteps("payment"))}>
              Edit
            </GLButton>
          )}
        </div>
        <Loading loading={loading_tax_rates} />
        {show_payment && !loading_tax_rates && (
          <div>
            <div className="w-100per ">
              <div htmlFor="order_note">Add a note</div>
              <input
                type="text"
                name="order_note"
                id="order_note"
                className="w-100per"
                onChange={e => dispatch(set_order_note(e.target.value))}
              />
            </div>
            {current_user?.isAdmin && (
              <div className="w-100per mt-10px">
                <div htmlFor="production_note">Add a production note</div>
                <input
                  type="text"
                  name="production_note"
                  id="production_note"
                  className="w-100per"
                  onChange={e => dispatch(set_production_note(e.target.value))}
                />
              </div>
            )}
            {show_promo_code && (
              <div>
                {show_promo_code_input_box && (
                  <div className="mv-10px">
                    <label htmlFor="promo_code">Promo Code</label>
                    <form onSubmit={e => check_code(e)} className="row">
                      <input
                        type="text"
                        name="promo_code"
                        id="promo_code"
                        className="w-100per"
                        style={{
                          textTransform: "uppercase",
                        }}
                        onChange={e => {
                          dispatch(set_promo_code(e.target.value.toUpperCase()));
                        }}
                      />
                      <GLButton
                        type="submit"
                        variant="primary"
                        style={{
                          curser: "pointer",
                        }}
                      >
                        Apply
                      </GLButton>
                    </form>
                  </div>
                )}
                <label
                  className="validation_text"
                  style={{
                    textAlign: "center",
                  }}
                >
                  {promo_code_validations}
                </label>
                {activePromoCodeIndicator && (
                  <div className="promo_code mv-1rem">
                    <GLButton
                      variant="icon"
                      onClick={() =>
                        dispatch(
                          removePromo({ items_price, tax_rate, shippingPrice, tip, previousShippingPrice, shipping })
                        )
                      }
                      aria-label="Detete"
                    >
                      <i className="fas fa-times mr-5px" />
                    </GLButton>
                    {activePromoCodeIndicator}
                  </div>
                )}
              </div>
            )}
            <li>
              <div className="w-100per mb-1rem">
                <label htmlFor="tip" className="fs-16px">
                  Leave a tip for our production team 💙
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="1"
                  name="tip"
                  id="tip"
                  placeholder="$0.00"
                  defaultValue={`$${tip && parseFloat(tip).toFixed(2)}`}
                  className="w-100per"
                  onChange={e => {
                    dispatch(set_tip(parseFloat(e.target.value)));
                  }}
                />
              </div>
            </li>
            {!current_user.hasOwnProperty("first_name") && (
              <li>
                <div className="mv-2rem">
                  <input
                    type="checkbox"
                    name="create_account"
                    defaultChecked={create_account}
                    style={{
                      transform: "scale(1.5)",
                    }}
                    className="mr-1rem"
                    id="create_account"
                    onChange={e => {
                      dispatch(set_create_account(e.target.checked));
                    }}
                  />
                  <label htmlFor="create_account mb-20px">Create an account for faster checkout</label>
                </div>
              </li>
            )}
            {current_user && !current_user.first_name && create_account && (
              <li className="column mb-2rem">
                <label htmlFor="password">Password</label>
                <input // className="form_input"
                  type="password"
                  id="password"
                  name="password"
                  onChange={e => dispatch(set_new_password(e.target.value))}
                />
                <label className="validation_text fs-16px jc-c ">{password_validations}</label>
              </li>
            )}
            <li>
              {cartItems.length > 0 && totalPrice && <StripeCheckout />}
              {(!totalPrice || totalPrice === 0) && (
                <>
                  <p htmlFor="password">Payment is not necessary at this time</p>
                  <GLButton
                    onClick={() => {
                      create_no_payment_order({ isPaid: true });
                    }}
                    variant="primary"
                    className="w-100per bob mb-12px"
                  >
                    Complete Order
                  </GLButton>
                </>
              )}
            </li>
            {current_user.isAdmin && (
              <div className="mt-2rem">
                {current_user.isAdmin && users && (
                  <div>
                    <li>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="large"
                            name="paid"
                            id="paid"
                            onChange={e => {
                              dispatch(set_paid(e.target.checked));
                            }}
                          />
                        }
                        label="Already Paid?"
                      />
                    </li>
                    {paid && (
                      <div className="ai-c h-25px mv-10px mt-2rem mb-30px jc-c">
                        <div className="custom-select w-100per">
                          <select
                            className="qty_select_dropdown w-100per"
                            onChange={e => dispatch(set_paymentMethod(e.target.value))}
                          >
                            <option key={1} defaultValue="">
                              Payment Method
                            </option>
                            {[
                              "stripe",
                              "venmo",
                              "cashapp",
                              "paypal",
                              "cash",
                              "zelle",
                              "facebook",
                              "promo",
                              "sponsor",
                              "replacement",
                              "no payment",
                            ].map((method, index) => (
                              <option key={index} value={method}>
                                {method}
                              </option>
                            ))}
                          </select>
                          <span className="custom-arrow" />
                        </div>
                      </div>
                    )}
                    <GLAutocomplete
                      margin="normal"
                      value={user || ""}
                      variant={"filled"}
                      options={users.filter(user => !user.deleted).filter(user => user.first_name)}
                      getOptionLabel={option => (option ? `${option.first_name} ${option.last_name}` : "")}
                      optionDisplay={option => (option ? `${option.first_name} ${option.last_name}` : "")}
                      getOptionSelected={(option, value) => option._id === value._id}
                      name={"users"}
                      label={"Choose User"}
                      onChange={(event, newValue) => {
                        dispatch(set_user(newValue));
                      }}
                    />
                    {/* <div className="ai-c h-25px mv-10px mt-2rem mb-30px jc-c">
                      <div className="custom-select w-100per">
                        <select
                          className="qty_select_dropdown w-100per"
                          defaultValue={current_user.first_name}
                          onChange={e => dispatch(set_user(JSON.parse(e.target.value)))}
                        >
                          <option key={1} defaultValue="">
                            ---Choose User for Order---
                          </option>
                          {users.map((user, index) => (
                            <option key={index} value={JSON.stringify(user)}>
                              {user.first_name} {user.last_name}
                            </option>
                          ))}
                        </select>
                        <span className="custom-arrow" />
                      </div>
                    </div> */}
                    <GLButton onClick={create_order_without_paying} variant="secondary" className="w-100per mb-12px">
                      Create Order For User
                    </GLButton>
                  </div>
                )}
                {current_user.isAdmin && users && (
                  <GLButton onClick={create_order_without_user} variant="secondary" className="w-100per mb-12px">
                    Create Order Without User
                  </GLButton>
                )}
              </div>
            )}
          </div>
        )}
      </ul>
      {width < 400 && <hr />}
    </div>
  );
};

export default PaymentStep;
