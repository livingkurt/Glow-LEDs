import React from "react";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SupportBanner = ({ support_banner }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <Grid container justifyContent="center" mb={2}>
        <Grid item xs={12} md={6}>
          <img
            alt="Kurt"
            title="Founder Picture"
            style={{
              borderRadius: isMobile ? "20px 20px 0px 0px" : "20px 0px 0px 20px",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              aspectRatio: "16/9",
            }}
            src={support_banner?.image?.link}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            p={{ xs: 2, md: 4 }}
            sx={{
              backgroundColor: "#6f6f6f",
              borderRadius: isMobile ? "0px 0px 20px 20px " : "0px 20px 20px 0px",
              height: "100%",
            }}
          >
            <Typography variant="h6" align="left" gutterBottom>
              {support_banner?.title}
            </Typography>
            <Typography variant="body2" align="left" mb={2}>
              {support_banner?.subtitle}
            </Typography>
            <Link to={support_banner?.link}>
              <Button variant="contained" color="primary">
                {support_banner.button_text}
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

SupportBanner.propTypes = {
  support_banner: PropTypes.object,
};

SupportBanner.defaultProps = {
  support_banner: {},
};

export default SupportBanner;
