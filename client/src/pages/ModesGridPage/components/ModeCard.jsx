import { Box, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useModePreview } from "../../ModeCreatorPage/components/useModePreview";
import { random } from "lodash";

const ModeCard = ({ mode }) => {
  const { canvasRef } = useModePreview({ mode });

  return (
    <Link to={`/modes/${mode._id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          bgcolor: "transparent",
          height: "100%",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: `0 12px 24px 0 hsl(${random(0, 360)}deg 50% 50%)`,
          },
          borderRadius: "1rem",
          display: "block",
          flexDirection: "column",
        }}
        elevation={0}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            borderRadius: "1rem",
            transition: "border-radius 0.3s ease-in-out",
            "&:hover": {
              borderRadius: "1rem 1rem 0 0",
            },
            aspectRatio: 1,
            bgcolor: "black",
          }}
        >
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "inherit",
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="body1" color="white" display="block">
              {mode.colors.length} {mode.colors.length === 1 ? "Color" : "Colors"}
              {" •"} {mode.flashing_pattern?.name?.charAt(0).toUpperCase() + mode.flashing_pattern?.name?.slice(1)}
            </Typography>
          </Box>
          <Box display="flex" gap={1} justifyContent="space-between">
            <Typography variant="h6" color="white" gutterBottom>
              {mode.name}
            </Typography>
            {mode?.author && (
              <Typography variant="body1" color="white" display="block">
                {"By "} {mode.author}
              </Typography>
            )}
            {!mode?.author && mode?.user && (
              <Typography variant="body1" color="white" display="block">
                {"By "} {mode.user.first_name} {mode.user.last_name}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

ModeCard.propTypes = {
  mode: PropTypes.object.isRequired,
};

ModeCard.defaultProps = {
  isMobile: false,
};

export default ModeCard;
