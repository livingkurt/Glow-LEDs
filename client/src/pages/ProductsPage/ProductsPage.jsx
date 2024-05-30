import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import {
  openProductOptionsGeneratorModal,
  open_create_product_modal,
  open_edit_product_modal,
  set_loading,
} from "./productsPageSlice";
import { EditProductModal } from "./components";
import * as API from "../../api";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { determineColor, productColors } from "./productsPageHelpers";
import ProductOptionsGeneratorModal from "./components/ProductOptionsGeneratorModal";
import EditIcon from "@mui/icons-material/Edit";
import LandscapeIcon from "@mui/icons-material/Landscape";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import axios from "axios";
import ProductDropdown from "./components/ProductDropdown";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

const ProductsPage = () => {
  const productsPage = useSelector(state => state.products.productsPage);
  const { loading, remoteVersionRequirement } = productsPage;

  const productTable = useSelector(state => state.products.productTable);
  const { selectedRows } = productTable;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      { title: "Product Name", display: "name" },
      {
        title: "Hidden",
        display: product => (
          <GLIconButton
            onClick={() => {
              dispatch(
                API.saveProduct({
                  ...product,
                  hidden: product.active ? false : true,
                })
              );
            }}
            tooltip={product.active ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={product.active} />
          </GLIconButton>
        ),
      },
      { title: "Category", display: "category" },
      { title: "Order", display: "order" },
      { title: "Price", display: row => `$${row.price}` },
      { title: "Count In Stock", display: "count_in_stock" },
      {
        title: "",
        display: row => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton
              tooltip="Edit"
              onClick={() => {
                dispatch(API.detailsProduct(row._id));
                dispatch(open_edit_product_modal());
              }}
            >
              <EditIcon color="white" />
            </GLIconButton>
            <Link to={`/collections/all/products/${row.pathname}`}>
              <GLIconButton tooltip="View Product Page">
                <LandscapeIcon color="white" />
              </GLIconButton>
            </Link>
            <GLIconButton
              tooltip="Copy Product"
              onClick={() =>
                dispatch(
                  API.saveProduct({
                    ...row,
                    _id: null,
                    name: `${row.name} Copy`,
                    pathname: `${row.pathname}_copy`,
                  })
                )
              }
            >
              <FileCopyIcon color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Product Options Generator"
              onClick={() => {
                dispatch(API.detailsProduct(row._id));
                dispatch(openProductOptionsGeneratorModal());
              }}
            >
              <CreateNewFolderIcon color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteProduct(row.pathname))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getProducts(options), []);
  const remoteReorderApi = useCallback(options => API.reorderProducts(options), []);
  const remoteFiltersApi = useCallback(() => API.getProductFilters(), []);
  const defaultFilters = { hidden: [], options: [] };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Products | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteReorderApi={remoteReorderApi}
        remoteFiltersApi={remoteFiltersApi}
        defaultFilters={defaultFilters}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType={"products/setRemoteVersionRequirement"}
        tableName={"Products"}
        colors={productColors}
        determineColor={determineColor}
        namespaceScope="products"
        namespace="productTable"
        columnDefs={columnDefs}
        enableDropdownRow
        rowName={"name"}
        dropdownComponent={row => (
          <ProductDropdown row={row} determineColor={determineColor} colspan={columnDefs.length + 1} />
        )}
        // dropdownRows={row => row.options.flatMap(option => option.values)}
        loading={loading}
        enableRowSelect
        enableDragDrop
        titleActions={
          <div className="row g-10px">
            {selectedRows.length > 1 && (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  const confirm = window.confirm(`Are you sure you want to Delete ${selectedRows.length} Products?`);
                  if (confirm) {
                    dispatch(API.deleteMultipleProducts(selectedRows));
                  }
                }}
              >
                Delete Products
              </Button>
            )}

            <Button
              color="primary"
              variant="contained"
              onClick={async () => {
                const confirm = window.confirm("Are you sure you want to generate the product catelog?");
                if (confirm) {
                  dispatch(set_loading(true));
                  await axios.get(`/api/products/facebook_catelog`);
                  // google_catalog_upload();
                  dispatch(set_loading(false));
                }
              }}
            >
              Generate Product Catelog CSV
            </Button>
            <Button color="primary" variant="contained" onClick={() => dispatch(open_create_product_modal())}>
              Create Product
            </Button>
          </div>
        }
      />
      <EditProductModal />
      <ProductOptionsGeneratorModal />
    </div>
  );
};
export default ProductsPage;
