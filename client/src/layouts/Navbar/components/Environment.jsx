import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { toCapitalize } from "../../../utils/helper_functions";

const Environment = () => {
  const glowLeds = useSelector(state => state.glowLeds);
  const { environment } = glowLeds;

  return (
    <div>
      {(environment === "development" || environment === "staging") && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          className="banner"
          style={{ backgroundColor: "#ac4545", height: 30 }}
        >
          <div>
            {`------------------------- `}
            {toCapitalize(environment)} Environment
            {` -------------------------`}
          </div>
        </Box>
      )}
    </div>
  );
};

export default Environment;
