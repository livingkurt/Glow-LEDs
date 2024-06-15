import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

const GLBreadcrumbs = ({ breadCrumbInfo }) => {
  return (
    <Breadcrumbs separator={<NavigateNext color="white" fontSize="small" />} aria-label="breadcrumb">
      {breadCrumbInfo.map((item, index) => (
        <Link underline="hover" key={index}>
          <Typography variant="body1" style={{ fontWeight: index === breadCrumbInfo.length - 1 ? "normal" : 800 }}>
            {item.name}
          </Typography>
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default GLBreadcrumbs;
