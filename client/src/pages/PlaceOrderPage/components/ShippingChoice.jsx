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
  chooseShippingRateBasic,
  finalizeShippingRate,
  openProcessingTimeModal,
  re_choose_shipping_rate,
  setNonPreOrderShippingRate,
  setOpen,
  setPreOrderShippingRate,
  set_hide_pay_button,
} from "../placeOrderSlice";
import { determineItemsTotal } from "../../../utils/helper_functions";
import ProcessingConfirmModal from "./ProcessingConfirmModal";
import { Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";
import * as API from "../../../api";

const ShippingChoice = () => {
  const dispatch = useDispatch();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { shipping, my_cart } = cartPage;
  const { cartItems } = my_cart;
  const placeOrder = useSelector(state => state.placeOrder);
  const items_price = determineItemsTotal(cartItems);
  const {
    shipping_rates,
    freeShippingMinimum,
    current_shipping_speed,
    hide_pay_button,
    open,
    shipping_rate,
    modalShown,
    preOrderRates,
    nonPreOrderRates,
    splitOrder,
    preOrderShippingRate,
    nonPreOrderShippingRate,
  } = placeOrder;

  const { data: currentContent } = API.useCurrentContentQuery();

  useEffect(() => {
    dispatch(set_hide_pay_button(true));
  }, [shipping_rates.rates, dispatch]);

  const choose_shipping_rate = (rate, isPreOrder) => {
    console.log({ rate, isPreOrder });

    let sortedRates;
    if (splitOrder) {
      sortedRates = isPreOrder ? preOrderRates?.shipment?.rates : nonPreOrderRates?.shipment?.rates;
    } else {
      sortedRates = shipping_rates?.rates;
    }

    console.log({
      sortedRates,
      shipping,
      items_price,
      rate,
      freeShippingMinimum: currentContent?.free_shipping_minimum_amount,
    });

    if (sortedRates && Array.isArray(sortedRates)) {
      sortedRates = normalizeDomesticRates(sortedRates);
    } else {
      sortedRates = [];
    }

    console.log({ sortedRates });

    const freeShipping = isFreeShipping({
      shipping,
      items_price,
      rate,
      sortedRates,
      freeShippingMinimum: currentContent?.free_shipping_minimum_amount,
    });

    console.log({ freeShipping });
    dispatch(chooseShippingRateBasic({ rate, freeShipping, shipping, isPreOrder }));

    if (splitOrder) {
      if (isPreOrder) {
        dispatch(setPreOrderShippingRate(rate));
      } else {
        dispatch(setNonPreOrderShippingRate(rate));
      }
    }

    if (!splitOrder || (preOrderShippingRate && nonPreOrderShippingRate)) {
      dispatch(finalizeShippingRate());
    }
  };

  const handleOpen = (rate, index, isPreOrder) => {
    if (modalShown) {
      choose_shipping_rate(rate, isPreOrder);
      return;
    }
    const hasProcessingTime = processingTime({ cartItems });
    const chooseFasterShipping = isFasterShipping({ shipping, rate, index });

    if (chooseFasterShipping && hasProcessingTime) {
      dispatch(openProcessingTimeModal({ rate, isPreOrder }));
    } else {
      choose_shipping_rate(rate, isPreOrder);
    }
  };

  const renderShippingRates = (shipment, isPreOrder) => {
    const rateData = shipment?.rates || [];
    if (shipping.international) {
      return normalizeInternationalRates(rateData).map((rate, index) => {
        const friendlyCarrier = mapCarrierName(rate.carrier);
        const friendlyService = mapServiceName(rate.service);
        return (
          <div className="rate-container mv-1rem jc-b ai-c" key={index}>
            <div className="shipping_rates jc-b w-100per wrap">
              <label className="service">
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
            <GLButton variant="rates" onClick={() => handleOpen(rate, index, isPreOrder)}>
              Select
            </GLButton>
          </div>
        );
      });
    } else {
      return normalizeDomesticRates(rateData)
        .filter(Boolean)
        .map((rate, index) => {
          let isFreeShipping = items_price > freeShippingMinimum && serviceNames[index] === "USPS: Standard";
          let displayRate = isFreeShipping ? "Free" : `$${parseFloat(rate?.list_rate || rate?.rate).toFixed(2)}`;

          return (
            <div className="rate-container mv-1rem jc-b ai-c" key={index}>
              <div className="shipping_rates jc-b w-100per wrap">
                <label className="service">{serviceNames[index] || toTitleCaseSnakeCase(rate.service)}</label>
                <div className="jc-b max-w-150px w-100per">
                  <label>{determine_service(rate)}</label>
                  <label>{displayRate}</label>
                </div>
              </div>
              <GLButton variant="rates" onClick={() => handleOpen(rate, index, isPreOrder)}>
                Select
              </GLButton>
            </div>
          );
        });
    }
  };

  return (
    <div className="w-100per">
      {(splitOrder ? preOrderRates || nonPreOrderRates : shipping_rates) && (
        <div className="w-100per">
          {splitOrder ? (
            <>
              {!nonPreOrderShippingRate?.rate && (
                <>
                  <h3>In-stock Items Shipping</h3>
                  {renderShippingRates(nonPreOrderRates.shipment, false)}
                  {nonPreOrderShippingRate && (
                    <div>
                      Selected: {nonPreOrderShippingRate.service} - ${nonPreOrderShippingRate.rate}
                    </div>
                  )}
                </>
              )}
              {!preOrderShippingRate?.rate && (
                <>
                  <h3>Pre-order Items Shipping</h3>
                  {renderShippingRates(preOrderRates.shipment, true)}
                  {preOrderShippingRate && (
                    <div>
                      Selected: {preOrderShippingRate.service} - ${preOrderShippingRate.rate}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            hide_pay_button && renderShippingRates(shipping_rates, false)
          )}
        </div>
      )}
      {splitOrder ? (
        <>
          {nonPreOrderShippingRate?.rate && (
            <div>
              <h3>In-stock Items Shipping</h3>
              Selected: {nonPreOrderShippingRate.service} - ${nonPreOrderShippingRate.rate}
              <div className="mv-1rem jc-b ai-c w-100per">
                <div className="shipping_rates jc-b w-100per ">
                  <div className="jc-b w-100per">
                    <div>
                      {getShippingInfo(
                        shipping,
                        nonPreOrderShippingRate,
                        shipping_rates,
                        serviceNames,
                        mapCarrierName,
                        mapServiceName,
                        normalizeDomesticRates
                      )}
                    </div>
                    <div className="jc-b max-w-150px w-100per">
                      <div>{determine_service(nonPreOrderShippingRate)}</div>
                      <div>{displayRate({ current_shipping_speed, shipping })}</div>
                    </div>
                  </div>
                </div>
                <GLButton
                  className="rates w-10rem"
                  onClick={() => dispatch(re_choose_shipping_rate({ splitOrder: true, isPreOrder: false }))}
                >
                  Change
                </GLButton>
              </div>
            </div>
          )}
          {preOrderShippingRate?.rate && (
            <div>
              <h3>Pre-order Items Shipping</h3>
              Selected: {preOrderShippingRate.service} - ${preOrderShippingRate.rate}
              <div className="mv-1rem jc-b ai-c w-100per">
                <div className="shipping_rates jc-b w-100per ">
                  <div className="jc-b w-100per">
                    <div>
                      {getShippingInfo(
                        shipping,
                        preOrderShippingRate,
                        shipping_rates,
                        serviceNames,
                        mapCarrierName,
                        mapServiceName,
                        normalizeDomesticRates
                      )}
                    </div>
                    <div className="jc-b max-w-150px w-100per">
                      <div>{determine_service(preOrderShippingRate)}</div>
                      <div>{displayRate({ current_shipping_speed, shipping })}</div>
                    </div>
                  </div>
                </div>
                <GLButton
                  className="rates w-10rem"
                  onClick={() => dispatch(re_choose_shipping_rate({ splitOrder: true, isPreOrder: true }))}
                >
                  Change
                </GLButton>
              </div>
            </div>
          )}
        </>
      ) : (
        !hide_pay_button &&
        current_shipping_speed && (
          <div className="mv-1rem jc-b ai-c w-100per">
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
            <GLButton
              className="rates w-10rem"
              onClick={() => dispatch(re_choose_shipping_rate({ splitOrder: false }))}
            >
              Change
            </GLButton>
          </div>
        )
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
