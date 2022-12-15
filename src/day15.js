const toKey = (x, y) => {
  return `${x},${y}`;
};

const cmap = new Map();

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
      beaconText.match(/closest beacon is at x=-?[\d]+, y=(-?[\d])+/)[1]
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
  },
  solving: () => {
    console.log(cmap);


  },
};
