const readline = require("readline");
const fs = require("fs");
const path = require("path");

if (process.argv.length < 4) {
  console.log("Please specify the day and input file name");
  console.log("For example: node index day1.js day1-input");
  process.exit(1);
}
const solutionFile = process.argv[2];
const inputFile = process.argv[3];

const solution = require(path.join(process.cwd(), solutionFile));

const readInterface = readline.createInterface({
  input: fs.createReadStream(inputFile),
  console: false,
});

readInterface.on("line", (line) => {
  solution.reading(line);
});

readInterface.on("close", () => {
  solution.solving();
});
