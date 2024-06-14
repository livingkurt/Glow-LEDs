import React from "react";
import { Box, Typography, Breadcrumbs } from "@mui/material";
import MUILink from "@mui/material/Link";
import { openEditProductModal } from "../../ProductsPage/productsPageSlice";
import { NavigateNext } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import GLButtonV2 from "../../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { Link } from "react-router-dom";

const ProductNavigation = ({ name, category, subcategory, product_collection, product }) => {
  const dispatch = useDispatch();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  return (
    <Box display="flex" justifyContent={"space-between"} p={2}>
      <Breadcrumbs separator={<NavigateNext color="white" fontSize="small" />} aria-label="breadcrumb">
        <Link to="/collections/all/products">
          <MUILink underline="hover" key="1" color="white">
            ALL PRODUCTS
          </MUILink>
        </Link>
        {category && (
          <Link to={`/collections/all/products/category/${category}`}>
            <MUILink underline="hover" key="2" color="white">
              {category.toUpperCase()}
            </MUILink>
          </Link>
        )}
        {subcategory && (
          <Link to={`/collections/all/products/category/${category}/subcategory/${subcategory}`}>
            <MUILink underline="hover" key="2" color="white">
              {subcategory.toUpperCase()}
            </MUILink>
          </Link>
        )}
        {product_collection && (
          <Link
            to={`/collections/all/products/category/${category}/subcategory/${subcategory}/collection/${product_collection}`}
          >
            <MUILink underline="hover" key="2" color="white">
              {product_collection.toUpperCase()}
            </MUILink>
          </Link>
        )}
        <Typography key="3" color="white">
          {name.toUpperCase()}
        </Typography>
      </Breadcrumbs>
      {current_user?.isAdmin && (
        <Box className="br-10px">
          <GLButtonV2 variant="contained" color="secondary" onClick={e => dispatch(openEditProductModal(product))}>
            Edit Product
          </GLButtonV2>
        </Box>
      )}
    </Box>
  );
};

export default ProductNavigation;
