// React
import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";

const InternationalShippingSpeed = ({ rates, service, choose_shipping_rate }) => {
  const sortedRates = rates
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
    .filter(rate => rate.carrier === "FedEx");

  const determine_service = rate => {
    if (rate.est_delivery_days) {
      return `Est: ${rate.est_delivery_days} ${rate.est_delivery_days === 1 ? "Day" : "Days"}`;
    } else if (rate.service === "INTERNATIONAL_ECONOMY") {
      return "Est: 2-5 Days";
    } else if (rate.service === "FEDEX_INTERNATIONAL_PRIORITY") {
      return "Est: 1-3 Days";
    }
    // } else if (rate.service === "FirstMailInternational") {
    //   return "Est: 1-4 Weeks";
    // } else if (rate.service === "PriorityMailInternational") {
    //   return "Est: 6-10 Days";
    // } else if (rate.service === "ExpressMailInternational") {
    //   return "Est: 3-5 Days";
    // }
  };

  // Function to convert any string to title case thats in snake_case
  const toTitleCaseSnakeCase = str => {
    return str
      .split("_")
      .map(word => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      })
      .join(" ");
  };

  return sortedRates.map((rate, index) => {
    return (
      <div className=" mv-1rem jc-b  ai-c" key={index}>
        <div className="shipping_rates jc-b w-100per wrap ">
          <label className="service">{toTitleCaseSnakeCase(rate.service)}</label>

          <label>{determine_service(rate)}</label>
          <label> ${parseFloat(rate.retail_rate || rate.rate).toFixed(2)} </label>
        </div>
        <GLButton variant="rates" onClick={() => choose_shipping_rate(rate, service)}>
          Select
        </GLButton>
      </div>
    );
  });
};

export default InternationalShippingSpeed;
