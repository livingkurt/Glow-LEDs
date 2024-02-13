import React from "react";
import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import * as API from "../../../api";

const CurrentStock = () => {
  const dispatch = useDispatch();
  const currentStock = API.useGetCurrentStockQuery();
  return (
    <div>
      <Typography variant="h4" align="center">
        {"Current Stock"}
      </Typography>
      <GLDisplayTable
        title={"Current Gloves Stock"}
        loading={currentStock.isLoading && currentStock.data}
        defaultSorting={[0, "desc"]}
        onEdit={async value => {
          dispatch(API.saveProduct(value));
          currentStock.refetch();
        }}
        rows={
          !currentStock.isLoading &&
          currentStock.data?.filter(row => row.subcategory === "gloves" || row.category === "gloves")
        }
        defaultSortColumn={"Name"}
        defaultSort={"desc"}
        columnDefs={[
          { title: "Name", display: "name", sortable: true },
          {
            title: "Count in Stock",
            display: row => row?.count_in_stock,
            attribute: "count_in_stock",
            sortable: true,
          },
        ]}
      />

      <GLDisplayTable
        title={"Current Battery Stock"}
        loading={currentStock.isLoading && currentStock.data}
        rows={!currentStock.isLoading && currentStock?.data?.filter(row => row.category === "batteries")}
        defaultSorting={[0, "desc"]}
        onEdit={async value => {
          dispatch(API.saveProduct(value));
          if (value.option_products.length > 0) {
            // Fetch option products first
            const optionProductsActions = await Promise.all(
              value.option_products.map(id => dispatch(API.detailsProduct(id)))
            );

            // Extract payload from each action
            const optionProducts = optionProductsActions.map(action => action.payload);

            const updatedProducts = optionProducts.map(product => {
              const batchStock = Number(value.count_in_stock) / Number(product.size);
              return { ...product, count_in_stock: Math.floor(batchStock) };
            });

            await Promise.all(updatedProducts.map(product => dispatch(API.saveProduct(product))));
          }

          currentStock.refetch();
        }}
        defaultSortColumn={"Name"}
        defaultSort={"desc"}
        columnDefs={[
          { title: "Name", display: "name", sortable: true },
          { title: "Count in Stock", display: row => row?.count_in_stock, attribute: "count_in_stock", sortable: true },
        ]}
      />
    </div>
  );
};

export default CurrentStock;
