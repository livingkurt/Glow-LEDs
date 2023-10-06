export const removePrint = changeColorOnPrintRemoval =>
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
  for (let i = 0; i <= 100; i++) {
    if (gcode[i] === "M83 ; use relative distances for extrusion") {
      beginningBoolean = false;
      beginningArray = [...beginningArray, gcode[i]];
      middle_start = i + 1;
    } else if (beginningBoolean) {
      beginningArray = [...beginningArray, gcode[i]];
    }
  }

  let endingArray = [];
  let endingBoolean = true;
  for (let i = gcode.length - 1; i >= gcode.length - 300; i--) {
    if (gcode[i] === "G4 ; wait") {
      endingArray = [...endingArray, "G4 ; wait"];
      endingBoolean = false;
      middle_finished = i;
    } else if (endingBoolean) {
      endingArray = [...endingArray, gcode[i]];
    }
  }
  const middle_array = gcode.slice(middle_start, middle_finished);

  return { beginningArray, middle_array, endingArray };
};

const updateFilename = (filename, numberOfCopies) => {
  const removed = filename.slice(4);
  const new_filename = `${numberOfCopies}x ${removed}`;

  return new_filename;
};

export const saveContinuousGcode = ({ filename, gcode, numberOfCopies }) => {
  const newFilename = updateFilename(filename, numberOfCopies);
  const blob = new Blob([gcode], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = newFilename;
  link.click();
};

export const combineGcode = ({ gcodeParts, numberOfCopies, changeColorOnPrintRemoval }) => {
  let gcodeArray = [gcodeParts.firstFile.beginning_1];
  const printRemovalGcode = removePrint(changeColorOnPrintRemoval);
  if (numberOfCopies === 1) {
    gcodeArray = [
      ...gcodeArray,
      gcodeParts.firstFile.firstMiddle,
      printRemovalGcode,
      gcodeParts.secondFile.secondending,
    ];
  } else if (numberOfCopies === 2) {
    gcodeArray = [
      ...gcodeArray,
      gcodeParts.firstFile.firstMiddle,
      printRemovalGcode,
      gcodeParts.secondFile.secondMiddle,
      printRemovalGcode,
      gcodeParts.secondFile.secondending,
    ];
  } else if (numberOfCopies > 2) {
    gcodeArray = [
      ...gcodeArray,
      gcodeParts.firstFile.firstMiddle,
      printRemovalGcode,
      gcodeParts.secondFile.secondMiddle,
      printRemovalGcode,
    ];
    for (let i = 2; i < numberOfCopies; i++) {
      if (i % 2 === 0) {
        gcodeArray = [...gcodeArray, gcodeParts.firstFile.firstMiddle, printRemovalGcode];
      } else if (i % 2 === 1) {
        gcodeArray = [...gcodeArray, gcodeParts.secondFile.secondMiddle, printRemovalGcode];
      }
    }
    gcodeArray = [...gcodeArray, gcodeParts.secondFile.secondending];
  }

  const array = gcodeArray.map(item => {
    return item.join("\n");
  });
  const gcode = array.join("\n");
  return gcode;
};
