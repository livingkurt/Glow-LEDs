import React from "react";
import { Loading } from "../../../shared/SharedComponents";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { parseGcode, readFile, remove_print, saveContinuousGcode } from "./GcodeContinousPage/gcodeContinuousHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  setGcodeContinuousModal,
  set_color_change,
  set_filename,
  set_gcode_name,
  set_gcode_parts,
  set_loading,
  set_number_of_copies,
} from "../dashboardSlice";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";

const GcodeGeneratorModal = () => {
  const dispatch = useDispatch();
  const dashboardPage = useSelector(state => state.dashboards);

  const { loading, gcodeContinuousModal, number_of_copies, gcode_name, gcode_parts, filename, status, color_change } =
    dashboardPage;

  const showFiles = async e => {
    e.preventDefault();

    for (let index = 0; index < e.target.files.length; index++) {
      const file = e.target.files[index];

      const text = await readFile(file);

      const { beginning_array, middle_array, ending_array } = parseGcode(text);

      const num = index + 1;
      dispatch(
        set_gcode_parts(parts => {
          return {
            ...parts,
            ["file_" + num]: {
              ["beginning_" + num]: beginning_array,
              ["middle_" + num]: middle_array,
              ["ending_" + num]: ending_array,
            },
          };
        })
      );

      dispatch(set_filename(document.getElementById("file").files[0].name));
      dispatch(
        set_gcode_name(name => {
          return [...name, document.getElementById("file").files[index].name];
        })
      );
    }
  };

  const gcode_placer = async (gcode_array, number_of_copies) => {
    const removePrintCode = remove_print(color_change);
    if (number_of_copies === 1) {
      gcode_array = [...gcode_array, gcode_parts.file_1.middle_1, removePrintCode, gcode_parts.file_2.ending_2];
    } else if (number_of_copies === 2) {
      gcode_array = [
        ...gcode_array,
        gcode_parts.file_1.middle_1,
        removePrintCode,
        gcode_parts.file_2.middle_2,
        removePrintCode,
        gcode_parts.file_2.ending_2,
      ];
    } else if (number_of_copies > 2) {
      gcode_array = [
        ...gcode_array,
        gcode_parts.file_1.middle_1,
        removePrintCode,
        gcode_parts.file_2.middle_2,
        removePrintCode,
      ];
      for (let i = 2; i < number_of_copies; i++) {
        if (i % 2 === 0) {
          gcode_array = [...gcode_array, gcode_parts.file_1.middle_1, removePrintCode];
        } else if (i % 2 === 1) {
          gcode_array = [...gcode_array, gcode_parts.file_2.middle_2, removePrintCode];
        }
      }
      gcode_array = [...gcode_array, gcode_parts.file_2.ending_2];
    }

    const array = gcode_array.map(item => {
      return item.join("\n");
    });
    const gcode = array.join("\n");
    if (number_of_copies !== 0) {
      saveContinuousGcode({ filename, gcode, number_of_copies });
    }
  };

  const create_new_gcode = async e => {
    e.preventDefault();

    dispatch(set_loading(true));
    let gcode_array = [gcode_parts.file_1.beginning_1];
    gcode_placer(gcode_array, number_of_copies);
    dispatch(set_loading(false));
  };
  const create_cascade_gcode = async e => {
    e.preventDefault();

    dispatch(set_loading(true));
    let gcode_array = [gcode_parts.file_1.beginning_1];
    for (var i = 0; i <= number_of_copies; i += 2) {
      gcode_placer(gcode_array, i);
    }
    dispatch(set_loading(false));
  };

  const reset = () => {
    dispatch(set_filename(""));
    dispatch(set_gcode_name(""));
    dispatch(set_gcode_parts({}));
  };

  return (
    <GLActionModal
      isOpen={gcodeContinuousModal}
      onConfirm={() => create_new_gcode()}
      onCancel={() => dispatch(setGcodeContinuousModal(false))}
      onAction={() => reset()}
      title={"Gcode Generater"}
      confirmDisabled={gcode_name.length === 0}
      confirmLabel={"Generate"}
      confirmColor="primary"
      cancelLabel={"Cancel"}
      cancelColor="secondary"
      actionLabel={"Reset Rates"}
      actionColor="secondary"
      disableEscapeKeyDown
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <label className="mr-1rem fw-800">Select Gcode</label>
          <label className="btn primary">
            <label className="">Choose gcode files</label>
            <input className="btn primary" type="file" id="file" multiple onChange={e => showFiles(e)} />
          </label>
        </Grid>
        <Grid item xs={12}>
          {gcode_name.map(name => (
            <label className="form-item bg-secondary p-15px br-20px">{name}</label>
          ))}
        </Grid>
        <Grid item xs={12}>
          {/* <label className="mr-1rem w-50per fw-800">Number of Copies</label>
          <input
            type="number"
            className="w-50per"
            defaultValue={number_of_copies}
            onChange={e => dispatch(set_number_of_copies(e.target.value))}
          /> */}
          <TextField
            size="small"
            value={number_of_copies}
            fullWidth
            type="number"
            margin="normal"
            name="number_of_copies"
            label="Number of Copies"
            variant="outlined"
            onChange={e => dispatch(set_number_of_copies(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <div className="w-100per mb-2rem">
            <label htmlFor="color_change">Color Change</label>
            <input
              type="checkbox"
              name="color_change"
              defaultChecked={color_change}
              id="color_change"
              onChange={e => {
                dispatch(set_color_change(e.target.checked));
              }}
            />
          </div> */}
          <FormControlLabel
            control={
              <Checkbox
                name={"color_change"}
                size="large"
                onChange={e => {
                  dispatch(set_color_change(e.target.checked));
                }}
                checked={color_change}
              />
            }
            label={"Color Change"}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <Loading loading={loading} />

      {/* <div className="form-item">
        <GLButton variant="primary" className="w-100per" onClick={e => create_new_gcode(e)}>
          Make Continuous Gcode
        </GLButton>
      </div>
      <div className="form-item">
        <GLButton variant="primary" className="w-100per" onClick={e => create_cascade_gcode(e)}>
          Make Cascade Continuous Gcode
        </GLButton>
      </div>
      <div className="form-item">
        <GLButton variant="primary" className="w-100per" onClick={e => reset(e)}>
          Reset
        </GLButton>
      </div> */}
      {/* {status && <label className="form-item btn secondary">{status}</label>} */}
    </GLActionModal>
  );
};

export default GcodeGeneratorModal;
