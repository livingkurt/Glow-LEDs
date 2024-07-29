import React from "react";
import { Link } from "react-router-dom";
import * as API from "../../../api";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const Banner = () => {
  const theme = useTheme();
  const { data: currentContent, isLoading } = API.useCurrentContentQuery();

  const link = currentContent?.banner?.link;
  const label = currentContent?.banner?.label;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
              <Typography
                variant={isMobile ? "body2" : "subtitle1"}
                fontSize={"12px"}
                mt={isMobile ? "0px" : "5px"}
                mx={1}
              >
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
