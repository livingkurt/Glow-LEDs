import React, { useEffect } from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import DomesticShippingSpeed from "./DomesticShippingSpeed";
import InternationalShippingSpeed from "./InternationalShippingSpeed";
import { determine_service } from "../placeOrderHelpers";
import { re_choose_shipping_rate, set_hide_pay_button } from "../placeOrderSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ShippingChoice = () => {
  const dispatch = useDispatch();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { shipping } = cartPage;
  const placeOrder = useSelector(state => state.placeOrder);
  const { shipping_rates, current_shipping_speed, hide_pay_button } = placeOrder;
  useEffect(() => {
    dispatch(set_hide_pay_button(true));
  }, [shipping_rates.rates, set_hide_pay_button]);

  return (
    <div className="w-100per">
      {hide_pay_button && shipping_rates.rates && (
        <div className="w-100per">
          {shipping && shipping.international && (
            <div>
              <InternationalShippingSpeed />
            </div>
          )}
          {shipping && !shipping.international && (
            <div>
              <DomesticShippingSpeed />
            </div>
          )}
        </div>
      )}
      {!hide_pay_button && current_shipping_speed && (
        <div className=" mv-1rem jc-b ai-c w-100per">
          <div className="shipping_rates jc-b w-100per ">
            <div className="jc-b w-100per">
              <div>{current_shipping_speed.name}</div>
              <div className="jc-b max-w-150px w-100per">
                <div>{determine_service(current_shipping_speed.rate)}</div>
                <div>
                  ${parseFloat(current_shipping_speed.rate.retail_rate || current_shipping_speed.rate.rate).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <GLButton className="rates w-10rem" onClick={() => dispatch(re_choose_shipping_rate())}>
            Change
          </GLButton>
        </div>
      )}
    </div>
  );
};

export default ShippingChoice;
