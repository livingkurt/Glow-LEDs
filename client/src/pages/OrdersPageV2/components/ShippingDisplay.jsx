import React from "react";

const ShippingDisplay = ({ shipping }) => {
  return (
    <div>
      <h2>Shipping</h2>
      <div className="paragraph_font lh-25px">
        <div>
          {shipping.first_name} {shipping.last_name}
        </div>
        <div>
          {shipping.address_1} {shipping.address_2}
        </div>
        <div>
          {shipping.city}, {shipping.state} {shipping.postalCode}
        </div>
        <div>{shipping.country}</div>
        <div>{shipping.international && "International"}</div>
        <div>{shipping.email}</div>
      </div>
    </div>
  );
};

export default ShippingDisplay;
