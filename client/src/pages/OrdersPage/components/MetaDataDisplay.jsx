import { determine_tracking_link } from "../ordersPageHelpers";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { useDispatch } from "react-redux";
import { API_Emails } from "../../../utils";
import { toCapitalize } from "../../../utils/helper_functions";
import { set_loading_label } from "../../../slices/orderSlice";

const MetaDataDisplay = ({ row }) => {
  const dispatch = useDispatch();
  const send_order_status_email = async (status, message_to_user) => {
    await API_Emails.send_order_status_email(
      row,
      status === "manufactured" ? "Your Order has been Crafted!" : "Your Order has been " + toCapitalize(status) + "!",
      row.shipping.email,
      status,
      message_to_user
    );
    await API_Emails.send_order_status_email(
      row,
      status === "manufactured"
        ? row.shipping.first_name + "'s Order has been Crafted!"
        : row.shipping.first_name + "'s Order has been " + toCapitalize(status) + "!",
      process.env.REACT_APP_INFO_EMAIL,
      status,
      message_to_user
    );
  };

  const send_order_email = async () => {
    dispatch(set_loading_label(true));
    await API_Emails.send_order_email(row, "Thank you for your Glow LEDs Order", row.shipping.email);
    await API_Emails.send_order_email(row, "New Order Created by " + row.shipping.first_name, process.env.REACT_APP_INFO_EMAIL);

    dispatch(set_loading_label(false));
  };

  const send_refund_email = async () => {
    dispatch(set_loading_label(true));
    await API_Emails.send_refund_email(row, "Refund Successful", row.shipping.email, true);
    await API_Emails.send_refund_email(row, "New Refunded for " + row.shipping.first_name, process.env.REACT_APP_INFO_EMAIL, true);

    dispatch(set_loading_label(false));
  };
  return (
    <div>
      <h3 className="fs-20px mv-5px">Meta Data</h3>
      <div>ID #: {row._id}</div>
      <div>Payment Method: {row?.payment?.paymentMethod}</div>
      <div>Promo Code: {row.promo_code}</div>
      {row.tracking_number && (
        <div>
          <label className="phrase_font">Tracking Number: </label>

          <a
            href={determine_tracking_link(row.tracking_number)}
            target="_blank"
            rel="noopener noreferrer"
            className="mv-2rem"
            style={{
              textDecoration: "underline",
              color: "white"
            }}
          >
            {row.tracking_number}
          </a>
        </div>
      )}
      {row.return_tracking_number && (
        <div>
          <label className="phrase_font">Return Tracking Number: </label>

          <a
            href={determine_tracking_link(row.return_tracking_number)}
            target="_blank"
            rel="noopener noreferrer"
            className="mv-2rem"
            style={{
              textDecoration: "underline",
              color: "white"
            }}
          >
            {row.return_tracking_number}
          </a>
        </div>
      )}
      <GLButton variant="secondary" className="mv-5px w-100per" onClick={() => send_order_email()}>
        Send Order Email
      </GLButton>
      <GLButton variant="secondary" className="mv-5px w-100per" onClick={() => send_order_status_email("updated")}>
        Send Update Order Email
      </GLButton>
      <GLButton variant="secondary" className="mv-5px w-100per" onClick={() => send_refund_email()}>
        Send Refund Email
      </GLButton>
    </div>
  );
};

export default MetaDataDisplay;
