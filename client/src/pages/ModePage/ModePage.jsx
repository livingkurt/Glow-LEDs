import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Button, Container, Paper, Typography, IconButton, Tooltip } from "@mui/material";
import * as API from "../../api";
import GLLoading from "../../shared/GlowLEDsComponents/GLLoading/GLLoading";
import ModePreview from "../ModeCreatorPage/components/ModePreview";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import { showSuccess } from "../../slices/snackbarSlice";

const ModePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(null);

  useEffect(() => {
    const fetchMode = async () => {
      try {
        const data = await dispatch(API.detailsMode(id)).unwrap();
        setMode(data);
      } catch (error) {
        navigate("/modes");
      } finally {
        setLoading(false);
      }
    };

    fetchMode();
  }, [dispatch, id, navigate]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    dispatch(showSuccess({ message: "Link copied to clipboard" }));
  };

  const handleUseAsTemplate = () => {
    const templateMode = {
      ...mode,
      _id: null,
      name: `${mode.name} Copy`,
      user: null,
    };
    navigate("/modes/creator", { state: { templateMode } });
  };

  const handleEdit = () => {
    navigate(`/modes/creator/${id}`);
  };

  if (loading || !mode) {
    return <GLLoading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Helmet>
        <title>{`${mode.name} | LED Mode | Glow LEDs`}</title>
        <meta
          name="description"
          content={`Check out this custom LED mode for ${mode.microlight?.name || "Glow LEDs devices"}. ${mode.description || ""}`}
        />
      </Helmet>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {mode.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {"For "}
            {mode.microlight?.name || "Unknown Device"}
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Tooltip title="Share Mode">
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Use as Template">
            <IconButton onClick={handleUseAsTemplate}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          {mode.user === mode.current_user?._id && (
            <Tooltip title="Edit Mode">
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <Paper elevation={3} sx={{ mb: 4 }}>
        <ModePreview mode={mode} />
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {"Details"}
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {"Pattern Type"}
            </Typography>
            <Typography>
              {mode.flashing_pattern.name.charAt(0).toUpperCase() + mode.flashing_pattern.name.slice(1)}
            </Typography>
          </Box>
          {mode.flashing_pattern.name !== "solid" && (
            <>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  {"Speed"}
                </Typography>
                <Typography>
                  {mode.flashing_pattern.speed}
                  {"%"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  {"Direction"}
                </Typography>
                <Typography>
                  {mode.flashing_pattern.direction.charAt(0).toUpperCase() + mode.flashing_pattern.direction.slice(1)}
                </Typography>
              </Box>
            </>
          )}
          {mode.description && (
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                {"Description"}
              </Typography>
              <Typography>{mode.description}</Typography>
            </Box>
          )}
        </Box>
      </Paper>

      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleUseAsTemplate}
          startIcon={<ContentCopyIcon />}
        >
          {"Use this Mode as Template"}
        </Button>
      </Box>
    </Container>
  );
};

export default ModePage;
