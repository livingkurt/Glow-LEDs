import React from "react";
import { Loading } from "../../../../shared/SharedComponents";
import GLActionModal from "../../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import {
  combineGcode,
  determineFilename,
  parseGcode,
  readFile,
  saveContinuousGcode,
} from "./gcodeGeneratorModalHelpers";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFiles,
  resetGcodeGenerator,
  setChangeColorOnPrintRemoval,
  set_loading,
  setNumberOfCopies,
  closeGcodeGeneratorModal,
  setCustomFilename,
  setHoldDuration,
  setNumberOfCycles,
} from "../../dashboardSlice";
import { Box, Button, Checkbox, FormControlLabel, Grid, List, Paper, TextField, Typography } from "@mui/material";

const GcodeGeneratorModal = () => {
  const dispatch = useDispatch();
  const dashboardPage = useSelector(state => state.dashboards);

  const {
    loading,
    gcodeContinuousModal,
    numberOfCopies,
    gcodeNames,
    gcodeParts,
    filename,
    changeColorOnPrintRemoval,
    depreciatedFilename,
    customFilename,
    holdDuration,
    numberOfCycles,
    numberOfFiles,
  } = dashboardPage;

  const showFiles = async e => {
    const allFiles = e.target.files;
    const parsedFiles = [];

    for (let index = 0; index < allFiles.length; index++) {
      const file = allFiles[index];
      const text = await readFile(file);
      const parsed = parseGcode(text);
      parsedFiles.push(parsed);
    }
    dispatch(handleFiles({ files: parsedFiles }));
  };

  const createNewGcode = async () => {
    dispatch(set_loading(true));
    const gcode = combineGcode({ gcodeParts, numberOfCopies, numberOfCycles, changeColorOnPrintRemoval, holdDuration });
    if (numberOfCopies !== 0) {
      saveContinuousGcode({ filename, gcode, numberOfCopies, depreciatedFilename, customFilename });
    }
    dispatch(set_loading(false));
  };

  return (
    <GLActionModal
      isOpen={gcodeContinuousModal}
      onConfirm={() => createNewGcode()}
      onCancel={() => dispatch(closeGcodeGeneratorModal())}
      onAction={() => dispatch(resetGcodeGenerator())}
      title="Gcode Generator"
      confirmDisabled={gcodeNames.length === 0}
      confirmLabel="Generate"
      confirmColor="primary"
      cancelLabel="Cancel"
      cancelColor="secondary"
      actionLabel="Reset Generator"
      actionColor="secondary"
      disableEscapeKeyDown
    >
      <Loading loading={loading} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" fontSize={16}>
            {"Step 1: Select any number of gcode files"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" component="label" fullWidth>
            {"Choose gcode files"}
            <input type="file" id="file" hidden multiple accept=".gcode" onChange={e => showFiles(e)} />
          </Button>
        </Grid>
        {numberOfFiles > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" fontSize={16}>
              {"Step 2: Add Modifications"}
            </Typography>
          </Grid>
        )}
        {numberOfFiles > 0 && (
          <Grid item xs={12}>
            <TextField
              size="small"
              value={customFilename}
              fullWidth
              margin="normal"
              name="filename"
              label="New Filename (Optional)"
              variant="outlined"
              onChange={e => dispatch(setCustomFilename(e.target.value))}
            />
          </Grid>
        )}
        {numberOfFiles > 0 && (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="changeColorOnPrintRemoval"
                  size="large"
                  onChange={e => {
                    dispatch(setChangeColorOnPrintRemoval(e.target.checked));
                  }}
                  checked={changeColorOnPrintRemoval}
                />
              }
              label="Change Color on Print Removal"
            />
          </Grid>
        )}
        {numberOfFiles > 0 && (
          <Grid item xs={6}>
            <TextField
              size="small"
              value={holdDuration}
              fullWidth
              type="number"
              margin="normal"
              name="holdDuration"
              label="Hold Duration (Between Prints) in Seconds"
              variant="outlined"
              onChange={e => dispatch(setHoldDuration(e.target.value))}
            />
          </Grid>
        )}
        {numberOfFiles === 2 && (
          <Grid item xs={6}>
            <TextField
              size="small"
              value={numberOfCopies}
              fullWidth
              type="number"
              margin="normal"
              name="numberOfCopies"
              label="Number of Copies"
              variant="outlined"
              onChange={e => dispatch(setNumberOfCopies(e.target.value))}
            />
          </Grid>
        )}
        {numberOfFiles > 2 && (
          <Grid item xs={6}>
            <TextField
              size="small"
              value={numberOfCycles}
              fullWidth
              type="number"
              margin="normal"
              name="numberOfCycles"
              label="Number of Cycles"
              variant="outlined"
              onChange={e => dispatch(setNumberOfCycles(e.target.value))}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          {gcodeNames.map(name => (
            <List className="">
              <Paper>
                <Box p={3}>{name}</Box>
              </Paper>
            </List>
          ))}
        </Grid>
        {gcodeNames.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" fontSize={16}>
              {"New Filename"}
            </Typography>
            <Paper>
              <Box p={3}>
                {determineFilename(gcodeNames.length > 0 ? gcodeNames[0] : "", numberOfCopies, customFilename)}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </GLActionModal>
  );
};

export default GcodeGeneratorModal;
