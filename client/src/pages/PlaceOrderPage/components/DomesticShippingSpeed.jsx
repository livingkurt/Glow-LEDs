import { GLButton } from "../../../shared/GlowLEDsComponents";
import { determine_service, serviceNames, toTitleCaseSnakeCase } from "../placeOrderHelpers";
import { useSelector } from "react-redux";
import ProcessingConfirmModal from "./ProcessingConfirmModal";
import {
  activatePromo,
  chooseShippingRateBasic,
  chooseShippingRateWithPromo,
  finalizeShippingRate,
  setFreeShipping,
  setModalShown,
  setOpen,
} from "../placeOrderSlice";
import { useDispatch } from "react-redux";
import { determine_total } from "../../../utils/helper_functions";

const DomesticShippingSpeed = () => {
  const dispatch = useDispatch();

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;
  const items_price = determine_total(cartItems);
  const placeOrder = useSelector(state => state.placeOrder);
  const { modalShown, shipping_rates, tax_rate, show_message, open } = placeOrder;
  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos } = promoPage;

  const USPSRates = shipping_rates.rates.filter(rate => rate.carrier === "USPS");
  const UPSRates = shipping_rates.rates.filter(rate => rate.carrier === "UPSDAP");

  const sortedUSPSRates = USPSRates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
  const sortedUPSRates = UPSRates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));

  const selectedRates = [...sortedUSPSRates.slice(0, 1), sortedUPSRates[0], sortedUPSRates[2]];

  // Define custom service names for selected rates

  const choose_shipping_rate = (rate, speed, name) => {
    const freeShipping = items_price > 50 && name === "USPS: Standard" ? true : false;

    const basicPayload = { rate, speed, name, freeShipping };
    dispatch(chooseShippingRateBasic(basicPayload));
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
      choose_shipping_rate(rate, rate.service, serviceNames[index]);
      return;
    }
    const processingTime =
      cartItems.some(item => item.processing_time) && Math.max(...cartItems.map(item => item.processing_time[1]));
    if (serviceNames[index] !== "USPS: Standard" && processingTime) {
      dispatch(setModalShown(true));
      dispatch(setOpen(true));
    } else {
      choose_shipping_rate(rate, rate.service, serviceNames[index]);
      // setHideContinue(false);
    }
  };

  return selectedRates.map((rate, index) => {
    let isFreeShipping = items_price > 50 && serviceNames[index] === "USPS: Standard";
    let displayRate = isFreeShipping ? "Free" : `$${parseFloat(rate.retail_rate || rate.rate).toFixed(2)}`;

    return (
      <div className="mv-1rem jc-b ai-c" key={index}>
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
        <ProcessingConfirmModal
          open={open}
          serviceName={serviceNames[index] || toTitleCaseSnakeCase(rate.service)}
          choose_shipping_rate={choose_shipping_rate}
          setOpen={setOpen}
          rate={rate}
        />
      </div>
    );
  });
};

export default DomesticShippingSpeed;
