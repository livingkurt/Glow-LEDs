import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_product_modal, open_edit_product_modal } from "./productsPageSlice";
import { EditProductModal } from "./components";
import * as API from "../../api";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { determineColor, productColors } from "./productsPageHelpers";

const ProductsPage = () => {
  const productsPage = useSelector(state => state.products.productsPage);
  const { message, loading, remoteVersionRequirement, product } = productsPage;

  const productTable = useSelector(state => state.products.productTable);
  const { selectedRows } = productTable;

  const dispatch = useDispatch();

  useEffect(() => {
    if (product.name) {
      dispatch(open_edit_product_modal(product));
    }
  }, [dispatch, product]);

  const column_defs = useMemo(
    () => [
      { title: "Product Name", display: "name" },
      {
        title: "Hidden",
        display: product => (
          <GLButton
            variant="icon"
            onClick={() => {
              dispatch(
                API.saveProduct({
                  ...product,
                  hidden: product.active ? false : true,
                })
              );
            }}
            aria-label={product.active ? "deactivate" : "activate"}
          >
            {product.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
          </GLButton>
        ),
      },
      { title: "Category", display: "category" },
      { title: "Order", display: "order" },
      { title: "Price", display: row => `$${row.price}` },
      { title: "Count In Stock", display: "count_in_stock" },
      {
        title: "Actions",
        display: row => (
          <div className="jc-b">
            <GLButton
              variant="icon"
              aria-label="Edit"
              onClick={() => {
                dispatch(API.detailsProduct(row._id));
              }}
            >
              <i className="fas fa-edit" />
            </GLButton>
            <Link to={`/collections/all/products/${row.pathname}`}>
              <GLButton variant="icon" aria-label="Use as Template">
                <i className="fas fa-mountain" />
              </GLButton>
            </Link>
            <GLButton
              variant="icon"
              aria-label="Use as Template"
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
              <i className="fas fa-clone" />
            </GLButton>
            <GLButton variant="icon" onClick={() => dispatch(API.deleteProduct(row.pathname))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
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
        columnDefs={column_defs}
        enableDropdownRow
        rowName={"name"}
        dropdownColumnDefs={column_defs}
        dropdownRows={row =>
          [row.color_products, row.secondary_color_products, row.option_products, row.secondary_products].flat()
        }
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
            <Button color="primary" variant="contained" onClick={() => dispatch(open_create_product_modal())}>
              Create Product
            </Button>
          </div>
        }
      />
      <EditProductModal />
    </div>
  );
};
export default ProductsPage;
