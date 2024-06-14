import React, { useEffect } from "react";
import { Box, Grid, Typography, Divider, Rating, Breadcrumbs } from "@mui/material";
import MUILink from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import ProductPageHead from "./components/ProductPageHead";
import { EditProductModal } from "../ProductsPage/components";
import { openEditProductModal } from "../ProductsPage/productsPageSlice";
import { ProductFacts } from "./components";
import CustomizationOption from "./components/CustomizationOption";
import YouTube from "react-youtube";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { detailsProductPage, setQuantity } from "./productPageSlice";
import ProductPageLoading from "./components/ProductPageLoading";
import { determineInStock, isOptionCountDifferent } from "./productHelpers";
import * as API from "../../api";
import GLSelect from "../../shared/GlowLEDsComponents/GLSelect/GLSelect";
import ProductImages from "./components/ProductImages";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import ProductDetails from "./components/ProductDetails";
import HeroVideo from "../HomePage/components/HeroVideo";
import { toCapitalize } from "../../utils/helper_functions";
import { NavigateNext } from "@mui/icons-material";
import ProductNavigation from "./components/ProductNavigation";
import SupportBanner from "../../shared/SupportBanner/SupportBanner";

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

  const {
    name,
    numReviews,
    rating,
    category,
    subcategory,
    pathname,
    product_collection,
    facts,
    price,
    images,
    currentOptions,
  } = customizedProduct;

  const breadCrumbInfo = [
    { name: "All Products", to: "/collections/all/products" },
    { name: category, to: `/collections/all/products/category/${category}` },
    {
      name: subcategory,
      to: `/collections/all/products/category/${category}/subcategory/${subcategory}`,
    },
    {
      name: product_collection,
      to: `/collections/all/products/category/${category}/subcategory/${subcategory}/collection/${product_collection}`,
    },
    { name: name, to: `/collections/all/products/${pathname}` },
  ];

  return (
    <Box>
      <ProductPageHead />
      <ProductPageLoading loading={productPageLoading}>
        <ProductNavigation
          category={category}
          subcategory={subcategory}
          product_collection={product_collection}
          name={name}
          product={product}
        />
        <ProductDetails
          images={images}
          name={name}
          numReviews={numReviews}
          rating={rating}
          category={category}
          subcategory={subcategory}
          pathname={pathname}
          facts={facts}
          currentOptions={currentOptions}
          price={price}
          customizedProduct={customizedProduct}
          product={product}
          my_cart={my_cart}
        />
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <HeroVideo video={product.video} video_hidden={!!product.video} />
            </Grid>
            <Grid item xs={12}>
              <ProductProtectionDetails />
            </Grid>
            <Grid item xs={12}>
              <SupportBanner />
            </Grid>
          </Grid>
        </Box>
      </ProductPageLoading>

      <EditProductModal />
    </Box>
  );
};

export default ProductPage;
