
const priorities = [];

const isLowerCase = (char) => {
  return char.toLowerCase() === char;
};

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    const middlePoint = line.length / 2;
    const first = line.substring(0, middlePoint);
    const second = line.substring(middlePoint, line.length);
    // console.log(first, second);

    let common = '';
    for (let i = 0; i < first.length; i += 1) {
      if (second.includes(first[i])) {
        common = first[i];
        break;
      }
    }
    // console.log(common);
    priorities.push(common);
  },
  solving: () => {
    let result = 0;
    // console.log(priorities);
    priorities.forEach(p => {
      if (isLowerCase(p)) {
        result += p.codePointAt(0) - 97 + 1; // a
      } else {
        result += p.codePointAt(0) - 65 + 27; // A
      }
    });

    console.log(result);
  }
};
