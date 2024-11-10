import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Button, Container, TextField, Typography, MenuItem, Paper, Grid } from "@mui/material";
import * as API from "../../api";
import { useMicrolightsQuery } from "../../api/allRecordsApi";
import GLLoading from "../../shared/GlowLEDsComponents/GLLoading/GLLoading";
import { showError } from "../../slices/snackbarSlice";
import PatternSelector from "./components/PatternSelector";
import ModePreview from "./components/ModePreview";
import { DragDropContext } from "@hello-pangea/dnd";
import ColorPalette from "./components/ColorPalette";
import ColorSlots from "./components/ColorSlots";

const ModeCreatorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState({
    name: "",
    description: "",
    colors: [],
    microlight: null,
    flashing_pattern: {
      pattern_type: "solid",
      speed: 50,
      direction: "forward",
    },
    visibility: "public",
  });

  const { data: microlights, isLoading: microlightsLoading } = useMicrolightsQuery();

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(API.detailsMode(id))
        .unwrap()
        .then(data => {
          if (data.user !== current_user._id) {
            dispatch(showError({ message: "You do not have permission to edit this mode" }));
            navigate("/modes/creator");
            return;
          }
          setMode(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          navigate("/modes/creator");
        });
    }
  }, [dispatch, id, current_user._id, navigate]);

  const handleSave = async () => {
    if (!mode.microlight) {
      dispatch(showError({ message: "Please select a microlight" }));
      return;
    }

    if (!mode.name.trim()) {
      dispatch(showError({ message: "Please enter a name for your mode" }));
      return;
    }

    if (mode.colors.length === 0) {
      dispatch(showError({ message: "Please add at least one color" }));
      return;
    }

    setLoading(true);
    try {
      const savedMode = await dispatch(
        API.saveMode({
          ...mode,
          user: current_user._id,
        })
      ).unwrap();
      navigate(`/modes/${savedMode._id}`);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleMicrolightChange = event => {
    const selectedMicrolight = microlights.find(m => m._id === event.target.value);
    setMode({
      ...mode,
      microlight: event.target.value,
      colors: [], // Reset colors when microlight changes
      flashing_pattern: {
        pattern_type: selectedMicrolight.flashing_patterns[0]?.name || "solid", // Set first available pattern
        speed: 50,
        direction: "forward",
      },
    });
  };
  const selectedMicrolight = microlights?.find(m => m._id === mode.microlight);
  const handleDragEnd = result => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If dropping from palette to slots
    if (source.droppableId === "color-palette" && destination.droppableId === "color-slots") {
      const selectedColor = selectedMicrolight.colors[source.index];
      const newColors = [...mode.colors];

      // Insert the color at the destination index
      if (destination.index >= newColors.length) {
        // If dropping beyond current array length, just push it
        newColors.push(selectedColor);
      } else {
        // Insert at specific position
        newColors.splice(destination.index, 0, selectedColor);
      }

      // Trim array if it exceeds max slots
      if (newColors.length > selectedMicrolight.colors_per_mode) {
        newColors.length = selectedMicrolight.colors_per_mode;
      }

      setMode({ ...mode, colors: newColors });
    }
    // If reordering within slots
    else if (source.droppableId === "color-slots" && destination.droppableId === "color-slots") {
      const newColors = Array.from(mode.colors);
      const [removed] = newColors.splice(source.index, 1);
      newColors.splice(destination.index, 0, removed);
      setMode({ ...mode, colors: newColors });
    }
  };
  if (loading || microlightsLoading) {
    return <GLLoading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Helmet>
        <title>
          {id ? "Edit Mode" : "Create Mode"}
          {" | Glow LEDs"}
        </title>
      </Helmet>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">{id ? "Edit Mode" : "Create Mode"}</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Mode Name"
              value={mode.name}
              onChange={e => setMode({ ...mode, name: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              value={mode.description}
              onChange={e => setMode({ ...mode, description: e.target.value })}
              multiline
              rows={2}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Microlight"
              value={mode.microlight || ""}
              onChange={handleMicrolightChange}
              fullWidth
            >
              {microlights?.map(microlight => (
                <MenuItem key={microlight._id} value={microlight._id}>
                  {microlight.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {mode.microlight && (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Grid item xs={12}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {"Available Colors"}
                  </Typography>
                  <ColorPalette colors={selectedMicrolight.colors} />

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    {"Selected Colors ("}
                    {selectedMicrolight.colors_per_mode} {"max)"}
                  </Typography>
                  <ColorSlots
                    selectedColors={mode.colors}
                    maxSlots={selectedMicrolight.colors_per_mode}
                    microlight={selectedMicrolight}
                    onRemove={index => {
                      const newColors = [...mode.colors];
                      newColors.splice(index, 1);
                      setMode({ ...mode, colors: newColors });
                    }}
                    onUpdate={(index, updatedColor) => {
                      const newColors = [...mode.colors];
                      newColors[index] = updatedColor;
                      setMode({ ...mode, colors: newColors });
                    }}
                  />
                </Box>
              </Grid>
            </DragDropContext>
          )}
          {mode.microlight ? (
            <Grid item xs={12}>
              <PatternSelector
                pattern={mode.flashing_pattern}
                patterns={microlights?.find(m => m._id === mode.microlight)?.flashing_patterns || []}
                onChange={pattern => setMode({ ...mode, flashing_pattern: pattern })}
              />
              <ModePreview mode={mode} />

              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                  {"Cancel"}
                </Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  {"Save Mode"}
                </Button>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center">
                {"Please select a microlight first"}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ModeCreatorPage;
