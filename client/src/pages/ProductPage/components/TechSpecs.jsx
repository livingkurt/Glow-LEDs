import React, { useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TechSpecs = ({ tech_specs }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (tech_specs?.hidden) return null;

  return (
    <Box sx={{ marginTop: 4, marginBottom: 4 }} display="flex">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            {tech_specs?.title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Box width="100%">
            {tech_specs?.navigation.map((section, index) => (
              <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Typography variant="subtitle1">{section.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {section.values.map((value, valueIndex) => (
                      <React.Fragment key={valueIndex}>
                        <Grid item xs={4}>
                          <Typography variant="subtitle2">{value.title}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body2">{value.description}</Typography>
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TechSpecs;
