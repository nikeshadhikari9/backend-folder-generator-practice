/*
* This files contains the entry logic for the cli like
* - processing user arguments from cli
* - calling all commands delegate to their respective modules
* - 
*/
const logger = require("./src/utils/logger");
logger("red.normal", "ℹ️ Info message");
logger("success", "✅ Success!");
logger("response", "📡 Response received");
logger("warn", "⚠️ Warning");
logger("error", "❌ Error occurred");
logger("debug", "🔍 Debug details");
logger("magenta.dim", "👉 Selected option");
logger("cyan.intense", "⏳ Loading...");


const args = process.argv.slice(2);
let projectName;
if (args[0] === "create:backend") {
    projectName = args[1];
    console.log(`Creating backend project: ${projectName}`);
} else {
    projectName = "My-app"
}
const fs = require("fs");
const path = require("path");
const projectDir = path.join(process.cwd(), projectName);
if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir);
    console.log("\x1b[32m%s\x1b[0m", "Project created successfully!"); // green text
} else {
    console.log("\x1b[32m%s\x1b[0m", "Directory already exists!"); // green text
}
fs.writeFileSync(path.join(projectDir, "server.js"), "//servercode");
