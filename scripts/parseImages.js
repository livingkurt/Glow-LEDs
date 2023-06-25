const fs = require("fs");
const path = require("path");

// Get the parent directory from the command line arguments
const parentDirectory = process.argv[2];
const targetDirectory = process.argv[3];

// Ensure the target directory exists
if (!fs.existsSync(targetDirectory)) {
  fs.mkdirSync(targetDirectory);
}

// Read all the directories in the parent directory
const directories = fs
  .readdirSync(parentDirectory, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Iterate over each directory
directories.forEach(directory => {
  // Get the full path of the directory
  const directoryPath = path.join(parentDirectory, directory);

  // Read all the files in the directory
  const files = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name);

  // Iterate over each file
  files.forEach(file => {
    // Create the new file name
    const newFileName = `${directory}_${file}`;

    // Get the full path of the file
    const filePath = path.join(directoryPath, file);

    // Get the full path of the new file
    const newFilePath = path.join(targetDirectory, newFileName);

    // Rename (move) the file
    fs.renameSync(filePath, newFilePath);
  });
});
