const scoreOfShape = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 1, // rock
  Y: 2, // paper
  Z: 3  // scissors
};

const scoreOfOutcome = {
  'A X': 3, // draw
  'A Y': 6, // win
  'A Z': 0, // lose
  'B X': 0, // lose
  'B Y': 3, // draw
  'B Z': 6, // win
  'C X': 6, // win
  'C Y': 0, // lose
  'C Z': 3, // draw
};

const shapes = {
  'A X': 'C',
  'A Y': 'A',
  'A Z': 'B',
  'B X': 'A',
  'B Y': 'B',
  'B Z': 'C',
  'C X': 'B',
  'C Y': 'C',
  'C Z': 'A',
}
const scoreOfOutcome2 = {
  X: 0,
  Y: 3,
  Z: 6,
};

let totalScore = 0;
let totalScore2 = 0;
module.exports = {
  reading: (line) => {
    if (line.length !== 3) {
      return;
    }
    const scoreOfTheRound = scoreOfOutcome[line] + scoreOfShape[line[2]];
    const scoreOfTheRound2 = scoreOfOutcome2[line[2]] + scoreOfShape[shapes[line]];

    totalScore += scoreOfTheRound;
    totalScore2 += scoreOfTheRound2;
  },
  solving: () => {
    console.log(totalScore);
    console.log(totalScore2);
  },
};

