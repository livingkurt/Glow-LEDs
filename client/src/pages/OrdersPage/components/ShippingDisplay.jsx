import React from "react";
import { Typography, Box, Divider } from "@mui/material";

const ShippingDisplay = ({ shipping }) => {
  return (
    <Box>
      <Typography variant="h6" mt="5px" mb="5px">
        Shipping
      </Typography>
      {/* <Divider color="white" /> */}
      <Box className="paragraph_font lh-25px">
        <Typography>
          {shipping.first_name} {shipping.last_name}
        </Typography>
        <Typography>
          {shipping.address_1} {shipping.address_2}
        </Typography>
        <Typography>
          {shipping.city}, {shipping.state} {shipping.postalCode}
        </Typography>
        <Typography>{shipping.country}</Typography>
        <Typography>{shipping.international && "International"}</Typography>
        <Typography>{shipping.email}</Typography>
      </Box>
      {shipping.shipping_rate && (
        <Box className="max-w-300px w-100per lh-25px">
          <Typography variant="h6" mt="10px" mb="5px">
            Shipping Label
          </Typography>
          <Box className="ai-c jc-b w-100per">
            <Typography component="label" className="mv-0px mr-5px">
              Carrier:{" "}
            </Typography>
            <Typography component="label" className=" mv-0px">
              {shipping.shipping_rate.carrier}{" "}
            </Typography>
          </Box>
          <Box className="ai-c jc-b w-100per">
            <Typography component="label" className="mv-0px mr-5px">
              Speed:{" "}
            </Typography>
            <Typography component="label" className=" mv-0px">
              {shipping.shipping_rate.service}{" "}
            </Typography>
          </Box>
          <Box className="ai-c jc-b w-100per">
            <Typography component="label" className="mv-0px mr-5px">
              Delivery Time:{" "}
            </Typography>
            <Typography component="label" className=" mv-0px">
              {shipping.shipping_rate.est_delivery_days} {shipping.shipping_rate.est_delivery_days === 1 ? "Day" : "Days"}{" "}
            </Typography>
          </Box>
          <Box className="ai-c jc-b w-100per">
            <Typography component="label" className="mv-0px mr-5px">
              Rate:{" "}
            </Typography>
            <Typography component="label" className=" mv-0px">
              ${shipping.shipping_rate.retail_rate}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default ShippingDisplay;
