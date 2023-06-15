const fs = require("fs");
const path = require("path");

function concatenateStylesRecursively(folderPath) {
  let output = "";
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      output += concatenateStylesRecursively(filePath);
    } else if (
      path.extname(file) === ".css" &&
      !file.startsWith("styles.module")
    ) {
      console.log(file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      output += fileContent + "\n";
    }
  });

  return output;
}

function writeOutputFile(outputContent, folderPath) {
  fs.writeFileSync(path.join(folderPath, "output.css"), outputContent);
}

// Example usage: concatenate contents of all styles.module.css files in "styles" folder and write to output file
const folderPath = "components/TabEditor";
const outputContent = concatenateStylesRecursively(folderPath);
writeOutputFile(outputContent, "./");
