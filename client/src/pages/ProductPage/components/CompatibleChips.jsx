import React from "react";
import { Box, Chip, Typography, Tooltip } from "@mui/material";
import * as API from "../../../api";
import { update_products_url } from "../../../utils/helper_functions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompatibleChips = ({ chips }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!chips || chips.length === 0) return null;

  return (
    <Box mt={2}>
      <Typography variant="subtitle2" gutterBottom>
        Compatible Chips:
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {chips.map(chip => (
          <Tooltip key={chip._id} title={`Find more products compatible with ${chip.name}`} arrow>
            <Chip
              label={chip.name}
              onClick={() => {
                update_products_url(navigate, "", "", chip.name, "", "0", "/collections/all/products");
                dispatch(
                  API.listProducts({
                    chip: chip._id,
                    hidden: false,
                  })
                );
              }}
              sx={{
                backgroundColor: "white",
                color: "black",
                fontSize: "1rem",
                fontWeight: "500",
              }}
              size="small"
              variant="outlined"
              clickable
            />
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default CompatibleChips;
