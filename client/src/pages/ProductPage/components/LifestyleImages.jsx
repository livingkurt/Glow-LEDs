import React from "react";
import { ImageList, ImageListItem, useMediaQuery, useTheme } from "@mui/material";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

const LifestyleImageGrid = ({ lifestyleImages }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!lifestyleImages || lifestyleImages.length === 0) return null;

  const itemData = [
    { rows: 2, cols: 1 }, // Vertical image (top left)
    { rows: 2, cols: 3 }, // Horizontal image (top right)
    { rows: 4, cols: 2 }, // Vertical image (bottom left)
    { rows: 2, cols: 2 }, // Horizontal image (bottom center)
    { rows: 2, cols: 2 }, // Horizontal image (bottom right)
  ];

  return (
    <ImageList
      variant={isSmallScreen ? "standard" : "quilted"}
      cols={isSmallScreen ? 1 : 4}
      rowHeight={isSmallScreen ? "auto" : 200}
      gap={16}
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {lifestyleImages.slice(0, 5).map((image, index) => (
        <ImageListItem
          key={index}
          cols={isSmallScreen ? 1 : itemData[index].cols || 1}
          rows={isSmallScreen ? 1 : itemData[index].rows || 1}
        >
          <img
            {...srcset(
              image.link,
              isSmallScreen ? 350 : 200,
              isSmallScreen ? 1 : itemData[index].rows,
              isSmallScreen ? 1 : itemData[index].cols
            )}
            alt={`Lifestyle ${index + 1}`}
            loading="lazy"
            style={{
              objectFit: "cover",
              width: "100%",
              height: isSmallScreen ? "auto" : "100%",
              borderRadius: "20px",
              aspectRatio: isSmallScreen ? `${itemData[index].cols}/${itemData[index].rows}` : "auto",
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default LifestyleImageGrid;
