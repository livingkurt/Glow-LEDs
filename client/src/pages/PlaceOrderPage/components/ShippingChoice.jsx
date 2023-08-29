// React
import React, { useEffect, useState } from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import DomesticShippingSpeed from "./DomesticShippingSpeed";
import InternationalShippingSpeed from "./InternationalShippingSpeed";
import { determine_service } from "../placeOrderHelpers";

const ShippingChoice = ({
  rates,
  hide_pay_button,
  shipping,
  current_shipping_speed,
  choose_shipping_rate,
  re_choose_shipping_rate,
  set_hide_pay_button,
}) => {
  useEffect(() => {
    set_hide_pay_button(true);
  }, [rates, set_hide_pay_button]);
  const [modalShown, setModalShown] = useState(false);
  return (
    <div className="w-100per">
      {hide_pay_button && rates && (
        <div className="w-100per">
          {shipping && shipping.international && (
            <div>
              <InternationalShippingSpeed
                rates={rates}
                choose_shipping_rate={choose_shipping_rate}
                modalShown={modalShown}
                setModalShown={setModalShown}
              />
            </div>
          )}
          {shipping && !shipping.international && (
            <div>
              <DomesticShippingSpeed
                rates={rates}
                choose_shipping_rate={choose_shipping_rate}
                modalShown={modalShown}
                setModalShown={setModalShown}
              />
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
          <GLButton className="rates w-10rem" onClick={() => re_choose_shipping_rate()}>
            Change
          </GLButton>
        </div>
      )}
    </div>
  );
};

export default ShippingChoice;
