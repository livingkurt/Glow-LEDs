// React
import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import ChooseShipping from "./ChooseShipping";
import DomesticShippingSpeed from "./DomesticShippingSpeed";
import InternationalShippingSpeed from "./InternationalShippingSpeed";
import ShippingSpeed from "./InternationalShippingSpeed";

const ShippingChoice = ({ rates, hide_pay_button, shipping, current_shipping_speed, choose_shipping_rate, re_choose_shipping_rate }) => {
  return (
    <div className="w-100per">
      {hide_pay_button && rates && (
        <div className="w-100per">
          {shipping && shipping.international && (
            <div>
              <InternationalShippingSpeed rates={rates} choose_shipping_rate={choose_shipping_rate} />
            </div>
          )}
          {shipping && !shipping.international && (
            <div>
              <DomesticShippingSpeed rates={rates} choose_shipping_rate={choose_shipping_rate} />
            </div>
          )}
        </div>
      )}
      {!hide_pay_button && current_shipping_speed && (
        <div className=" mv-1rem jc-b ai-c w-100per">
          <div className="shipping_rates jc-b w-100per ">
            <div className="jc-b w-100per">
              <div>{!shipping.international ? "Standard" : current_shipping_speed.rate.service}</div>

              <div>
                {" "}
                Est: {current_shipping_speed.rate.est_delivery_days} {current_shipping_speed.rate.est_delivery_days === 1 ? "Day" : "Days"}
              </div>
              <div>${parseFloat(current_shipping_speed.rate.retail_rate || current_shipping_speed.rate.rate).toFixed(2)}</div>
            </div>
          </div>
          <GLButton className="rates w-10rem" onClick={() => re_choose_shipping_rate()}>
            Change
          </GLButton>
        </div>
      )}
    </div>
  );
};

export default ShippingChoice;
