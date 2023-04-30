import React from "react";
import { determine_tracking_link } from "../ordersPageHelpers";

const MetaDataDisplay = ({ row }) => {
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
    </div>
  );
};

export default MetaDataDisplay;
