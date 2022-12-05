const stacks = [];
// 1, 5, 9, 13, 17, 21, 25, 29, 33
for (let i = 0 ; i < 9; i += 1) {
  stacks[i] = [];
}

const cargoIndices = [1, 5, 9, 13, 17, 21, 25, 29, 33];
const instructions = [];

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }


    if (line.includes('[')) {
      // console.log(line[1], line[5], line[9], line[13], line[17], line[21], line[25], line[29], line[33]);
      for (let i = 0; i < cargoIndices.length; i+= 1) {
        const index = cargoIndices[i];
        if (line[index] && line[index] !== ' ') {
          stacks[i].unshift(line[index]);
        }
      }
    } else if (line.includes('move')) {
      const pattern = /move (\d+) from (\d+) to (\d+)/;
      const result = line.match(pattern);
      instructions.push({
        move: Number.parseInt(result[1]),
        from: Number.parseInt(result[2]),
        to: Number.parseInt(result[3])
      });
    }

  },
  solving: () => {
    instructions.forEach(instruction => {
      const src = instruction.from - 1;
      const dest = instruction.to - 1;
      const num = instruction.move;
      const startIndex = stacks[src].length - num;
      const cargos = stacks[src].splice(startIndex, num);
      stacks[dest] = stacks[dest].concat(cargos);
    });

    let result = '';
    stacks.forEach(stack => {
      if (stack.length > 0) {
        result += stack[stack.length - 1];
      }
    });
    console.log(result);
  },
};
