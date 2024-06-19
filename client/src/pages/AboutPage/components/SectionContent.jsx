import { Box, Typography } from "@mui/material";
import React from "react";

const SectionContent = ({ section }) => (
  <Box flexGrow={1} mr={{ md: 2 }}>
    <Typography variant="h2" gutterBottom>
      {section.title}
    </Typography>
    <Typography variant="body1" paragraph>
      {section.description}
    </Typography>
  </Box>
);

export default SectionContent;
