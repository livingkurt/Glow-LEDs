import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import PatternSelector from "./components/PatternSelector";
import ModePreview from "./components/ModePreview";
import { DragDropContext } from "@hello-pangea/dnd";
import ColorPalette from "./components/ColorPalette";
import ColorSlots from "./components/ColorSlots";
import { GLAutocomplete } from "../../shared/GlowLEDsComponents";
import { snakeCase } from "lodash";
import { modeInitialState, set_mode } from "../../slices/modeSlice";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import useModeCreatorPage from "./useModeCreatorPage";
import ModeCreatorPageSkeleton from "./components/ModeCreatorPageSkeleton";

const ModeCreatorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    mode,
    loading,
    microlightsLoading,
    handleSave,
    handleMicrolightChange,
    handleDragEnd,
    selectedMicrolight,
    macro,
    microlights,
  } = useModeCreatorPage();

  if (loading || microlightsLoading) {
    return <ModeCreatorPageSkeleton />;
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
                dispatch(set_mode({ ...modeInitialState, microlight: mode?.microlight }));
                navigate(`/modes/creator`);
              }}
            >
              {"Reset"}
            </GLButtonV2>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Mode Name"
              value={mode?.name || ""}
              onChange={e => dispatch(set_mode({ name: e.target.value, pathname: snakeCase(e.target.value) }))}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Author Name"
              value={mode?.author || ""}
              onChange={e => dispatch(set_mode({ author: e.target.value }))}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              value={mode?.description || ""}
              onChange={e => dispatch(set_mode({ description: e.target.value }))}
              multiline
              rows={2}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Video"
              value={mode?.video || ""}
              onChange={e => dispatch(set_mode({ video: e.target.value }))}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>{"Visibility"}</InputLabel>
              <Select
                value={mode?.visibility || "public"}
                onChange={e => dispatch(set_mode({ visibility: e.target.value }))}
                label="Visibility"
              >
                <MenuItem value="public">{"Public"}</MenuItem>
                <MenuItem value="private">{"Private"}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {!macro && (
            <Grid item xs={12}>
              <GLAutocomplete
                options={microlights || []}
                value={microlights?.find(m => m._id === mode?.microlight) || null}
                onChange={handleMicrolightChange}
                getOptionLabel={option => option?.name || ""}
                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                label="Microlight"
                size="medium"
                placeholder="Search microlights..."
              />
            </Grid>
          )}

          {mode?.microlight && (
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
                    selectedColors={mode?.colors}
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

          {mode?.microlight && (
            <>
              <Grid item xs={12}>
                <PatternSelector
                  pattern={mode?.flashing_pattern}
                  microlight={selectedMicrolight}
                  onChange={pattern => dispatch(set_mode({ ...mode, flashing_pattern: pattern }))}
                />
              </Grid>

              <Grid item xs={12}>
                <ModePreview mode={mode} pattern={mode?.flashing_pattern} />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
                    {"Cancel"}
                  </Button>
                  {id && (
                    <Button variant="contained" color="secondary" onClick={() => handleSave({ createNew: true })}>
                      {"Create New Mode"}
                    </Button>
                  )}
                  <Button variant="contained" color="primary" onClick={() => handleSave()}>
                    {id ? "Save Mode" : "Create Mode"}
                  </Button>
                </Box>
              </Grid>
            </>
          )}

          {!mode?.microlight && (
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
