import React from "react";
import { Loading } from "../../../../shared/SharedComponents";
import GLActionModal from "../../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { combineGcode, parseGcode, readFile, saveContinuousGcode } from "./gcodeGeneratorModalHelpers";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFiles,
  resetGcodeGenerator,
  setChangeColorOnPrintRemoval,
  set_loading,
  setNumberOfCopies,
  closeGcodeGeneratorModal,
} from "../../dashboardSlice";
import { Box, Button, Checkbox, FormControlLabel, Grid, List, Paper, TextField } from "@mui/material";

const GcodeGeneratorModal = () => {
  const dispatch = useDispatch();
  const dashboardPage = useSelector(state => state.dashboards);

  const { loading, gcodeContinuousModal, numberOfCopies, gcodeNames, gcodeParts, filename, changeColorOnPrintRemoval } =
    dashboardPage;

  const showFiles = async e => {
    const allFiles = e.target.files;
    console.log({ allFiles });
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
    const gcode = combineGcode({ gcodeParts, numberOfCopies, changeColorOnPrintRemoval });
    if (numberOfCopies !== 0) {
      saveContinuousGcode({ filename, gcode, numberOfCopies });
    }
    dispatch(set_loading(false));
  };

  return (
    <GLActionModal
      isOpen={gcodeContinuousModal}
      onConfirm={() => createNewGcode()}
      onCancel={() => dispatch(closeGcodeGeneratorModal())}
      onAction={() => dispatch(resetGcodeGenerator())}
      title={"Gcode Generater"}
      confirmDisabled={gcodeNames.length === 0}
      confirmLabel={"Generate"}
      confirmColor="primary"
      cancelLabel={"Cancel"}
      cancelColor="secondary"
      actionLabel={"Reset Rates"}
      actionColor="secondary"
      disableEscapeKeyDown
    >
      <Loading loading={loading} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name={"changeColorOnPrintRemoval"}
                size="large"
                onChange={e => {
                  dispatch(setChangeColorOnPrintRemoval(e.target.checked));
                }}
                checked={changeColorOnPrintRemoval}
              />
            }
            label={"Change Color on Print Removal"}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" component="label" fullWidth>
            Choose gcode files
            <input type="file" id="file" hidden multiple onChange={e => showFiles(e)} />
          </Button>
        </Grid>

        <Grid item xs={12}>
          {gcodeNames.map(name => (
            <List className="">
              <Paper>
                <Box p={3}>{name}</Box>
              </Paper>
            </List>
          ))}
        </Grid>
      </Grid>
    </GLActionModal>
  );
};

export default GcodeGeneratorModal;
