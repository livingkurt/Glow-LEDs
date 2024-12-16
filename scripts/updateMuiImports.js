import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to find all .jsx files recursively
function findJsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findJsxFiles(filePath, fileList);
    } else if (path.extname(file) === ".jsx") {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Function to process a single file
function processFile(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");

  // Parse the code into an AST
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  let hasChanges = false;

  // Find and transform MUI imports
  traverse.default(ast, {
    ImportDeclaration(nodePath) {
      const source = nodePath.node.source.value;
      if (source === "@mui/material" || source === "@mui/icons-material") {
        if (nodePath.node.specifiers.length > 0 && nodePath.node.specifiers[0].type === "ImportSpecifier") {
          // Convert destructured imports to individual imports
          const newImports = nodePath.node.specifiers.map(specifier => {
            const importName = specifier.imported.name;
            const importPath =
              source === "@mui/material" ? `@mui/material/${importName}` : `@mui/icons-material/${importName}`;

            // Special case for useTheme
            if (importName === "useTheme") {
              return `import ${importName} from '@mui/material/styles/${importName}';`;
            }

            return `import ${importName} from '${importPath}';`;
          });

          // Replace the original import with the new imports
          const newCode = newImports.join("\\n");
          nodePath.replaceWithMultiple(parse(newCode, { sourceType: "module" }).program.body);
          hasChanges = true;
        }
      }
    },
  });

  if (hasChanges) {
    // Generate the new code and write it back to the file
    const output = generate.default(ast, { retainLines: true }).code;
    fs.writeFileSync(filePath, output);
    console.log(`Updated imports in ${filePath}`);
  }
}

// Main function
function updateMuiImports() {
  const srcDir = path.join(process.cwd(), "client", "src");
  const jsxFiles = findJsxFiles(srcDir);

  console.log(`Found ${jsxFiles.length} .jsx files`);

  jsxFiles.forEach(file => {
    try {
      processFile(file);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  });

  console.log("Finished updating MUI imports");
}

updateMuiImports();
