import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import CartItemCard from "../../SponsorPage/components/CartItemCard";

const BundleItems = ({ items }) => {
  if (!items?.length) return null;

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {"Bundle Items"}
      </Typography>
      <Grid container spacing={3}>
        {items.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={item._id || idx}>
            <CartItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

BundleItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export default BundleItems;
