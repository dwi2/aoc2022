const priorities = [];
const isLowerCase = (char) => {
  return char.toLowerCase() === char;
};

let count = 0;
let groups = [];
const allGroups = [];
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    groups.push(line);
    count += 1;
    if (count === 3) {
      allGroups.push(groups);
      groups = [];
      count = 0;
    }
  },
  solving: () => {
    // console.log(allGroups);
    allGroups.forEach(groups => {
      let common = '';
      for (let i = 0; i < groups[0].length; i += 1) {
        const target = groups[0][i];
        if (groups[1].includes(target) && groups[2].includes(target)) {
          common = target;
          break;
        }
      }
      priorities.push(common);
    });

    let result = 0;
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
