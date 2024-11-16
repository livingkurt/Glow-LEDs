import { Slider, Box, Typography, Grid2, Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useModePreview } from "./useModePreview";
import { getSliderProps } from "../modeCreatorPageHelpers";

// Custom styled components
const AnimationSlider = styled(Slider)({
  // color: "#1976d2",
  "& .MuiSlider-thumb": {
    backgroundColor: "#fff",
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
});

const SliderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "16px",
});

const ModePreview = ({ mode }) => {
  const {
    canvasRef,
    speed,
    setSpeed,
    trailLength,
    setTrailLength,
    size,
    setSize,
    blur,
    setBlur,
    radius,
    setRadius,
    timeMultiplier,
    setTimeMultiplier,
  } = useModePreview({ mode });

  // Get current slider ranges
  const sliderProps = getSliderProps(canvasRef);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">{"Mode Preview"}</Typography>
      <canvas
        ref={canvasRef}
        width={120}
        height={120}
        style={{ width: "100%", backgroundColor: "black", borderRadius: "8px", aspectRatio: "1 / 1" }}
      />

      <Typography variant="h6">{"Animation Controls"}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SliderContainer>
            <Typography sx={{ width: 80 }}>{"Scale"}</Typography>
            <AnimationSlider
              value={timeMultiplier}
              onChange={(_, value) => setTimeMultiplier(value)}
              aria-label="Time Multiplier"
              min={sliderProps.timeMultiplier.min}
              max={sliderProps.timeMultiplier.max}
            />
          </SliderContainer>

          <SliderContainer>
            <Typography sx={{ width: 80 }}>{"Speed"}</Typography>
            <AnimationSlider
              value={speed}
              onChange={(_, value) => setSpeed(value)}
              aria-label="Speed"
              min={sliderProps.speed.min}
              max={sliderProps.speed.max}
            />
          </SliderContainer>
          <SliderContainer>
            <Typography sx={{ width: 80 }}>{"Trail"}</Typography>
            <AnimationSlider
              value={trailLength}
              onChange={(_, value) => setTrailLength(value)}
              aria-label="Trail"
              min={sliderProps.trail.min}
              max={sliderProps.trail.max}
            />
          </SliderContainer>
        </Grid>
        <Grid item xs={6}>
          <SliderContainer>
            <Typography sx={{ width: 80 }}>{"Size"}</Typography>
            <AnimationSlider
              value={size}
              onChange={(_, value) => setSize(value)}
              aria-label="Size"
              min={sliderProps.size.min}
              max={sliderProps.size.max}
            />
          </SliderContainer>

          <SliderContainer>
            <Typography sx={{ width: 80 }}>{"Blur"}</Typography>
            <AnimationSlider
              value={blur}
              onChange={(_, value) => setBlur(value)}
              aria-label="Blur"
              min={sliderProps.blur.min}
              max={sliderProps.blur.max}
            />
          </SliderContainer>

          <SliderContainer>
            <Typography sx={{ width: 80 }}>{"Radius"}</Typography>
            <AnimationSlider
              value={radius}
              onChange={(_, value) => setRadius(value)}
              aria-label="Radius"
              min={sliderProps.radius.min}
              max={sliderProps.radius.max}
            />
          </SliderContainer>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, my: 2 }}>
            {"Preview inspired by"}{" "}
            <Link href="https://lightshow.lol/" target="_blank" color="inherit">
              {"lightshow.lol"}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModePreview;
