import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { sendEmail } from "../ordersPageHelpers";
import { determine_service, toTitleCaseSnakeCase } from "../../PlaceOrderPage/placeOrderHelpers";

const ShippingDisplay = ({ shipping }) => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" mt="5px" mb="5px">
            Shipping
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {shipping.first_name} {shipping.last_name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {shipping.address_1} {shipping.address_2}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {shipping.city}, {shipping.state} {shipping.postalCode}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{shipping.country}</Typography>
        </Grid>
        {shipping.international && (
          <Grid item xs={12}>
            <Typography>{"International"}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography>{shipping.email}</Typography>
        </Grid>
        {console.log({ shipping_rate: shipping })}
        {shipping.shipping_rate && (
          <>
            <Grid item container xs={12} alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Shipping Label</Typography>
            </Grid>
            <Grid item container xs={12} alignItems="center" justifyContent="space-between">
              <Typography component="label" className="mv-0px mr-5px">
                Purchased:
              </Typography>
              <Typography component="label" className=" mv-0px">
                {shipping.shipping_label ? "True" : "False"}
              </Typography>
            </Grid>
            <Grid item container xs={12} alignItems="center" justifyContent="space-between">
              <Typography component="label" className="mv-0px mr-5px">
                Carrier:
              </Typography>
              <Typography component="label" className=" mv-0px">
                {shipping.shipping_rate.carrier}
              </Typography>
            </Grid>
            <Grid item container xs={12} alignItems="center" justifyContent="space-between">
              <Typography component="label" className="mv-0px mr-5px">
                Speed:
              </Typography>
              <Typography component="label" className=" mv-0px">
                {toTitleCaseSnakeCase(shipping.shipping_rate.service)}
              </Typography>
            </Grid>
            <Grid item container xs={12} alignItems="center" justifyContent="space-between">
              <Typography component="label" className="mv-0px mr-5px">
                Delivery Time:
              </Typography>
              <Typography component="label" className=" mv-0px">
                {determine_service(shipping.shipping_rate)}
              </Typography>
            </Grid>
            <Grid item container xs={12} alignItems="center" justifyContent="space-between">
              <Typography component="label" className="mv-0px mr-5px">
                Rate:
              </Typography>
              <Typography component="label" className=" mv-0px">
                $
                {shipping.international
                  ? shipping.shipping_rate.rate
                  : shipping.shipping_rate.list_rate || shipping.shipping_rate.rate}
              </Typography>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" fullWidth onClick={() => sendEmail(shipping)}>
            Send User a Message
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ShippingDisplay;
