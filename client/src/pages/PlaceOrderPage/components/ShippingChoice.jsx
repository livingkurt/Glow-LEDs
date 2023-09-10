import React, { useEffect } from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import InternationalShippingSpeed from "./InternationalShippingSpeed";
import { useSelector, useDispatch } from "react-redux";
import {
  determine_service,
  mapCarrierName,
  mapServiceName,
  serviceNames,
  toTitleCaseSnakeCase,
} from "../placeOrderHelpers";
import {
  activatePromo,
  chooseShippingRateBasic,
  chooseShippingRateWithPromo,
  finalizeShippingRate,
  re_choose_shipping_rate,
  setModalShown,
  setOpen,
  setTempShippingRate,
  set_hide_pay_button,
} from "../placeOrderSlice";
import { determine_total } from "../../../utils/helper_functions";
import ProcessingConfirmModal from "./ProcessingConfirmModal";
import { Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";

const ShippingChoice = () => {
  const dispatch = useDispatch();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { shipping, my_cart } = cartPage;
  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos } = promoPage;
  const { cartItems } = my_cart;
  const placeOrder = useSelector(state => state.placeOrder);
  const items_price = determine_total(cartItems);
  const {
    shipping_rates,
    current_shipping_speed,
    hide_pay_button,
    open,
    tax_rate,
    show_message,
    shipping_rate,
    modalShown,
  } = placeOrder;

  useEffect(() => {
    dispatch(set_hide_pay_button(true));
  }, [shipping_rates.rates, dispatch]);

  const normalizeDomesticRates = rates => {
    const USPSRates = rates.filter(rate => rate.carrier === "USPS");
    const UPSRates = rates.filter(rate => rate.carrier === "UPSDAP");
    const sortedUSPSRates = USPSRates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
    const sortedUPSRates = UPSRates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
    const selectedRates = [...sortedUSPSRates.slice(0, 1), sortedUPSRates[0], sortedUPSRates[2]];
    return selectedRates;
  };

  const normalizeInternationalRates = rates => {
    return [...rates].sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
  };

  const displayRate = current_shipping_speed.freeShipping
    ? "Free"
    : `$${parseFloat(
        shipping.international ? current_shipping_speed.rate.rate : current_shipping_speed.rate.retail_rate
      ).toFixed(2)}`;

  const choose_shipping_rate = rate => {
    console.log({ rate });
    const freeShipping =
      !shipping.international && items_price > 50 && mapServiceName(rate.service) === "Standard" ? true : false;
    dispatch(chooseShippingRateBasic({ rate, freeShipping, shipping }));
    const promo_code_storage = sessionStorage.getItem("promo_code");
    if (promo_code_storage && promo_code_storage.length > 0) {
      const promoPayload = { promo_code_storage };
      dispatch(chooseShippingRateWithPromo(promoPayload));
      dispatch(activatePromo({ items_price, tax_rate, show_message, code: promo_code_storage, promos }));
    }

    dispatch(finalizeShippingRate());
  };

  const handleOpen = (rate, index) => {
    if (modalShown) {
      choose_shipping_rate(rate);
      return;
    }
    const processingTime =
      cartItems.some(item => item.processing_time) && Math.max(...cartItems.map(item => item.processing_time[1]));
    if (
      ((!shipping.international && serviceNames[index] !== "USPS: Standard") ||
        (shipping.international && mapServiceName(rate.service) !== "First Class")) &&
      processingTime
    ) {
      console.log({ rate });
      dispatch(setTempShippingRate(rate));
      dispatch(setModalShown(true));
      dispatch(setOpen(true));
    } else {
      choose_shipping_rate(rate);
    }
  };

  return (
    <div className="w-100per">
      {hide_pay_button && shipping_rates.rates && (
        <div className="w-100per">
          {shipping && shipping.international && (
            <div>
              {normalizeInternationalRates(shipping_rates.rates).map((rate, index) => {
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
              })}
            </div>
          )}
          {shipping && !shipping.international && (
            <div>
              {normalizeDomesticRates(shipping_rates.rates).map((rate, index) => {
                let isFreeShipping = items_price > 50 && serviceNames[index] === "USPS: Standard";
                let displayRate = isFreeShipping ? "Free" : `$${parseFloat(rate.retail_rate || rate.rate).toFixed(2)}`;

                return (
                  <div className="rate-container mv-1rem jc-b ai-c" key={index}>
                    <div className="shipping_rates jc-b w-100per wrap">
                      <label className="service">{serviceNames[index] || toTitleCaseSnakeCase(rate.service)}</label>
                      <div className="jc-b max-w-150px w-100per">
                        <label>{determine_service(rate)}</label>
                        <label>{displayRate}</label>
                      </div>
                    </div>
                    <GLButton variant="rates" onClick={() => handleOpen(rate, index)}>
                      Select
                    </GLButton>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {!hide_pay_button && current_shipping_speed && (
        <div className=" mv-1rem jc-b ai-c w-100per">
          <div className="shipping_rates jc-b w-100per ">
            <div className="jc-b w-100per">
              <div>
                {shipping &&
                  shipping.international &&
                  `${mapCarrierName(current_shipping_speed.rate.carrier)}: ${mapServiceName(
                    current_shipping_speed.rate.service
                  )}`}
                {shipping &&
                  !shipping.international &&
                  `${
                    serviceNames[
                      normalizeDomesticRates(shipping_rates.rates).findIndex(
                        rate => rate.carrier === current_shipping_speed.rate.carrier
                      )
                    ]
                  }`}
              </div>
              <div className="jc-b max-w-150px w-100per">
                <div>{determine_service(current_shipping_speed.rate)}</div>
                <div>{displayRate}</div>
              </div>
            </div>
          </div>
          <GLButton className="rates w-10rem" onClick={() => dispatch(re_choose_shipping_rate())}>
            Change
          </GLButton>
        </div>
      )}
      <ProcessingConfirmModal
        open={open}
        serviceName={mapServiceName(current_shipping_speed.rate.service)}
        choose_shipping_rate={choose_shipping_rate}
        setOpen={setOpen}
        rate={shipping_rate}
      />
    </div>
  );
};

export default ShippingChoice;
