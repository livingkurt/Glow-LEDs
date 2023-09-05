// React
import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { determine_service, toTitleCaseSnakeCase } from "../placeOrderHelpers";
import ProcessingConfirmModal from "./ProcessingConfirmModal";
import { setModalShown, setOpen } from "../placeOrderSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const InternationalShippingSpeed = ({ choose_shipping_rate }) => {
  const dispatch = useDispatch();
  const placeOrder = useSelector(state => state.placeOrder);
  const { modalShown, shipping_rates } = placeOrder;

  const sortedRates = shipping_rates.rates
    .sort((a, b) => {
      if (a.retail_rate && b.retail_rate) {
        return parseFloat(a.retail_rate) - parseFloat(b.retail_rate);
      } else if (a.retail_rate) {
        return -1;
      } else if (b.retail_rate) {
        return 1;
      } else {
        return parseFloat(a.rate) - parseFloat(b.rate);
      }
    })
    .filter(rate => rate.carrier === "UPSDAP");

  const handleOpen = rate => {
    if (modalShown) {
      choose_shipping_rate(rate, rate.service, toTitleCaseSnakeCase(rate.service));
      return;
    }
    dispatch(setOpen(true));
    dispatch(setModalShown(true));
  };

  return sortedRates.map((rate, index) => {
    return (
      <div className=" mv-1rem jc-b  ai-c" key={index}>
        <div className="shipping_rates jc-b w-100per wrap ">
          <label className="service">{toTitleCaseSnakeCase(rate.service)}</label>
          <div className="jc-b max-w-150px w-100per">
            <label className="">{determine_service(rate)}</label>
            <label> ${parseFloat(rate.retail_rate || rate.rate).toFixed(2)} </label>
          </div>
        </div>
        <GLButton variant="rates" onClick={() => handleOpen(rate, index)}>
          Select
        </GLButton>
        <ProcessingConfirmModal
          serviceName={toTitleCaseSnakeCase(rate.service)}
          choose_shipping_rate={choose_shipping_rate}
          rate={rate}
        />
      </div>
    );
  });
};

export default InternationalShippingSpeed;
