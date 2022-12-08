const commands = [];
const output = [];
let buffer = [];
let dirStack = [];

const getPathFrom = (dirStack) => {
  if (!Array.isArray(dirStack)) {
    return "";
  }

  if (dirStack.length <= 1) {
    return dirStack.join("");
  }

  const result = dirStack[0] + dirStack.slice(1).join("/");
  return result;
};

module.exports = {
  reading: (line) => {
    if (line.length > 0) {
      if (line.startsWith("$")) {
        if (buffer.length > 0) {
          output.push(buffer);
          buffer = [];
        }
        commands.push(line.substring(2));
      } else {
        buffer.push(line);
      }
    }
  },
  solving: () => {
    output.push(buffer);
    buffer = [];

    const dirMap = new Map();
    let size = 0;
    commands.forEach((command) => {
      if (command.startsWith("cd")) {
        const dirName = command.substring(3);
        if (dirName === "..") {
          dirStack.pop();
          const cwd = getPathFrom(dirStack);
          if (dirMap.has(cwd)) {
            const oldSize = dirMap.get(cwd);
            size = oldSize + size;
            dirMap.set(cwd, size);
          }
        } else {
          dirStack.push(dirName);
          size = 0;
        }
      } else if (command.startsWith("ls")) {
        const contents = output.shift();
        contents.forEach((content) => {
          if (!content.startsWith("dir")) {
            size += Number.parseInt(content.split(" ")[0]);
          }
        });
        const cwd = getPathFrom(dirStack);
        dirMap.set(cwd, size);
      }
    });

    // console.log(dirMap);
    let result = 0;
    dirMap.forEach((size) => {
      if (size < 100000) {
        result += size;
      }
    });
    console.log(result);
  },
};
