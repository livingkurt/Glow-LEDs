import { Box, Link } from "@mui/material";
import { useModePreview } from "./useModePreview";
import AnimationControls from "./AnimationControls";

const ModePreview = ({ mode }) => {
  const previewControls = useModePreview({ mode });
  const { canvasRef } = previewControls;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          backgroundColor: "black",
          borderRadius: "8px",
          aspectRatio: "1 / 1",
          display: "block",
        }}
      />

      <AnimationControls controls={previewControls} />
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        {"Preview inspired by"}{" "}
        <Link href="https://lightshow.lol/" target="_blank" sx={{ color: "white" }}>
          {"lightshow.lol"}
        </Link>
      </Box>
    </Box>
  );
};

export default ModePreview;
