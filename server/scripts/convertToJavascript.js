const fs = require("fs");
const path = require("path");

const renameTsToJs = directoryPath => {
  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(directoryPath, file.name);

      if (file.isDirectory()) {
        renameTsToJs(filePath);
      } else if (path.extname(file.name) === ".ts") {
        const newFilePath = path.join(directoryPath, file.name.replace(".ts", ".js"));
        fs.rename(filePath, newFilePath, err => {
          if (err) console.error(`Error renaming file: ${err}`);
          else console.log(`Renamed ${filePath} to ${newFilePath}`);
        });
      }
    });
  });
};

renameTsToJs("/Users/kurtlavacque/Desktop/Glow-LEDs"); // Replace with your directory path
