import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_product_modal, open_edit_product_modal } from "../../slices/productSlice";
import { EditProductModal } from "./components";
import * as API from "../../api";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { determine_color } from "./productsPageHelpers";

const ProductsPage = () => {
  const productPage = useSelector(state => state.products.productPage);
  const { message, loading, remoteVersionRequirement } = productPage;

  const dispatch = useDispatch();

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
                  hidden: product.active ? false : true
                })
              );
            }}
            aria-label={product.active ? "deactivate" : "activate"}
          >
            {product.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
          </GLButton>
        )
      },
      { title: "Category", display: "category" },
      { title: "Order", display: "order" },
      { title: "Price", display: row => `${row.price}` },
      {
        title: "Use as Template",
        display: row => (
          <Link className="w-500px" to={"/secure/glow/editproduct/" + row.pathname + "/" + true}>
            <GLButton variant="primary">Use as Template</GLButton>
          </Link>
        )
      },
      {
        title: "Actions",
        display: product => (
          <div className="jc-b">
            <GLButton
              variant="icon"
              aria-label="Edit"
              onClick={() => {
                dispatch(open_edit_product_modal(product));
              }}
            >
              <i className="fas fa-edit" />
            </GLButton>
            <GLButton variant="icon" onClick={() => dispatch(API.deleteProduct(product.pathname))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        )
      }
    ],
    [dispatch]
  );

  const remoteApi = useCallback(
    options => API.getProducts({ ...options, filters: { ...options.filers, option: false, hidden: false } }),
    []
  );
  const remoteReorderApi = useCallback(options => API.reorderProducts(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Products | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <GLTableV2
        remoteApi={remoteApi}
        remoteReorderApi={remoteReorderApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType={"products/setRemoteVersionRequirement"}
        tableName={"Products"}
        determine_color={determine_color}
        namespaceScope="products"
        namespace="productTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="primary" onClick={() => dispatch(open_create_product_modal())}>
            Create Product
          </Button>
        }
      />
      {/* <EditProductModal /> */}
    </div>
  );
};
export default ProductsPage;
