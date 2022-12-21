const mmap = new Map();

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    const [monkeyName, yelling] = line.split(": ");
    
    if (yelling.match(/[\d]+/)) {
      mmap.set(monkeyName, Number.parseInt(yelling));
    } else {
      mmap.set(monkeyName, yelling);
    }
  },
  solving: () => {
    console.log(mmap);
    // create binary tree
    

  },
};
