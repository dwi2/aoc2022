const instructions = [];

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    if (line === 'noop') {
      instructions.push({
        cycle: 1,
        name: 'noop',
      });
    } else {
      const [name, value] = line.split(" ");
      instructions.push({
        cycle: 2,
        name,
        value: Number.parseInt(value),
      });
    }
  },
  solving: () => {
    let currentCycle = 0;
    let X = 1;
    const targetCycles = [20, 60, 100, 140, 180, 220];
    const signalStrengths = [];

    let adding = false;
    let instruction;
    while (instructions.length > 0) {
      if (!adding) {
        instruction = instructions.shift();
      }
      currentCycle += 1;

      // console.log(currentCycle, instruction.name, instruction.value);
      if (targetCycles.includes(currentCycle)) {
        signalStrengths.push(X * currentCycle);
      }
      if (instruction.name === 'addx') {
        if (adding) {
          X += instruction.value;
          adding = false;  
        } else {
          adding = true;
        }
      } else {
        adding = false;
      }
    }

    console.log(signalStrengths);
    const result = signalStrengths.reduce((acc, cur) => {
      return acc + cur;
    }, 0)
    
    console.log(result);
  },
};
