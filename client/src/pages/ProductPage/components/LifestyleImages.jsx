import React from "react";
import { ImageList, ImageListItem, Container } from "@mui/material";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

const LifestyleImageGrid = ({ lifestyleImages }) => {
  if (!lifestyleImages || lifestyleImages.length === 0) return null;

  const itemData = [
    { rows: 2, cols: 1 }, // Vertical image (top left)
    { rows: 2, cols: 3 }, // Horizontal image (top right)
    { rows: 4, cols: 2 }, // Vertical image (bottom left)
    { rows: 2, cols: 2 }, // Horizontal image (bottom center)
    { rows: 2, cols: 2 }, // Horizontal image (bottom right)
  ];

  return (
    <Container maxWidth="xl">
      <ImageList variant="quilted" cols={4} rowHeight={200} gap={16}>
        {lifestyleImages.slice(0, 5).map((image, index) => (
          <ImageListItem key={index} cols={itemData[index].cols || 1} rows={itemData[index].rows || 1}>
            <img
              {...srcset(image.link, 200, itemData[index].rows, itemData[index].cols)}
              alt={`Lifestyle ${index + 1}`}
              loading="lazy"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};

export default LifestyleImageGrid;
