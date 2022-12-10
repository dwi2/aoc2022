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

    let adding = false;
    let instruction;
    let row = '';
    const CRT = [];
    while (instructions.length > 0) {
      if (!adding) {
        instruction = instructions.shift();
      }
      currentCycle += 1;

      // DURING CYCLE
      const drawingPosition = row.length;
      // console.log(currentCycle, drawingPosition, X + 1, X - 1);
      if (drawingPosition <= X + 1 && drawingPosition >= X - 1) {
        row += '#';
      } else {
        row += '.';
      }
      if (row.length === 40) {
        CRT.push(row);
        row = '';
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
      
      // END OF CYCLE
    }

    CRT.forEach(row => {
      console.log(row);
    });
    
  },
};
