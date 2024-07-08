import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import LaunchIcon from "@mui/icons-material/Launch";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const SupportLink = ({ icon, text, href, isExternal }) => {
  const linkStyle = {
    display: "flex",
    alignItems: "center",
    color: "inherit",
    textDecoration: "none",
    mb: 1,
    "&:hover": {
      textDecoration: "underline",
    },
  };

  const content = (
    <>
      {icon}
      <Typography variant="body1" sx={{ ml: 1 }}>
        {text}
      </Typography>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        {content}
      </a>
    );
  }

  return (
    <RouterLink to={href} style={linkStyle}>
      {content}
    </RouterLink>
  );
};

const ProductSupport = ({ productSupport }) => {
  const { quick_guide, manual, support_link, tutorial_video, hidden } = productSupport;

  if (hidden) {
    return null;
  }

  return (
    <Box sx={{ my: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Product Support
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Box sx={{ mt: 2 }}>
            {quick_guide && (
              <SupportLink
                icon={<DownloadIcon />}
                text="Download | Quick Start Guide"
                href={quick_guide}
                isExternal={quick_guide.startsWith("http")}
              />
            )}
            <Divider sx={{ my: 2, backgroundColor: "white" }} />
            {manual && (
              <SupportLink
                icon={<DownloadIcon />}
                text="Download | Manual"
                href={manual}
                isExternal={manual.startsWith("http")}
              />
            )}
            <Divider sx={{ my: 2, backgroundColor: "white" }} />
            {support_link && (
              <SupportLink
                icon={<LaunchIcon />}
                text="Product Support"
                href={support_link}
                isExternal={support_link.startsWith("http")}
              />
            )}
            <Divider sx={{ my: 2, backgroundColor: "white" }} />
            {tutorial_video && (
              <SupportLink
                icon={<PlayCircleOutlineIcon />}
                text="Watch Video Tutorial"
                href={tutorial_video}
                isExternal={tutorial_video.startsWith("http")}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

ProductSupport.propTypes = {
  productSupport: PropTypes.shape({
    quick_guide: PropTypes.string,
    manual: PropTypes.string,
    support_link: PropTypes.string,
    tutorial_video: PropTypes.string,
    hidden: PropTypes.bool,
  }),
};

ProductSupport.defaultProps = {
  productSupport: {
    quick_guide: "",
    manual: "",
    support_link: "",
    tutorial_video: "",
    hidden: false,
  },
};

export default ProductSupport;
