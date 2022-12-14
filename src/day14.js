const paths = [];

const toKey = (x, y) => {
  return `${x},${y}`;
};

const print = ({
  leftmost = 490,
  rightmost = 510,
  topmost = 0,
  bottommost = 20,
  scanMap,
}) => {
  const lines = [];
  for (let y = topmost; y <= bottommost; y += 1) {
    let row = "";
    for (let x = leftmost; x <= rightmost; x += 1) {
      const icon = scanMap.get(toKey(x, y));
      row += icon ? icon : ".";
    }
    lines.push(row);
  }

  lines.forEach((row) => {
    console.log(row);
  });
};

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }

    const points = line.split("->").map((p) => {
      return p
        .trim()
        .split(",")
        .map((value) => {
          return Number.parseInt(value);
        });
    });

    paths.push(points);
  },
  solving: () => {
    let leftmost = 500;
    let rightmost = 500;
    let topmost = 0;
    let bottommost = 0;

    const scanMap = new Map();
    paths.forEach((points) => {
      let prevPoint;
      points.forEach(([x, y]) => {
        if (prevPoint) {
          const [prevX, prevY] = prevPoint;
          if (x === prevX) {
            const down = y > prevY;
            const start = down ? prevY : y;
            const end = down ? y : prevY;
            for (let i = start; i <= end; i += 1) {
              scanMap.set(toKey(x, i), "#");
            }
          } else {
            // y === prevY
            const right = x > prevX;
            const start = right ? prevX : x;
            const end = right ? x : prevX;
            for (let i = start; i <= end; i += 1) {
              scanMap.set(toKey(i, y), "#");
            }
          }
        }
        if (x < leftmost) {
          leftmost = x;
        }
        if (x > rightmost) {
          rightmost = x;
        }
        if (y < topmost) {
          topmost = y;
        }
        if (y > bottommost) {
          bottommost = y;
        }
        prevPoint = [x, y];
      });
    });
    // console.log(scanMap);
    console.log(`${leftmost} -> ${rightmost}, ${topmost} -> ${bottommost}`);
    print({ leftmost, rightmost, topmost, bottommost, scanMap });

    let [sandX, sandY] = [500, 0];
    let numberOfSand = 0;
    scanMap.set(toKey(500, 0), "o");

    while (sandY <= bottommost) {
      // print({ leftmost, rightmost, topmost, bottommost, scanMap });
      // console.log('\n');

      scanMap.delete(toKey(sandX, sandY));
      if (!scanMap.has(toKey(sandX, sandY + 1))) {
        sandY += 1;
        scanMap.set(toKey(sandX, sandY));
        // console.log(`down: ${toKey(sandX, sandY)}`);
      } else if (!scanMap.has(toKey(sandX - 1, sandY + 1))) {
        sandX -= 1;
        sandY += 1;
        scanMap.set(toKey(sandX, sandY));
        // console.log(`down + left: ${toKey(sandX, sandY)}`);
      } else if (!scanMap.has(toKey(sandX + 1, sandY + 1))) {
        sandX += 1;
        sandY += 1;
        scanMap.set(toKey(sandX, sandY));
        // console.log(`down + right: ${toKey(sandX, sandY)}`);
      } else {
        // rest
        scanMap.set(toKey(sandX, sandY), "o");
        // console.log(`rest ${toKey(sandX, sandY)}`);
        sandX = 500;
        sandY = 0;
        numberOfSand += 1;
      }
    }

    print({ leftmost, rightmost, topmost, bottommost, scanMap });
    console.log(numberOfSand);
  },
};
