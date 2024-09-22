import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import useTutorialsGridPage from "./useTutorialsGridPage";
import TutorialsGridPageSkeletons from "./component/TutorialsGridPageSkeletons";
import TutorialCard from "./component/TutorialsCard";
import TutorialsGridPageFilters from "./component/TutorialsGridPageFilters";
import TutorialModal from "./component/TutorialModal";

const TutorialsGridPage = () => {
  const {
    selectedCategorys,
    selectedLevel,
    sort,
    currentContent,
    tutorials,
    isLoading,
    isError,
    allCategorys,
    handleCategoryChange,
    handleLevelChange,
    handleSortChange,
    clearAllFilters,
    selectedTutorial,
    handleClose,
    isOpen,
    handleOpen,
  } = useTutorialsGridPage();

  if (isLoading) return <TutorialsGridPageSkeletons />;
  if (isError) return <Typography>Error loading tutorials</Typography>;

  return (
    <Box>
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" pt={2}>
          {currentContent?.tutorials_grid_page?.title || "Learn Gloving"}
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
          {currentContent?.tutorials_grid_page?.subtitle || "Your Journey Starts Here"}
        </Typography>

        <TutorialsGridPageFilters
          selectedLevel={selectedLevel}
          sort={sort}
          allCategorys={allCategorys}
          selectedCategorys={selectedCategorys}
          handleLevelChange={handleLevelChange}
          handleSortChange={handleSortChange}
          handleCategoryChange={handleCategoryChange}
          clearAllFilters={clearAllFilters}
        />
        <Grid container spacing={2}>
          {tutorials.length > 0 ? (
            tutorials.map(tutorial => (
              <Grid item key={tutorial._id} xs={12} sm={6} md={4} lg={3}>
                <TutorialCard tutorial={tutorial} handleOpen={handleOpen} />
              </Grid>
            ))
          ) : (
            <>
              <Typography variant="h5" textAlign="center" width="100%" mt={4} gutterBottom>
                No tutorials found for matching criteria
              </Typography>
              <Typography variant="subtitle2" textAlign="center" width="100%">
                Try removing some filters to find what you're looking for
              </Typography>
            </>
          )}
        </Grid>
        <TutorialModal selectedTutorial={selectedTutorial} handleClose={handleClose} open={isOpen} />
      </Container>
    </Box>
  );
};

export default TutorialsGridPage;
