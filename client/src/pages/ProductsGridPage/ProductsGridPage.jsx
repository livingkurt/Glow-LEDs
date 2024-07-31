import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { toTitleCase } from "../../utils/helper_functions";
import ProductsGridPageFilters from "./components/ProductsGridPageFilters";
import ProductCard from "./components/ProductCard";
import { useProductsGridPage } from "./useProductsGridPage";
import { sortOptions } from "./productGridPageHelpers";
import ProductsGridPageSkeletons from "./components/ProductsGridPageSkeletons";

const ProductGridPage = () => {
  const {
    selectedTags,
    selectedChip,
    category,
    sort,
    currentContent,
    chips,
    products,
    isLoading,
    isError,
    allTags,
    handleTagChange,
    handleChipChange,
    handleCategoryChange,
    handleSortChange,
  } = useProductsGridPage();

  if (isLoading) return <ProductsGridPageSkeletons />;
  if (isError) return <Typography>Error loading products</Typography>;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" align="center" pt={2}>
        {(category && toTitleCase(category)) ||
          (selectedTags.length > 0 && toTitleCase(selectedTags[0])) ||
          currentContent?.products_grid_page?.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
        {currentContent?.products_grid_page?.subtitle}
      </Typography>

      <ProductsGridPageFilters
        category={category}
        chips={chips}
        selectedChip={selectedChip}
        sortOptions={sortOptions}
        sort={sort}
        allTags={allTags}
        selectedTags={selectedTags}
        handleCategoryChange={handleCategoryChange}
        handleChipChange={handleChipChange}
        handleSortChange={handleSortChange}
        handleTagChange={handleTagChange}
      />

      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map(product => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <>
            <Typography variant="h5" textAlign={"center"} width={"100%"} mt={4} gutterBottom>
              No products found for matching criteria
            </Typography>
            <Typography variant="subtitle2" textAlign={"center"} width={"100%"}>
              Try removing some filters to find what you're looking for
            </Typography>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ProductGridPage;
