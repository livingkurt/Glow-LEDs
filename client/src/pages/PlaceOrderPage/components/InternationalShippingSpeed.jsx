import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { determine_service, mapCarrierName, mapServiceName } from "../placeOrderHelpers";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { determine_total } from "../../../utils/helper_functions";
import { Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";

const InternationalShippingSpeed = ({ handleOpen }) => {
  const dispatch = useDispatch();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping } = cartPage;
  const { cartItems } = my_cart;
  const placeOrder = useSelector(state => state.placeOrder);
  const { modalShown, shipping_rates, tax_rate, show_message } = placeOrder;
  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos } = promoPage;

  const items_price = determine_total(cartItems);

  const sortedRates = [...shipping_rates.rates].sort((a, b) => {
    if (a.rate && b.rate) {
      return parseFloat(a.rate) - parseFloat(b.rate);
    } else if (a.rate) {
      return -1;
    } else if (b.rate) {
      return 1;
    } else {
      return parseFloat(a.rate) - parseFloat(b.rate);
    }
  });

  return sortedRates.map((rate, index) => {
    const friendlyCarrier = mapCarrierName(rate.carrier);
    const friendlyService = mapServiceName(rate.service);
    return (
      <div className=" mv-1rem jc-b  ai-c" key={index}>
        <div className="shipping_rates jc-b w-100per wrap ">
          <label className="service ai-c">
            {friendlyCarrier}: {friendlyService}
            {rate.carrier === "USPS" && (
              <Tooltip
                title="USPS is not recommended for international shipping. Packages can become lost. Proceed at your own risk."
                arrow
                style={{ lineHeight: "20px" }}
              >
                <Info fontSize="small" style={{ marginLeft: "8px" }} />
              </Tooltip>
            )}
          </label>
          <div className="jc-b max-w-150px w-100per">
            <label className="">{determine_service(rate)}</label>
            <label> ${parseFloat(rate.rate).toFixed(2)} </label>
          </div>
        </div>
        <GLButton variant="rates" onClick={() => handleOpen(rate, index)}>
          Select
        </GLButton>
      </div>
    );
  });
};

export default InternationalShippingSpeed;
