import React, { useState } from "react";
import { GLButton } from "../../components/GlowLEDsComponents";
import { Loading } from "../../components/UtilityComponents";
import { API_Content } from "../../utils";

function GcodeContinousPage() {
  const [number_of_copies, set_number_of_copies] = useState(12);
  const [gcode_name, set_gcode_name] = useState([]);
  const [gcode_parts, set_gcode_parts] = useState({});

  const [filename, set_filename] = useState("");
  const [status, set_status] = useState("");
  const [loading, set_loading] = useState(false);
  const [color_change, set_color_change] = useState(false);
  const [cascade, set_cascade] = useState(false);

  const remove_print = `G1 X105 Y195 Z50 F8000 ; Move up and back
  
  M300 S3520 P200 ; A7
  M300 S4698.868 P200 ; D8
  M300 S5274.04 P200 ; E8
  M300 S6271.93 P200 ; G8
  
  G4 S20

	G1 X105 Y195 Z1 F8000 ; Lower

  G1 X105 Y1 Z1 F8000 ; Remove Print
  G1 X105 Y30 Z1 F8000 ; Shake it Out
  G1 X105 Y1 Z1 F8000 ; Shake it Out
  G1 X105 Y30 Z1 F8000 ; Shake it Out

  ${color_change ? "M600; Change Color" : ""}
  `.split("\n");

  const showFiles = async e => {
    e.preventDefault();

    for (let index = 0; index < e.target.files.length; index++) {
      const reader = new FileReader();
      let text = [];
      const file = e.target.files[index];
      reader.onload = async e => {
        text = e.target.result;
        const gcode = text.split("\n");
        let beginning_array = [];
        let beginning_boolean = true;
        let middle_start = 0;
        let middle_finished = 0;
        for (let i = 0; i <= 100; i++) {
          if (gcode[i] === "M83 ; use relative distances for extrusion") {
            beginning_boolean = false;
            beginning_array = [...beginning_array, gcode[i]];
            middle_start = i + 1;
          } else if (beginning_boolean) {
            beginning_array = [...beginning_array, gcode[i]];
          }
        }

        let ending_array = [];
        let ending_boolean = true;

        for (let i = gcode.length - 1; i >= gcode.length - 300; i--) {
          if (gcode[i] === "G4 ; wait") {
            ending_array = [...ending_array, "G4 ; wait"];
            ending_boolean = false;
            middle_finished = i;
          } else if (ending_boolean) {
            ending_array = [...ending_array, gcode[i]];
          }
        }
        const middle_array = gcode.slice(middle_start, middle_finished);
        const num = index + 1;
        set_gcode_parts(parts => {
          return {
            ...parts,
            ["file_" + num]: {
              ["beginning_" + num]: beginning_array,
              ["middle_" + num]: middle_array,
              ["ending_" + num]: ending_array
            }
          };
        });
      };

      reader.readAsText(file);
      set_filename(document.getElementById("file").files[0].name);
      set_gcode_name(name => {
        return [...name, document.getElementById("file").files[index].name];
      });
    }
  };

  const gcode_placer = async (gcode_array, number_of_copies) => {
    if (number_of_copies === 1) {
      gcode_array = [...gcode_array, gcode_parts.file_1.middle_1, remove_print, gcode_parts.file_2.ending_2];
    } else if (number_of_copies === 2) {
      gcode_array = [
        ...gcode_array,
        gcode_parts.file_1.middle_1,
        remove_print,
        gcode_parts.file_2.middle_2,
        remove_print,
        gcode_parts.file_2.ending_2
      ];
    } else if (number_of_copies > 2) {
      gcode_array = [...gcode_array, gcode_parts.file_1.middle_1, remove_print, gcode_parts.file_2.middle_2, remove_print];
      for (let i = 2; i < number_of_copies; i++) {
        if (i % 2 === 0) {
          gcode_array = [...gcode_array, gcode_parts.file_1.middle_1, remove_print];
        } else if (i % 2 === 1) {
          gcode_array = [...gcode_array, gcode_parts.file_2.middle_2, remove_print];
        }
      }
      gcode_array = [...gcode_array, gcode_parts.file_2.ending_2];
    }

    const array = gcode_array.map(item => {
      return item.join("\n");
    });
    const gcode = array.join("\n");
    if (number_of_copies !== 0) {
      const response = await API_Content.export_gcode(update_filename(filename, number_of_copies), gcode);
      if (response) {
        set_loading(false);
        set_status(`Created ${update_filename(filename, number_of_copies)}`);
      }
    }
  };

  const update_filename = (filename, number_of_copies) => {
    const removed = filename.slice(4);
    const new_filename = `${number_of_copies}x ${removed}`;

    return new_filename;
  };

  const create_new_gcode = async e => {
    e.preventDefault();

    set_loading(true);
    let gcode_array = [gcode_parts.file_1.beginning_1];
    gcode_placer(gcode_array, number_of_copies);
  };
  const create_cascade_gcode = async e => {
    e.preventDefault();

    set_loading(true);
    let gcode_array = [gcode_parts.file_1.beginning_1];
    for (var i = 0; i <= number_of_copies; i += 2) {
      gcode_placer(gcode_array, i);
    }
  };

  const reset = () => {
    set_filename("");
    set_gcode_name("");
    set_gcode_parts({});
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
        {gcode_name.map(name => (
          <label className="form-item bg-secondary p-15px br-20px">{name}</label>
        ))}

        <div className="form-item">
          <label className="mr-1rem w-50per fw-800">Number of Copies</label>
          <input type="number" className="w-50per" defaultValue={number_of_copies} onChange={e => set_number_of_copies(e.target.value)} />
        </div>
        <div className="w-100per mb-2rem">
          <label htmlFor="color_change">Color Change</label>
          <input
            type="checkbox"
            name="color_change"
            defaultChecked={color_change}
            id="color_change"
            onChange={e => {
              set_color_change(e.target.checked);
            }}
          />
        </div>
        {/* <div className="w-100per mb-2rem">
					<label htmlFor="color_change">Cascade</label>
					<input
						type="checkbox"
						name="color_change"
						defaultChecked={color_change}
						id="color_change"
						onChange={(e) => {
							set_cascade(e.target.checked);
						}}
					/>
				</div> */}

        <div className="form-item">
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
        </div>
        {status && <label className="form-item btn secondary">{status}</label>}
      </form>
    </div>
  );
}

export default GcodeContinousPage;
