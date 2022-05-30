import React from "react";
import useWindowDimensions from "../../Hooks/windowDimensions";
import Stripe from "../Stripe";
export function Payment({
  payment_completed,
  show_payment,
  show_hide_steps,
  set_order_note,
  show_promo_code,
  show_promo_code_input_box,
  check_code,
  set_promo_code,
  promo_code_validations,
  show_message,
  remove_promo,
  tip,
  set_tip,
  parseFloat,
  loading_checkboxes,
  create_account,
  set_create_account,
  userInfo,
  set_new_password,
  password_validations,
  loading,
  hide_pay_button,
  placeOrderHandler,
  loading_payment,
  set_loading_payment,
  users,
  no_user,
  set_paid,
  paid,
  set_paymentMethod,
  set_user,
  user,
  create_order_without_paying,
  create_order_without_user,
}) {
  const { width } = useWindowDimensions();
  return (
    <div>
      <ul className="mv-0px">
        <div className="jc-b">
          <h2>3. Payment & Review</h2>
          {payment_completed &&
          !show_payment && (
            <button
              className="btn secondary mv-10px"
              onClick={() => show_hide_steps("payment")}
            >
              Edit
            </button>
          )}
        </div>
        {show_payment && (
          <div>
            <div className="w-100per ">
              <div htmlFor="order_note">Add a note</div>
              <input
                type="text"
                name="order_note"
                id="order_note"
                className="w-100per"
                onChange={e => set_order_note(e.target.value)}
              />
            </div>
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
                          set_promo_code(e.target.value.toUpperCase());
                        }}
                      />
                      <button
                        className="btn primary"
                        style={{
                          curser: "pointer",
                        }}
                      >
                        Apply
                      </button>
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
                {show_message && (
                  <div className="promo_code mv-1rem">
                    <button
                      className="btn icon"
                      onClick={() => remove_promo()}
                      aria-label="Detete"
                    >
                      <i className="fas fa-times mr-5px" />
                    </button>
                    {show_message}
                  </div>
                )}
              </div>
            )}
            <li>
              <div className="w-100per mb-1rem">
                <div htmlFor="tip" className="fs-16px">
                  Leave a Tip 💙
                </div>
                <input
                  type="number"
                  min="0.01"
                  step="1"
                  name="tip"
                  id="tip"
                  placeholder="$0.00"
                  defaultValue={`$${tip && parseFloat(tip).toFixed(2)}`}
                  className="w-100per"
                  onChange={e => set_tip(parseFloat(e.target.value))}
                />
              </div>
            </li>
            <li>
              {loading_checkboxes ? (
                <div>Loading...</div>
              ) : (
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
                      set_create_account(e.target.checked);
                    }}
                  />
                  <label htmlFor="create_account mb-20px">
                    Create an account for faster checkout
                  </label>
                </div>
              )}
            </li>
            {userInfo &&
            !userInfo.first_name &&
            create_account && (
              <li className="column mb-2rem">
                <label htmlFor="password">Password</label>
                <input // className="form_input"
                  type="password"
                  id="password"
                  name="password"
                  onChange={e => set_new_password(e.target.value)}
                />
                <label className="validation_text fs-16px jc-c ">
                  {password_validations}
                </label>
              </li>
            )}
            <li>
              {!loading &&
              !hide_pay_button && (
                <Stripe
                  pay_order={placeOrderHandler}
                  loading_payment={loading_payment}
                  set_loading_payment={set_loading_payment}
                />
              )}
              {/* {!hide_pay_button &&
            shipping &&
            shipping.hasOwnProperty('first_name') &&
            create_account &&
            passwords_check && (
            <Stripe pay_order={placeOrderHandler} loading_payment={loading_payment} />
            )} */}
            </li>
            {userInfo &&
            userInfo.isAdmin && (
              <div className="mt-2rem">
                {userInfo &&
                userInfo.isAdmin &&
                users &&
                !no_user && (
                  <div>
                    {loading_checkboxes ? (
                      <div>Loading...</div>
                    ) : (
                      <li>
                        <input
                          type="checkbox"
                          name="paid"
                          id="paid"
                          style={{
                            transform: "scale(1.5)",
                          }}
                          className="mr-1rem"
                          onChange={e => {
                            set_paid(e.target.checked);
                          }}
                        />
                        <label htmlFor="paid mb-20px ">Already Paid?</label>
                      </li>
                    )}
                    {paid && (
                      <div className="ai-c h-25px mv-10px mt-2rem mb-30px jc-c">
                        <div className="custom-select w-100per">
                          <select
                            className="qty_select_dropdown w-100per"
                            onChange={e => set_paymentMethod(e.target.value)}
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
                    <div className="ai-c h-25px mv-10px mt-2rem mb-30px jc-c">
                      <div className="custom-select w-100per">
                        <select
                          className="qty_select_dropdown w-100per"
                          defaultValue={userInfo.first_name}
                          onChange={e => set_user(JSON.parse(e.target.value))}
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
                    </div>
                    <button
                      onClick={create_order_without_paying}
                      className="btn secondary w-100per mb-12px"
                    >
                      Create Order For User
                    </button>
                  </div>
                )}
                {userInfo &&
                userInfo.isAdmin &&
                users &&
                no_user && (
                  <button
                    onClick={create_order_without_user}
                    className="btn secondary w-100per mb-12px"
                  >
                    Create Order Without User
                  </button>
                )}
              </div>
            )}
            {/* <li>
          <button className="btn primary w-100per" onClick={() => next_step('review')}>
          	Continue
          </button>
          </li> */}
          </div>
        )}
      </ul>
      {width < 400 && <hr />}
    </div>
  );
}
