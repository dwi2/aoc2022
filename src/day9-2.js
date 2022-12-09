const movesOfHead = [];
const tailVisited = new Set();

const isSameLane = (a, b) => {
  return a[0] === b[0] || a[1] === b[1];
};
const getDistance = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const next = (knotsA, knotsB) => {
  const isNotSameLane = !isSameLane(knotsA, knotsB);
  const distance = getDistance(knotsA, knotsB);

  if ((isNotSameLane && distance <= 2) || (!isNotSameLane && distance <= 1)) {
    // console.log(
    //   direction,
    //   knotsA,
    //   knotsB,
    //   !isNotSameLane,
    //   distance,
    //   "skip"
    // );
    return;
  } else {
    if (knotsB[0] !== knotsA[0]) {
      knotsB[0] = knotsA[0] > knotsB[0] ? knotsB[0] + 1 : knotsB[0] - 1;
    }
    if (knotsB[1] !== knotsA[1]) {
      knotsB[1] = knotsA[1] > knotsB[1] ? knotsB[1] + 1 : knotsB[1] - 1;
    }
  }
  // console.log(direction, knotsA, knotsB, !isNotSameLane, distance);
};

const print = (direction, knots) => {
  let result = direction;
  knots.forEach((knot) => {
    result += ` (${knot[0]}, ${knot[1]})`;
  });
  console.log(result);
};

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    const move = line.split(" ");
    movesOfHead.push({
      direction: move[0],
      steps: Number.parseInt(move[1]),
    });
  },
  solving: () => {
    let head = [0, 0];
    let knots = [];
    for (let n = 0; n < 9; n += 1) {
      knots[n] = [0, 0];
    }
    tailVisited.add("0,0");

    movesOfHead.forEach((move) => {
      const { direction, steps } = move;
      for (let i = 0; i < steps; i += 1) {
        switch (direction) {
          case "U":
            head[1] += 1;
            break;
          case "D":
            head[1] -= 1;
            break;
          case "L":
            head[0] -= 1;
            break;
          case "R":
            head[0] += 1;
            break;
        }

        next(head, knots[0]);
        for (let k = 0; k < knots.length - 1; k += 1) {
          next(knots[k], knots[k + 1]);
        }
        // print(direction, knots);
        tailVisited.add(`${knots[knots.length - 1][0]},${knots[knots.length - 1][1]}`);
      }
    });
    // console.log(tailVisited);
    console.log(tailVisited.size);
  },
};
