import { Slider, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getSliderProps } from "../modeCreatorPageHelpers";

// Update the styled AnimationSlider
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
  width: "350px", // Add fixed width for sliders
});

const SliderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

const AnimationControls = ({ controls }) => {
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
  } = controls;

  const sliderProps = getSliderProps(canvasRef);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, color: "white" }}>
        {"Animation Controls"}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <SliderContainer>
          <Typography sx={{ width: 80, color: "white" }}>{"Scale"}</Typography>
          <AnimationSlider
            value={timeMultiplier}
            onChange={(_, value) => setTimeMultiplier(value)}
            min={sliderProps.timeMultiplier.min}
            max={sliderProps.timeMultiplier.max}
          />
        </SliderContainer>

        <SliderContainer>
          <Typography sx={{ width: 80, color: "white" }}>{"Speed"}</Typography>
          <AnimationSlider
            value={speed}
            onChange={(_, value) => setSpeed(value)}
            min={sliderProps.speed.min}
            max={sliderProps.speed.max}
          />
        </SliderContainer>

        <SliderContainer>
          <Typography sx={{ width: 80, color: "white" }}>{"Trail"}</Typography>
          <AnimationSlider
            value={trailLength}
            onChange={(_, value) => setTrailLength(value)}
            min={sliderProps.trail.min}
            max={sliderProps.trail.max}
          />
        </SliderContainer>

        <SliderContainer>
          <Typography sx={{ width: 80, color: "white" }}>{"Size"}</Typography>
          <AnimationSlider
            value={size}
            onChange={(_, value) => setSize(value)}
            min={sliderProps.size.min}
            max={sliderProps.size.max}
          />
        </SliderContainer>

        <SliderContainer>
          <Typography sx={{ width: 80, color: "white" }}>{"Blur"}</Typography>
          <AnimationSlider
            value={blur}
            onChange={(_, value) => setBlur(value)}
            min={sliderProps.blur.min}
            max={sliderProps.blur.max}
          />
        </SliderContainer>

        <SliderContainer>
          <Typography sx={{ width: 80, color: "white" }}>{"Radius"}</Typography>
          <AnimationSlider
            value={radius}
            onChange={(_, value) => setRadius(value)}
            min={sliderProps.radius.min}
            max={sliderProps.radius.max}
          />
        </SliderContainer>
      </Box>
    </Box>
  );
};

export default AnimationControls;
