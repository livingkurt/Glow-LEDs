import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as API from "../../api";
import AcademyPageSkeleton from "./component/AcademyPageSkeleton";
import TutorialCard from "../TutorialsGridPage/component/TutorialsCard";
import ArticleCard from "../ArticlesGridPage/component/ArticleCard";

const AcademyPage = () => {
  const { data: currentContent, isLoading } = API.useCurrentContentQuery();

  if (isLoading) return <AcademyPageSkeleton />;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h2" gutterBottom>
        {currentContent?.academy_page?.title}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {currentContent?.academy_page?.subtitle}
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Featured Articles
        </Typography>
        <Button component={Link} to="/learn" variant="text" sx={{ mb: 2, color: "#fff" }}>
          View All Articles
        </Button>
        <Grid container spacing={3}>
          {currentContent?.academy_page?.featured_articles?.map(article => (
            <Grid item key={article._id} xs={12} sm={6} md={4} lg={3}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Featured Tutorials
        </Typography>
        <Button component={Link} to="/tutorials" variant="text" sx={{ mb: 2, color: "#fff" }}>
          View All Tutorials
        </Button>
        <Grid container spacing={3}>
          {currentContent?.academy_page?.featured_tutorials?.map(tutorial => (
            <Grid item key={tutorial._id} xs={12} sm={6} md={4} lg={3}>
              <TutorialCard tutorial={tutorial} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AcademyPage;
