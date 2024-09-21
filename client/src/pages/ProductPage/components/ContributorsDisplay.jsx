import React from "react";
import { Grid, Typography, Avatar, Box, useTheme } from "@mui/material";

const ContributorsDisplay = ({ contributors, text_color, secondary_color, header_text_color }) => {
  const theme = useTheme();
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom color={header_text_color ? header_text_color : "white"}>
        Community Contributors
      </Typography>
      <Box
        gap={2}
        display="flex"
        sx={{
          display: "flex",
          overflowX: "auto",
          minWidth: "100%",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {contributors.map(contributor => (
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <Avatar
              sx={{ width: 64, height: 64, mb: 1 }}
              style={{
                backgroundColor: secondary_color ? secondary_color : theme.palette.secondary.main,
                color: text_color ? text_color : "white",
              }}
            >
              {contributor.first_name[0]}
              {contributor.last_name[0]}
            </Avatar>
            <Typography variant="subtitle1" align="center" color={text_color ? text_color : "white"}>
              {contributor.first_name} {contributor.last_name}
            </Typography>
            <Typography variant="body2" align="center" color={header_text_color ? header_text_color : "white"}>
              {"Contributor"}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContributorsDisplay;
