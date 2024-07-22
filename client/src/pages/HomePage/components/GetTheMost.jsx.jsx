import React from "react";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const GetTheMost = ({ get_more_out_of }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return !get_more_out_of?.hidden ? (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <Grid container justifyContent="center" mb={2}>
        <Grid item xs={12} md={6}>
          <Box
            p={{ xs: 2, md: 4 }}
            sx={{
              backgroundColor: "#4d5061",
              borderRadius: isMobile ? "20px 20px 0px 0px" : "20px 0px 0px 20px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              {get_more_out_of.title}
            </Typography>
            <Typography variant="body2" mb={2}>
              {get_more_out_of.description}
            </Typography>
            <Box display="flex" justifyContent={{ xs: "center", md: "flex-start" }}>
              <Link to={get_more_out_of.link}>
                <Button variant="contained" color="secondary">
                  {get_more_out_of.button_text}
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} style={{ height: "100%" }}>
          <div style={{ position: "relative", paddingTop: "56.25%", height: "100%" }}>
            <img
              alt="Kurt"
              title="Founder Picture"
              style={{
                borderRadius: isMobile ? "0px 0px 20px 20px" : "0px 20px 20px 0px",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={get_more_out_of.image?.link}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <></>
  );
};

GetTheMost.propTypes = {
  get_more_out_of: PropTypes.object,
};

GetTheMost.defaultProps = {
  get_more_out_of: {},
};

export default GetTheMost;
