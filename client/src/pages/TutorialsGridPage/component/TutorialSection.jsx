import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Loading } from "../../../shared/SharedComponents";

const TutorialSection = ({ title, tutorials, handleOpen, loading, defaultOpen }) => {
  const [expanded, setExpanded] = useState(defaultOpen ?? false);
  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(expand => !expand)}
      sx={{ backgroundColor: "#4d5061" }} // Set background color
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />} // Set icon color
        aria-controls={`${title.toLowerCase()}-content`}
        id={`${title.toLowerCase()}-header`}
      >
        <h2 className="ta-c" style={{ color: "white" }}>
          {title}
        </h2>{" "}
      </AccordionSummary>
      <AccordionDetails>
        <Loading loading={loading}>
          {tutorials?.length ? (
            <Grid container spacing={2}>
              {tutorials.map(item => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.video}>
                  <CardMedia
                    component="img"
                    image={`http://img.youtube.com/vi/${item.video}/hqdefault.jpg`}
                    alt={item.title}
                    loading="lazy"
                    className="br-20px"
                    onClick={() => handleOpen(item)}
                    style={{ cursor: "pointer" }}
                  />
                  <h3 style={{ color: "white" }} className="ta-c">
                    {item.title} by {item?.affiliate?.artist_name}
                  </h3>
                </Grid>
              ))}
            </Grid>
          ) : (
            <p style={{ color: "white" }}>Check back often for new tutorials!</p>
          )}
        </Loading>
      </AccordionDetails>
    </Accordion>
  );
};

export default TutorialSection;
