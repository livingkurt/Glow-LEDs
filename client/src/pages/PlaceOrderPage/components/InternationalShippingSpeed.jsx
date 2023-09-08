import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { determine_service, mapCarrierName, mapServiceName, toTitleCaseSnakeCase } from "../placeOrderHelpers";
import ProcessingConfirmModal from "./ProcessingConfirmModal";
import {
  activatePromo,
  chooseShippingRateBasic,
  chooseShippingRateWithPromo,
  finalizeShippingRate,
  setModalShown,
  setOpen,
} from "../placeOrderSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { determine_total } from "../../../utils/helper_functions";

const InternationalShippingSpeed = () => {
  const dispatch = useDispatch();
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;
  const placeOrder = useSelector(state => state.placeOrder);
  const { modalShown, shipping_rates, tax_rate, show_message } = placeOrder;
  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos } = promoPage;

  const items_price = determine_total(cartItems);

  console.log({ rates: shipping_rates.rates });

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
  // const sortedRates = [...shipping_rates.rates].sort((a, b) => {
  //   if (a.retail_rate && b.retail_rate) {
  //     return parseFloat(a.retail_rate) - parseFloat(b.retail_rate);
  //   } else if (a.retail_rate) {
  //     return -1;
  //   } else if (b.retail_rate) {
  //     return 1;
  //   } else {
  //     return parseFloat(a.rate) - parseFloat(b.rate);
  //   }
  // });
  // .filter(rate => rate.carrier === "UPSDAP");

  const choose_shipping_rate = (rate, speed, name) => {
    const basicPayload = { rate, speed, name };
    dispatch(chooseShippingRateBasic(basicPayload));

    const promo_code_storage = sessionStorage.getItem("promo_code");
    if (promo_code_storage && promo_code_storage.length > 0) {
      const promoPayload = { promo_code_storage };
      dispatch(chooseShippingRateWithPromo(promoPayload));
      dispatch(activatePromo({ items_price, tax_rate, show_message, code: promo_code_storage, promos }));
    }

    dispatch(finalizeShippingRate());
  };

  const handleOpen = rate => {
    if (modalShown) {
      choose_shipping_rate(rate, rate.service, toTitleCaseSnakeCase(rate.service));
      return;
    }
    dispatch(setOpen(true));
    dispatch(setModalShown(true));
  };

  return sortedRates.map((rate, index) => {
    const friendlyCarrier = mapCarrierName(rate.carrier);
    const friendlyService = mapServiceName(rate.service);
    return (
      <div className=" mv-1rem jc-b  ai-c" key={index}>
        <div className="shipping_rates jc-b w-100per wrap ">
          <label className="service">
            {friendlyCarrier}: {friendlyService}
          </label>
          <div className="jc-b max-w-150px w-100per">
            <label className="">{determine_service(rate)}</label>
            <label> ${parseFloat(rate.rate || rate.rate).toFixed(2)} </label>
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
