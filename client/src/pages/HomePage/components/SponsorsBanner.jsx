import PropTypes from "prop-types";


import { Link } from "react-router-dom";
import SponsorsCard from "../../SponsorsGridPage/components/SponsorCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SponsorsBanner = ({ sponsors }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        {"Learn More About Our Sponsors"}
      </Typography>
      <Button component={Link} to="/sponsors" variant="text" sx={{ mb: 2, color: "#fff" }}>
        {"View All Sponsors"}
      </Button>
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
        {sponsors?.map(sponsor => (
          <Box
            key={sponsor._id}
            sx={{
              minWidth: "250px", // Change minWidth to 250px
              width: "100%", // Add width: 100% to make the item fill the available space
              marginRight: "20px",
              "&:last-child": {
                marginRight: 0,
              },
            }}
          >
            <SponsorsCard affiliate={sponsor} goHorizontal={false} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

SponsorsBanner.propTypes = {
  sponsors: PropTypes.array.isRequired,
};

export default SponsorsBanner;
