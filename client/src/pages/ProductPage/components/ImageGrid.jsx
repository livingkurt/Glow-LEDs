

import { styled } from "@mui/material/styles";
import random from "lodash/random";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
});

const StyledTextImage = styled("img")({
  width: "100%",
  height: "100%",
  opacity: 0.25,
  objectFit: "cover",
  objectPosition: "center",
});

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  height: 0,
  paddingTop: "100%", // This creates a 1:1 aspect ratio
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.01)",
    boxShadow: `0 12px 24px 0 hsl(${random(0, 360)}deg 50% 50%)`,
  },
}));

const TextImageContainer = styled(Box)({
  width: "100%",
  height: 0,
  paddingTop: "100%", // This creates a 1:1 aspect ratio
  position: "relative",
});

const TextOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(5),
  },
  [theme.breakpoints.up("lg")]: {
    padding: "7rem",
  },
}));

const ImageGrid = ({ image_grid, image_grid_hidden, text_color, header_text_color }) => {
  return (
    <>
      {image_grid.length > 0 && !image_grid_hidden && (
        <Box sx={{ overflow: "hidden" }}>
          <Grid container spacing={0}>
            {image_grid?.map((grid, index) => (
              <Grid item xs={12} key={index}>
                <Grid container direction={index % 2 === 0 ? "row" : "row-reverse"} alignItems="stretch">
                  <Grid item xs={12} md={6}>
                    <ImageContainer>
                      <StyledImage
                        src={grid?.image?.link}
                        alt={grid.title}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </ImageContainer>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextImageContainer>
                      <StyledTextImage
                        src={grid?.text_image?.link}
                        alt={grid.title}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      />

                      <TextOverlay>
                        <Typography variant="h4" gutterBottom color={header_text_color ? header_text_color : "white"}>
                          {grid.title}
                        </Typography>
                        <Typography variant="body1" paragraph color={text_color ? text_color : "white"}>
                          {grid.description}
                        </Typography>
                        {grid.button_text && grid.link && (
                          <Button variant="contained" color="primary" href={grid.link}>
                            {grid.button_text}
                          </Button>
                        )}
                      </TextOverlay>
                    </TextImageContainer>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ImageGrid;
