import React from "react";
import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";
import { Typography } from "@mui/material";

const CurrentStock = ({ currentStock }) => {
  return (
    <div>
      <Typography variant="h4" align="center">
        {"Current Stock"}
      </Typography>
      <GLDisplayTable
        title={"Current Supreme V2 Stock"}
        loading={currentStock.isLoading && currentStock.data}
        rows={
          !currentStock.isLoading &&
          currentStock.data?.filter(row => (row.subcategory === "gloves" || row.category === "gloves") && row.name.includes("V2"))
        }
        columnDefs={[
          { title: "Name", display: "name" },
          { title: "Count in Stock", display: row => row?.count_in_stock }
        ]}
      />
      <GLDisplayTable
        title={"Current Supreme V1 Stock"}
        loading={currentStock.isLoading && currentStock.data}
        rows={
          !currentStock.isLoading &&
          currentStock.data?.filter(row => (row.subcategory === "gloves" || row.category === "gloves") && !row.name.includes("V2"))
        }
        columnDefs={[
          { title: "Name", display: "name" },
          { title: "Count in Stock", display: row => row?.count_in_stock }
        ]}
      />

      <GLDisplayTable
        title={"Current Battery Stock"}
        loading={currentStock.isLoading && currentStock.data}
        rows={!currentStock.isLoading && currentStock?.data?.filter(row => row.category === "batteries")}
        columnDefs={[
          { title: "Name", display: "name" },
          { title: "Count in Stock", display: row => row?.count_in_stock }
        ]}
      />
    </div>
  );
};

export default CurrentStock;
