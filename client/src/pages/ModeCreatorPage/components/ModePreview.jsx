import { Box, Link, Typography } from "@mui/material";
import { useModePreview } from "./useModePreview";
import AnimationControls from "./AnimationControls";
import AvailableColors from "./AvailableColors";
import PatternSelector from "./PatternSelector";
import { useDispatch } from "react-redux";
import { set_mode } from "../../../slices/modeSlice";
import { isMobile } from "react-device-detect";

const ModePreview = ({ mode, handleDragEnd, handleColorClick, selectedMicrolight }) => {
  const dispatch = useDispatch();
  const previewControls = useModePreview({ mode });
  const { canvasRef } = previewControls;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
        {!isMobile && (
          <>
            <Box
              sx={{
                position: "absolute",
                top: 16,
                marginLeft: "16px",
                backgroundColor: "#333333",
                borderRadius: 2,
                p: 2,
                color: "white",
                width: "100%",
                maxWidth: "650px",
              }}
            >
              <AvailableColors
                selectedMicrolight={selectedMicrolight}
                mode={mode}
                handleDragEnd={handleDragEnd}
                handleColorClick={handleColorClick}
              />
              <PatternSelector
                pattern={mode?.flashing_pattern}
                microlight={selectedMicrolight}
                onChange={pattern => dispatch(set_mode({ ...mode, flashing_pattern: pattern }))}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                marginLeft: "16px",
                backgroundColor: "#333333",
                borderRadius: 2,
                p: 2,
                color: "white",
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <AnimationControls controls={previewControls} />
            </Box>
          </>
        )}
        {!isMobile && (
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
        )}
        {isMobile && (
          <Typography
            sx={{
              color: "black",
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            {"Preview inspired by"}{" "}
            <Link href="https://lightshow.lol/" target="_blank">
              {"lightshow.lol"}
            </Link>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ModePreview;
