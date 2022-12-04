const ranges = [];
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    const pairs = line.split(",");
    const range = [];
    pairs.forEach((pair) => {
      range.push(pair.split("-"));
    });
    ranges.push(range);
  },
  solving: () => {
    // console.log(ranges);
    let resultOne = 0;
    let partOfResultTwo = 0;
    ranges.forEach((range) => {
      const first = range[0].map((n) => Number.parseInt(n));
      const second = range[1].map((n) => Number.parseInt(n));
      if (
        (first[0] >= second[0] && first[1] <= second[1]) ||
        (first[0] <= second[0] && first[1] >= second[1])
      ) {
        resultOne += 1;
      } else if (
        (first[0] < second[0] && first[1] >= second[0]) ||
        (first[0] > second[0] && first[0] <= second[1])
      ) {
        partOfResultTwo += 1;
      }
    });
    console.log(resultOne);
    console.log(resultOne + partOfResultTwo);
  },
};
