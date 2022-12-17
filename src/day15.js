const toKey = (x, y) => {
  return `${x},${y}`;
};

const cmap = new Map();

let leftmost = 0;
let rightmost = 0;
let topmost = 0;
let bottommost = 0;

const print = () => {
  console.log(leftmost, rightmost, topmost, bottommost);
  // const xDigit = Math.max(leftmost.toString().length, rightmost.toString().length);
  const yDigit = Math.max(topmost.toString().length, bottommost.toString().length);

  for(y = topmost; y <= bottommost; y += 1) {
    const tempY = Array(yDigit).fill(' ').join("") + y.toString() + " ";
    let line = tempY.substring(tempY.length - yDigit - 1, tempY.length);
    for (x = leftmost; x <= rightmost; x += 1) {
      const obj = cmap.get(toKey(x, y));
      if (obj) {
       line += obj.type;
      } else {
        line += '.';
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
    cmap.set(toKey(sensorX, sensorY), {
      type: "S",
      closestBeacon: { x: beaconX, y: beaconY },
      manhattanDistance: Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
    });
    if (!cmap.has(toKey(beaconX, beaconY))) {
      cmap.set(toKey(beaconX, beaconY), {
        type: "B"
      });
    }

    if (beaconX < leftmost) {
      leftmost = beaconX;
    }
    if (beaconX > rightmost) {
      rightmost = beaconX;
    }
    if (sensorX < leftmost) {
      leftmost = sensorX;
    }
    if (sensorX > rightmost) {
      rightmost = beaconX;
    }
    if (beaconY < topmost) {
      topmost = beaconY;
    }
    if (beaconY > bottommost) {
      bottommost = beaconY;
    }
    if (sensorY < topmost) {
      topmost = sensorY;
    }
    if (sensorY > bottommost) {
      bottommost = sensorY;
    }
  },
  solving: () => {
    console.log(cmap);
    print();

  },
};
