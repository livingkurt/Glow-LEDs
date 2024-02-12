import { determine_tracking_link } from "../ordersPageHelpers";
import { useDispatch } from "react-redux";
import { API_Emails } from "../../../utils";
import { toCapitalize } from "../../../utils/helper_functions";
import { set_loading_label } from "../../../slices/orderSlice";
import config from "../../../config";
import * as API from "../../../api";
import { Button, Grid } from "@mui/material";

const MetaDataDisplay = ({ row }) => {
  const dispatch = useDispatch();
  const send_order_status_email = async (status, message_to_user) => {
    dispatch(set_loading_label(true));
    await API_Emails.send_order_status_email(
      row,
      "Your Order has been " + toCapitalize(status) + "!",
      row.shipping.email,
      status,
      message_to_user
    );
    await API_Emails.send_order_status_email(
      row,
      row.shipping.first_name + "'s Order has been " + toCapitalize(status) + "!",
      config.REACT_APP_INFO_EMAIL,
      status,
      message_to_user
    );
    dispatch(API.saveOrder({ ...row, isUpdated: false }));
    dispatch(set_loading_label(false));
  };

  const send_order_email = async () => {
    dispatch(set_loading_label(true));
    await API_Emails.send_order_email(row, "Thank you for your Glow LEDs Order", row.shipping.email);
    await API_Emails.send_order_email(
      row,
      "New Order Created by " + row.shipping.first_name,
      config.REACT_APP_INFO_EMAIL
    );

    dispatch(set_loading_label(false));
  };

  const send_refund_email = async () => {
    dispatch(set_loading_label(true));
    await API_Emails.send_refund_email(row, "Refund Successful", row.shipping.email, true);
    await API_Emails.send_refund_email(
      row,
      "New Refunded for " + row.shipping.first_name,
      config.REACT_APP_INFO_EMAIL,
      true
    );

    dispatch(set_loading_label(false));
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h3 className="fs-20px mv-5px">Meta Data</h3>
      </Grid>
      <Grid item xs={12}>
        <div>ID #: {row._id}</div>
      </Grid>
      <Grid item xs={12}>
        <div>Payment Method: {row?.payment?.paymentMethod}</div>
      </Grid>
      <Grid item xs={12}>
        <div>Promo Code: {row.promo_code}</div>
      </Grid>
      {row.tracking_number && (
        <Grid item xs={12}>
          <label className="phrase_font">Tracking Number: </label>

          <a
            href={row.tracking_url ? row.tracking_url : determine_tracking_link(row.tracking_number)}
            target="_blank"
            rel="noopener noreferrer"
            className="mv-2rem"
            style={{
              textDecoration: "underline",
              color: "white",
            }}
          >
            {row.tracking_number}
          </a>
        </Grid>
      )}
      {row.return_tracking_number && (
        <Grid item xs={12}>
          <label className="phrase_font">Return Tracking Number: </label>

          <a
            href={
              row.return_tracking_url ? row.return_tracking_url : determine_tracking_link(row.return_tracking_number)
            }
            target="_blank"
            rel="noopener noreferrer"
            className="mv-2rem"
            style={{
              textDecoration: "underline",
              color: "white",
            }}
          >
            {row.return_tracking_number}
          </a>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button color="secondary" variant="contained" fullWidth onClick={() => send_order_email()}>
          Send Order Email
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button color="secondary" variant="contained" fullWidth onClick={() => send_order_status_email("updated")}>
          Send Update Order Email
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button color="secondary" variant="contained" fullWidth onClick={() => send_refund_email()}>
          Send Refund Email
        </Button>
      </Grid>
    </Grid>
  );
};

export default MetaDataDisplay;
