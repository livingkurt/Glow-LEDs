import config from "../../../config";
import { useSelector } from "react-redux";

const LoadingPayment = ({ children }) => {
  const placeOrder = useSelector(state => state.placeOrder);
  const { loading_payment } = placeOrder;
  const orderPage = useSelector(state => state.orders.orderPage);
  const { error } = orderPage;

  return (
    <div>
      {loading_payment ? (
        <div className="jc-c column">
          <img
            src={config.PUBLIC_URL + "/loading.gif"}
            className="loading_gif"
            alt="Loading Circle"
            title="Loading Circle"
          />
          <img
            src={config.PUBLIC_URL + "/loading_overlay.png"}
            className="loading_png"
            alt="Loading Overlay"
            title="Loading Overlay"
          />
          <div className="payment_message">
            <h2 className="ta-c">Wait a moment while we process your Payment</h2>
            <p className="ta-c">Please do not refresh page</p>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadingPayment;
