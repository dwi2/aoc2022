const movesOfHead = [];

const isSameLane = (head, tail) => {
  return head[0] === tail[0] || head[1] === tail[1];
};
const getDistance = (head, tail) => {
  return Math.abs(head[0] - tail[0]) + Math.abs(head[1] - tail[1]);
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
    const tailVisited = new Set();
    let head = [0, 0];
    let tail = [0, 0];
    tailVisited.add('0,0');

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
        const isNotSameLane = !isSameLane(head, tail);
        const distance = getDistance(head, tail);

        if (
          (isNotSameLane && distance <= 2) ||
          (!isNotSameLane && distance <= 1)
        ) {
          // console.log(
          //   direction,
          //   i,
          //   head,
          //   tail,
          //   !isNotSameLane,
          //   distance,
          //   "skip"
          // );
          continue;
        } else if (!isNotSameLane && distance > 1) {
          switch (direction) {
            case "U":
              tail[1] += 1;
              break;
            case "D":
              tail[1] -= 1;
              break;
            case "L":
              tail[0] -= 1;
              break;
            case "R":
              tail[0] += 1;
              break;
          }
        } else {
          switch (direction) {
            case "U":
              tail[0] = head[0] > tail[0] ? tail[0] + 1 : tail[0] - 1;
              tail[1] += 1;
              break;
            case "D":
              tail[0] = head[0] > tail[0] ? tail[0] + 1 : tail[0] - 1;
              tail[1] -= 1;
              break;
            case "L":
              tail[0] -= 1;
              tail[1] = head[1] > tail[1] ? tail[1] + 1 : tail[1] - 1;
              break;
            case "R":
              tail[0] += 1;
              tail[1] = head[1] > tail[1] ? tail[1] + 1 : tail[1] - 1;
              break;
          }
        }
        // console.log(direction, i, head, tail, !isNotSameLane, distance);

        tailVisited.add(`${tail[0]},${tail[1]}`);
      }
    });

    console.log(tailVisited.size);
  },
};
