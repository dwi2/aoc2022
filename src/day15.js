const toKey = (x, y) => {
  return `${x},${y}`;
};

const fromKey = (key) => {
  return key.split(",").map((n) => Number.parseInt(n));
};

/*
Map(20) {
  '2,18' => { type: 'S', closestBeacon: { x: -2, y: 15 }, manhattanDistance: 7 },
  '-2,15' => { type: 'B', x: -2, y: 15 },
  ...
}
*/
const cmap = new Map();

let leftmost = 0;
let rightmost = 0;
let topmost = 0;
let bottommost = 0;

// const lineNumber = 10;
const lineNumber = 2000000;

const print = () => {
  console.log(leftmost, rightmost, topmost, bottommost);
  // const xDigit = Math.max(leftmost.toString().length, rightmost.toString().length);
  const yDigit = Math.max(
    topmost.toString().length,
    bottommost.toString().length
  );

  for (y = topmost; y <= bottommost; y += 1) {
    const tempY = Array(yDigit).fill(" ").join("") + y.toString() + " ";
    let line = tempY.substring(tempY.length - yDigit - 1, tempY.length);
    for (x = leftmost; x <= rightmost; x += 1) {
      const obj = cmap.get(toKey(x, y));
      if (obj) {
        line += obj.type;
      } else {
        line += ".";
      }
    }
    console.log(line);
  }
};

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }

    const [sensorText, beaconText] = line.split(":");

    const sensorX = Number.parseInt(
      sensorText.match(/Sensor at x=(-?[\d]+)/)[1]
    );
    const sensorY = Number.parseInt(
      sensorText.match(/Sensor at x=-?[\d]+, y=(-?[\d]+)/)[1]
    );
    const beaconX = Number.parseInt(
      beaconText.match(/closest beacon is at x=(-?[\d]+)/)[1]
    );
    const beaconY = Number.parseInt(
      beaconText.match(/closest beacon is at x=-?[\d]+, y=(-?[\d]+)/)[1]
    );

    leftmost = beaconX < leftmost ? beaconX : leftmost;
    rightmost = beaconX > rightmost ? beaconX : rightmost;
    leftmost = sensorX < leftmost ? sensorX : leftmost;
    rightmost = sensorX > rightmost ? beaconX : rightmost;
    topmost = beaconY < topmost ? beaconY : topmost;
    bottommost = beaconY > bottommost ? beaconY : bottommost;
    topmost = sensorY < topmost ? sensorY : topmost;
    bottommost = sensorY > bottommost ? sensorY : bottommost;

    const manhattanDistance =
      Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
    if (
      sensorY + manhattanDistance >= lineNumber ||
      sensorY - manhattanDistance <= lineNumber
    ) {
      cmap.set(toKey(sensorX, sensorY), {
        type: "S",
        closestBeacon: { x: beaconX, y: beaconY },
        manhattanDistance,
      });
    }
    if (!cmap.has(toKey(beaconX, beaconY))) {
      cmap.set(toKey(beaconX, beaconY), {
        type: "B",
        x: beaconX,
        y: beaconY,
      });
    }
  },
  solving: () => {
    console.log(cmap);
    console.log('START!');

    let spans = [];
    cmap.forEach((value, key) => {
      if (value.type === "S") {
        const [x, y] = fromKey(key);
        if (lineNumber < y - value.manhattanDistance || lineNumber > y + value.manhattanDistance) {
          return;
        }

        let turnEnd = 0;
        for (let turn = 0; turn <= value.manhattanDistance; turn += 1) {
          const remainingDistance = value.manhattanDistance - turn;
          const topBorder = y - remainingDistance;
          const bottomBorder = y + remainingDistance;
          if (lineNumber >= topBorder && lineNumber <= bottomBorder) {
            if (turn > turnEnd) {
              turnEnd = turn;
            }
          }
        }
        console.log(`turnEnd = ${turnEnd}`);
        console.log(`${x - turnEnd} -> ${x + turnEnd}`);
        spans.push([x - turnEnd, x + turnEnd]);
      }
    });

    console.log(spans);
    // aggregate the spans, and reduce the number of beacon on the linenumber (10/2000000) is the answer
  },
};
