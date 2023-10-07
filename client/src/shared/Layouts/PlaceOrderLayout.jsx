import { Box, Grid } from "@mui/material";
import Content from "../../layouts/Content";
import React from "react";
import { Link } from "react-router-dom";

const PlaceOrderLayout = ({ children }) => {
  return (
    <div className="place-order-content">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display={"flex"} justifyContent={"center"}>
            <Link to="/pages/menu/gloving" aria-label="Gloving">
              <div className="row pos-rel">
                <label className="glow_leds_text" data-testid="glow_leds_title">
                  Glow LEDs
                </label>

                <label className="tm" style={{ color: "#9a9898" }}>
                  ™
                </label>
                <label className="make_it_glow_text fs-18px mt-10px ta-r jc-fe pos-abs right-n10px bottom-n11px">
                  Make it Glow
                </label>
              </div>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default PlaceOrderLayout;
