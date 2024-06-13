import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const LearnHighlights = ({ learn_highlights }) => {
  return (
    <Paper
      sx={{
        color: "white",
        backgroundColor: "#00000021",
        padding: 4,
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <Grid container spacing={2} justifyContent="center" maxWidth={"1300px"} m={"auto"}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" component="h2" align="left" gutterBottom>
            {learn_highlights.title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" align="right" gutterBottom>
            {learn_highlights.description}
          </Typography>
        </Grid>
        {learn_highlights.images_data?.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
              }}
            >
              <Link to={item.link}>
                <Box
                  component="img"
                  src={item.image?.link}
                  alt={item.label}
                  sx={{
                    width: "100%",
                    borderRadius: "20px",
                    maxWidth: "300px",
                    height: "auto",
                    marginBottom: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    position: "absolute",
                    bottom: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            </Box>
          </Grid>
        ))}
        <Grid item xs={6}>
          <Typography variant="body2">{learn_highlights.fact}</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent={"flex-end"}>
          <Link to={learn_highlights.link}>
            <Button variant="contained">{learn_highlights.button_text}</Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

LearnHighlights.propTypes = {
  learn_highlights: PropTypes.object,
};

LearnHighlights.defaultProps = {
  learn_highlights: {},
};

export default LearnHighlights;
