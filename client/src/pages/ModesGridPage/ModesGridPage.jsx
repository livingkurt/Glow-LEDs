import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Button, Container, Grid, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import GLLoading from "../../shared/GlowLEDsComponents/GLLoading/GLLoading";
import AddIcon from "@mui/icons-material/Add";
import { useModesQuery } from "../../api/allRecordsApi";
import ModeCard from "./components/ModeCard";
import { useEffect } from "react";
import { modeInitialState, set_mode } from "../../slices/modeSlice";
import { useDispatch } from "react-redux";
const ModesGridPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    data: modes,
    isLoading,
    refetch,
  } = useModesQuery({
    visibility: "public",
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCreateMode = () => {
    dispatch(set_mode(modeInitialState));
    navigate("/modes/creator");
  };

  const handleModeClick = mode => {
    navigate(`/modes/${mode._id}`);
  };

  if (isLoading) {
    return <GLLoading />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Helmet>
        <title>{"LED Modes | Glow LEDs"}</title>
        <meta
          name="description"
          content="Browse and create custom LED modes for your Glow LEDs devices. Customize colors, patterns, and share your creations with the community."
        />
      </Helmet>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          {"Helios Modes"}
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreateMode}>
          {"Create Mode"}
        </Button>
      </Box>

      {modes.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            {"No modes available yet"}
          </Typography>
          <Typography color="textSecondary" paragraph>
            {"Be the first to create and share a custom LED mode!"}
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreateMode}>
            {"Create Mode"}
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {modes.map(mode => (
            <Grid
              item
              key={mode._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ModeCard mode={mode} onClick={() => handleModeClick(mode)} isMobile={isMobile} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ModesGridPage;
