import React, { useEffect } from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { useSelector, useDispatch } from "react-redux";
import {
  determine_service,
  displayRate,
  getShippingInfo,
  isFasterShipping,
  isFreeShipping,
  mapCarrierName,
  mapServiceName,
  normalizeDomesticRates,
  normalizeInternationalRates,
  processingTime,
  serviceNames,
  toTitleCaseSnakeCase,
} from "../placeOrderHelpers";
import {
  activatePromo,
  chooseShippingRateBasic,
  chooseShippingRateWithPromo,
  finalizeShippingRate,
  openProcessingTimeModal,
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
    activePromoCodeIndicator,
    shipping_rate,
    modalShown,
  } = placeOrder;

  useEffect(() => {
    dispatch(set_hide_pay_button(true));
  }, [shipping_rates.rates, dispatch]);

  const choose_shipping_rate = rate => {
    const sortedRates = normalizeDomesticRates(shipping_rates.rates);
    const freeShipping = isFreeShipping({ shipping, items_price, rate, sortedRates });
    dispatch(chooseShippingRateBasic({ rate, freeShipping, shipping }));
    const promo_code_storage = sessionStorage.getItem("promo_code");
    if (promo_code_storage && promo_code_storage.length > 0) {
      dispatch(chooseShippingRateWithPromo({ promo_code_storage }));
      dispatch(activatePromo({ items_price, tax_rate, activePromoCodeIndicator, code: promo_code_storage, promos }));
    }

    dispatch(finalizeShippingRate());
  };

  const handleOpen = (rate, index) => {
    if (modalShown) {
      choose_shipping_rate(rate);
      return;
    }
    const hasProcessingTime = processingTime({ cartItems });
    const chooseFasterShipping = isFasterShipping({ shipping, rate, index });

    if (chooseFasterShipping && hasProcessingTime) {
      dispatch(openProcessingTimeModal({ rate }));
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
          {shipping && !shipping.international && shipping_rates.rates && (
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
                {getShippingInfo(
                  shipping,
                  current_shipping_speed,
                  shipping_rates,
                  serviceNames,
                  mapCarrierName,
                  mapServiceName,
                  normalizeDomesticRates
                )}
              </div>
              <div className="jc-b max-w-150px w-100per">
                <div>{determine_service(current_shipping_speed.rate)}</div>
                <div>{displayRate({ current_shipping_speed, shipping })}</div>
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
