import os from "os";
import fs from "fs";

const userName = os.userInfo().username;

console.log(`Welcome ${userName}!`);

process.on("SIGINT", () => {
    console.log(`Thank you ${userName}, goodbye!`);
    process.exit();
});

process.stdin.on("data", (data) => {
    const command = data.toString().trim();

    switch (command) {

        case ".exit":
            console.log(`Thank you ${userName}, goodbye!`);
            process.exit();
            break;

        case "os --cpus":
            const cpus = os.cpus();
            console.log(`Overall amount of CPUs: ${cpus.length}`);
            cpus.forEach((cpu, index) => {
                console.log(`CPU ${index + 1}: model: ${cpu.model}, clock rate: ${(cpu.speed / 1000).toFixed(2)}GHz`);
            })
            break;

        case "os --homedir":
            console.log(os.homedir());
            break;
    
        case "os --username": 
            console.log(userName);
            break;

        case "os --architecture":
            console.log(os.arch());
            break;

        case "os --hostname": 
            console.log(os.hostname());
            break;

        case "os --platform":
            console.log(os.platform());
            break;

        case "os --memory":
            console.log(os.freemem());
            break;

        case "ls":
            fs.readdir(".", (err, files) => {
                const foldersList = [];
                const filesList = [];
                files.forEach((file) => {
                    const stat = fs.statSync(file);
                    if (stat.isFile()) {
                        filesList.push(file);
                    } else if (stat.isDirectory()) {
                        foldersList.push(file);
                    }    
                });
                foldersList.forEach((folder) => {
                    console.log(`${folder} - directory`);
                });
                filesList.forEach((file) => {
                    console.log(`${file} - file`);
                })
            })
            break;

        default: 
            console.log("Invalid input");
    };

    const commandArr = command.split(" ");

    if (commandArr[0] === "add") {
        fs.writeFile(commandArr[1], "", () => {
            console.log("File is created!")
        })
    } else if (commandArr[0] === "rn") {
        fs.rename(commandArr[1], commandArr[2], () => {
            console.log("File is renamed!");
        })
    } else if (commandArr[0] === "cp") {
        fs.copyFile(commandArr[1], commandArr[2], () => {
            console.log("File is copied!");
        })
    } else if (commandArr[0] === "mv") {

    } else if (commandArr[0] === "rm") {
        fs.unlink(commandArr[1], () => {
            console.log("File is removed!");
        })
    }
    console.log(commandArr);
});

