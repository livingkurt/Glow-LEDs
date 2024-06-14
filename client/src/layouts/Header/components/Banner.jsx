import React from "react";
import { Link } from "react-router-dom";
import * as API from "../../../api";
import { Box, Typography } from "@mui/material";

const Banner = () => {
  const { data: currentContent, isLoading } = API.useCurrentContentQuery();

  const link = currentContent?.banner?.link;
  const label = currentContent?.banner?.label;
  return (
    <>
      {label && !isLoading && (
        <Box
          sx={{
            backgroundColor: "#4d5061",
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
