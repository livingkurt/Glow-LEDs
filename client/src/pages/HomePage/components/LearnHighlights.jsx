import { Box, Typography, Button, Grid, Paper, Container, useTheme, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const LearnHighlights = ({ learn_highlights }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    learn_highlights.images_data.length > 0 && (
      <Box>
        <Paper
          elevation={5}
          sx={{
            color: "white",
            backgroundColor: "#00000021",
          }}
        >
          <Container maxWidth="lg">
            <Box py={{ xs: 2, sm: 4, md: 6 }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Typography variant="h4" component="h2" align={"left"} gutterBottom>
                    {learn_highlights.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" align={isMobile ? "left" : "right"} gutterBottom>
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
                            aspectRatio: isMobile ? "16/9" : "",
                            objectFit: "cover",
                            height: "auto",
                            position: "relative",
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            position: "absolute",
                            bottom: "10%",
                            right: "10%",
                            color: "white",
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
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" align={isMobile ? "center" : "left"}>
                    {learn_highlights.fact}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} display="flex" justifyContent={isMobile ? "center" : "flex-end"}>
                  <Link to={learn_highlights.link}>
                    <Button variant="contained">{learn_highlights.button_text}</Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Paper>
      </Box>
    )
  );
};

LearnHighlights.propTypes = {
  learn_highlights: PropTypes.object,
};

LearnHighlights.defaultProps = {
  learn_highlights: {},
};

export default LearnHighlights;
