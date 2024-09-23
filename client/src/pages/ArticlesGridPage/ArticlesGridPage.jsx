import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { toTitleCase } from "../../utils/helper_functions";
import useArticlesGridPage from "./useArticlesGridPage";
import ArticlesGridPageSkeletons from "./component/ArticlesGridPageSkeletons";
import ArticleCard from "./component/ArticlesCard";
import ArticlesGridPageFilters from "./component/ArticlesGridPageFilters";

const ArticlesGridPage = () => {
  const {
    selectedTags,
    selectedLevel,
    sort,
    articles,
    isLoading,
    isError,
    allTags,
    handleTagChange,
    handleLevelChange,
    handleSortChange,
    clearAllFilters,
    currentContent,
    selectedGlover,
    handleGloverChange,
  } = useArticlesGridPage();

  if (isLoading) return <ArticlesGridPageSkeletons />;
  if (isError) return <Typography>Error loading articles</Typography>;

  const getPageTitle = () => {
    if (selectedLevel) {
      return `${toTitleCase(selectedLevel)} Level Articles`;
    } else if (selectedTags.length > 0) {
      return toTitleCase(selectedTags.join(", ")) + " Articles";
    } else if (selectedGlover) {
      return `${toTitleCase(selectedGlover.artist_name)} Articles`;
    } else {
      return currentContent?.articles_grid_page?.title || "Our Articles";
    }
  };

  return (
    <Box>
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" pt={2}>
          {getPageTitle()}
        </Typography>
        {currentContent?.articles_grid_page?.subtitle && (
          <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
            {currentContent.articles_grid_page.subtitle}
          </Typography>
        )}

        <ArticlesGridPageFilters
          selectedLevel={selectedLevel}
          sort={sort}
          allTags={allTags}
          selectedTags={selectedTags}
          handleLevelChange={handleLevelChange}
          handleSortChange={handleSortChange}
          handleTagChange={handleTagChange}
          clearAllFilters={clearAllFilters}
          selectedGlover={selectedGlover}
          handleGloverChange={handleGloverChange}
        />
        <Grid container spacing={2}>
          {articles.length > 0 ? (
            articles.map(article => (
              <Grid item key={article._id} xs={12} sm={6} md={4} lg={3}>
                <ArticleCard article={article} />
              </Grid>
            ))
          ) : (
            <>
              <Typography variant="h5" textAlign="center" width="100%" mt={4} gutterBottom>
                No articles found for matching criteria
              </Typography>
              <Typography variant="subtitle2" textAlign="center" width="100%">
                Try removing some filters to find what you're looking for
              </Typography>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ArticlesGridPage;
