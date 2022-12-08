const trees = [];
const scenicScores = [];

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    trees.push(line.split("").map(t => Number.parseInt(t)));

    const scores = Array(line.length);
    scores.fill(0);
    scenicScores.push(scores);
  },
  solving: () => {

    trees.forEach((row, rowIndex) => {
      row.forEach((tree, columnIndex) => {
        // up
        let up = 0;
        for (let u = rowIndex - 1; u >= 0; u -= 1) {
          up += 1;
          if (tree <= trees[u][columnIndex]) {
            break;
          }
        }
        // left
        let left = 0;
        for (let l = columnIndex - 1; l >= 0; l -= 1) {
          left += 1;
          if (tree <= trees[rowIndex][l]) {
            break;
          }
        }
        // down
        let down = 0;
        for (let d = rowIndex + 1; d < trees.length; d += 1) {
          down += 1;
          if (tree <= trees[d][columnIndex]) {
            break;
          }
        }
        // right
        let right = 0;
        for (let r = columnIndex + 1; r < row.length; r += 1) {
          right += 1;
          if (tree <= trees[rowIndex][r]) {
            break;
          }
        }
        const score = up * left * right * down;
        scenicScores[rowIndex][columnIndex] = score;
      });
    });
    // console.log(trees);
    // console.log(scenicScores);

    let highest = 0;
    scenicScores.forEach((scoreRow) => {
      scoreRow.forEach(score => {
        if (score > highest) {
          highest = score;
        }
      });
    });
    console.log(highest);
  },
};

