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
  console.log(`Processing ${filePath}...`);
  const code = fs.readFileSync(filePath, "utf-8");

  // Parse the code into an AST
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  let hasChanges = false;
  let muiImports = new Set();

  // First pass: collect all MUI imports
  traverse.default(ast, {
    ImportDeclaration(nodePath) {
      const source = nodePath.node.source.value;
      if (source === "@mui/material" || source === "@mui/icons-material") {
        nodePath.node.specifiers.forEach(specifier => {
          if (specifier.type === "ImportSpecifier") {
            muiImports.add({
              name: specifier.imported.name,
              source,
              local: specifier.local.name,
            });
          }
        });
        // Mark for removal
        nodePath.remove();
        hasChanges = true;
      }
    },
  });

  // If we found MUI imports, add them back as individual imports
  if (muiImports.size > 0) {
    // Convert Set to Array and sort for consistent output
    const sortedImports = Array.from(muiImports).sort((a, b) => a.name.localeCompare(b.name));

    // Generate individual import statements
    const newImports = sortedImports
      .map(({ name, source, local }) => {
        const importPath = name === "useTheme" ? "@mui/material/styles/useTheme" : `${source}/${name}`;

        const importStatement =
          local === name
            ? `import ${name} from "${importPath}";`
            : `import { ${name} as ${local} } from "${importPath}";`;

        return importStatement;
      })
      .join("\n");

    // Find the best position to insert the new imports
    const program = ast.program;
    const lastImportIndex = program.body.reduce((lastIndex, node, currentIndex) => {
      return node.type === "ImportDeclaration" ? currentIndex : lastIndex;
    }, -1);

    // Parse the new imports
    const newImportNodes = parse(newImports, { sourceType: "module" }).program.body;

    // Insert all new imports after the last import
    program.body.splice(lastImportIndex + 1, 0, ...newImportNodes);
  }

  if (hasChanges) {
    try {
      // Generate the new code and write it back to the file
      const output = generate.default(ast, {
        retainLines: true,
        retainFunctionParens: true,
        compact: false,
        jsescOption: {
          quotes: "double",
        },
      }).code;

      fs.writeFileSync(filePath, output);
      console.log(`Updated imports in ${filePath}`);
    } catch (error) {
      console.error(`Error writing to ${filePath}:`, error.message);
    }
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
      console.error(`Error processing ${file}:`, error.message);
    }
  });

  console.log("Finished updating MUI imports");
}

updateMuiImports();
