import React from "react";
import { Link } from "react-router-dom";
import * as API from "../../../api";
import { Box, Typography, useTheme } from "@mui/material";

const Banner = () => {
  const theme = useTheme();
  const { data: currentContent, isLoading } = API.useCurrentContentQuery();

  const link = currentContent?.banner?.link;
  const label = currentContent?.banner?.label;
  return (
    <>
      {label && !isLoading && (
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {!isLoading && (
            <Link to={link}>
              <Typography variant="h6" fontSize={"12px"} mt={"5px"}>
                {label}
              </Typography>
            </Link>
          )}
        </Box>
      )}
    </>
  );
};

export default Banner;
