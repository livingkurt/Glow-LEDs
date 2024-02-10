export const removePrint = changeColorOnPrintRemoval =>
  `G1 X105 Y195 Z50 F8000 ; Move up and back

M300 S3520 P200 ; A7
M300 S4698.868 P200 ; D8
M300 S5274.04 P200 ; E8
M300 S6271.93 P200 ; G8

G4 S5

G1 X105 Y195 Z1 F8000 ; Lower

G1 X105 Y1 Z1 F8000 ; Remove Print
G1 X105 Y30 Z1 F8000 ; Shake it Out
G1 X105 Y1 Z1 F8000 ; Shake it Out
G1 X105 Y30 Z1 F8000 ; Shake it Out

${changeColorOnPrintRemoval ? "M600; Change Color" : ""}
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
  let beginningArray = [];
  let beginningBoolean = true;
  let middle_start = 0;
  let middle_finished = 0;

  // Identify the start of the gcode (beginning)
  for (let i = 0; i < gcode.length; i++) {
    if (gcode[i].includes("M83 ; use relative distances for extrusion")) {
      beginningBoolean = false;
      beginningArray = [...beginningArray, gcode[i]];
      middle_start = i + 1;
      break;
    } else if (beginningBoolean) {
      beginningArray = [...beginningArray, gcode[i]];
    }
  }

  // Identify the end of the gcode (ending)
  let endingArray = [];
  let endingBoolean = true;
  for (let i = gcode.length - 1; i >= 0; i--) {
    if (gcode[i].includes(";TYPE:Custom")) {
      endingArray = [gcode[i], ...endingArray];
      endingBoolean = false;
      middle_finished = i;
      break;
    } else if (endingBoolean) {
      endingArray = [gcode[i], ...endingArray];
    }
  }

  // Extract the middle section of the gcode
  const middle_array = gcode.slice(middle_start, middle_finished);

  return { beginningArray, middle_array, endingArray };
};

export const updateFilenameDepreciated = (filename, numberOfCopies) => {
  const mainFilename = filename.slice(4).split("_").slice(0, -1).join("_");

  const time = filename?.split("_").pop().split(".")[0];
  const newTime = parseInt(time) * numberOfCopies;
  const hours = Math.floor(newTime / 60);
  const minutes = newTime % 60;
  const formattedTime = `${hours}h${minutes}m`;
  const new_filename = `${numberOfCopies}x ${mainFilename}_${formattedTime}.gcode`;

  return new_filename;
};

export const updateFilename = (filename, numberOfCopies) => {
  // Extract the version and the rest of the name, assuming version is the first part
  let [version, ...rest] = filename.split(" ");
  // Joining the rest back together for further processing
  let restJoined = rest.join(" ");
  // Finding the position to start slicing from by locating the first underscore
  // after "1_2 -" and removing it along with anything before it
  let mainFilenameStart = restJoined.indexOf(" - ") + 3; // Plus 3 to skip " - "
  let mainFilename = restJoined.substring(mainFilenameStart).split("_").slice(0, -1).join("_");

  const time = filename.split("_").pop().split(".")[0];
  const newTime = parseInt(time) * numberOfCopies;
  const hours = Math.floor(newTime / 60);
  const minutes = newTime % 60;
  const formattedTime = `${hours}h${minutes}m`;

  // Constructing the new filename with numberOfCopies right after the version
  const new_filename = `${version} ${numberOfCopies}x - ${mainFilename}_${formattedTime}.gcode`;

  return new_filename;
};

export const saveContinuousGcode = ({ filename, gcode, numberOfCopies, depreciatedFilename }) => {
  let newFilename = updateFilename(filename, numberOfCopies);
  if (depreciatedFilename) {
    newFilename = updateFilenameDepreciated(filename, numberOfCopies);
  }
  const blob = new Blob([gcode], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = newFilename;
  link.click();
};

export const combineGcode = ({ gcodeParts, numberOfCopies, changeColorOnPrintRemoval }) => {
  let gcodeArray = [gcodeParts.file_1.beginning_1];
  const printRemovalGcode = removePrint(changeColorOnPrintRemoval);
  if (numberOfCopies === 1) {
    gcodeArray = [...gcodeArray, gcodeParts.file_1.middle_1, printRemovalGcode, gcodeParts.file_2.ending_2];
  } else if (numberOfCopies === 2) {
    gcodeArray = [
      ...gcodeArray,
      gcodeParts.file_1.middle_1,
      printRemovalGcode,
      gcodeParts.file_2.middle_2,
      printRemovalGcode,
      gcodeParts.file_2.ending_2,
    ];
  } else if (numberOfCopies > 2) {
    gcodeArray = [
      ...gcodeArray,
      gcodeParts.file_1.middle_1,
      printRemovalGcode,
      gcodeParts.file_2.middle_2,
      printRemovalGcode,
    ];
    for (let i = 2; i < numberOfCopies; i++) {
      if (i % 2 === 0) {
        gcodeArray = [...gcodeArray, gcodeParts.file_1.middle_1, printRemovalGcode];
      } else if (i % 2 === 1) {
        gcodeArray = [...gcodeArray, gcodeParts.file_2.middle_2, printRemovalGcode];
      }
    }
    gcodeArray = [...gcodeArray, gcodeParts.file_2.ending_2];
  }

  const array = gcodeArray.map(item => {
    return item.join("\n");
  });
  const gcode = array.join("\n");
  return gcode;
};
