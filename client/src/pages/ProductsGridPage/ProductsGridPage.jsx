

import { toTitleCase } from "../../utils/helper_functions";
import ProductsGridPageFilters from "./components/ProductsGridPageFilters";
import ProductCard from "./components/ProductCard";
import { useProductsGridPage } from "./useProductsGridPage";
import { sortOptions } from "./productGridPageHelpers";
import ProductsGridPageSkeletons from "./components/ProductsGridPageSkeletons";
import CategoryBanner from "./components/CategoryBanner";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const ProductGridPage = () => {
  const {
    selectedTags,
    selectedMicrolight,
    category,
    sort,
    currentContent,
    microlights,
    products,
    isLoading,
    isError,
    allTags,
    handleTagChange,
    handleMicrolightChange,
    handleCategoryChange,
    handleSortChange,
    clearAllFilters,
  } = useProductsGridPage();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isLoading) return <ProductsGridPageSkeletons />;
  if (isError) return <Typography>{"Error loading products"}</Typography>;

  const categoryBanner = currentContent?.products_grid_page?.category_banners?.find(banner =>
    selectedTags.some(tag => tag.toLowerCase() === banner?.tag?.pathname?.toLowerCase())
  );

  const getPageTitle = () => {
    if (categoryBanner) {
      return isMobile ? categoryBanner.title : null;
    } else if (category) {
      return toTitleCase(category);
    } else if (selectedTags.length > 0) {
      return toTitleCase(selectedTags.join(", "));
    } else {
      return currentContent?.products_grid_page?.title;
    }
  };

  return (
    <Box>
      {!isMobile && <CategoryBanner banner={categoryBanner} />}
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" pt={2}>
          {getPageTitle()}
        </Typography>
        {!categoryBanner && currentContent?.products_grid_page?.subtitle && (
          <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
            {currentContent.products_grid_page.subtitle}
          </Typography>
        )}

        <ProductsGridPageFilters
          category={category}
          microlights={microlights}
          selectedMicrolight={selectedMicrolight}
          sortOptions={sortOptions}
          sort={sort}
          allTags={allTags}
          selectedTags={selectedTags}
          handleCategoryChange={handleCategoryChange}
          handleMicrolightChange={handleMicrolightChange}
          handleSortChange={handleSortChange}
          handleTagChange={handleTagChange}
          clearAllFilters={clearAllFilters}
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
              <Typography variant="h5" textAlign="center" width="100%" mt={4} gutterBottom>
                {"No products found for matching criteria"}
              </Typography>
              <Typography variant="subtitle2" textAlign="center" width="100%">
                {"Try removing some filters to find what you're looking for"}
              </Typography>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductGridPage;
