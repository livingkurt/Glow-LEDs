import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Link as MUILink, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

const GLBreadcrumbs = ({ items }) => {
  return (
    <Breadcrumbs separator={<NavigateNext color="white" fontSize="small" />} aria-label="breadcrumb">
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <Typography key={index} color="white" variant="subtitle2">
              {item?.name}
            </Typography>
          );
        }
        return (
          <Link key={index} to={item.to}>
            <MUILink underline="hover" color="white">
              <Typography key={index} color="white" variant="subtitle2">
                {item?.name}
              </Typography>
            </MUILink>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default GLBreadcrumbs;
