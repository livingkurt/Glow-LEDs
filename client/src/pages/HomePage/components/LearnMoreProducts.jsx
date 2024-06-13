import { Box, Typography, Button, Grid } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const LearnMoreProducts = ({ learn_more_products }) => {
  const navigate = useNavigate();
  return (
    <Box my={2}>
      <Grid container spacing={2}>
        {learn_more_products?.map((product, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={index % 3 === 2 ? 12 : 6}
            md={index % 3 === 2 ? 12 : 6}
            lg={index % 3 === 2 ? 12 : 6}
            xl={index % 3 === 2 ? 12 : 6}
          >
            <Box sx={{ position: "relative" }}>
              <img
                src={product.image?.link}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  height: "auto",
                  aspectRatio: index % 3 === 2 ? "16/9" : "",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  color: "#fff",
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h3" gutterBottom>
                  {product.label}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {product.fact}
                </Typography>
                <Link to={product.link}>
                  <Button variant="contained" onClick={() => navigate(product.link)}>
                    Shop Now
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

LearnMoreProducts.propTypes = {
  learn_more_products: PropTypes.array,
};

LearnMoreProducts.defaultProps = {
  learn_more_products: [],
};

export default LearnMoreProducts;
