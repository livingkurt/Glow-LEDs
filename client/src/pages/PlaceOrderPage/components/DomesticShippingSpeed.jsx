import { GLButton } from "../../../shared/GlowLEDsComponents";
import { determine_service, serviceNames, toTitleCaseSnakeCase } from "../placeOrderHelpers";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { determine_total } from "../../../utils/helper_functions";

const DomesticShippingSpeed = ({ handleOpen }) => {
  const dispatch = useDispatch();

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, shipping } = cartPage;
  const { cartItems } = my_cart;
  const items_price = determine_total(cartItems);
  const placeOrder = useSelector(state => state.placeOrder);
  const { modalShown, shipping_rates, tax_rate, show_message } = placeOrder;
  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos } = promoPage;

  const USPSRates = shipping_rates.rates.filter(rate => rate.carrier === "USPS");
  const UPSRates = shipping_rates.rates.filter(rate => rate.carrier === "UPSDAP");

  const sortedUSPSRates = USPSRates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
  const sortedUPSRates = UPSRates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));

  const selectedRates = [...sortedUSPSRates.slice(0, 1), sortedUPSRates[0], sortedUPSRates[2]];

  // Define custom service names for selected rates

  return selectedRates.map((rate, index) => {
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
  });
};

export default DomesticShippingSpeed;
