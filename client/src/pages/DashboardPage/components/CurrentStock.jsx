import React from "react";
import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import { Typography, AppBar, Tabs, Tab, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import * as API from "../../../api";
import GLTabPanel from "../../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";

const CurrentStock = () => {
  const dispatch = useDispatch();
  const currentStock = API.useGetCurrentStockQuery();
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleEdit = async value => {
    dispatch(API.saveProduct(value));
    currentStock.refetch();
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
          columnDefs={gloveColumnDefs}
        />
      </GLTabPanel>

      <GLTabPanel value={tabIndex} index={4}>
        <GLDisplayTable
          title="Current Battery Stock"
          loading={currentStock.isLoading && currentStock.data}
          rows={!currentStock.isLoading && currentStock?.data?.filter(row => row.category === "batteries")}
          defaultSorting={[0, "desc"]}
          onEdit={async value => {
            dispatch(API.saveProduct(value));
            if (value.option_products.length > 0) {
              const optionProductsActions = await Promise.all(
                value.option_products.map(id => dispatch(API.detailsProduct({ pathname: id })))
              );
              const optionProducts = optionProductsActions.map(action => action.payload);
              const updatedProducts = optionProducts.map(product => {
                const batchStock = Number(value.count_in_stock) / Number(product.size);
                return { ...product, count_in_stock: Math.floor(batchStock) };
              });
              await Promise.all(updatedProducts.map(product => dispatch(API.saveProduct(product))));
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
