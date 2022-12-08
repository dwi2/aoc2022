const trees = [];
const visibleTrees = [];

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    trees.push(line);
  },
  solving: () => {
    const highestFromTop = [];
    const highestFromBottom = [];
    for (let i = 0; i < trees[0].length; i += 1) {
      highestFromTop[i] = 0;
      highestFromBottom[i] = 0;
    }
    // go right and down
    trees.forEach((row, rowIndex) => {
      const isEdgeRow = rowIndex === 0 || rowIndex === trees.length - 1;
      visibleTrees[rowIndex] = Array(row.length);
      visibleTrees[rowIndex].fill( isEdgeRow ? 1 : 0);

      let highestFromLeft = 0;
      for (let c = 0; c < row.length; c += 1) {
        const tree = Number.parseInt(row[c]);
        const ht = highestFromTop[c];
        if (tree > ht) {
          highestFromTop[c] = tree;
          visibleTrees[rowIndex][c] = 1;
        }
        if (tree > highestFromLeft) {
          highestFromLeft = tree;
          visibleTrees[rowIndex][c] = 1;
        }
        if (c === 0 || c === row.length - 1) {
          visibleTrees[rowIndex][c] = 1;
        }
      }

      let highestFromRight = 0;
      for (let c = row.length - 1; c >= 0; c -= 1) {
        const tree = Number.parseInt(row[c]);
        if (tree > highestFromRight) {
          highestFromRight = tree;
          visibleTrees[rowIndex][c] = 1;
        }
      }
    });

    for (let rowIndex = trees.length - 1; rowIndex >= 0; rowIndex -= 1) {
      const row = trees[rowIndex];
      for (let c = 0; c < row.length; c += 1) {
        const tree = Number.parseInt(row[c]);
        const hb = highestFromBottom[c];
        if (tree > hb) {
          highestFromBottom[c] = tree;
          visibleTrees[rowIndex][c] = 1;
        }
      }
    }
    let result = 0;
    visibleTrees.forEach(row => {
      result = row.reduce((acc, curr) => acc + curr, result);
    });

    // console.log(visibleTrees);
    visibleTrees.forEach(row => {
      console.log(row.join(""));
    });
    console.log(result);
  },
};

