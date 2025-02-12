import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import PatternSelector from "./components/PatternSelector";
import ModePreview from "./components/ModePreview";
import { GLAutocomplete } from "../../shared/GlowLEDsComponents";
import snakeCase from "lodash/snakeCase";
import { modeInitialState, set_mode } from "../../slices/modeSlice";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import useModeCreatorPage from "./useModeCreatorPage";
import ModeCreatorPageSkeleton from "./components/ModeCreatorPageSkeleton";
import AvailableColors from "./components/AvailableColors";
import { isMobile } from "react-device-detect";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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
    handleColorClick,
  } = useModeCreatorPage();

  if (loading || microlightsLoading) {
    return <ModeCreatorPageSkeleton />;
  }

  return (
    <Box sx={{ bgcolor: "black", minHeight: "100vh" }}>
      <Helmet>
        <title>
          {id ? "Edit Mode" : "Create Mode"}
          {" | Glow LEDs"}
        </title>
      </Helmet>

      <Box sx={{ p: 2, bgcolor: "black", color: "white" }}>
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
          {isMobile && (
            <AvailableColors
              selectedMicrolight={selectedMicrolight}
              mode={mode}
              handleDragEnd={handleDragEnd}
              handleColorClick={handleColorClick}
            />
          )}

          {mode?.microlight && (
            <>
              {isMobile && (
                <Grid item xs={12}>
                  <PatternSelector
                    pattern={mode?.flashing_pattern}
                    microlight={selectedMicrolight}
                    onChange={pattern => dispatch(set_mode({ ...mode, flashing_pattern: pattern }))}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <ModePreview
                  mode={mode}
                  selectedMicrolight={selectedMicrolight}
                  handleDragEnd={handleDragEnd}
                  handleColorClick={handleColorClick}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">{"Mode Details"}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mode Name"
                  value={mode?.name || ""}
                  onChange={e => dispatch(set_mode({ name: e.target.value, pathname: snakeCase(e.target.value) }))}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: "white" },
                  }}
                  sx={{
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                    },
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
                    sx: { color: "white" },
                  }}
                  sx={{
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                    },
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
                  InputLabelProps={{
                    sx: { color: "white" },
                  }}
                  sx={{
                    textarea: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Youtube Video ID"
                  value={mode?.video || ""}
                  onChange={e => dispatch(set_mode({ video: e.target.value }))}
                  fullWidth
                  InputLabelProps={{
                    sx: { color: "white" },
                  }}
                  sx={{
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "white" }}>{"Visibility"}</InputLabel>
                  <Select
                    value={mode?.visibility || "public"}
                    onChange={e => dispatch(set_mode({ visibility: e.target.value }))}
                    label="Visibility"
                    sx={{
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    }}
                  >
                    <MenuItem value="public">{"Public"}</MenuItem>
                    <MenuItem value="private">{"Private"}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="flex-end" gap={2}>
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
      </Box>
    </Box>
  );
};

export default ModeCreatorPage;
