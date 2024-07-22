import React from "react";
import { Grid, Typography, Avatar, Box, useTheme } from "@mui/material";

const ContributorsDisplay = ({ contributors }) => {
  const theme = useTheme();
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Community Contributors
      </Typography>
      <Box gap={2} display="flex">
        {contributors.map(contributor => (
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <Avatar sx={{ width: 64, height: 64, mb: 1 }} style={{ backgroundColor: theme.palette.secondary.main }}>
              {contributor.first_name[0]}
              {contributor.last_name[0]}
            </Avatar>
            <Typography variant="subtitle1" align="center">
              {contributor.first_name} {contributor.last_name}
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary">
              {"Contributor"}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContributorsDisplay;
