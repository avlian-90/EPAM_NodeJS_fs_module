import fs from "fs";
import path from "path";

function findDeepestDirectory(absolutePath) {
    fs.readdir(absolutePath, (err, files) => {
        const foldersList = [];
        files.forEach((file) => {
            const stat = fs.statSync(file);
            if (stat.isDirectory()) {
                absolutePath = path.join(directory, file)
                foldersList.push(file);
                findDeepestDirectory(absolutePath);
            }
        })
        console.log(foldersList[foldersList.length - 1]);
    })
}

findDeepestDirectory("/node_modules");