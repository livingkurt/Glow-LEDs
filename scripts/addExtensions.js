const fs = require("fs");
const path = require("path");

function addExtensions(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      addExtensions(filePath);
    } else if (path.extname(file) === ".js") {
      let content = fs.readFileSync(filePath, "utf8");
      content = content.replace(/from ['"](\.[^'"]+)['"]/g, (match, p1) => {
        if (!p1.endsWith(".js")) {
          return `from '${p1}.js'`;
        }
        return match;
      });
      fs.writeFileSync(filePath, content);
    }
  });
}

addExtensions("./server");
