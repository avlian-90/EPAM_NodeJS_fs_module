import fs from "fs";
import path from "path";

function findDeepestDirectory(directory) {
    let deepestDir = '';
    let maxDepth = 0;
  
    function readDir(currentDir, depth) {
      const files = fs.readdirSync(currentDir);
  
      files.forEach(file => {
        const filePath = path.join(currentDir, file);
        const stats = fs.statSync(filePath);
  
        if (stats.isDirectory()) {
          if (depth > maxDepth) {
            maxDepth = depth;
            deepestDir = filePath;
          }
  
          readDir(filePath, depth + 1);
        }
      });
    }
  
    readDir(directory, 1);

    const newFilePath = path.join(deepestDir, "file.txt");
  
    fs.writeFileSync(newFilePath, "Hello world!");
}

findDeepestDirectory("node_modules");

