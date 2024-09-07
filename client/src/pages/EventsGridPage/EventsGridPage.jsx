import React from "react";
import { Box, Container, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { toTitleCase } from "../../utils/helper_functions";
import EventsGridPageFilters from "./components/EventsGridPageFilters";
import EventCard from "./components/EventCard";
import { useEventsGridPage } from "./useEventsGridPage";
import { sortOptions } from "./eventGridPageHelpers";
import EventsGridPageSkeletons from "./components/EventsGridPageSkeletons";
import CategoryBanner from "./components/CategoryBanner";

const EventGridPage = () => {
  const {
    selectedTags,
    selectedChip,
    category,
    sort,
    currentContent,
    chips,
    events,
    isLoading,
    isError,
    allTags,
    handleTagChange,
    handleChipChange,
    handleCategoryChange,
    handleSortChange,
    clearAllFilters,
  } = useEventsGridPage();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isLoading) return <EventsGridPageSkeletons />;
  if (isError) return <Typography>Error loading events</Typography>;

  const categoryBanner = currentContent?.events_grid_page?.category_banners?.find(banner =>
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
      return currentContent?.events_grid_page?.title;
    }
  };

  return (
    <Box>
      {!isMobile && <CategoryBanner banner={categoryBanner} />}
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" pt={2}>
          {getPageTitle()}
        </Typography>
        {!categoryBanner && currentContent?.events_grid_page?.subtitle && (
          <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
            {currentContent.events_grid_page.subtitle}
          </Typography>
        )}

        <EventsGridPageFilters
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
          clearAllFilters={clearAllFilters}
        />

        <Grid container spacing={2}>
          {events.length > 0 ? (
            events.map(event => (
              <Grid item key={event._id} xs={12} sm={6} md={4} lg={3}>
                <EventCard event={event} />
              </Grid>
            ))
          ) : (
            <>
              <Typography variant="h5" textAlign="center" width="100%" mt={4} gutterBottom>
                No events found for matching criteria
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

export default EventGridPage;
