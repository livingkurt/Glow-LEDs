import { toTitleCase } from "../../utils/helper_functions";
import useTutorialsGridPage from "./useTutorialsGridPage";
import TutorialsGridPageSkeletons from "./component/TutorialsGridPageSkeletons";
import TutorialCard from "./component/TutorialsCard";
import TutorialsGridPageFilters from "./component/TutorialsGridPageFilters";
import TutorialModal from "./component/TutorialModal";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const TutorialsGridPage = () => {
  const {
    selectedTags,
    selectedLevel,
    sort,
    tutorials,
    isLoading,
    isError,
    allTags,
    handleTagChange,
    handleLevelChange,
    handleSortChange,
    clearAllFilters,
    selectedTutorial,
    allGlovers,
    handleClose,
    isOpen,
    handleOpen,
    currentContent,
    selectedGlover,
    handleGloverChange,
  } = useTutorialsGridPage();

  if (isLoading) return <TutorialsGridPageSkeletons />;
  if (isError) return <Typography>{"Error loading tutorials"}</Typography>;

  const getPageTitle = () => {
    if (selectedLevel) {
      return `${toTitleCase(selectedLevel)} Level Tutorials`;
    } else if (selectedTags.length > 0) {
      return toTitleCase(selectedTags.join(", ")) + " Tutorials";
    } else if (selectedGlover) {
      return `${toTitleCase(selectedGlover.artist_name)} Tutorials`;
    } else {
      return currentContent?.tutorials_grid_page?.title || "Our Tutorials";
    }
  };

  return (
    <Box>
      <Container maxWidth="xl">
        <Button component={Link} to="/academy" variant="text" sx={{ mt: 2, color: "#fff" }}>
          {"Back to Academy"}
        </Button>
        <Typography variant="h4" align="center" pt={2}>
          {getPageTitle()}
        </Typography>
        {currentContent?.tutorials_grid_page?.subtitle && (
          <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
            {currentContent.tutorials_grid_page.subtitle}
          </Typography>
        )}

        <TutorialsGridPageFilters
          selectedLevel={selectedLevel}
          sort={sort}
          allTags={allTags}
          selectedTags={selectedTags}
          handleLevelChange={handleLevelChange}
          handleSortChange={handleSortChange}
          handleTagChange={handleTagChange}
          clearAllFilters={clearAllFilters}
          selectedGlover={selectedGlover}
          allGlovers={allGlovers}
          handleGloverChange={handleGloverChange}
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
                {"No tutorials found for matching criteria"}
              </Typography>
              <Typography variant="subtitle2" textAlign="center" width="100%">
                {"Try removing some filters to find what you're looking for"}
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
