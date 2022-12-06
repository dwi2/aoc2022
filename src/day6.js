const streams = [];
const DISTINCT_CHAR_COUNT = 4; // Change this to 14 for part 2
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    streams.push(line);
  },
  solving: () => {
    streams.forEach(stream => {
      const charSet = new Set();
      let left = 0;
      let right = 0;
      let result;
      while (right < stream.length && left < stream.length) {
        for (let i = left; i <= right; i += 1) {
          charSet.add(stream[i]);
        }

        if (charSet.size === DISTINCT_CHAR_COUNT) {
          result = right;
          break;
        }
        right += 1;
        if (right - left > DISTINCT_CHAR_COUNT - 1) {
          charSet.delete(stream[left]);
          left += 1;
        }
      }
      console.log(stream, result + 1);
    });
  },
};
