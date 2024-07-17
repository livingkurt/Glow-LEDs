import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
});

const ImageGrid = ({ image_grid, image_grid_hidden }) => {
  return (
    <>
      {image_grid.length > 0 && !image_grid_hidden && (
        <Grid container spacing={4}>
          {image_grid?.map((grid, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={4} direction={index % 2 === 0 ? "row" : "row-reverse"} alignItems="center">
                <Grid item xs={12} md={6}>
                  <StyledImage src={grid?.image?.link} alt={grid.title} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box p={2}>
                    <Typography variant="h4" gutterBottom>
                      {grid.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {grid.description}
                    </Typography>
                    {grid.button_text && grid.link && (
                      <Button variant="contained" color="primary" href={grid.link}>
                        {grid.button_text}
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ImageGrid;
