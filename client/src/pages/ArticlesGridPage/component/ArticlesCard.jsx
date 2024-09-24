import React from "react";
import { Card, CardContent, Typography, Box, useMediaQuery, useTheme, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import { toCapitalize } from "../../../utils/helper_functions";

const ArticleCard = ({ article }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Link to={`/pages/learn/${article.pathname}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          bgcolor: "transparent",
          height: "100%",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: `0 12px 24px 0 hsl(${Math.random() * 360}deg 50% 50%)`,
          },
          cursor: "pointer",
          borderRadius: "1rem",
          display: isMobile ? "flex" : "block",
          flexDirection: isMobile ? "row" : "column",
        }}
        elevation={0}
      >
        <Box
          sx={{
            position: "relative",
            paddingTop: isMobile ? "50%" : "56.25%", // 16:9 aspect ratio
            overflow: "hidden",
            flexShrink: 0,
            width: isMobile ? "50%" : "100%",
            borderRadius: "1rem",
          }}
        >
          <GLLazyImage
            src={article.image ? article.image.link : "path/to/default/image.jpg"}
            alt={article.title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Typography variant={isMobile ? "body1" : "h6"} color="white" gutterBottom>
              {article.title}
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"} color="white" gutterBottom>
              by {article?.author ? article.author.first_name + " " + article.author.last_name : "Unknown Author"}
            </Typography>
            <Typography variant="body2" color="white" gutterBottom>
              {new Date(article.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            {article.tags &&
              article.tags
                .slice(0, 3)
                .map((tag, index) => (
                  <Chip
                    key={index}
                    label={toCapitalize(tag.name)}
                    size="small"
                    sx={{ mr: 1, mb: 1, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white" }}
                  />
                ))}
          </Box>
          {article.short_description && (
            <Typography variant="body2" color="white" sx={{ mt: 2 }}>
              {article.short_description.slice(0, 100)}...
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
