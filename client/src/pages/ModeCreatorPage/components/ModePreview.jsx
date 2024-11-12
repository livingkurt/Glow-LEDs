import { Slider, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useModePreview } from "./useModePreview";

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
  const { canvasRef, speed, setSpeed, trailLength, setTrailLength, size, setSize, blur, setBlur, radius, setRadius } =
    useModePreview({ mode });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <canvas
        ref={canvasRef}
        width={120}
        height={120}
        style={{ width: "100%", backgroundColor: "black", borderRadius: "8px" }}
      />

      <ControlsContainer>
        <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
          {"Animation"}
        </Typography>

        <SliderContainer>
          <AnimationSlider
            value={speed}
            onChange={(_, value) => setSpeed(value)}
            aria-label="Speed"
            min={50}
            max={150}
          />
          <Typography sx={{ color: "white", width: 80 }}>{"Speed"}</Typography>
        </SliderContainer>
        <SliderContainer>
          <AnimationSlider value={trailLength} onChange={(_, value) => setTrailLength(value)} aria-label="Trail" />
          <Typography sx={{ color: "white", width: 80 }}>{"Trail"}</Typography>
        </SliderContainer>

        <SliderContainer>
          <AnimationSlider
            value={size}
            onChange={(_, value) => setSize(value)}
            aria-label="Size"
            min={100}
            max={1000}
          />
          <Typography sx={{ color: "white", width: 80 }}>{"Size"}</Typography>
        </SliderContainer>

        <SliderContainer>
          <AnimationSlider value={blur} onChange={(_, value) => setBlur(value)} aria-label="Blur" min={0} max={200} />
          <Typography sx={{ color: "white", width: 80 }}>{"Blur"}</Typography>
        </SliderContainer>

        <SliderContainer>
          <AnimationSlider
            value={radius}
            onChange={(_, value) => setRadius(value)}
            aria-label="Radius"
            min={0}
            max={1000}
          />
          <Typography sx={{ color: "white", width: 80 }}>{"Radius"}</Typography>
        </SliderContainer>
      </ControlsContainer>

      <Box
        sx={{
          textAlign: "center",
          color: "text.secondary",
          typography: "body2",
          mt: 2,
        }}
      >
        {"Pattern: "}
        {mode.flashing_pattern.name}
        <br />
        {mode.colors.length}
        {" colors • "}
        {mode.flashing_pattern.on_dur}
        {"ms on"}
        {mode.flashing_pattern.off_dur > 0 && ` • ${mode.flashing_pattern.off_dur}ms off`}
        {mode.flashing_pattern.gap_dur > 0 && ` • ${mode.flashing_pattern.gap_dur}ms gap`}
        {mode.flashing_pattern.dash_dur > 0 && ` • ${mode.flashing_pattern.dash_dur}ms dash`}
        {mode.flashing_pattern.group_size > 0 && ` • group of ${mode.flashing_pattern.group_size}`}
        {mode.flashing_pattern.blend_speed > 0 && ` • blend speed ${mode.flashing_pattern.blend_speed}`}
      </Box>
    </Box>
  );
};

export default ModePreview;
