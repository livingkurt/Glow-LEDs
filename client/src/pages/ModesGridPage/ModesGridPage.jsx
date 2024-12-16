import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import GLLoading from "../../shared/GlowLEDsComponents/GLLoading/GLLoading";
import AddIcon from "@mui/icons-material/Add";
import { useModesQuery } from "../../api/allRecordsApi";
import ModeCard from "./components/ModeCard";
import { useEffect } from "react";
import { modeInitialState, set_mode } from "../../slices/modeSlice";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
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
    // Reset everything including the setup flag
    dispatch(
      set_mode({
        ...modeInitialState,
        _id: undefined,
      })
    );
    // Force a reload of the creator page to ensure fresh initialization
    navigate("/modes/creator", { replace: true });
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
        <title>{"Helios Community Modes | Glow LEDs"}</title>
        <meta
          name="description"
          content="Browse and create custom LED modes for your Glow LEDs devices. Customize colors, patterns, and share your creations with the community."
        />
      </Helmet>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          {"Helios Community Modes"}
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreateMode}>
          {"Create Mode"}
        </Button>
      </Box>

      {modes.length === 0 ? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            {"No modes available yet"}
          </Typography>
          <Typography color="textSecondary" paragraph>
            {"Be the first to create and share a custom LED mode!"}
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreateMode}>
            {"Create Mode"}
          </Button>
        </Box>
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
