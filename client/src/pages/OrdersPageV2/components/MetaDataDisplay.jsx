import React from "react";
import { determine_tracking_link } from "../ordersPageHelpers";

const MetaDataDisplay = ({ row }) => {
  return (
    <div>
      <h2>Meta Data</h2>
      <div>Payment Method: {row.payment.paymentMethod}</div>
      <div>Promo Code: {row.promo_code}</div>
      {row.return_tracking_number && (
        <div>
          <label className="phrase_font">Return Tracking Number: </label>

          <a
            href={determine_tracking_link(row.return_tracking_number)}
            target="_blank"
            rel="noopener noreferrer"
            className="mv-2rem ml-1rem"
            style={{
              textDecoration: "underline",
              color: "white"
            }}
          >
            {row.return_tracking_number}
          </a>
        </div>
      )}
    </div>
  );
};

export default MetaDataDisplay;
