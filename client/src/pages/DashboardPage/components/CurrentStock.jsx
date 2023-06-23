import React from "react";
import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import * as API from "../../../api";

const CurrentStock = ({ currentStock }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Typography variant="h4" align="center">
        {"Current Stock"}
      </Typography>
      <GLDisplayTable
        title={"Current Supreme V2 Stock"}
        loading={currentStock.isLoading && currentStock.data}
        onEdit={async value => {
          dispatch(API.saveProduct(value));
          currentStock.refetch();
        }}
        rows={
          !currentStock.isLoading &&
          currentStock.data?.filter(row => (row.subcategory === "gloves" || row.category === "gloves") && row.name.includes("V2"))
        }
        columnDefs={[
          { title: "Name", display: "name" },
          {
            title: "Count in Stock",
            display: row => row?.count_in_stock,
            attribute: "count_in_stock"
          }
        ]}
      />
      <GLDisplayTable
        title={"Current Supreme V1 Stock"}
        loading={currentStock.isLoading && currentStock.data}
        onEdit={async value => {
          dispatch(API.saveProduct(value));
          currentStock.refetch();
        }}
        rows={
          !currentStock.isLoading &&
          currentStock.data?.filter(row => (row.subcategory === "gloves" || row.category === "gloves") && !row.name.includes("V2"))
        }
        columnDefs={[
          { title: "Name", display: "name" },
          { title: "Count in Stock", display: row => row?.count_in_stock, attribute: "count_in_stock" }
        ]}
      />

      <GLDisplayTable
        title={"Current Battery Stock"}
        loading={currentStock.isLoading && currentStock.data}
        rows={!currentStock.isLoading && currentStock?.data?.filter(row => row.category === "batteries")}
        onEdit={async value => {
          dispatch(API.saveProduct(value));
          if (value.option_products.length === 0) {
            // Fetch option products first
            const optionProductsActions = await Promise.all(value.option_products.map(id => dispatch(API.detailsProduct(id))));

            // Extract payload from each action
            const optionProducts = optionProductsActions.map(action => action.payload);
            console.log({ optionProducts });

            const updatedProducts = optionProducts.map(product => {
              const batchStock = Number(value.count_in_stock) / Number(product.size);
              console.log({ batchStock: Math.floor(batchStock) });
              return { ...product, count_in_stock: Math.floor(batchStock) };
            });
            console.log({ updatedProducts });

            await Promise.all(updatedProducts.map(product => dispatch(API.saveProduct(product))));
          }

          currentStock.refetch();
        }}
        columnDefs={[
          { title: "Name", display: "name" },
          { title: "Count in Stock", display: row => row?.count_in_stock, attribute: "count_in_stock" }
        ]}
      />
    </div>
  );
};

export default CurrentStock;
