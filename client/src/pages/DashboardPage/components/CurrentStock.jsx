import React from "react";
import { GLDisplayTable } from "../../../shared/GlowLEDsComponents/GLDisplayTable";

import { useDispatch } from "react-redux";
import * as API from "../../../api";
import Typography from "@mui/material/Typography";

const CurrentStock = () => {
  const dispatch = useDispatch();
  const currentStock = API.useGetCurrentStockQuery();

  // Group products by category and subcategory
  const groupedProducts = React.useMemo(() => {
    if (!currentStock.data) return [];

    return Object.values(
      currentStock.data.reduce((acc, product) => {
        const category = product.category || "tickets";
        const subcategory = product.subcategory || "general";
        const key = `${category}/${subcategory}`;

        return {
          ...acc,
          [key]: {
            category,
            subcategory,
            products: [...(acc[key]?.products || []), product],
          },
        };
      }, {})
    ).sort((a, b) => {
      if (a.category === b.category) {
        return a.subcategory.localeCompare(b.subcategory);
      }
      return a.category.localeCompare(b.category);
    });
  }, [currentStock.data]);

  console.log({
    "Helios Glove Set": groupedProducts
      .find(g => g.category === "glove_sets")
      ?.products.find(p => p.name === "Helios Glove Set")?.count_in_stock,
    "Helios Microlight": groupedProducts
      .find(g => g.category === "microlight")
      ?.products.find(p => p.name === "Helios Microlight")?.count_in_stock,
    "Glow Jar": groupedProducts.find(g => g.category === "storage")?.products.find(p => p.name === "Glow Jar")
      ?.count_in_stock,
    "Bulk CR1620 Batteries": groupedProducts
      .find(g => g.category === "batteries")
      ?.products.find(p => p.name === "Bulk CR1620 Batteries")?.count_in_stock,
  });

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
                    max_display_quantity: batchStock > 30 ? 30 : batchStock,
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
      // Handle error appropriately
      dispatch({ type: "SET_ERROR", payload: "Error updating stock" });
    }
  };

  const columnDefs = [
    { title: "Name", display: "name", sortable: true, editable: false },
    {
      title: "Count in Stock",
      display: row => row?.count_in_stock,
      attribute: "count_in_stock",
      sortable: true,
      editable: true,
    },
  ];

  const formatTitle = (category, subcategory) => {
    const formatWord = word =>
      word
        .split("_")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    return subcategory === "general" ? formatWord(category) : `${formatWord(category)} - ${formatWord(subcategory)}`;
  };

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        {"Current Stock"}
      </Typography>

      {groupedProducts.map((group, index) => (
        <GLDisplayTable
          key={`${group.category}/${group.subcategory}`}
          title={`${formatTitle(group.category, group.subcategory)} Stock`}
          loading={currentStock.isLoading}
          defaultSorting={[0, "desc"]}
          onEdit={handleEdit}
          rows={group.products}
          defaultSortColumn="Name"
          defaultSort="desc"
          columnDefs={columnDefs}
        />
      ))}
    </div>
  );
};

export default CurrentStock;
