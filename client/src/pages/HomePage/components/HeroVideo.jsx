import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import YouTube from "react-youtube";

const HeroVideo = ({ video, video_hidden }) => {
  return !video_hidden ? (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        aspectRatio: "16/9",
        // borderRadius: "20px",
        overflow: "hidden",
      }}
      mb={{ xs: 0, sm: 2 }}
    >
      <YouTube
        videoId={video}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
          },
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  ) : (
    <></>
  );
};

HeroVideo.propTypes = {
  discover_more: PropTypes.object,
};

HeroVideo.defaultProps = {
  discover_more: {},
};

export default HeroVideo;
