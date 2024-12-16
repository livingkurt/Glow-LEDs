import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SectionContent = ({ section }) => (
  <Box flexGrow={1} mr={{ md: 2 }}>
    <Typography variant="h2" gutterBottom>
      {section.title}
    </Typography>
    <Typography variant="body3" paragraph>
      {section.description}
    </Typography>
  </Box>
);

export default SectionContent;
