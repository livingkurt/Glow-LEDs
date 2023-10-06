export const remove_print = color_change =>
  `G1 X105 Y195 Z50 F8000 ; Move up and back

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

export const readFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export const parseGcode = text => {
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

  return { beginning_array, middle_array, ending_array };
};

const update_filename = (filename, number_of_copies) => {
  const removed = filename.slice(4);
  const new_filename = `${number_of_copies}x ${removed}`;

  return new_filename;
};

export const saveContinuousGcode = ({ filename, gcode, number_of_copies }) => {
  const newFilename = update_filename(filename, number_of_copies);
  const blob = new Blob([gcode], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = newFilename;
  link.click();
};
