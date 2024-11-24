import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { openProductOptionsGeneratorModal, open_create_product_modal, openSalePriceModal } from "./productsPageSlice";
import { EditProductModal, SalePriceModal } from "./components";
import * as API from "../../api";
import { Link } from "react-router-dom";
import { Box, Button, Container } from "@mui/material";
import { determineColor, productColors } from "./productsPageHelpers";
import ProductOptionsGeneratorModal from "./components/ProductOptionsGeneratorModal";
import EditIcon from "@mui/icons-material/Edit";
import LandscapeIcon from "@mui/icons-material/Landscape";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ProductDropdown from "./components/ProductDropdown";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { showConfirm } from "../../slices/snackbarSlice";

const ProductsPage = () => {
  const productsPage = useSelector(state => state.products.productsPage);
  const { loading, remoteVersionRequirement } = productsPage;

  const productTable = useSelector(state => state.products.productTable);
  const { selectedRows, selectedRowObjects } = productTable;

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
                  hidden: product.hidden ? false : true,
                })
              );
            }}
            tooltip={product.hidden ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={product.hidden} />
          </GLIconButton>
        ),
      },
      { title: "Category", display: "category" },
      { title: "Order", display: "order" },
      { title: "Price", display: row => `$${row.price}` },
      {
        title: "Sale Price",
        display: row => (row.sale?.price ? `$${row.sale?.price}` : "-"),
      },
      { title: "Count In Stock", display: "count_in_stock" },
      {
        title: "",
        nonSelectable: true,
        display: row => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton
              tooltip="Edit"
              onClick={() => {
                dispatch(API.detailsProduct({ pathname: row._id, openEditModal: true }));
              }}
            >
              <EditIcon color="white" />
            </GLIconButton>
            <Link to={`/products/${row.pathname}`}>
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
              tooltip="Option Products Generator"
              onClick={() => {
                dispatch(openProductOptionsGeneratorModal({ selectedProducts: [row], useTemplate: false }));
              }}
            >
              <AssignmentTurnedInIcon color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Complete Options Generator"
              onClick={() => {
                dispatch(openProductOptionsGeneratorModal({ selectedProducts: [row], useTemplate: true }));
              }}
            >
              <CreateNewFolderIcon color="white" />
            </GLIconButton>

            <GLIconButton onClick={() => dispatch(API.deleteProduct(row._id))} tooltip="Delete">
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
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Products | Glow LEDs"}</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteReorderApi={remoteReorderApi}
        remoteFiltersApi={remoteFiltersApi}
        defaultFilters={defaultFilters}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType="products/setRemoteVersionRequirement"
        tableName="Products"
        colors={productColors}
        determineColor={determineColor}
        namespaceScope="products"
        namespace="productTable"
        columnDefs={columnDefs}
        enableDropdownRow
        rowName="name"
        dropdownComponent={row => (
          <ProductDropdown row={row} determineColor={determineColor} colspan={columnDefs.length + 1} />
        )}
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
                  dispatch(
                    showConfirm({
                      title: "Confirm Delete",
                      message: `Are you sure you want to Delete ${selectedRows.length} Products?`,
                      onConfirm: () => {
                        dispatch(API.deleteMultipleProducts(selectedRows));
                      },
                    })
                  );
                }}
              >
                {"Delete Products"}
              </Button>
            )}
            {selectedRows.length > 0 && (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    dispatch(
                      openProductOptionsGeneratorModal({ selectedProducts: selectedRowObjects, useTemplate: false })
                    );
                  }}
                >
                  {"Replicate Product Options"}
                </Button>
              </>
            )}
            <Button
              color="primary"
              variant="contained"
              startIcon={<LocalOfferIcon />}
              onClick={() => dispatch(openSalePriceModal())}
            >
              {"Apply Product Discount"}
            </Button>
            <Button color="primary" variant="contained" onClick={() => dispatch(open_create_product_modal())}>
              {"Create Product"}
            </Button>
          </div>
        }
      />
      <EditProductModal />
      <ProductOptionsGeneratorModal />
      <SalePriceModal />
    </Container>
  );
};

export default ProductsPage;
