import { GLButton } from "../../../shared/GlowLEDsComponents";
import { determine_service, toTitleCaseSnakeCase } from "../placeOrderHelpers";
import { useSelector } from "react-redux";
import ProcessingConfirmModal from "./ProcessingConfirmModal";
import { setModalShown, setOpen } from "../placeOrderSlice";
import { useDispatch } from "react-redux";

const DomesticShippingSpeed = ({ choose_shipping_rate }) => {
  const dispatch = useDispatch();
  const placeOrder = useSelector(state => state.placeOrder);
  const { modalShown, open, shipping_rates } = placeOrder;
  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const { cartItems } = my_cart;

  const USPSRates = shipping_rates.rates.filter(rate => rate.carrier === "USPS");
  const UPSRates = shipping_rates.rates.filter(rate => rate.carrier === "UPSDAP");

  const sortedUSPSRates = USPSRates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
  const sortedUPSRates = UPSRates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));

  const selectedRates = [...sortedUSPSRates.slice(0, 1), sortedUPSRates[0], sortedUPSRates[2]];

  // Define custom service names for selected rates
  const serviceNames = ["USPS: Standard", "UPS: Ground", "UPS: Priority"];

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
    return (
      <div className="mv-1rem jc-b ai-c" key={index}>
        <div className="shipping_rates jc-b w-100per wrap">
          <label className="service">{serviceNames[index] || toTitleCaseSnakeCase(rate.service)}</label>
          <div className="jc-b max-w-150px w-100per">
            <label>{determine_service(rate)}</label>
            <label>${parseFloat(rate.retail_rate || rate.rate).toFixed(2)}</label>
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
