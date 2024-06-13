import React from "react";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const GetTheMost = ({ get_more_out_of }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <Grid container justifyContent="center" mb={2}>
        <Grid item xs={12} md={6}>
          <Box
            p={{ xs: 2, md: 4 }}
            sx={{
              backgroundColor: "#6f6f6f",
              borderRadius: isMobile ? "20px 20px 0px 0px" : "20px 0px 0px 20px",
              height: "100%",
            }}
          >
            <Typography variant="h6" align="left" gutterBottom>
              {get_more_out_of.title}
            </Typography>
            <Typography variant="body2" align="left" mb={2}>
              {get_more_out_of.description}
            </Typography>
            <Link to={get_more_out_of.link}>
              <Button variant="contained" color="primary">
                {get_more_out_of.button_text}
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            alt="Kurt"
            title="Founder Picture"
            style={{
              borderRadius: isMobile ? "0px 0px 20px 20px " : "0px 20px 20px 0px",
              width: "100%",
              objectFit: "cover",
              aspectRatio: "16/9",
              height: "auto",
            }}
            src={get_more_out_of.image?.link}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

GetTheMost.propTypes = {
  get_more_out_of: PropTypes.object,
};

GetTheMost.defaultProps = {
  get_more_out_of: {},
};

export default GetTheMost;
