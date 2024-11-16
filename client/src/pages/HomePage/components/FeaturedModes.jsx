import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ModeCard from "../../ModesGridPage/components/ModeCard";

const FeaturedModes = ({ featured_modes, featured_modes_hidden }) => {
  return !featured_modes_hidden ? (
    <Box>
      <Typography variant="h4" component="h2" align="left" gutterBottom>
        {"Featured Modes"}
      </Typography>
      <Box
        sx={{
          pb: 6,
          px: 2,
          display: "flex",
          overflowX: "auto",
          minWidth: "100%",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {featured_modes?.map(mode => (
          <Box
            key={mode.id}
            sx={{
              minWidth: "250px",
              maxWidth: "300px", // Add maxWidth
              width: "100%", // Add width: 100% to make the item fill the available space
              marginRight: "20px",
              "&:last-child": {
                marginRight: 0,
              },
            }}
          >
            <ModeCard mode={mode} goHorizontal={false} />
          </Box>
        ))}
      </Box>
    </Box>
  ) : (
    <></>
  );
};

FeaturedModes.propTypes = {
  featured_modes: PropTypes.array,
  featured_modes_hidden: PropTypes.bool,
};

FeaturedModes.defaultProps = {
  featured_modes: [],
  featured_modes_hidden: false,
};

export default FeaturedModes;
