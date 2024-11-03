import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Typography } from "@mui/material";
import BundleItemCard from "./BundleItemCard";

const BundleItems = ({ items }) => {
  if (!items?.length) return null;

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {"Bundle Items"}
      </Typography>
      <Container maxWidth="lg">
        {items.map((item, idx) => (
          <BundleItemCard key={item._id || idx} item={item} />
        ))}
      </Container>
    </Box>
  );
};

BundleItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export default BundleItems;
