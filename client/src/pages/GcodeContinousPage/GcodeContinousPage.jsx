import React, { useState } from "react";
import { Loading } from "../../shared/SharedComponents";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { API_Content } from "../../utils";
import { parseGcode, readFile, remove_print, saveContinuousGcode } from "./gcodeContinuousHelper";

function GcodeContinousPage() {
  const [number_of_copies, setNumberOfCopies] = useState(12);
  const [gcodeNames, set_gcodeNames] = useState([]);
  const [gcodeParts, set_gcodeParts] = useState({});

  const [filename, set_filename] = useState("");
  const [status, set_status] = useState("");
  const [loading, set_loading] = useState(false);
  const [color_change, setChangeColorOnPrintRemoveal] = useState(false);

  const showFiles = async e => {
    e.preventDefault();

    for (let index = 0; index < e.target.files.length; index++) {
      const file = e.target.files[index];

      const text = await readFile(file);

      const { beginning_array, middle_array, ending_array } = parseGcode(text);

      const num = index + 1;
      set_gcodeParts(parts => {
        return {
          ...parts,
          ["file_" + num]: {
            ["beginning_" + num]: beginning_array,
            ["middle_" + num]: middle_array,
            ["ending_" + num]: ending_array,
          },
        };
      });

      set_filename(document.getElementById("file").files[0].name);
      set_gcodeNames(name => {
        return [...name, document.getElementById("file").files[index].name];
      });
    }
  };

  const processGcode = async (gcode_array, number_of_copies) => {
    const printRemovalGcode = remove_print(color_change);
    if (number_of_copies === 1) {
      gcode_array = [...gcode_array, gcodeParts.file_1.middle_1, printRemovalGcode, gcodeParts.file_2.ending_2];
    } else if (number_of_copies === 2) {
      gcode_array = [
        ...gcode_array,
        gcodeParts.file_1.middle_1,
        printRemovalGcode,
        gcodeParts.file_2.middle_2,
        printRemovalGcode,
        gcodeParts.file_2.ending_2,
      ];
    } else if (number_of_copies > 2) {
      gcode_array = [
        ...gcode_array,
        gcodeParts.file_1.middle_1,
        printRemovalGcode,
        gcodeParts.file_2.middle_2,
        printRemovalGcode,
      ];
      for (let i = 2; i < number_of_copies; i++) {
        if (i % 2 === 0) {
          gcode_array = [...gcode_array, gcodeParts.file_1.middle_1, printRemovalGcode];
        } else if (i % 2 === 1) {
          gcode_array = [...gcode_array, gcodeParts.file_2.middle_2, printRemovalGcode];
        }
      }
      gcode_array = [...gcode_array, gcodeParts.file_2.ending_2];
    }

    const array = gcode_array.map(item => {
      return item.join("\n");
    });
    const gcode = array.join("\n");
    if (number_of_copies !== 0) {
      saveContinuousGcode({ filename, gcode, number_of_copies });
    }
  };

  const createNewGcode = async e => {
    e.preventDefault();

    set_loading(true);
    let gcode_array = [gcodeParts.file_1.beginning_1];
    processGcode(gcode_array, number_of_copies);
    set_loading(false);
  };
  const create_cascade_gcode = async e => {
    e.preventDefault();

    set_loading(true);
    let gcode_array = [gcodeParts.file_1.beginning_1];
    for (var i = 0; i <= number_of_copies; i += 2) {
      processGcode(gcode_array, i);
    }
    set_loading(false);
  };

  const reset = () => {
    set_filename("");
    set_gcodeNames("");
    set_gcodeParts({});
  };

  return (
    <div className="m-auto">
      <h2 className="ta-c fs-25px ">Gcode Continous Printing</h2>

      <Loading loading={loading} />
      <form className="column m-auto max-w-500px w-100per form">
        <div className="form-item">
          <label className="mr-1rem fw-800">Select Gcode</label>
          <label className="btn primary">
            <label className="">Choose gcode files</label>
            <input className="btn primary" type="file" id="file" multiple onChange={e => showFiles(e)} />
          </label>
        </div>
        {gcodeNames.map(name => (
          <label className="form-item bg-secondary p-15px br-20px">{name}</label>
        ))}

        <div className="form-item">
          <label className="mr-1rem w-50per fw-800">Number of Copies</label>
          <input
            type="number"
            className="w-50per"
            defaultValue={number_of_copies}
            onChange={e => setNumberOfCopies(e.target.value)}
          />
        </div>
        <div className="w-100per mb-2rem">
          <label htmlFor="color_change">Color Change</label>
          <input
            type="checkbox"
            name="color_change"
            defaultChecked={color_change}
            id="color_change"
            onChange={e => {
              setChangeColorOnPrintRemoveal(e.target.checked);
            }}
          />
        </div>

        <div className="form-item">
          <GLButton variant="primary" className="w-100per" onClick={e => createNewGcode(e)}>
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
        </div>
        {status && <label className="form-item btn secondary">{status}</label>}
      </form>
    </div>
  );
}

export default GcodeContinousPage;
