import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import LaunchIcon from "@mui/icons-material/Launch";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const SupportLink = ({ icon, text, href, isExternal, color, id }) => {
  const linkStyle = {
    display: "flex",
    alignItems: "center",
    color: color ? color : "white",
    textDecoration: "none",
    mb: 1,
    "&:hover": {
      textDecoration: "underline",
    },
  };

  const content = (
    <>
      {icon}
      <Typography variant="body1" sx={{ ml: 1 }} fontSize={20}>
        {text}
      </Typography>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle} id={id}>
        {content}
      </a>
    );
  }

  return (
    <RouterLink to={href} style={linkStyle} id={id}>
      {content}
    </RouterLink>
  );
};

const ProductSupport = ({ productSupport, text_color, header_text_color }) => {
  const { quick_guide, manual, support_link, tutorial_video, hidden } = productSupport;

  if (hidden) {
    return null;
  }

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              color={header_text_color ? header_text_color : "white"}
            >
              Product Support
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Box sx={{ mt: 2 }}>
              {quick_guide && (
                <>
                  <SupportLink
                    icon={
                      <DownloadIcon style={{ fontSize: 40, color: header_text_color ? header_text_color : "white" }} />
                    }
                    text="Download | Quick Start Guide"
                    id="quick_guide"
                    href={quick_guide}
                    color={header_text_color ? header_text_color : "white"}
                    isExternal={quick_guide.startsWith("http")}
                  />
                  <Divider sx={{ my: 2, backgroundColor: "white" }} />
                </>
              )}
              {manual && (
                <>
                  <SupportLink
                    icon={
                      <DownloadIcon style={{ fontSize: 40, color: header_text_color ? header_text_color : "white" }} />
                    }
                    id="manual"
                    text="Download | Manual"
                    href={manual}
                    color={header_text_color ? header_text_color : "white"}
                    isExternal={manual.startsWith("http")}
                  />
                  <Divider sx={{ my: 2, backgroundColor: "white" }} />
                </>
              )}
              {support_link && (
                <>
                  <SupportLink
                    icon={
                      <LaunchIcon style={{ fontSize: 40, color: header_text_color ? header_text_color : "white" }} />
                    }
                    text="Product Support"
                    id="support_link"
                    href={support_link}
                    color={header_text_color ? header_text_color : "white"}
                    isExternal={support_link.startsWith("http")}
                  />
                  <Divider sx={{ my: 2, backgroundColor: "white" }} />
                </>
              )}
              {tutorial_video && (
                <SupportLink
                  icon={
                    <PlayCircleOutlineIcon
                      style={{ fontSize: 40, color: header_text_color ? header_text_color : "white" }}
                    />
                  }
                  text="Watch Video Tutorial"
                  id="tutorial_video"
                  href={tutorial_video}
                  color={header_text_color ? header_text_color : "white"}
                  isExternal={tutorial_video.startsWith("http")}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
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
