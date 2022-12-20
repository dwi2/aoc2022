const sequence = [];

const originalOrder = [];
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }

    sequence.push({ number: Number.parseInt(line), order: sequence.length });
  },
  solving: () => {
    // console.log(sequence.map((s) => s.number));
    for (
      let originalIndex = 0;
      originalIndex < sequence.length;
      originalIndex += 1
    ) {
      const currentIndex = sequence.findIndex((item) => {
        return item.order === originalIndex;
      });
      const current = sequence[currentIndex];
      // console.log(currentIndex, current);

      const moveTo = (current.number + currentIndex + sequence.length - 1) % (sequence.length - 1);
      if (current.number !== 0) {
        // console.log(`moveTo = ${moveTo}, currentIndex = ${currentIndex}`);
        sequence.splice(currentIndex, 1);
        if (moveTo !== 0) {
          sequence.splice(moveTo, 0, current);
        } else {
          sequence.push(current);
        }
      }
      // console.log(sequence.map((s) => s.number));
    }

    // console.log(sequence.map((s) => s.number));

    const indicesAfterZero = [
      1000 % sequence.length,
      2000 % sequence.length,
      3000 % sequence.length,
    ];

    const indexOfZero = sequence.findIndex((item) => {
      return item.number === 0;
    });
    console.log(
      sequence[(indicesAfterZero[0] + indexOfZero) % sequence.length].number,
      sequence[(indicesAfterZero[1] + indexOfZero) % sequence.length].number,
      sequence[(indicesAfterZero[2] + indexOfZero) % sequence.length].number
    );

    const result = indicesAfterZero.reduce((acc, indexAfterZero) => {
      return acc + sequence[(indexAfterZero + indexOfZero) % sequence.length].number
    }, 0);
    console.log(result);
  },
};
