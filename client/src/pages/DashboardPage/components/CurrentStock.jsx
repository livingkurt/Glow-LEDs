import React from "react";
import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";

import { useDispatch } from "react-redux";
import * as API from "../../../api";
import GLTabPanel from "../../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

const CurrentStock = () => {
  const dispatch = useDispatch();
  const currentStock = API.useGetCurrentStockQuery();
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleEdit = async value => {
    try {
      // First update the main product
      await dispatch(API.saveProduct(value));

      // Get the fresh product data after update
      const product = await dispatch(API.detailsProduct({ pathname: value._id })).unwrap();

      if (product) {
        if (product.subcategory === "sampler") {
          // For sampler packs, update each size variant
          const sizeOption = product.options.find(
            option => option.name.toLowerCase().includes("size") || option.name.toLowerCase().includes("pack")
          );

          if (sizeOption) {
            await Promise.all(
              sizeOption.values.map(async value => {
                if (value.product) {
                  const sizeProduct = {
                    ...(await dispatch(API.detailsProduct({ pathname: value.product })).unwrap()),
                    count_in_stock: product.count_in_stock,
                    max_quantity: product.count_in_stock,
                  };
                  return dispatch(API.saveProduct(sizeProduct));
                }
              })
            );
          }
        } else if (product.category === "batteries") {
          // For batteries, update all related option products
          const optionProducts = product.options.flatMap(option => option.values).filter(value => value.product);

          if (optionProducts.length > 0) {
            await Promise.all(
              optionProducts.map(async value => {
                const optionProduct = await dispatch(API.detailsProduct({ pathname: value.product })).unwrap();
                const batchStock = Math.floor(product.count_in_stock / Number(optionProduct.size));
                return dispatch(
                  API.saveProduct({
                    ...optionProduct,
                    count_in_stock: batchStock,
                    max_quantity: batchStock,
                  })
                );
              })
            );
          }
        }
      }

      // Refresh the data
      currentStock.refetch();
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const gloveColumnDefs = [
    { title: "Name", display: "name", sortable: true, editable: false },
    {
      title: "Count in Stock",
      display: row => row?.count_in_stock,
      attribute: "count_in_stock",
      sortable: true,
      editable: true,
    },
  ];

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        {"Current Stock"}
      </Typography>

      <Paper>
        <AppBar position="sticky" color="transparent">
          <Tabs
            value={tabIndex}
            className="jc-b"
            onChange={(e, newValue) => setTabIndex(newValue)}
            variant="scrollable"
            scrollButtons="false"
          >
            <Tab label="Ultra Gloves" value={0} />
            <Tab label="Supreme V2" value={1} />
            <Tab label="Supreme V1" value={2} />
            <Tab label="Refresh Packs" value={3} />
            <Tab label="Batteries" value={4} />
          </Tabs>
        </AppBar>
      </Paper>

      <GLTabPanel value={tabIndex} index={0}>
        <GLDisplayTable
          title="Ultra Gloves Stock"
          loading={currentStock.isLoading && currentStock.data}
          defaultSorting={[0, "desc"]}
          onEdit={handleEdit}
          rows={
            !currentStock.isLoading &&
            currentStock.data?.filter(
              row => row.name.toLowerCase().includes("ultra") && !row.name.toLowerCase().includes("refresh")
            )
          }
          defaultSortColumn="Name"
          defaultSort="desc"
          columnDefs={gloveColumnDefs}
        />
      </GLTabPanel>

      <GLTabPanel value={tabIndex} index={1}>
        <GLDisplayTable
          title="Supreme V2 Gloves Stock"
          loading={currentStock.isLoading && currentStock.data}
          defaultSorting={[0, "desc"]}
          onEdit={handleEdit}
          rows={
            !currentStock.isLoading &&
            currentStock.data?.filter(
              row => row.name.toLowerCase().includes("v2") && !row.name.toLowerCase().includes("refresh")
            )
          }
          defaultSortColumn="Name"
          defaultSort="desc"
          columnDefs={gloveColumnDefs}
        />
      </GLTabPanel>

      <GLTabPanel value={tabIndex} index={2}>
        <GLDisplayTable
          title="Supreme V1 Gloves Stock"
          loading={currentStock.isLoading && currentStock.data}
          defaultSorting={[0, "desc"]}
          onEdit={handleEdit}
          rows={
            !currentStock.isLoading &&
            currentStock.data?.filter(
              row =>
                (row.name.toLowerCase().includes("v1") || row.name.toLowerCase().includes("supreme")) &&
                !row.name.toLowerCase().includes("v2") &&
                !row.name.toLowerCase().includes("refresh")
            )
          }
          defaultSortColumn="Name"
          defaultSort="desc"
          columnDefs={gloveColumnDefs}
        />
      </GLTabPanel>

      <GLTabPanel value={tabIndex} index={3}>
        <GLDisplayTable
          title="Refresh Packs Stock"
          loading={currentStock.isLoading && currentStock.data}
          defaultSorting={[0, "desc"]}
          onEdit={handleEdit}
          rows={!currentStock.isLoading && currentStock.data?.filter(row => row.name.toLowerCase().includes("refresh"))}
          defaultSortColumn="Name"
          defaultSort="desc"
          columnDefs={[
            { title: "Name", display: "name", sortable: true, editable: false },
            {
              title: "Count in Stock",
              display: row => row?.count_in_stock,
              attribute: "count_in_stock",
              sortable: true,
              editable: false,
            },
          ]}
        />
      </GLTabPanel>

      <GLTabPanel value={tabIndex} index={4}>
        <GLDisplayTable
          title="Current Battery Stock"
          loading={currentStock.isLoading && currentStock.data}
          rows={!currentStock.isLoading && currentStock?.data?.filter(row => row.category === "batteries")}
          defaultSorting={[0, "desc"]}
          onEdit={async updatedProduct => {
            // First update the main product
            await dispatch(
              API.saveProduct({
                ...updatedProduct,
                max_quantity: updatedProduct.count_in_stock,
                max_display_quantity: updatedProduct.count_in_stock > 30 ? 30 : updatedProduct.count_in_stock,
              })
            );

            // Get option products from the optionProducts array
            if (updatedProduct.options && updatedProduct.options.length > 0) {
              await Promise.all(
                updatedProduct.options.map(async option => {
                  await Promise.all(
                    option.values.map(async value => {
                      const { data: valueProduct } = await dispatch(
                        API.detailsProduct({ pathname: value.product })
                      ).unwrap();
                      // Use the name field as the size
                      const setSize = Number(value.name);
                      const batchStock = Math.floor(updatedProduct.count_in_stock / setSize);
                      return dispatch(
                        API.saveProduct({
                          _id: valueProduct._id,
                          name: valueProduct.name,
                          count_in_stock: batchStock,
                          max_quantity: batchStock,
                          max_display_quantity: batchStock > 30 ? 30 : batchStock,
                        })
                      );
                    })
                  );
                })
              );
            }

            currentStock.refetch();
          }}
          defaultSortColumn="Name"
          defaultSort="desc"
          columnDefs={gloveColumnDefs}
        />
      </GLTabPanel>
    </div>
  );
};

export default CurrentStock;
