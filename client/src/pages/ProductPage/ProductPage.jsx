import React, { useEffect } from "react";
import { Box, Grid, Typography, Divider, Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductPageHead from "./components/ProductPageHead";
import { EditProductModal } from "../ProductsPage/components";
import { openEditProductModal } from "../ProductsPage/productsPageSlice";
import { ProductFacts } from "./components";
import CustomizationOption from "./components/CustomizationOption";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { detailsProductPage, setQuantity } from "./productPageSlice";
import ProductPageLoading from "./components/ProductPageLoading";
import { determineInStock, isOptionCountDifferent } from "./productHelpers";
import * as API from "../../api";
import GLSelect from "../../shared/GlowLEDsComponents/GLSelect/GLSelect";
import ProductImages from "./components/ProductImages";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductProtectionDetails from "./components/ProductProtectionDetails";

const ProductPage = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProductPage({ pathname: params.pathname }));
  }, [dispatch, params.pathname]);

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const productPage = useSelector(state => state.products.productPage);
  const { customizedProduct, product, productPageLoading } = productPage;

  const { name, numReviews, rating, category, subcategory, pathname, facts, price, images, currentOptions } =
    customizedProduct;

  return (
    <Box>
      <ProductPageHead />
      <Box display="flex" justifyContent={"space-between"}>
        <Box className="mb-10px">
          <Link to={location.state?.prevPath || "/collections/all/products"} className="m-auto">
            <GLButtonV2 variant="contained" color="secondary">
              Back to Products
            </GLButtonV2>
          </Link>
        </Box>
        {current_user?.isAdmin && (
          <Box className="br-10px">
            <GLButtonV2 variant="contained" color="secondary" onClick={e => dispatch(openEditProductModal(product))}>
              Edit Product
            </GLButtonV2>
          </Box>
        )}
      </Box>
      <ProductPageLoading loading={productPageLoading}>
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
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <ProductProtectionDetails />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </ProductPageLoading>

      <EditProductModal />
    </Box>
  );
};

export default ProductPage;
