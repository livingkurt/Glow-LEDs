import { Box } from "@mui/material";
import PropTypes from "prop-types";
import YouTube from "react-youtube";

const HeroVideo = ({ hero_video, hero_video_hidden }) => {
  return hero_video && !hero_video_hidden ? (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        aspectRatio: "16/9",
        overflow: "hidden",
      }}
      mb={{ xs: 0, sm: 2 }}
    >
      <YouTube
        videoId={hero_video}
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
  hero_video: PropTypes.string,
  hero_video_hidden: PropTypes.bool,
};

HeroVideo.defaultProps = {
  hero_video: "",
  hero_video_hidden: false,
};

export default HeroVideo;
