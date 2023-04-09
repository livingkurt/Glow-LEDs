// React
import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";

const DomesticShippingSpeed = ({ rates, service, name, time, choose_shipping_rate }) => {
  const sortedRates = rates.sort((a, b) => {
    if (a.retail_rate && b.retail_rate) {
      return parseFloat(a.retail_rate) - parseFloat(b.retail_rate);
    } else if (a.retail_rate) {
      return -1;
    } else if (b.retail_rate) {
      return 1;
    } else {
      return parseFloat(a.rate) - parseFloat(b.rate);
    }
  });

  const lowestRate = sortedRates[0];

  return (
    <div className=" mv-1rem jc-b  ai-c">
      <div className="shipping_rates jc-b w-100per wrap ">
        <label className="service">Standard</label>

        {time ? (
          <label>time</label>
        ) : (
          <label>
            {" "}
            Est: {lowestRate.est_delivery_days} {lowestRate.est_delivery_days === 1 ? "Day" : "Days"}
          </label>
        )}
        <label> ${parseFloat(lowestRate.retail_rate || lowestRate.rate).toFixed(2)} </label>
      </div>
      <GLButton variant="rates" onClick={() => choose_shipping_rate(lowestRate, service)}>
        Select
      </GLButton>
    </div>
  );
};

export default DomesticShippingSpeed;
