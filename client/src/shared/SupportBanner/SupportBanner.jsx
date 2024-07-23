import React from "react";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import * as API from "../../api";

const SupportBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { data: currentContent } = API.useCurrentContentQuery();
  const support_banner = currentContent?.home_page?.support_banner;
  return !support_banner?.hidden ? (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <Grid container justifyContent="center" mb={2}>
        <Grid item xs={12} md={6} style={{ height: "100%" }}>
          <div style={{ position: "relative", paddingTop: "56.25%", height: "100%" }}>
            <img
              alt="Kurt"
              title="Founder Picture"
              style={{
                borderRadius: isMobile ? "20px 20px 0px 0px" : "20px 0px 0px 20px",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={support_banner?.image?.link}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            p={{ xs: 2, md: 4 }}
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: isMobile ? "0px 0px 20px 20px " : "0px 20px 20px 0px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              {support_banner?.title}
            </Typography>
            <Typography variant="body2" mb={2}>
              {support_banner?.subtitle}
            </Typography>
            <Box display="flex" justifyContent={{ xs: "center", md: "flex-start" }}>
              <Link to={support_banner?.link}>
                <Button variant="contained" color="secondary">
                  {support_banner?.button_text}
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <></>
  );
};

export default SupportBanner;
