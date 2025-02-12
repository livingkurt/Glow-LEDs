import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

const LoadingShipment = ({ children }) => {
  const placeOrder = useSelector(state => state.placeOrder);
  const { loadingShipping } = placeOrder;

  const loading_message = () => {
    setTimeout(() => {
      return <h3 style={{ textAlign: "center" }}>{"If page doesn't show in 5 seconds, refresh the page."}</h3>;
    }, 3000);
  };

  return (
    <div>
      {loadingShipping ? (
        <div className="jc-c column">
          <img src="/loading.gif" className="loading_gif" alt="Loading Circle" title="Loading Circle" />
          <img src="/loading_overlay.png" className="loading_png" alt="Loading Overlay" title="Loading Overlay" />
          <div className="payment_message">
            <Typography variant="h3" className="ta-c mv-10px">
              {"Calculating Shipping Speeds"}
            </Typography>
            <p className="ta-c">{"Please do not refresh page"}</p>
          </div>
          {loading_message()}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadingShipment;
