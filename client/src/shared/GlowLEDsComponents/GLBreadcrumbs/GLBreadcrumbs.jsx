import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Link as MUILink, Typography, useMediaQuery, useTheme } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

const GLBreadcrumbs = ({ items }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Breadcrumbs
      separator={<NavigateNext color="white" fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        "& .MuiBreadcrumbs-separator": {
          margin: isMobile ? "0" : undefined, // Reduce spacing on mobile
        },
      }}
    >
      {items
        .filter(item => item?.name)
        .map((item, index, filteredItems) => {
          if (index === filteredItems.length - 1) {
            return (
              <Typography
                key={index}
                color="white"
                variant="subtitle2"
                sx={{
                  fontSize: isMobile ? "12px" : undefined,
                  letterSpacing: 0.2,
                  padding: isMobile ? "0" : undefined, // Add padding on mobile
                }}
              >
                {item.name}
              </Typography>
            );
          }
          return (
            <Link key={index} to={item.to}>
              <MUILink underline="hover" color="white">
                <Typography
                  color="white"
                  variant="subtitle2"
                  sx={{
                    fontSize: isMobile ? "12px" : undefined,
                    letterSpacing: 0.2,
                    padding: isMobile ? "0" : undefined, // Add padding on mobile
                  }}
                >
                  {item.name}
                </Typography>
              </MUILink>
            </Link>
          );
        })}
    </Breadcrumbs>
  );
};

export default GLBreadcrumbs;
