const ROCK_LIMIT = 2023;
const jets = [];

const toKey = (x, y) => {
  return `${x},${y}`;
};

const fromKey = (key) => {
  return key.split(",").map((n) => Number.parseInt(n));
};

const print = (tetris, movingRock, currentHeight) => {
  for (let y = currentHeight + 7; y >= 0; y -= 1) {
    let line = "";
    for (let x = 0; x <= 6; x += 1) {
      if (tetris.has(toKey(x, y))) {
        line += "#";
      } else if (movingRock.has(toKey(x, y))) {
        line += "@";
      } else {
        line += ".";
      }
    }
    console.log(line);
  }
  console.log("\n");
};

const getNextRock = (currentHeight, number) => {
  const next = number % 5;
  let result = [];
  switch (next) {
    case 0:
      // |..@@@@.|
      result = [
        { x: 2, y: currentHeight + 4 },
        { x: 3, y: currentHeight + 4 },
        { x: 4, y: currentHeight + 4 },
        { x: 5, y: currentHeight + 4 },
      ];
      break;
    case 1:
      // |...@...|
      // |..@@@..|
      // |...@...|
      result = [
        { x: 3, y: currentHeight + 4 },
        { x: 2, y: currentHeight + 5 },
        { x: 3, y: currentHeight + 5 },
        { x: 4, y: currentHeight + 5 },
        { x: 3, y: currentHeight + 6 },
      ];
      break;
    case 2:
      // |....@..|
      // |....@..|
      // |..@@@..|
      result = [
        { x: 2, y: currentHeight + 4 },
        { x: 3, y: currentHeight + 4 },
        { x: 4, y: currentHeight + 4 },
        { x: 4, y: currentHeight + 5 },
        { x: 4, y: currentHeight + 6 },
      ];
      break;
    case 3:
      // |..@....|
      // |..@....|
      // |..@....|
      // |..@....|
      result = [
        { x: 2, y: currentHeight + 4 },
        { x: 2, y: currentHeight + 5 },
        { x: 2, y: currentHeight + 6 },
        { x: 2, y: currentHeight + 7 },
      ];
      break;
    case 4:
      // |..@@...|
      // |..@@...|
      result = [
        { x: 2, y: currentHeight + 4 },
        { x: 3, y: currentHeight + 4 },
        { x: 2, y: currentHeight + 5 },
        { x: 3, y: currentHeight + 5 },
      ];
      break;
  }
  return result;
};

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }

    line.split("").forEach((order) => {
      if (order === ">") {
        jets.push(1);
      } else {
        // order === "<"
        jets.push(-1);
      }
    });
  },
  solving: () => {
    let currentHeight = -1;
    const tetris = new Set();
    const movingRock = new Set();
    let rockNumber = 0;
    let loop = 0;

    while (rockNumber < ROCK_LIMIT) {
      const jet = jets[loop % jets.length];

      // print(tetris, movingRock, currentHeight);
      // console.log(jet > 0 ? ">\n" : "<\n");

      if (movingRock.size === 0) {
        const rock = getNextRock(currentHeight, rockNumber);
        rock.forEach(({ x, y }) => {
          movingRock.add(toKey(x, y));
        });
        rockNumber += 1;
      }

      let pushable = true;
      // 0. check if it is possible to push
      for (const coord of movingRock.values()) {
        const [x, y] = fromKey(coord);
        const toTheRight = jet > 0;
        const toTheLeft = !toTheRight;
        if (
          (toTheRight && x === 6) ||
          (toTheLeft && x === 0) ||
          (toTheRight && tetris.has(toKey(x + 1, y))) ||
          (toTheLeft && tetris.has(toKey(x - 1, y)))
        ) {
          pushable = false;
          break;
        }
      }
      // console.log(`pushable = ${pushable}`);
      if (pushable) {
        const nextCoords = [];
        // 1. push by jet
        movingRock.forEach((coord) => {
          let [x, y] = fromKey(coord);
          movingRock.delete(toKey(x, y));
          x += jet;
          nextCoords.push([x, y]);
        });
        nextCoords.forEach(([x, y]) => {
          movingRock.add(toKey(x, y));
        });
      }
      // 2. check if it is possible to fall
      let fallable = true;
      for (const coord of movingRock.values()) {
        const [x, y] = fromKey(coord);
        if (tetris.has(toKey(x, y - 1)) || y === 0) {
          fallable = false;
          break;
        }
      }
      // console.log(`fallable = ${fallable}`);
      if (fallable) {
        const nextCoords = [];
        // 3. falling
        movingRock.forEach((coord) => {
          let [x, y] = fromKey(coord);
          movingRock.delete(toKey(x, y));
          y -= 1;
          nextCoords.push([x, y]);
        });
        nextCoords.forEach(([x, y]) => {
          movingRock.add(toKey(x, y));
        });
      } else {
        // rest
        movingRock.forEach((coord) => {
          let [_, y] = fromKey(coord);
          tetris.add(coord);
          if (y > currentHeight) {
            currentHeight = y;
          }
        });
        movingRock.clear();
      }

      loop += 1;
    }

    print(tetris, movingRock, currentHeight);
    console.log(currentHeight + 1);
  },
};
