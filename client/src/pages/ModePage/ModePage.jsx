import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Container, Grid, Typography, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { openLoginModal } from "../../slices/userSlice";
import * as API from "../../api";
import { useModePreview } from "../ModeCreatorPage/components/useModePreview";

const ModePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const { mode } = useSelector(state => state.modes.modePage);

  useEffect(() => {
    dispatch(API.detailsMode(id));
  }, [id]);

  const handleCopy = () => {
    if (!current_user._id) {
      dispatch(openLoginModal());
      return;
    }
    navigate(`/modes/creator`);
  };
  const { canvasRef } = useModePreview({ mode });

  return (
    <Box>
      <Helmet>
        <title>{`${mode?.name || "Mode"} | Glow LEDs`}</title>
      </Helmet>

      <Box display="flex" justifyContent="space-between" p={2}>
        <GLBreadcrumbs items={[{ name: "ALL MODES", to: "/modes" }, { name: mode?.name?.toUpperCase() }]} />
        <Box display="flex" gap={2}>
          {current_user._id === mode?.user?._id && (
            <Link to={`/modes/creator/${id}`}>
              <GLButtonV2 variant="contained" color="secondary" startIcon={<Edit />}>
                {"Edit Mode"}
              </GLButtonV2>
            </Link>
          )}
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1",
                bgcolor: "black",
                borderRadius: "1rem",
                overflow: "hidden",
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
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {mode?.name}
              </Typography>

              {mode?.author && (
                <Typography variant="subtitle1" gutterBottom>
                  {"By "} {mode.author}
                </Typography>
              )}
              {!mode?.author && mode?.user && (
                <Typography variant="subtitle1" gutterBottom>
                  {"By "} {mode.user.first_name} {mode.user.last_name}
                </Typography>
              )}

              <Typography variant="body1" gutterBottom mt={2}>
                {mode?.description}
              </Typography>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  {"Mode Details"}
                </Typography>
                <Typography variant="body1">
                  {"Colors: "} {mode?.colors?.length}
                </Typography>
                <Typography variant="body1">
                  {"Pattern: "} {mode?.flashing_pattern?.name}
                </Typography>
                <Typography variant="body1">
                  {"Device: "} {mode?.microlight?.name}
                </Typography>
              </Box>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  {"Colors Used"}
                </Typography>
                <Box display="flex" gap={2}>
                  {mode?.colors?.map((color, index) => (
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
                            {color.saturation !== undefined && (
                              <Box component="div">
                                {`Saturation Level: ${Math.ceil((color.saturation / 100) * (mode.microlight?.saturation_levels || 4))}`}
                              </Box>
                            )}
                            {color.brightness !== undefined && (
                              <Box component="div">
                                {`Brightness Level: ${Math.ceil((color.brightness / 100) * (mode.microlight?.brightness_levels || 4))}`}
                              </Box>
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
                            boxShadow: theme =>
                              `0 4px 8px ${theme.palette.mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)"}`,
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
                  ))}
                </Box>
              </Box>
            </Box>
            <GLButtonV2
              variant="contained"
              color="primary"
              fullWidth
              className="bob"
              sx={{
                fontSize: "1.6rem",
                mt: 2,
                padding: 2,
              }}
              size="large"
              onClick={handleCopy}
            >
              {"Create New Based On This"}
            </GLButtonV2>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ModePage;
