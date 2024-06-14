import React from "react";
import { Box, Grid, Typography, Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import CustomizationOption from "../components/CustomizationOption";
import GLButtonV2 from "../../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { setQuantity } from "../productPageSlice";
import { determineInStock, isOptionCountDifferent } from "../productHelpers";
import * as API from "../../../api";
import ProductImages from "../components/ProductImages";
import GLSelect from "../../../shared/GlowLEDsComponents/GLSelect/GLSelect";

const ProductDetails = ({
  images,
  name,
  numReviews,
  rating,
  category,
  subcategory,
  pathname,
  facts,
  currentOptions,
  price,
  customizedProduct,
  product,
  my_cart,
}) => {
  const dispatch = useDispatch();
  return (
    <Box maxWidth={"1500px"} margin="0 auto" px={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ProductImages images={images} />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ typography: { sm: "h4", xs: "h5" } }}>
              {name}
            </Typography>

            {/* Rating and Reviews */}
            {numReviews > 0 && (
              <Box display="flex" alignItems="center" mb={2}>
                <Rating value={rating} precision={0.5} readOnly />
                <Typography variant="body2" ml={1}>
                  ({numReviews} reviews)
                </Typography>
              </Box>
            )}
            {/* <ProductFacts
                category={category}
                subcategory={subcategory}
                pathname={pathname}
                name={name}
                facts={facts}
              /> */}
            <Typography variant="subtitle1" gutterBottom mt={2} mb={2}>
              Single Fact
            </Typography>
            <Typography variant="h6" gutterBottom mt={2} mb={2} sx={{ typography: { sm: "h5", xs: "h6" } }}>
              Price: ${price}
            </Typography>

            {currentOptions?.map((option, index) => (
              <CustomizationOption
                key={index}
                index={index}
                option={option}
                selectedOption={customizedProduct?.selectedOptions[index]}
              />
            ))}

            <GLSelect
              label="Quantity"
              value={customizedProduct?.quantity}
              onChange={e => dispatch(setQuantity(e.target.value))}
              placeholder="Select Quantity"
              size="small"
              options={[...Array(customizedProduct.max_quantity).keys()].map(value => ({ name: value + 1 }))}
              getOptionLabel={option => option.name}
              valueKey="name"
              fullWidth
            />
            <Box mt={2}>
              <GLButtonV2
                variant="contained"
                color="primary"
                fullWidth
                className="bob"
                sx={{
                  fontSize: "1.6rem",
                  padding: 2,
                }}
                size="large"
                onClick={() => {
                  dispatch(API.addToCart({ cart: my_cart, cartItem: customizedProduct, type: "add_to_cart" }));
                }}
                tooltip={
                  isOptionCountDifferent(product, customizedProduct) && "You must select all options to Add To Cart"
                }
                disabled={isOptionCountDifferent(product, customizedProduct)}
              >
                {determineInStock(customizedProduct)}
              </GLButtonV2>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
