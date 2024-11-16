import { Slider, Box, Typography, Grid2, Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useModePreview } from "./useModePreview";
import { getSliderProps } from "../modeCreatorPageHelpers";

// Custom styled components
const AnimationSlider = styled(Slider)({
  color: "#1976d2",
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

const ControlsContainer = styled(Box)({
  backgroundColor: "rgba(30, 30, 30, 0.9)",
  borderRadius: "8px",
  padding: "16px",
  marginTop: "16px",
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
      <ControlsContainer>
        <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
          {"Mode Preview"}
        </Typography>
        <canvas
          ref={canvasRef}
          width={120}
          height={120}
          style={{ width: "100%", backgroundColor: "black", borderRadius: "8px", aspectRatio: "1 / 1" }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, color: "white", my: 2 }}>
          {"Inspired by"}{" "}
          <Link href="https://lightshow.lol/" target="_blank" color="inherit">
            {"lightshow.lol"}
          </Link>
        </Box>
        <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
          {"Animation Controls"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SliderContainer>
              <AnimationSlider
                value={timeMultiplier}
                onChange={(_, value) => setTimeMultiplier(value)}
                aria-label="Time Multiplier"
                min={sliderProps.timeMultiplier.min}
                max={sliderProps.timeMultiplier.max}
              />
              <Typography sx={{ color: "white", width: 80 }}>{"Scale"}</Typography>
            </SliderContainer>

            <SliderContainer>
              <AnimationSlider
                value={speed}
                onChange={(_, value) => setSpeed(value)}
                aria-label="Speed"
                min={sliderProps.speed.min}
                max={sliderProps.speed.max}
              />
              <Typography sx={{ color: "white", width: 80 }}>{"Speed"}</Typography>
            </SliderContainer>
            <SliderContainer>
              <AnimationSlider
                value={trailLength}
                onChange={(_, value) => setTrailLength(value)}
                aria-label="Trail"
                min={sliderProps.trail.min}
                max={sliderProps.trail.max}
              />
              <Typography sx={{ color: "white", width: 80 }}>{"Trail"}</Typography>
            </SliderContainer>
          </Grid>
          <Grid item xs={6}>
            <SliderContainer>
              <AnimationSlider
                value={size}
                onChange={(_, value) => setSize(value)}
                aria-label="Size"
                min={sliderProps.size.min}
                max={sliderProps.size.max}
              />
              <Typography sx={{ color: "white", width: 80 }}>{"Size"}</Typography>
            </SliderContainer>

            <SliderContainer>
              <AnimationSlider
                value={blur}
                onChange={(_, value) => setBlur(value)}
                aria-label="Blur"
                min={sliderProps.blur.min}
                max={sliderProps.blur.max}
              />
              <Typography sx={{ color: "white", width: 80 }}>{"Blur"}</Typography>
            </SliderContainer>

            <SliderContainer>
              <AnimationSlider
                value={radius}
                onChange={(_, value) => setRadius(value)}
                aria-label="Radius"
                min={sliderProps.radius.min}
                max={sliderProps.radius.max}
              />
              <Typography sx={{ color: "white", width: 80 }}>{"Radius"}</Typography>
            </SliderContainer>
          </Grid>
        </Grid>
      </ControlsContainer>
    </Box>
  );
};

export default ModePreview;
