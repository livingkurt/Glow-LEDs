import React from "react";
import { Box, Chip, Typography, Tooltip } from "@mui/material";
import * as API from "../../../api";
import { update_products_url } from "../../../utils/helper_functions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompatibleChips = ({ microlights }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!microlights || microlights.length === 0 || microlights[0]?.name === "All Chips") return null;

  return (
    <Box mt={2}>
      <Typography variant="subtitle2" gutterBottom>
        {"Compatible Microlights:"}
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {microlights.map(microlight => (
          // <Tooltip key={microlight._id} title={`Find more products compatible with ${microlight.name}`} arrow>
          <Chip
            label={microlight.name}
            // onClick={() => {
            //   update_products_url(navigate, "", "", microlight.name, "", "0", "/products");
            //   dispatch(
            //     API.listProducts({
            //       microlight: microlight._id,
            //       hidden: false,
            //     })
            //   );
            // }}
            sx={{
              backgroundColor: "white",
              color: "black",
              fontSize: "1rem",
              fontWeight: "500",
            }}
            size="small"
            variant="outlined"
            // clickable
          />
          // </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default CompatibleChips;
