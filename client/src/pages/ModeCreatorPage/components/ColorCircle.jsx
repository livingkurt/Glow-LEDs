import { getDisplayLevel } from "../modeCreatorPageHelpers";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const ColorCircle = ({ color, index, mode }) => {
  return (
    <div>
      <Box
        key={index}
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Tooltip
          title={
            <Typography>
              {`Base Color: ${color.name}`}
              {color.name !== "Blank" && color.saturation !== undefined && (
                <Typography variant="body2">
                  {"Saturation: "}
                  {color.saturation !== undefined
                    ? getDisplayLevel(color.saturation, mode?.microlight?.saturation_levels)
                    : mode?.microlight?.saturation_levels}
                </Typography>
              )}
              {color.name !== "Blank" && color.brightness !== undefined && (
                <Typography variant="body2">
                  {"Brightness: "}
                  {color.brightness !== undefined
                    ? getDisplayLevel(color.brightness, mode?.microlight?.brightness_levels)
                    : mode?.microlight?.brightness_levels}
                </Typography>
              )}
            </Typography>
          }
          arrow
          placement="top"
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: color.colorCode,
              boxShadow: theme => `0 4px 8px ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)"}`,
              cursor: "pointer",
              margin: "0 auto",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme =>
                  `0 6px 12px ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)"}`,
              },
            }}
          />
        </Tooltip>
      </Box>
    </div>
  );
};

export default ColorCircle;
