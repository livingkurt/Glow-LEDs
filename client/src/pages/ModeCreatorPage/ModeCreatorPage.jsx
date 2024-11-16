import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
import { GLAutocomplete } from "../../shared/GlowLEDsComponents";
import { openLoginModal } from "../../slices/userSlice";
import { snakeCase } from "lodash";
import { modeInitialState, set_mode } from "../../slices/modeSlice";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";

const ModeCreatorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialSetupDone = useRef(false);
  const [macro] = useState(true); // You can make this dynamic later if needed
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const { mode, loading } = useSelector(state => state.modes.modePage);

  const { data: microlights, isLoading: microlightsLoading } = useMicrolightsQuery();
  // Modify the selectedMicrolight logic to use macro
  const selectedMicrolight = macro
    ? microlights?.find(m => m.name === "Helios")
    : microlights?.find(m => m._id === mode.microlight);

  useEffect(() => {
    if (selectedMicrolight && !initialSetupDone.current) {
      dispatch(
        set_mode({
          microlight: selectedMicrolight._id,
        })
      );
      initialSetupDone.current = true;
    }
  }, [dispatch, mode.flashing_pattern, selectedMicrolight]);

  useEffect(() => {
    const copy = searchParams.get("copy");
    if (id || copy) {
      dispatch(API.detailsMode(id || copy));
    }
  }, [dispatch, id, searchParams]);

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
    if (!current_user._id) {
      dispatch(openLoginModal());
      return;
    }
    const { payload } = await dispatch(
      API.saveMode({
        mode: {
          ...mode,
          _id: searchParams.has("copy") ? undefined : mode._id,
          user: current_user._id,
        },
        copy: searchParams.has("copy"),
      })
    );

    navigate(`/modes/${payload._id}`);
  };

  const handleMicrolightChange = (event, newValue) => {
    if (!newValue) {
      dispatch(
        set_mode({
          microlight: null,
          colors: [],
          flashing_pattern: {
            name: "",
            type: "",
            on_dur: 5,
            off_dur: 8,
            gap_dur: 0,
            dash_dur: 0,
            group_size: 0,
            blend_speed: 0,
          },
        })
      );
      return;
    }

    dispatch(
      set_mode({
        microlight: newValue._id, // Store the ID instead of the whole object
        colors: [], // Reset colors when microlight changes
        flashing_pattern: newValue.flashing_patterns[0] || {
          name: "",
          type: "",
          on_dur: 5,
          off_dur: 8,
          gap_dur: 0,
          dash_dur: 0,
          group_size: 0,
          blend_speed: 0,
        },
      })
    );
  };

  const handleDragEnd = result => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === "color-palette" && destination.droppableId === "color-slots") {
      const newColor = selectedMicrolight.colors[source.index];

      // Add initial maximum levels if controls are enabled
      const colorWithLevels = {
        ...newColor,
        brightness: selectedMicrolight?.brightness_control ? 100 : undefined,
        saturation: selectedMicrolight?.saturation_control ? 100 : undefined,
      };

      const newColors = [...mode.colors];
      newColors.splice(destination.index, 0, colorWithLevels);
      dispatch(set_mode({ colors: newColors }));
    } else if (source.droppableId === "color-slots" && destination.droppableId === "color-slots") {
      const newColors = [...mode.colors];
      const [removed] = newColors.splice(source.index, 1);
      newColors.splice(destination.index, 0, removed);
      dispatch(set_mode({ colors: newColors }));
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
            <Typography variant="h2" textAlign="center">
              {"Helios Mode Editor"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4">{id ? "Edit Mode" : "Create Mode"}</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <GLButtonV2
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(set_mode({ ...modeInitialState, microlight: mode.microlight }));
                navigate(`/modes/creator`);
              }}
            >
              {"Reset"}
            </GLButtonV2>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Mode Name"
              value={mode.name}
              onChange={e => dispatch(set_mode({ name: e.target.value, pathname: snakeCase(e.target.value) }))}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Author"
              value={mode.author}
              onChange={e => dispatch(set_mode({ author: e.target.value }))}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              value={mode.description}
              onChange={e => dispatch(set_mode({ description: e.target.value }))}
              multiline
              rows={2}
              fullWidth
            />
          </Grid>

          {!macro && (
            <Grid item xs={12}>
              <GLAutocomplete
                options={microlights || []}
                value={microlights?.find(m => m._id === mode.microlight) || null}
                onChange={handleMicrolightChange}
                getOptionLabel={option => option?.name || ""}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                label="Microlight"
                size="medium"
                placeholder="Search microlights..."
              />
            </Grid>
          )}

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
                      dispatch(set_mode({ colors: newColors }));
                    }}
                    onUpdate={(index, updatedColor) => {
                      const newColors = [...mode.colors];
                      newColors[index] = updatedColor;
                      dispatch(set_mode({ colors: newColors }));
                    }}
                  />
                </Box>
              </Grid>
            </DragDropContext>
          )}

          {mode.microlight && (
            <>
              <Grid item xs={12}>
                <PatternSelector
                  pattern={mode.flashing_pattern}
                  microlight={selectedMicrolight}
                  onChange={pattern => dispatch(set_mode({ ...mode, flashing_pattern: pattern }))}
                />
              </Grid>

              <Grid item xs={12}>
                <ModePreview mode={mode} pattern={mode.flashing_pattern} />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                    {"Cancel"}
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    {"Save Mode"}
                  </Button>
                </Box>
              </Grid>
            </>
          )}

          {!mode.microlight && (
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
