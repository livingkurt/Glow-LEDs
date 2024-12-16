import Box from "@mui/material/Box";

const HeroVideo = hero_video => {
  return hero_video ? (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        aspectRatio: "16/9",
        overflow: "hidden",
      }}
      mb={{ xs: 0, sm: 2 }}
    >
      <iframe
        style={{
          width: "100%",
          height: "100%",
          border: 0,
        }}
        title={`${hero_video.video} video`}
        allowFullScreen
        src={`https://www.youtube.com/embed/${hero_video.video}?autoplay=${hero_video.autoplay}&mute=${hero_video.muted}&loop=${hero_video.loop}&playsinline=${hero_video.playsInline}`}
        allow={hero_video.autoplay ? "autoplay" : ""}
        autoPlay={hero_video.autoplay}
      />
    </Box>
  ) : (
    <></>
  );
};

export default HeroVideo;
